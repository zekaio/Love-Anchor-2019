import config
import mysql.connector
import redis
import requests
import time
from flask import Flask, request, session, jsonify, redirect, abort
from flask_cors import CORS



app = Flask(__name__)
app.config['SECRET_KEY']=config.SECRET_KEY

CORS(app, supports_credentials=True)

r = redis.Redis(host=config.redis['host'], port=config.redis['port'], db=config.redis['db'])
conn = mysql.connector.connect(host=config.db['host'], user=config.db['user'],
							   passwd=config.db['passwd'], database=config.db['database'], charset='utf8mb4', autocommit=1)
db = conn.cursor()


def checkWechatLogin():
	if "user_id" not in session:
		sess_id = request.cookies.get("PHPSESSID")
		if sess_id is not None:
			r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Index/getUserInfo",
                             timeout=5, cookies=dict(PHPSESSID=sess_id))
			try:
				t = r.json()
				if "openid" in t:
					try:
						conn.ping()
					except mysql.connector.errors.InterfaceError:
						conn.reconnect()
					db.execute('select id from users where openid=%s', (t['openid'],))
					result = db.fetchall()
					if not result:
						db.execute('insert into users (openid,nickname,headpic) value (%s,%s,%s)',(t['openid'],t['nickname'],t['headpic']))
						db.execute('select id from users where openid=%s', (t['openid'],))
						result = db.fetchall()
					session['user_id'] = result[0][0]
			except:
				pass			
	if "user_id" not in session:
		abort(401)
	return session['user_id']

@app.errorhandler(401)
def page_not_found(error):
    return "请先登录微信！", 401

@app.route('/setopenid', methods=['get'])
def setopenid():
	session['user_id'] = 1
	return "OK",204

@app.route('/info', methods=['get'])
def getinfo():
	keys = ['index', 'name', 'text', 'iconsrc', 'audiosrc']
	anchors = []

	try:
		conn.ping()
	except mysql.connector.errors.InterfaceError:
		conn.reconnect()
	db.execute("select id,name,declaration,imgsrc,audiosrc from anchors order by id")
	result = db.fetchall()
	db.execute("select a.id,count(b.anchor_id) from `anchors` as a left join `votes` as b on a.id=b.anchor_id group by a.id order by a.id")
	num = db.fetchall()
	i = 0
	for anchor in result:
		d = dict(zip(keys, anchor))
		d['audiosrc'] = config.audio_url + d['audiosrc']
		d['iconsrc'] = config.pic_url + d['iconsrc']
		d['number'] = num[i][1]
		i = i + 1
		anchors.append(d)
	return jsonify(anchors), 200


@app.route('/vote/<id>', methods=['POST'])
def vote(id):
	now = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
	if now > config.end_time:
		return jsonify({
			'errcode':4,
			'errmsg':config.errmsg['end']
		})

	user_id = checkWechatLogin()
	try:
		conn.ping()
	except mysql.connector.errors.InterfaceError:
		conn.reconnect()
	p = (user_id,)
	db.execute('select created_at from `votes` where `user_id` = %s order by created_at desc limit 1',p)
	result=db.fetchall()
	if result:
		last = str(result[0][0])
		now = time.strftime('%Y-%m-%d', time.localtime(time.time()))
		if last > now:
			return jsonify({
				'errcode':3,
				'errmsg':config.errmsg['day_limit']
			}),400
		
	luastr = """
		if redis.call('exists',KEYS[1]) == 1 then
			if tonumber(redis.call('get',KEYS[1])) >= tonumber(ARGV[1]) then
				return 0
			end
		else
			redis.call('set',KEYS[1],1)
			redis.call('expire',KEYS[1],60)
		end
		redis.call('incr',KEYS[1])
		return 1
	"""
	lua = r.register_script(luastr)
	if int(lua(keys=['have' + str(id)], args=[config.vote_number_min])):
		p = (session['user_id'], id, request.remote_addr)
		db.execute("insert into votes (user_id,anchor_id,ip) values (%s,%s,%s)", p)
		if db.rowcount:
			return jsonify({'errcode': 0, 'errmsg': ''}),200
		else:
			return jsonify({
				'errcode': 1,
				'errmsg': config.errmsg['insert_err']
			}), 400
	else:
		return jsonify({
			'errcode':2,
			'errmsg':config.errmsg['min_limit']
		}), 400


if __name__ == '__main__':
	app.run(port=5000)
