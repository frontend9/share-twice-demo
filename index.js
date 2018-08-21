'use strict';

const shareDom = document.getElementsByTagName('meta').shareAuto;
const shareAuto = shareDom ? shareDom.getAttribute('content') === "true" : false;
// 定义全局变量
const shareTwice = {
  config(shareConfig) {
    // 默认先从meta标签中获取配置项，约定好类似这样的meta源标签<meta name="shareTitle" value="分享名称" />
    const defaultConfig = {};
    const titleDom = document.getElementsByTagName('meta').shareTitle || document.getElementsByTagName('title')[0];      
    const descDom = document.getElementsByTagName('meta').shareDesc;
    const linkDom = document.getElementsByTagName('meta').shareLink; 
    const imageDom = document.getElementsByTagName('meta').shareImage;
    defaultConfig.title = titleDom.getAttribute('content') || titleDom.innerText;
    defaultConfig.desc = descDom ? descDom.getAttribute('content') : '';  
    defaultConfig.link = linkDom ? linkDom.getAttribute('content') : document.location.href;  
    defaultConfig.image = imageDom ? imageDom.getAttribute('content') : 'https://gw.alipayobjects.com/zos/rmsportal/PbxcajsXkcfiWIYdRxaw.jpg'; 
    defaultConfig.successFun = function() {}
    defaultConfig.failFun = function(err) {}
    
    // 或者使用config({})传入的配置项
    this.shareConfig = Object.assign(defaultConfig, shareConfig || {});

    // 判断是否为钉钉环境  
    this.isDing();
    // 判断是否为微信环境，按需加载sdk
    this.isWechat();
  },
  isWechat() {
    const me = this;
    const isWechat = ~window.navigator.userAgent.indexOf('MicroMessenger');
    if (isWechat) {
      const me = this;
      if (typeof window.wx === 'undefined') {
        me._loadScript('//res.wx.qq.com/open/js/jweixin-1.2.0.js', function() {
          me._shareInWechat();            
        })
      } else {
        me._shareInWechat();
      }  
    } 
  },
  isDing() {
    const me = this;
    const isDing = ~window.navigator.userAgent.indexOf('DingTalk');
    if (isDing) {
      if (typeof window.dd === 'undefined') {
        me._loadScript('//g.alicdn.com/ilw/ding/0.9.9/scripts/dingtalk.js', function () {
          me._shareInDing();          
        })
      } else {
        me._shareInDing();        
      }
    }
  },
  // 配置在钉钉环境下分享时的配置项
  _shareInDing() {
    const me = this;
    dd.ready(function(){
      dd.biz.navigation.setRight({
        show: true,
        control: true,
        text: '',
        onSuccess : function(result) {
          dd.biz.util.share({
            type: 0,
            url: me.shareConfig.link,
            title: me.shareConfig.title,
            content: me.shareConfig.desc,
            image: me.shareConfig.image,
            onSuccess : me.shareConfig.successFun,
            onFail : me.shareConfig.failFun,
          });
        },
        onFail : function(err) {}
      });
    });
  },
  // 配置在微信环境下分享时的配置项
  _shareInWechat() {
    const me = this;
    me._getConfigs(function( data ){
      data.link = data.url;
      delete data.url;
      // 需要后端提供的接口返回appId、timestamp、nonceStr、signature
      me.shareConfig = Object.assign(me.shareConfig, data);
      wx.config({
        debug: me.shareConfig.debug, 
        appId: me.shareConfig.appId, 
        timestamp: me.shareConfig.timestamp,
        nonceStr: me.shareConfig.nonceStr, 
        signature: me.shareConfig.signature,
        jsApiList: [
          'openEnterpriseChat',
          'openEnterpriseContact',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'onVoicePlayEnd',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'translateVoice',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'closeWindow',
          'scanQRCode',
        ]
      });
      wx.ready(() => {
        wx.onMenuShareTimeline({
          title: me.shareConfig.title,
          desc: me.shareConfig.desc,
          link: me.shareConfig.link,
          imgUrl: me.shareConfig.image,
          success: me.shareConfig.successFun,
          cancel: me.shareConfig.failFun
        });
        wx.onMenuShareAppMessage({
          title: me.shareConfig.title,
          desc: me.shareConfig.desc,
          link: me.shareConfig.link,
          imgUrl: me.shareConfig.image,
          success: me.shareConfig.successFun,
          cancel: me.shareConfig.failFun
        });
        wx.onMenuShareQQ({
          title: me.shareConfig.title,
          desc: me.shareConfig.desc,
          link: me.shareConfig.link,
          imgUrl: me.shareConfig.image,
          success: me.shareConfig.successFun,
          cancel: me.shareConfig.failFun
        });
        wx.onMenuShareWeibo({
          title: me.shareConfig.title,
          desc: me.shareConfig.desc,
          link: me.shareConfig.link,
          imgUrl: me.shareConfig.image,
          success: me.shareConfig.successFun,
          cancel: me.shareConfig.failFun
        });
        wx.onMenuShareQZone({
          title: me.shareConfig.title,
          desc: me.shareConfig.desc,
          link: me.shareConfig.link,
          imgUrl: me.shareConfig.image,
          success: me.shareConfig.successFun,
          cancel: me.shareConfig.failFun
        });
      })
    });
  },
  // 需要服务端提供一个 微信获取jssdk签名的接口，具体要看接口怎么实现
  _getConfigs(callback) {
     $.ajax({
          method: "POST",
          url: "some.php",
          data: {
              url: document.location.href.split('#')[0]
          }
     })
     .done(function( msg ) {
          callback();
     });
  },
  _loadScript(src, callback) {
    let script = document.createElement('script');
    script.setAttribute('async', 'async');
    script.setAttribute('src', src);
    script.setAttribute('charset', 'utf-8');
    script.onload = () => {
      callback();
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  }
};

if (typeof define !== 'undefined' && define.amd) {
  define([], function () {
      if(shareAuto) {
        shareTwice.config({});
      }
      return shareTwice;
  });
}
else if (typeof module !== 'undefined' && module.exports) {
  module.exports = shareTwice;
  if(shareAuto) {
    shareTwice.config({});
  }
}
else {
  if(shareAuto) {
    shareTwice.config({});
  }
}