const baseUrl = "https://hemc.100steps.net/2019/anchor-backend/recruit";
export const apiurl = `${baseUrl}/`;
export const ajaxurl = `${baseUrl}/recruit`;
export const getinfo = `${baseUrl}/getinfo`;
export const phpurl =
  "https://hemc.100steps.net/2018/fireman/auth.php?redirect=" +
  encodeURIComponent(location.href);
export const bbturl = `${baseUrl}/checkSubscribe`;
export const getWxurl =
  "https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi";
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