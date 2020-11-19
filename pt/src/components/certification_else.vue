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
    methods: {
        submitCer() {
            var that = this;
            if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.cardId))) {
                that.$iosAlert("身份证号码有误，请重填");
                return false;
            } else if (!/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/.test(that.realName)) {
                that.$iosAlert("请填写真实姓名");
                return false;
            }

            var metaInfo = getMetaInfo();
            var self = this;
            this.Http.get(this.Api.realNameDetect(), {
                realName: that.realName,
                cardId: that.cardId,
                metaInfo: JSON.stringify(metaInfo)
            }, function (result) {
                $(".alertLoading").css("display","none");
                self.$store.commit('setLoading', false);
                if (result.code === 0) {
                    window.location.href = result.data.url;
                } else {
                    that.$iosAlert(result.msg);
                }
            })
        }
    },
    components: {
        "app-header": Header
    }
}
</script>
