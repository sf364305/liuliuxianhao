<template>
    <div class="buy-success">
        <dl class="buy-success-pic">
            <dt><img src="../assets/images/success_1.png" alt=""></dt>
            <dd>购买成功</dd>
        </dl>
        <p class="success-con">
            您的订单已经成功购买，请联系客服发货，您可以在待发货页面查看详情。
        </p>
        <div class="success-linking">
            <router-link to="/wait_send" class="success-link" replace>待发货订单</router-link>
        </div>
    </div>
</template>
<script>
     export default {
        name: 'buy-success',
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