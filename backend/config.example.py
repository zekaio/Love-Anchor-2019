app_url = ""

app_port = 5000

resources_url = r"/"

pic_url = resources_url + r"pic/"

audio_url = resources_url + r"audio/"

wx_check_url = ""

vote_number_min = 30

SECRET_KEY = "EXAMPLE_KEY"

redis = {
    'host': '127.0.0.1',
    'port': 6379,
    'db': 0
}

db = {
    'host': 'localhost',
    'user': 'EXAMPLE_USER',
    'passwd': 'EXAMPLE_PSW',
    'database': 'love_anchor2019'
}

start_time = '2019-11-25 20:00:00'

end_time = '2019-11-29 22:00:00'

errmsg = {
    'insert_err': '投票失败，请稍后尝试~',
    'min_limit': '该选手一分钟内投票数已达上限~请稍后尝试~',
    'day_limit': '今天已经投过票咯，明天再来吧~',
    'start': '活动尚未开始！',
    'end': '活动已结束！',
}
