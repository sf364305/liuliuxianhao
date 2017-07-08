<template>
    <div>
        <router-link to="/detail" class="game-lease" replace>
            <span class="name-title clearfix">
                <img :src="$store.state.Setting.qiniuUrl + order.goods.images[0].qiniuKey" alt="">
                <em>{{order.goods.name}}</em>
            </span>
            <span class="sever">
                <em class="com-game">平台：</em>
                <i class="game-sever">{{order.goods.categroy.name}}</i>
            </span>
            <span class="price">￥{{order.amount}}</span>
            <div class="lease-credit clearfix">
                <em>人气：</em>
                <span>{{order.quantity}}</span>
            </div>
            <div class="lease-inf clearfix">
                <em>服务时间：</em>
                <span>{{order.startTime}}至{{order.endTime}}</span>
            </div>
        </router-link>
        <div class="sell-status"></div>
        
        <div class="wait-you" v-if="order.status == 1">
            <span class="wait-cancel">取消订单</span>
            <span class="wait-sure">支付订单</span>
        </div>
        <div class="wait-you" v-if="order.status == 2">
            <span class="wait-cancel">取消订单</span>
            <span class="wait-sure">联系客服</span>
        </div>
        <div class="wait-you" v-if="order.status == 3">
            <span class="wait-cancel">申请仲裁</span>
            <span class="wait-sure">确认收货</span>
        </div>
        
        <div class="wait-you" v-if="order.status == 4">
            <!--<span class="wait-cancel">申请仲裁</span>-->
            <!--<span class="wait-sure">确认收货</span>-->
        </div>
        <div class="wait-you" v-if="order.status == 3">
            <span class="wait-cancel">申请仲裁</span>
            <span class="wait-sure">确认收货</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'order',
    prop: ['order']
}
</script>