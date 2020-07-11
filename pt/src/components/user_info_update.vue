<template>
  <div class="certification-else">
    <app-header :header="title"></app-header>
    <form action="" method="" class="certification-form user-info-form">
      <div>
        <label for="">昵称：</label>
        <span class="user-info">{{$store.state.User.name}}</span>
      </div>
      <div>
        <label for="">真实姓名：</label>
        <span class="user-info">{{$store.state.User.realName}}</span>
      </div>
      <div>
        <label for="">支付宝账号：</label>
        <input type="text" placeholder="请输入您的支付宝账号" v-model="zhiFuBaoAccount" maxlength="100"/>
      </div>
      <div>
        <label for="">手机号码：</label>
        <input type="text" placeholder="请输入您的手机号码" v-model="phone" />
      </div>
      <div>
        <label style="width:40%;">
          <img :src="captchaSrc" @click="initCaptcha" style="width:100%;height:100%;"/>
        </label>
        <input type="text" placeholder="请输入验证码" v-model="code" value="" style="width:45%;" />

      </div>
      <div class="certification-sub">
        <input type="button" placeholder="" name="" @click="submitUpdate" value="提交" class="certification-submit" />
      </div>
    </form>
  </div>
</template>
<script>
    import Header from '../templates/Header.vue'
    export default {
        name: 'certification-else',
        data() {
            return {
                title: "个人信息",
                realName: "",
                phone: "",
                zhiFuBaoAccount: "",
                code: "",
                captchaSrc: ""
            }
        },
        mounted () {
            this.initUserInfo();
            this.initCaptcha();
        },
        methods: {
            initCaptcha(){
                var _this = this;
                this.Http.getRequest(this.Api.getCaptcha(), function (result) {
                    var imageBase64 = result.data.imageBase64;
                    _this.captchaSrc = imageBase64;
                })
            },
            initUserInfo(){
                this.phone = this.$store.state.User.phone;
                this.zhiFuBaoAccount = this.$store.state.User.zhiFuBaoAccount;
            },
            getNum: function (e) {
                var self = this;
                if (self.phone.length != 11) {
                    console.log("手机号错误");
                    return;
                }
                var num = $(e.target).attr("data-num");
                console.log(num);
                $(e.target).attr("data-num", 2);
                if (num == 1) {
                    self.a = 60;
                    $(e.target).addClass('get-num-active');
                    var timer = setInterval(show, 1000);
                    function show() {
                        self.a--;
                        if (self.a < 0) {
                            self.a = 60;
                            clearInterval(timer);
                            $(e.target).removeClass('get-num-active');
                            $(e.target).attr("data-num", 1);
                        }
                    }
                } else {
                    return;
                }

            },
            submitUpdate() {
                var that = this;
                if (!(/^1[3456789]\d{9}$/.test(that.phone))) {
                    that.$iosAlert("手机号码有误，请重填");
                    return false;
                } else if (that.code === '') {
                    that.$iosAlert("请填写验证码");
                    return false;
                }
                this.Http.get(this.Api.updateUserInfo(), {
                    zhiFuBaoAccount: that.zhiFuBaoAccount,
                    phone: that.phone,
                    code: that.code
                }, function (result) {
                    if (result.code == 0) {
                        //更变本地用户状态
                        var user = that.$store.state.User;
                        user.phone = that.phone;
                        user.zhiFuBaoAccount = that.phone;
                        that.$store.commit('setUser',user);
                        //跳转到我
                        that.$store.commit("clearFrom");
                        that.$router.push("/person");
                    } else {
                        that.initCaptcha();
                    }
                })
            }
        },
        components: {
            "app-header": Header
        }
    }
</script>
<style>
  .user-info {
    height: 3.5rem;
    line-height: 3.5rem;
    width: 60%;
    margin-left: 5%;
  }
  .user-info-form label {
    width: 31%;
  }
</style>
