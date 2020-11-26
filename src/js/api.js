import wx from 'weixin-js-sdk';
import axios from 'axios';
import { phpurl, getWxurl, link, imgUrl, title } from './config';

import { Toast } from 'vant';

/**
 * axios 配置
 */
export const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

function succFunc(res) {
  return Promise.resolve(res);
}

function failFunc(err) {
  if (!err.response) {
    Toast.fail({
      message: '服务器无法响应，请稍后再试',
    });
  } else {
    // err.response.data
    switch (err.response.status) {
      // 未登录
      case 401:
        window.location.href = phpurl;
        break;
      // 不在活动时间
      case 410:
        Toast.fail({
          message: err.response.data.message,
        });
        break;
      // 服务器错误
      case 500:
        Toast.fail({
          message: '服务器错误，请稍后再试',
        });
        break;
      default:
        return Promise.reject(err);
    }
  }
  return new Promise(() => {});
}

instance.interceptors.response.use(succFunc, failFunc);

instance.interceptors.request.use(
  (config) => {
    if (/get/i.test(config.method)) {
      config.params = config.params || {};
      config.params.timestamp = new Date().getTime();
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

/* */

export function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

export function wxlogin() {
  // function login(){ //这个是对的
  if (isWeiXin() == false) {
    // alert('请使用微信浏览器');
    return false;
  }

  instance({
    url: getWxurl,
    method: 'post',
    data: { url: window.location.href.split('#')[0] },
  }).then((res) => {
    wx.ready(() => {
      wx.checkJsApi({
        jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'],
        success: () => {
          console.log('接口可用');
        },
      });

      wx.updateTimelineShareData({
        title,
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl,
        success: function() {
          console.log('success');
          // 设置成功
        },
      });

      wx.updateAppMessageShareData({
        title, // 分享标题
        desc: '', // 分享描述
        link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl,
        success: function() {
          console.log('success');
          // 设置成功
        },
      });
    });

    wx.config({
      debug: false,
      appId: res.data.appid,
      timestamp: res.data.timestamp,
      nonceStr: res.data.noncestr,
      signature: res.data.signature,
      jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'],
    });
  });
}
