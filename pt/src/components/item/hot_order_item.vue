<template>
    <div>
        <a @click="toDetail(order.id)" class="game-lease" replace style="padding-bottom: 3rem;">
            <span class="name-title clearfix">
                <img :src="$store.state.Setting.qiniuUrl + order.goods.category.img" alt="">
                <em style="margin-left:2%;">{{order.goods.name}}</em>
            </span>
            <span class="sever">
                <em class="com-game">平台：</em>
                <i class="game-sever">{{order.goods.category.name}}</i>
            </span>
            <span class="price">￥{{order.amount}}</span>
            <div class="lease-credit clearfix">
                <em>人气：</em>
                <span>{{order.quantity}}</span>
            </div>
            <!-- <div class="lease-inf clearfix">
                <em>服务时间：</em>
                <span>{{order.startTime}}至{{order.endTime}}</span>
            </div> -->
        </a>
        <div class="sell-hot"></div>

        <div class="wait-you" v-if="order.status == 1">
            <span class="wait-cancel" @click="deleteRe(order.id)">删除订单</span>
            <span class="wait-sure" @click="pay(order.id)">支付订单</span>
        </div>
        <div class="wait-you" v-if="order.status == 2">
            <span class="wait-cancel" @click="cancel(order.id)">取消订单</span>
            <span class="wait-sure" @click="server(order.id)">联系客服</span>
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
        server(id){
            this.callServer(id);
        },
        toDetail(orderId) {
            this.$router.push("/order_detail/" + orderId);
        }, pay(orderId) {
            var self = this;
            this.Http.get(this.Api.payOrder(), {
                orderId: orderId
            }, function (result) {
                if (result.code === 0) {
                    if(result.data.payMethod && result.data.payMethod == 'xf'){
                        window.location.href = result.data.xfPayUrl;
                    } else {
                        self.payInfo = JSON.parse(result.data.payJson);
                        self.callWxPay(self.payInfo);
                    }
                }
            })
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
            //移除订单结构
            this.$emit('remove', orderId)
            this.Http.get(this.Api.sureOrder(), {
                orderId: orderId
            }, function (result) {
                console.log(result);
            })
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
