<template>
  <div>
    <!-- <img src="../assets/images/loading.gif" style="width:40%;transform:translateX(76%) translateY(125%);"></img> -->
  </div>
</template>
<script>
//输出header组件
import '../assets/js/jweixin-1.2.0.js'
export default {
  created() {
    this.getToken();
  },
  deactivated() {
    this.$destroy();
  },
  methods: {
    getToken() {
      var t = this.GetQueryString('token');
      if (t) {
        //存入cookie
        var d = new Date;
        //10秒钟过期
        d.setTime(d.getTime() +  10 * 1000);
        window.document.cookie = "xianhao_token=" + t + ";path=/;expires=" + d.toGMTString();
        window.location.href = "/?t="+d.getTime();
      } else {
        t = window.document.cookie.match('(^|;)?xianhao_token=([^;]*)(;|$)');
        if (!t) {
          window.location.href = "http://api.66xianhao.com";
          // window.location.href = "http://localhost:8080";
        } else {
          this.Http.setToken(t[2]);
          this.getConfig();
        }
      }
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    getConfig() {
      //获取配置信息
      var that = this;
      this.Http.get(this.Api.getConfig(), null, function (result) {
        that.$store.commit('setNotices', result.data.notices);
        that.$store.commit('setCategroy', result.data.categories);
        that.$store.commit('setSetting', result.data.setting);
        that.$router.push('/home');
      })
    },
    getUserInfo() {
      var that = this;
      this.Http.get(this.Api.getUserInfo(), null, function (result) {
        that.$store.commit('setUser', result.data.user);
      })
    },
  }
}
</script>