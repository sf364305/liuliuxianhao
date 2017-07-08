<template>
  <div>
    <img src="../assets/images/loading.gif" style="width:40%;transform:translateX(76%) translateY(125%);"></img>
  </div>
</template>
<script>
//输出header组件
import '../assets/js/jweixin-1.2.0.js'
export default {
  created() {
    this.getToken();
    this.getConfig();
  },
  deactivated() {
    this.$destroy();
  },
  methods: {
    getToken() {
      this.Http.setToken(this.GetQueryString('token'));
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    getNotices() {
      //获取公告
      var that = this;
      this.Http.get(this.Api.getNotices(), null, function (result) {
        that.$store.commit('setNotices', result.data.notices);
        that.checkGo();
      })
    },
    getCategroy() {
      var that = this;
      this.Http.get(this.Api.getCategroy(), null, function (result) {
        that.$store.commit('setCategroy', result.data.categories);
        that.checkGo();
      })
    },
    getConfig() {
      var that = this;
      this.Http.get(this.Api.getConfig(), null, function (result) {
        that.$store.commit('setSetting', result.data.setting);
        that.getNotices();
        that.getCategroy();
        that.getUserInfo();
        that.getJsConfig();
      })
    },
    getUserInfo() {
      var that = this;
      this.Http.get(this.Api.getUserInfo(), null, function (result) {
        that.$store.commit('setUser', result.data.user);
        that.checkGo();
      })
    },
    getJsConfig() {
      var url = location.href.split('#')[0];
      this.Http.get(this.Api.getJsSign(), {
        url: url
      }, function (result) {
        var config = result.data.config;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: config.appId, // 必填，公众号的唯一标识
          timestamp: config.timestamp, // 必填，生成签名的时间戳
          nonceStr: config.nonceStr, // 必填，生成签名的随机串
          signature: config.signature,// 必填，签名，见附录1
          jsApiList: ["chooseWXPay", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      })
    },

    checkGo() {
      if (this.$store.state.Setting != {}
        && this.$store.state.Categroy != []
        && this.$store.state.Notices != []
        && this.$store.state.UserId != "") {
        console.log("跳转........");
        this.$router.push('/home');
      }
    }
  }
}
</script>