import config
import mysql.connector
import redis
import requests
import time
from flask import Flask, request, session, jsonify, redirect, abort, current_app
from flask_cors import CORS
import json
import traceback


app = Flask(__name__)
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['DEBUG'] = False

CORS(app, supports_credentials=True)

r = redis.Redis(host=config.redis['host'],
                port=config.redis['port'], db=config.redis['db'])
conn = mysql.connector.connect(host=config.db['host'], user=config.db['user'],
                               passwd=config.db['passwd'], database=config.db['database'], charset='utf8mb4', autocommit=True, collation='utf8mb4_unicode_ci')
db = conn.cursor()


def checkWechatLogin():
    # # for test
    # if not session.get('user_id'):
    #     import uuid
    #     try:
    #         conn.ping()
    #     except mysql.connector.errors.InterfaceError:
    #         conn.reconnect()
    #     openid = str(uuid.uuid4())
    #     db.execute(
    #         'select id from users where openid=%s', (openid,))
    #     result = db.fetchall()
    #     if not result:
    #         db.execute('insert into users (openid) values (%s)', (
    #             openid,))
    #         db.execute(
    #             'select id from users where openid=%s', (openid,))
    #         result = db.fetchall()
    #     session['user_id'] = result[0][0]
    # return session['user_id']
    # #

    if not session.get('user_id'):
        resp = requests.get(
            'https://hemc.100steps.net/2020/wechat/auth/user/openid', cookies=request.cookies)
        try:
            t = json.loads(resp.content)
            if 'openid' in t:
                try:
                    conn.ping()
                except mysql.connector.errors.InterfaceError:
                    conn.reconnect()
                db.execute(
                    'select id from users where openid=%s', (t['openid'],))
                result = db.fetchall()
                if not result:
                    db.execute('insert into users (openid) value (%s)', (
                        t['openid'],))
                    db.execute(
                        'select id from users where openid=%s', (t['openid'],))
                    result = db.fetchall()

                session['user_id'] = result[0][0]
        except:
            current_app.logger.error(traceback.format_exc())
    if not session.get('user_id'):
        abort(401)
    return session['user_id']


@app.errorhandler(401)
def page_not_found(error):
    return "请先登录微信！", 401


@app.route('/info', methods=['get'])
def getinfo():
    checkWechatLogin()
    keys = ['index', 'name', 'text', 'iconsrc', 'audiosrc']
    anchors = []

    try:
        conn.ping()
    except mysql.connector.errors.InterfaceError:
        conn.reconnect()
    db.execute(
        "select id,name,declaration,imgsrc,audiosrc from anchors order by id")
    result = db.fetchall()
    db.execute("select a.id,ifnull(b.number,0) from `anchors` as a left join (select anchor_id,count(anchor_id) as number from votes group by anchor_id order by anchor_id) as b on a.id=b.anchor_id group by a.id order by a.id")
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


@app.route('/session')
def check_login():
    checkWechatLogin()
    return ''


@app.route('/vote/<id>', methods=['POST'])
def vote(id):
    if int(id) not in range(1, 11):
        return jsonify({
            'errcode': 6,
            'errmsg': config.errmsg['index_err']
        })
    now = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
    if now > config.end_time:
        return jsonify({
            'errcode': 5,
            'errmsg': config.errmsg['end']
        })
    if now < config.start_time:
        return jsonify({
            'errcode': 4,
            'errmsg': config.errmsg['start']
        })
    user_id = checkWechatLogin()
    try:
        conn.ping()
    except mysql.connector.errors.InterfaceError:
        conn.reconnect()
    p = (user_id,)
    db.execute(
        'select created_at from `votes` where `user_id` = %s order by created_at desc limit 1', p)
    result = db.fetchall()
    if result:
        last = str(result[0][0])
        now = time.strftime('%Y-%m-%d', time.localtime(time.time()))
        if last > now:
            return jsonify({
                'errcode': 3,
                'errmsg': config.errmsg['day_limit']
            })

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
        p = (session['user_id'], id)
        db.execute("insert into votes (user_id,anchor_id) values (%s,%s)", p)
        if db.rowcount:
            return jsonify({
                'errcode': 0,
                'errmsg': config.errmsg['success']
            }), 200
        else:
            return jsonify({
                'errcode': 1,
                'errmsg': config.errmsg['insert_err']
            })
    else:
        return jsonify({
            'errcode': 2,
            'errmsg': config.errmsg['min_limit']
        })


if __name__ == '__main__':
    app.run(port=config.app_port)
