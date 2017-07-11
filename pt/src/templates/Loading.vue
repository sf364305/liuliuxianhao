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