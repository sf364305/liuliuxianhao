<template>
    <div class="popularity-buy">
        <app-header :header="title"></app-header>
        <div class="pay-popular">
            <h2>刷人气</h2>
            <ul>
                <li>
                    <span>价格：</span>
                    <em>￥200</em>
                </li>
                <li>
                    <span>订单号：</span>
                    <em>{{$store.state.Order.orderNo}}</em>
                </li>
                <li>
                    <span>人气：</span>
                    <em>{{$store.state.Order.quantity}}</em>
                </li>
                <li>
                    <span>类型：</span>
                    <em v-if="$store.state.Order.popularType==0">按小时</em>
                    <em v-if="$store.state.Order.popularType==1">按天</em>
                    <em v-if="$store.state.Order.popularType==2">按周</em>
                    <em v-if="$store.state.Order.popularType==3">按月</em>
                </li>
                <li>
                    <span>数量：</span>
                    <em>{{$store.state.Order.count}}</em>
                </li>
                <li>
                    <span>开始时间：</span>
                    <em>{{$store.state.Order.startTime}}</em>
                </li>
                <li>
                    <span>结束时间：</span>
                    <em>{{$store.state.Order.endTime}}</em>
                </li>
                <li>
                    <span>平台：</span>
                    <em>{{$store.state.Order.goods.name}}</em>
                </li>
                <li>
                    <span>平台ID：</span>
                    <em>{{$store.state.Order.targetId}}</em>
                </li>
                <li v-if="$store.state.Order.comment">
                    <span>备注：</span>
                    <em>{{$store.state.Order.comment}}</em>
                </li>
            </ul>
        </div>
        <div class="popular-paid-outer">
            <a herf="" title="">微信支付</a>
        </div>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
export default {
    name: 'popularity-buy',
    data() {
        return {
            title:"确认人气订单"
        }
    },
    methods: {
        callWxPay(){
            
        }
    },
    components: {
        'app-header': Header
    }
}
</script>