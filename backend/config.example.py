
app_url = ""

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

end_time='2019-11-25 00:00:00'

errmsg = {
    'min_limit': '该选手一分钟内投票数已达上限~请稍后尝试~',
    'day_limit': '今天已经投过票咯，明天再来吧~',
    'end': '活动已结束！',
    'insert_err':'投票失败，请稍后尝试~',
}
