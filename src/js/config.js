const baseUrl = "https://hemc.100steps.net/2019/anchor-backend/recruit";
export const apiurl = `${baseUrl}/`;
// export const ajaxurl = `${baseUrl}/recruit`;

export const getinfo = `${baseUrl}/getinfo`;//获取列表

export const posturl = `${baseUrl}/getinfo`;//提交

export const phpurl =
  "https://hemc.100steps.net/2018/fireman/auth.php?redirect=" +
  encodeURIComponent(location.href);//微信登录授权跳转页

export const bbturl = `${baseUrl}/checkSubscribe`;//公众号 爱上似乎不用

export const getWxurl =
  "https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi";//微信请求jsapi页
export const show = {//请求列表
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        data = JSON.stringify(data);
        return data;
      }
    ],
    url: getinfo
  };
  export const vote = {//提交索引
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function(data) {
        data = JSON.stringify(data);
        return data;
      }
    ],
    url: posturl
  };