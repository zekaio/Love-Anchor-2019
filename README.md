# anchor-voting

#### get请求时间和投票次数

status判断是否开始

返回errcode判断是否有投票次数

#### get请求列表  

| [     |                    |
| ----- | ------------------ |
|       | {                  |
|       | "index":Number,    |
|       | "name":String,     |
|       | "num":Number,      |
|       | "text":String,     |
|       | "iconsrc":String,  |
|       | "audiosrc":String, |
|       | }                  |
| **]** |                    |

#### post 请求

###### 发送对应index投票 

errcode:0  errmsg:投票成功

errcode:1  errmsg:网络出错