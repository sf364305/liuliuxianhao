<template>
    <div class="certification-else">
        <app-header :header="title"></app-header>
        <form action="" method="" class="certification-form">
            <div>
                <label for="">真实姓名：</label>
                <input type="text" placeholder="请输入您的真实姓名" v-model="realName" value="" />
            </div>
            <div>
                <label for="">身份证：</label>
                <input type="text" placeholder="请输入您的身份证" v-model="cardId" value="" />
            </div>
            <div>
                <label for="">手机号码：</label>
                <input type="text" placeholder="请输入您的手机号码" v-model="phone" value="" />
            </div>
            <div>
                <label style="width:40%;">
                  <img :src="captchaSrc" @click="initCaptcha" style="width:100%;height:100%;"/>
                </label>
                <input type="text" placeholder="请输入验证码" v-model="code" value="" style="width:45%;" />

            </div>
            <div class="certification-sub">
                <input type="button" placeholder="" name="" @click="submitCer" value="提交" class="certification-submit" />
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
            title: "实名认证",
            a: 60,
            realName: "",
            phone: "",
            cardId: "",
            code: "",
            captchaSrc: ""
        }
    },
    mounted () {
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
        submitCer() {
            var that = this;
            if (!(/^1[3456789]\d{9}$/.test(that.phone))) {
                that.$iosAlert("手机号码有误，请重填");
                return false;
            } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.cardId))) {
                that.$iosAlert("身份证号码有误，请重填");
                return false;
            } else if (!/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/.test(that.realName)) {
                that.$iosAlert("请填写真实姓名");
                return false;
            } else if (that.code === '') {
                that.$iosAlert("请填写验证码");
                return false;
            }
            this.Http.get(this.Api.verified(), {
                userId: that.userId,
                realName: that.realName,
                cardId: that.cardId,
                phone: that.phone,
                code: that.code
            }, function (result) {
                if (result.code == 0) {
                    that.$iosAlert("提交信息成功，请耐心等待审核！");
                    //检测是否从我要卖页面跳转
                    if (that.$store.state.FromView.indexOf("/my_sell")) {
                        //更变本地用户状态
                        var user = that.$store.state.User;
                        user.userStatus = 1;
                        that.$store.commit('setUser',user);

                        //跳转到我要卖页面
                        that.$store.commit("clearFrom");
                        that.$router.push("/my_sell");
                    } else {
                        that.$store.commit("clearFrom");
                        that.$router.push("/person");
                    }
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
