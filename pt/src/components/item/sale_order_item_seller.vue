<template>
    <div>
        <a @click="toDetail(order.id)" class="game-name" replace style="padding-bottom: 3rem;">
            <span class="name-title clearfix">
                <img :src="$store.state.Setting.qiniuUrl + order.goods.category.img" alt="">
                <em>{{order.goods.name}}</em>
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
            <span class="sever" v-if="order.status == 4">
                <em class="com-game">结算状态：</em>
                <i class="game-sever" v-if="order.isMerchantPay">未结算</i>
                <i class="game-sever" v-else-if="order.merchantPayStatus == 0">待结算</i>
                <i class="game-sever" v-else-if="order.merchantPayStatus == 1">已结算</i>
            </span>
            <span class="sever" v-if="order.status == 4">
                <em class="com-game">结算金额：</em>
                <i style="color:red;" v-if="order.merchantPayAmount">￥{{order.merchantPayAmount}}</i>
            </span>
        </a>
        <div class="sell-status1"></div>
        <div class="wait-you" v-if="order.status == 1">
            <span class="wait-cancel" @click="deleteRe(order.id)">取消订单</span>
            <span class="wait-sure">支付订单</span>
        </div>
        <div class="wait-you" v-if="order.status == 2">
            <span class="wait-sure" @click="server(order.id)" style="width:100%;">联系客服</span>
        </div>
        <!--<div class="wait-you" v-if="order.status == 3">
            <span class="wait-cancel" @click="server()">申请仲裁</span>
            <span class="wait-sure" @click="sure(order.id)">确认收货</span>
        </div>-->

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
        deleteRe(orderId) {
            var that = this;
            this.Http.get(this.Api.deleteReOrder(), {
                orderId: orderId
            }, function (result) {
                //confirm("你确定删除这个订单嘛")
                console.log(result);
                //移除订单结构
                this.$emit('remove', orderId)

            })
        },
        cancel(orderId) {
            var that = this;
            //移除订单结构
            this.$emit('remove', orderId)
            this.Http.get(this.Api.cancelOrder(), {
                orderId: orderId
            }, function (result) {
                //confirm("你确定删除这个订单嘛")
                console.log(result);

            })
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


        }
    }
}
</script>
