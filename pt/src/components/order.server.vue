<template>
    <div id="server">
        <app-header :header="title"></app-header>
        <div class="messeage-tit">
            <h2>*客服在线时间</h2>
            <p>工作日 09:00 - 23:00</p>
            <p>周末节假日 12:00 - 23:00</p>
        </div>
        <form aciton="" method="" class="server-form">
            <div>
                <label for="">电话</label>
                <input v-model="feedback.phone" type="text" placeholder="请输入您的手机号码" name="" value="" class="server-tele" />
            </div>
            <div>
                <label for="">微信</label>
                <input v-model="feedback.qq" type="text" placeholder="请输入您的微信号" name="" value="" class="server-qq" />
            </div>
            <div class="add-com server-messeage" style="border: none;">
                <h2>留言内容：</h2>
                <textarea id="detail" v-model="feedback.content" name="detail" maxlength="200" placeholder="请输入您的留言" rows="8"></textarea>
            </div>
            <div class="server-sub" style="border: none;">
                <input type="button" name="" value="提交" class="server-submit" @click="closeShow" />
            </div>
        </form>
        <iframe v-if="serverOnline == true" id="iframe" name="iframe" :src="serverUrl" frameborder="no" style="width: 100%;height: 94%;margin-top:10%;border: none;position: absolute;top: 0;left: 0;z-index:9999;background: white;">

        </iframe>
    </div>
</template>
<style>

</style>
<script>
import Header from '../templates/Header.vue'
export default {
    name:"server",
    data: function () {
        return {
            title:"正在连接客服",
            serverUrl:"",
            feedback: {
                phone: "",
                qq: "",
                content: ""
            },
            serverOnline: true
        }
    },
    created() {
        var self = this;
        var id = this.$route.params.orderId;
        this.Http.get(this.Api.getOrderServerUrl(), {
            orderId:id
        }, function (result) {
            self.serverUrl = result.data.url+"?t="+new Date().getTime();
        })

        this.Http.get(this.Api.getOnlineServer(), null, function (result) {
            self.serverOnline = (result.data.server == "online" ? true:false);
            if(self.serverOnline == true){
                self.title = "六六闲号客服"
            }else{
                self.title = "未有客服在线，请留言"
            }
        });
    },
    methods: {
        closeShow() {
            if (!this.feedback.phone && !this.feedback.qq) {
                this.$iosAlert("请至少填写一种联系方式");
                return;
            }

            var self = this;
            this.Http.get(this.Api.addFeedback(), this.feedback, function (result) {
                if (result.code == 0) {
                    self.$iosAlert("我们已收到您的信息，感谢您的支持！");
                    self.$store.commit("clearFrom");
                    self.$router.push('/person');
                }
            })
        }
    }, components: {
        'app-header': Header
    }
}
</script>
