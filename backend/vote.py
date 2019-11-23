import config
import mysql.connector
import redis
import requests
import time
from flask import Flask, request, session, jsonify, redirect, abort


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
					db.execute('select id from users where openid=%s', t['openid'])
					result = db.fetchall()
					if not result:
						db.execute('insert into users (openid,nickname,headpic) value (%s,%s,%s)',(t['openid'],t['nickname'],t['headpic']))
						db.execute('select id from users where openid=%s', t['openid'])
						result = db.fetchall()
					session['user_id'] = result[0][0]
			except:
				pass			
	if "user_id" not in session:
		abort(401, message="请先登陆微信")
	return session['user_id']


app = Flask(__name__)
app.config['SECRET_KEY']=config.SECRET_KEY

r = redis.Redis(host=config.redis['host'], port=config.redis['port'], db=config.redis['db'])
conn = mysql.connector.connect(host=config.db['host'], user=config.db['user'],
							   passwd=config.db['passwd'], database=config.db['database'], charset='utf8mb4', autocommit=1)
db = conn.cursor()


@app.route('/')
def hello_world():
	return request.remote_addr


@app.route('/info', method=['get'])
def getinfo():
	keys = ['index', 'name', 'text', 'iconsrc', 'audiosrc']
	anchors = []

	try:
		conn.ping()
	except mysql.connector.errors.InterfaceError:
		conn.reconnect()
	db.execute("select id,name,declaration,imgsrc,audiosrc from anchors")
	result = db.fetchall()
	db.execute("select a.id,count(b.anchor_id) from `anchors` as a left join `votes` as b on a.id=b.anchor_id group by a.id order by a.id")
	num = db.fetchall()
	i = 0
	for anchor in result:
		d = dict(zip(keys, anchor))
		d['number'] = num[i][1]
		i = i + 1
		anchors.append(d)
	return jsonify(anchors), 200


@app.route('/vote/<id>', methods=['POST'])
def vote():
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
	db.execute('select created_at from votes where user_id=%s order by created_at desc limit 1', (user_id))
	result=db.fetchall()
	if result:
		last = result[0][0]
		now = time.strftime('%Y-%m-%d', time.localtime(time.time()))
		if last > now:
			return jsonify({
				'errcode':3,
				'errmsg':config.errmsg['day_limit']
			})
		
	luastr = """
		if redis.call('exists',KEY[1]) then
			if redis.call('get',KEY[1]) >= ARGV[1] then
				return 0
			end
		else
			redis.call('set',KEY[1],1)
			redis.call('expire',60)
		end
		redis.call('rpush',KEY[1])
		return 1
	"""
	lua = r.register_script(luastr)
	if int(lua(['have' + str(id)], [config.vote_number_min])):
		p = (session['user_id'], id, request.remote_addr)
		db.execute("insert into votes (user_id,anchor_id,ip) values (%s,%s,%s)", p)
		if db.rowcount:
			return jsonify({'errcode': 0, 'errmsg': ''}), 204
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


if __name__ == "main":
	app.run(port=5000)
