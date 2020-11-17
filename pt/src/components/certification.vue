<template>
    <div class="certification">
        <app-header :header="title"></app-header>
        <div class="certification-pic">
            <img src="../assets/images/person_9.png" alt="">
        </div>
        <p class="certification-com2">根据相关法规，虚拟网络交易需要实名认证。实名认证不涉及金钱账户，认证信息66闲号会严格保密。</p>
        <div class="certification-go">
            <a @click="go" class="certification-going" replace>前往认证</a>
        </div>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
export default {
    name: 'certification',
    data() {
        return {
            title: "实名认证"
        }
    },
    methods: {
        go() {
            if(navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1){
                var self = this;
                this.Http.get(this.Api.getRealNameDetectUrl(), null, function (result) {
                    $(".alertLoading").css("display","none");
                    self.$store.commit('setLoading', false);
                    if (result.code === 0) {
                        window.location.href = result.data.url;
                    } else {
                        that.$iosAlert(result.msg);
                    }
                })
            } else{
                this.$router.push('/certification_else');
            }
        }
    },
    components: {
        "app-header": Header
    }
}
</script>
