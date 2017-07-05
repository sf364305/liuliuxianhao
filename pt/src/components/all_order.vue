<template>
    <div class="all-order">
        <header class="commodity-head">
            全部订单
            <span class="return-back" @click="ruturnBack"></span>
        </header>
        <div class="all-order-list">
            <router-link to="/unpaid" class="person-unpaid-all" replace>未支付<i>0</i><span></span></router-link>
            <router-link to="/wait_send" class="person-send-all" replace>待发货<i>0</i><span></span></router-link>
            <router-link to="/wait_sure" class="person-sure-all" replace>待确认<i>0</i><span></span></router-link>
            <router-link to="/arbitration" class="person-arbitration-all" replace>仲裁中<i>0</i><span></span></router-link>
        </div>
    </div>
</template>
<script>
     export default {
        name: 'sell-infomation',
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