<template>
    <div class="buy">
        <app-header :header="title"></app-header>
        <div class="buy-inf">商品信息</div>
        <ul class="pay-inf">
            <li class="clearfix">
                <span>商品名称</span>
                <em>{{order.goodsName}}</em>
            </li>
            <li class="clearfix">
                <span>手机号码</span>
                <em>{{order.phone}}</em>
            </li>
            <li class="clearfix">
                <span>QQ号码</span>
                <em>{{order.qq}}</em>
            </li>
            <li class="clearfix">
                <span>应付总价</span>
                <em>{{order.amount}}元</em>
            </li>
            <li class="clearfix">
                <span>实付总价</span>
                <em>{{order.amount}}元</em>
            </li>
        </ul>
        <div class="pay-time">*订单支付有效时间30分钟</div>
        <div class="buy-inf-method">支付方式</div>
        <a @click="pay" class="pay-method" replace>微信支付</a>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
export default {
    name: 'buy',
    data() {
        return {
            title: "选择支付方式",
            order: {},
            payInfo: {

            }
        }
    },
    created() {
        this.order = this.$store.state.Order;
        console.log("全局订单信息",this.order);
    },
    mounted(){

    },
    methods: {
        pay() {
            var self = this;
            this.Http.get(this.Api.payOrder(), {
                orderId: self.order.orderId
            }, function (result) {
                if (result.code === 0) {
                    self.payInfo = JSON.parse(result.data.payJson);
                    self.callWxPay();
                } else {
                    console.log(result.msg);
                }
            })
        },
        callWxPay() {
            
        }
    },
    components: {
        'app-header': Header,
    }
}
</script>