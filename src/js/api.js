import wx from "weixin-js-sdk"
import axios from 'axios'
import qs from 'qs'
import { apiurl, phpurl,  getWxurl, shareurl, shareimg_url } from "./config";
export function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  return true;
  } else {
  return false;
  }
}
export function checkLogin() {
    if (!isWeiXin) {
      return false;
    }
  
    var checkurl = apiurl + "checkLogin";
    axios.get(checkurl).then(res => {
      wxlogin();
      if (res.data.errcode != 0 || res.data.errcode == 400) {
        window.location.href = phpurl;
      } else {
        return true;
      }
    });
  }
  export function wxlogin() {
    function login(){ //这个是对的
    if (isWeiXin()==false) {
      alert("请使用微信浏览器")
      return false;
    }
    fetch(getWxurl, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      body: qs.stringify({
        url: location.href.split("#")[0]
      })
    })
      .then(res => res.json());
    }
      login().then(res => {
        wx.config({
          appId: res.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: ["updateTimelineShareData", "updateAppMessageShareData"],
          debug: false
        });
        wx.ready(function() {
          //alert(window.location.href.split('#')[0]);
          wx.updateTimelineShareData({
            title: "爱上你主播：投票现场", // 分享标题
            link: shareurl,
            imgUrl: shareimg_url,
            success: function() {},
            cancel: function() {
              alert("取消了分享~")
            }
          });
        });
        //分享给朋友
        wx.updateAppMessageShareData({
          title: "爱上你主播：投票现场",
          desc: "", // 分享描述
          link: shareurl,
          imgUrl: shareimg_url,
        success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
            alert("取消了分享~")
          }
        });
        wx.error(function() {
          this.$alert("授权失败了=n=", "提示", {
            confirmButtonText: "重试",
            cancelButtonText: "取消"
          }).catch(() => {});
          //点击重试 再重新请求一次  取消就消失弹框
        });
        //处理验证成功的信息
      })
    }
  
    