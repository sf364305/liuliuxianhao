<template>
    <div>
        <a @click="toDetail(order.id)" class="game-lease" replace style="padding-bottom: 3rem;">
            <span class="name-title clearfix">
                <img :src="$store.state.Setting.qiniuUrl + order.goods.category.img" alt="">
                <em style="margin-left:2%;">{{order.goods.name}}</em>
            </span>
            <span class="sever">
                <em class="com-game">出租类型：</em>
                <i v-if="order.leaseType==0" class="game-sever">时租</i>
                <i v-if="order.leaseType==1" class="game-sever">日租</i>
                <i v-if="order.leaseType==2" class="game-sever">周租</i>
                <i v-if="order.leaseType==3" class="game-sever">月租</i>
            </span>
            <span class="price">￥{{order.amount}}</span>
            <!-- <div class="lease-credit clearfix">
                <em>开始时间：</em>
                <span>{{order.startTime}}</span>
            </div>
            <div class="lease-inf clearfix">
                <em>结束时间：</em>
                <span>{{order.endTime}}</span>
            </div>-->
        </a>

        <div class="sell-status"></div>

        <div class="wait-you" v-if="order.status == 1 && order.arbitrationStatus !=1">
            <span class="wait-cancel" @click="deleteRe(order.id)">删除订单</span>
            <span class="wait-sure" @click="pay(order.id)">支付订单</span>
        </div>
        <div class="wait-you" v-if="order.status == 2 && order.arbitrationStatus !=1">
            <span class="wait-cancel" @click="cancel(order.id)">取消订单</span>
            <span class="wait-sure" @click="server(order.id)">联系客服</span>
        </div>
        <div class="wait-you" v-if="order.status == 3 && order.arbitrationStatus !=1">
            <span class="wait-cancel" @click="arbitration(order.id)">申请仲裁</span>
            <span class="wait-sure" @click="sure(order.id)">确认收货</span>
        </div>

        <div class="wait-you" v-if="order.arbitrationStatus == 1">
            <span class="wait-sure" @click="server(order.id)" style="width:100%;">联系客服</span>
        </div>
        <div class="wait-you" v-if="order.status == 4 && order.arbitrationStatus !=1">
            <!--<span class="wait-cancel">申请仲裁</span>-->
            <!--<span class="wait-sure">确认收货</span>-->
        </div>
    </div>
</template>
<script>
export default {
    name: 'order-item',
    data() {
        return {

        }
    },
    created() {

    },
    props: ['order'],
    methods: {
        server(id) {
            this.callServer(id);
        },
        toDetail(orderId) {
            this.$router.push("/order_detail/" + orderId);
        },
        pay(orderId) {
            this.$router.push('/payment');
            // var self = this;
            // this.Http.get(this.Api.payOrder(), {
            //     orderId: orderId
            // }, function (result) {
            //     if (result.code === 0) {
            //         if(result.data.payUrl){
            //             window.location.href = result.data.payUrl;
            //         } else {
            //             self.payInfo = JSON.parse(result.data.payJson);
            //             self.callWxPay(self.payInfo);
            //         }
            //     }
            // })
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
            this.$iosConfirm("确定取消?")
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
