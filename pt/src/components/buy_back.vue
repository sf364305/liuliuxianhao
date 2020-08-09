<template>
    <div class="buy-success">
        <dl class="buy-success-pic">
            <dt>
                <img src="../assets/images/success_1.png" alt="">
            </dt>
            <dd>支付返回</dd>
        </dl>
        <p class="success-con">
            如果您的订单已经成功购买，请联系客服发货，您可以在待发货页面查看详情。如未支付请到待支付列表中继续支付。
        </p>
        <div class="success-linking">
            <a @click="back" class="success-link" replace>待发货订单</a>
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
    activated(){
        this.$store.commit("clearFrom");
    },
    methods: {
        back() {
            this.$router.push("/person");
        }
    }
}
</script>
