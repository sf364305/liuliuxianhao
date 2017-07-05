<template>
    <div class="certification">
        <header class="commodity-head">
            实名认证
            <span class="return-back" @click="ruturnBack"></span>
        </header>
        <div class="certification-pic"><img src="../assets/images/person_9.png" alt=""></div>
        <p class="certification-com2">根据相关法规，虚拟网络交易需要实名认证。实名认证不涉及金钱账户，认证信息66闲号会严格保密。</p>
        <div class="certification-go">
            <router-link to="/certification_else" class="certification-going" replace>前往认证</router-link>
        </div>
    </div>
</template>
<script>
     export default {
        name: 'certification',
        data() {
            return {
            
            }
        },
        methods: {
            ruturnBack: function() {
                this.$router.go(-1);
            }
        }
    }
</script>