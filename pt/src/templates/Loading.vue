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
      var d = new Date;
      d.setTime(d.getTime() + 1000 * 120);
      //token
      var t = this.GetQueryString('token');
      if (t) {
        //存入cookie
        //目标页面
        var page = this.GetQueryString('page');
        if (page && page != 'null') {
          window.document.cookie = "xianhao_page=" + page + ";path=/;expires=" + d.toGMTString();
        }

        //token
        //10秒钟过期
        window.document.cookie = "xianhao_token=" + t + ";path=/;expires=" + d.toGMTString();
        window.location.href = "/#"; //t="+d.getTime()
      } else {
        //从cookie中取出内容
        t = window.document.cookie.match('(^|;)?xianhao_token=([^;]*)(;|$)');
        if (!t) {
          window.location.href = this.host+'login';
        } else {
          this.Http.setToken(t[2]);
          this.getConfig();
        }
        var page = window.document.cookie.match('(^|;)?xianhao_page=([^;]*)(;|$)');
        if (page&&page[2]) {
          this.$store.commit('setReferencePage', page[2]);
        }
        window.document.cookie = "xianhao_page=;path=/;expires=" + new Date().getTime();
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
        if (window.location.search.indexOf('tradeStatus=success') >= 0){
            that.$router.push('/buy_success');
        } else {
            that.$router.push('/home');
        }
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
