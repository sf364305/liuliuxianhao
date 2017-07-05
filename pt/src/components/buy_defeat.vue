<template>
    <div class="buy-defeat">
        <dl class="buy-success-pic buy-defeat-pic">
            <dt><img src="../assets/images/success_2.png" alt=""></dt>
            <dd>购买失败</dd>
        </dl>
        <p class="success-con">
            您的订单未能成功购买，该商品可能已经出售或者卖家已下架，详情请联系客服。
        </p>
        <div class="success-linking">
            <router-link to="/home" class="success-link" replace>返回首页</router-link>
        </div>
    </div>
</template>
<script>
     export default {
        name: 'buy-defeat',
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