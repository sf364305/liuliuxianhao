<template>
    <div>
        <a @click="toDetail(order.id)" class="game-name" replace style="padding-bottom: 3rem;">
            <span class="name-title clearfix">
                <img :src="$store.state.Setting.qiniuUrl + order.goods.category.img" alt="">
                <em style="margin-left:2%;">{{order.goods.name}}</em>
            </span>
            <span class="sever">
                <em class="com-game">所属卖家：</em>
                <i class="game-sever">{{order.goods.merchant.name}}</i>
            </span>
            <span class="price">￥{{order.amount}}</span>
            <div class="sell-inf clearfix">
                <em>生成时间：</em>
                <span>{{order.createOn}}</span>
            </div>
        </a>
        <div class="sell-status1"></div>
        <div class="wait-you" v-if="order.status == 1">
            <span class="wait-cancel" @click="deleteRe(order.id)">删除订单</span>
            <span class="wait-sure"  @click="pay(order.id)">支付订单</span>
        </div>
        <div class="wait-you" v-if="order.status == 2">
            <span class="wait-cancel" @click="cancel(order.id)">取消订单</span>
            <span class="wait-sure"  @click="server(order.id)">联系客服</span>
        </div>
        <div class="wait-you" v-if="order.status == 3">
            <span class="wait-cancel" @click="arbitration(order.id)">申请仲裁</span>
            <span class="wait-sure" @click="sure(order.id)">确认收货</span>
        </div>

        <div class="wait-you" v-if="order.status == 4">
            <!--<span class="wait-cancel">申请仲裁</span>-->
            <!--<span class="wait-sure">确认收货</span>-->
        </div>
    </div>
</template>
<script>
export default {
    name: 'order',
    props: ['order'],
    data() {
        return {
        }
    },
    methods: {
        server(id) {
            this.callServer(id);
        },
        toDetail(orderId) {
            this.$router.push("/order_detail/" + orderId);
        },
        pay(orderId) {
            this.$router.push("/pay/order/"+orderId);
        },
        deleteRe(orderId) {
            var that = this;
            this.$iosConfirm("确定删除订单?")
                .then(function () {
                    that.Http.get(that.Api.deleteReOrder(), {
                        orderId: orderId
                    }, function (result) {
                        //移除订单结构
                        that.$emit('remove', orderId)
                    })
                }, function () {
                    console.log('取消');
                });
        },
        cancel(orderId) {
            var that = this;
            this.$iosConfirm("确定取消订单?")
                .then(function () {
                    //移除订单结构
                    that.$emit('remove', orderId)
                    that.Http.get(that.Api.cancelOrder(), {
                        orderId: orderId
                    }, function (result) {
                        console.log(result);
                    })
                }, function () {
                    console.log('取消');
                });
        },
        sure(orderId) {
            var that = this;
            this.$iosConfirm("确认收货后货款将直接打给卖家，且不允许申请仲裁")
                .then(function () {
                    //移除订单结构
                    that.$emit('remove', orderId)
                    that.Http.get(that.Api.sureOrder(), {
                        orderId: orderId
                    }, function (result) {
                        console.log(result);
                    })
                }, function () {
                    console.log('取消');
                });
        },
        arbitration(orderId) {
            var that = this;

            this.$iosConfirm("确定申请仲裁后请联系客服沟通")
                .then(function () {
                    //移除订单结构
                    that.$emit('remove', orderId)
                    that.Http.get(that.Api.arbitrationOrder(), {
                        orderId: orderId
                    }, function (result) {
                        console.log(result);
                    })
                }, function () {
                    console.log('取消');
                });
        }
    }
}
</script>
