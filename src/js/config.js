const baseUrl = "https://hemc.100steps.net/2019/love-anchor2019-backend/api";
// const baseUrl = "http://localhost/api/love-anchor2019/api"
export const apiurl = `${baseUrl}/`;
// export const ajaxurl = `${baseUrl}/recruit`;
var id=1234;
export const getinfo = `${baseUrl}/info`;//获取列表

export const posturl = `${baseUrl}/vote/`;//提交
export const loginurl =  `${baseUrl}/setuserid/`+id+'';
export const logouturl = `${baseUrl}/clearuserid`;

export const shareurl = "https://hemc.100steps.net/2019/anchor-vote";
export const shareimg_url = "https://hemc.100steps.net/2019/anchor-vote/img/shareimg.jpg"

export const phpurl =
  "https://hemc.100steps.net/2018/fireman/auth.php?redirect=" +
  encodeURIComponent(location.href);//微信登录授权跳转页

export const bbturl = `${baseUrl}/checkSubscribe`;//公众号 爱上似乎不用

export const getWxurl =
  "https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi";//微信请求jsapi页
  
export const show = {//请求列表
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json"
    // },
    transformRequest: [
      function(data) {
        // window.console.log(data)
        data = JSON.stringify(data);
        return data;
      }
    ],
    url: getinfo
  };
  export const login = {//请求列表
    method: "GET",
    url: loginurl
  };
  export const logout = {//请求列表
    method: "GET",
    url: logouturl
  };