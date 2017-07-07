<template>
  <div>
    <img src="../assets/images/loading.gif" style="width:100%;"></img>
  </div>
</template>
<script>
//输出header组件
export default {
  created() {
    this.getToken();
    this.getConfig();
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
      })
    },
    getUserInfo() {
      var that = this;
      this.Http.get(this.Api.getUserInfo(), null, function (result) {
        that.$store.commit('setUser', result.data.user);
        that.checkGo();
      })
    },
    checkGo() {
      if (this.$store.state.Setting
        && this.$store.state.Categroy
        && this.$store.state.Notices
        && this.$store.state.UserId != "") {
          console.log("配置完成，跳转");
          this.$router.push('/home');
      }
    }
  }
}
</script>