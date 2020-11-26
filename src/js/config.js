const baseUrl = 'https://hemc.100steps.net/2020/love-anchor2020-backend/api';
// const baseUrl = 'http://localhost:5000';
export const apiurl = `${baseUrl}/`;
export const getinfo = `${baseUrl}/info`; //获取列表
export const posturl = `${baseUrl}/vote/`; //提交
export const checkLogin = `${baseUrl}/session`; // 检验是否登录

export const link = 'https://hemc.100steps.net/2020/anchor-vote';
export const imgUrl =
  'https://hemc.100steps.net/2020/anchor-vote/img/shareimg.jpg';
export const title = '爱上你主播·投票';

export const wechatBaseURL = 'https://hemc.100steps.net/2020/wechat';
export const phpurl = `${wechatBaseURL}/auth?state=${encodeURIComponent(
  window.location.href
)}`; //微信登录授权跳转页
export const getWxurl = `${wechatBaseURL}/offiaccount/jssdk`; //微信请求jsapi页

export const show = {
  method: 'GET',
  transformRequest: [
    function(data) {
      data = JSON.stringify(data);
      return data;
    },
  ],
  url: getinfo,
};
