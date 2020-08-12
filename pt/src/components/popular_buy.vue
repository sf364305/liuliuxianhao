<template>
    <div class="popularity-buy">
        <app-header :header="title"></app-header>
        <scroller ref="scroller" style="margin-bottom:4rem;margin-top:4rem;">
            <div class="pay-popular">
                <h2>刷人气</h2>
                <ul>
                    <li>
                        <span>价格：</span>
                        <em>￥{{$store.state.Order.amount}}</em>
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
                    <!-- <li>
                        <span>开始时间：</span>
                        <em>{{$store.state.Order.startTime}}</em>
                    </li>
                    <li>
                        <span>结束时间：</span>
                        <em>{{$store.state.Order.endTime}}</em>
                    </li>-->
                    <li>
                        <span>平台：</span>
                        <em>{{$store.state.Order.goods.name}}</em>
                    </li>
                    <li>
                        <span>平台ID：</span>
                        <em>{{$store.state.Order.targetId}}</em>
                    </li>
                    <li>
                        <span>联系方式：</span>
                        <em>{{$store.state.Order.phone}}</em>
                    </li>
                    <li v-if="$store.state.Order.comment">
                        <span>备注：</span>
                        <em>{{$store.state.Order.comment}}</em>
                    </li>
                </ul>
            </div>
            <div class="popular-paid-outer">
                <a herf="javascript:void(0);" @click="pay()" title="">微信支付</a>
            </div>
        </scroller>
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
        pay(){
            this.$router.push('/payment');
            // var self = this;
            // var orderId = this.$store.state.Order.id;
            // $(".alertLoading").fadeIn(100);
            // this.Http.get(this.Api.payOrder(), {
            //     orderId: orderId
            // }, function (result) {
            //     $(".alertLoading").hide();
            //     if (result.code === 0) {
            //         if(result.data.payUrl){
            //             window.location.href = result.data.payUrl;
            //         } else {
            //             self.payInfo = JSON.parse(result.data.payJson);
            //             self.callWxPay(self.payInfo);
            //         }
            //     }
            // })
        }
    },
    components: {
        'app-header': Header
    }
}
</script>
