<template>
    <div id="server">
        <div class="underline-ser">         
            <h1>{{title}}</h1>
            <div class="messeage-tit">
                <h2>*客服在线时间</h2>
                <p>工作日 09:00 - 21:00</p>
                <p>周六日 10:00 - 21:00</p>
                <p style="color: red;">*或加客服微信:xianhao666666</p>
            </div>
            <form aciton="" method="" class="server-form">
                <div>
                    <label for="">电话</label>
                    <input v-model="feedback.phone" type="text" placeholder="请输入您的手机号码" name="" value="" class="server-tele" />
                </div>
                <div>
                    <label for="">QQ</label>
                    <input v-model="feedback.qq" type="text" placeholder="请输入您的QQ号码" name="" value="" class="server-qq" />
                </div>
                <div class="add-com server-messeage" style="border: none;">
                    <h2>留言内容：</h2>
                    <textarea id="detail" v-model="feedback.content" name="detail" maxlength="200" placeholder="请输入您的留言" rows="8"></textarea>
                </div>
                <div class="server-sub" style="border: none;margin-top:3rem">
                    <input type="button" name="" value="提交" class="server-submit" @click="closeShow" />
                </div>
            </form>
            <div class="server-alert-outer" @click="closeAlert">
                <div class="server-alert">
                    <h2>提示</h2>
                    <p>提交成功</p>
                </div>
            </div>
        </div>
        <iframe v-if="serverOnline == true" id="iframe" name="iframe" :src="serverUrl" frameborder="no" style="width: 100%;height:91%;border: none;position: absolute;top: 0;left: 0;z-index:444;background: white;">
        </iframe>
        <app-footer></app-footer>
    </div>
</template>
<style>

</style>
<script>
import Footer from '../templates/Footer.vue'
export default {
    name:"server",
    data: function () {
        return {
            title: '给我们留言',
            feedback: {
                phone: "",
                qq: "",
                content: ""
            },
            serverUrl: "",
            serverOnline: true
        }
    },
    created() {
        var self = this;
        var wiH = $(window).height() - $(".footer").height();
        setTimeout(function() {
            if(self.serverOnline == true) {
                $(".underline-ser").css("display","none");
            }
        },1000)
        this.Http.get(this.Api.getServerUrl(), null, function (result) {
            self.serverUrl = result.data.url+"?t="+new Date().getTime();
        })

        this.Http.get(this.Api.getOnlineServer(), null, function (result) {
            self.serverOnline = (result.data.server == "online" ? true:false);
        })
    },
    activated() {
        setTimeout(function() {   
            console.log(this.serverOnline)
            if(this.serverOnline == true) {
                $(".server-form").css("display","none");
                $("#upload-img").html("")
            }
        },1000)
    },
    methods: {
        closeAlert() {

        },
        closeShow() {
            if (!this.feedback.phone) {
                this.$iosAlert("请填写手机号，以便我们的客服及时联系您");
                return;
            }

            var self = this;
            this.Http.get(this.Api.addFeedback(), this.feedback, function (result) {
                if (result.code == 0) {
                    self.$iosAlert("我们已收到您的信息，感谢您的支持！");
                }
            })
            // $(".server-alert-outer").css("display", "block")
        },
    }, components: {
        'app-footer': Footer
    }
}
</script>

<style>
.finished {
    display: none;
}
</style>