<template>
    <div class="sure-order">
        <app-load></app-load>
        <app-header :header="title"></app-header>
        <scroller ref="scroller" style="margin-bottom:4rem;">
            <ul class="sure-inf" style="padding-top: 4rem;">
                <li class="clearfix">
                    <span>订单号</span>
                    <em>{{order.orderNo}}</em>
                </li>
                <li class="clearfix">
                    <span>商品名称</span>
                    <em>{{order.goods.name}}</em>
                </li>
                <li class="clearfix">
                    <span>价格</span>
                    <em>{{order.amount}}</em>
                </li>
                <li class="clearfix">
                    <span>生成时间</span>
                    <em>{{order.createOn}}</em>
                </li>
                <li class="clearfix">
                    <span>订单状态</span>
                    <em v-if="order.status == 1">待付款</em>
                    <em v-if="order.status == 2">待配送</em>
                    <em v-if="order.status == 3">配送中</em>
                    <em v-if="order.status == 4">已完成</em>
                    <em v-if="order.status == 5">已退款</em>
                </li>
                <li class="clearfix">
                    <span>仲裁状态</span>
                    <em v-if="order.arbitrationStatus == 0">未仲裁</em>
                    <em v-if="order.arbitrationStatus == 1">仲裁中</em>
                    <em v-if="order.arbitrationStatus == 2">仲裁成功</em>
                    <em v-if="order.arbitrationStatus == 3">仲裁失败</em>
                </li>
            </ul>
            <div class="tobuy-inf">商品信息</div>
            <ul class="order-contact">
                <li class="clearfix" v-if="order.goods.category">
                    <span>所属平台</span>
                    <em>{{order.goods.category.name}}</em>
                </li>
                <li class="clearfix" v-if="order.type == 2">
                    <span>购买人气</span>
                    <em>{{order.quantity}}</em>
                </li>
                <li class="clearfix" v-if="order.type == 2">
                    <span>主播ID</span>
                    <em>{{order.targetId}}</em>
                </li>
                <!-- <li class="clearfix" v-if="order.type == 2">
                    <span>开始时间</span>
                    <em>{{order.startTime}}</em>
                </li>
                <li class="clearfix" v-if="order.type == 2">
                    <span>结束时间</span>
                    <em>{{order.endTime}}</em>
                </li> -->
                <li class="clearfix" v-if="order.type == 0 && order.goods.authorization">
                    <span>第三方授权</span>
                    <em v-if="order.goods.authorization == 4">未授权</em>
                    <em v-if="order.goods.authorization == 1">QQ</em>
                    <em v-if="order.goods.authorization == 2">微信</em>
                    <em v-if="order.goods.authorization == 3">微博</em>
                </li>
                <li class="clearfix" v-if="order.goods.grade">
                    <span>账号等级</span>
                    <em>{{order.goods.grade}}级</em>
                </li>
                <li class="clearfix" v-if="order.goods.accountID">
                    <span>ID</span>
                    <em>{{order.goods.accountID}}</em>
                </li>
                <li class="clearfix" v-if="order.goods">
                    <span>性别</span>
                    <em v-if="order.goods.sex == 0">男</em>
                    <em v-if="order.goods.sex == 1">女</em>
                </li>
                <li class="clearfix" v-if="order.goods">
                    <span>绑定情况</span>
                    <em v-if="order.goods.bind == 1">手机绑定</em>
                    <em v-if="order.goods.bind == 2">邮箱绑定</em>
                    <em v-if="order.goods.bind == 3">未绑定</em>
                </li>
                <li class="clearfix" v-if="order.goods.goodsPopularInfo">
                    <span>人气</span>
                </li>
                <li class="clearfix" v-if="order.type == 0 && order.goods.identification">
                    <span>身份认证</span>
                    <em v-if="order.goods.identification == 1">未认证</em>
                    <em v-if="order.goods.identification == 2">已认证</em>
                </li>
                <li class="clearfix">
                    <span>描述</span>
                    <em v-if="order.goods.detail">{{order.goods.detail}}</em>
                    <em v-if="!order.goods.detail">暂无描述</em>
                </li>
            </ul>
            <div class="order-button clearfix" v-if="order.status == 1">
                <span class="order-button-sure" @click="pay(order.id)">继续支付</span>
            </div>
            <div class="order-button clearfix" v-if="order.status == 2">
                <span class="order-button-delete" @click="cancel(order.id)">删除</span>
                <span class="order-button-sure" @click="server()">联系客服</span>
            </div>
            <div class="order-button clearfix" v-if="order.status == 3">
                <span class="order-button-sure" @click="server()">联系客服</span>
            </div>
        </scroller>
    </div>
</template>
<script>
import Load from '../templates/Load.vue'
import Header from '../templates/Header.vue'
export default {
    name: 'order_detail',
    data() {
        return {
            title: "订单详情",
            order: {
                id: '',
                orderNo: '',
                goods:{
                    'name':''
                }
            }
        }
    },

    created() {
        this.ordr = {};
        this.order.id = this.$route.params.id;
        this.getOrderDetail();
    },
    activated() {
        this.ordr = {};
        this.order.id = this.$route.params.id;
        this.getOrderDetail();
    },
    methods: {
        server(){
            this.callServer(this.order.id);
        },
        pay(orderId) {
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
        getOrderDetail() {
            var self = this;
            this.Http.get(this.Api.getOrderGoodsDetail(), {
                orderId: self.order.id
            }, function (result) {
                self.order = result.data.order;
                console.log(result.data.order)
            })
        },
        cancel(orderId) {
            var that = this;
            //移除订单结构
            this.$emit('remove', orderId)
            this.Http.get(this.Api.cancelOrder(), {
                orderId: orderId
            }, function (result) {

            })
        }
    },
    components: {
        'app-header': Header,
        'app-load': Load
    }
}
</script>
