<template>
    <div>
        <a @click="toDetail(order.id)" class="game-name" replace>
            <span class="name-title clearfix">
                <img :src="$store.state.Setting.qiniuUrl + order.goods.category.img" alt="">
                <em>{{order.goods.name}}</em>
            </span>
            <span class="sever">
                <em class="com-game">所属卖家：</em>
                <i class="game-sever">{{order.goods.merchant.name}}}</i>
            </span>
            <span class="price">￥{{order.amount}}</span>
            <div class="sell-inf clearfix">
                <em>生成时间：</em>
                <span>{{order.createOn}}</span>
            </div>
        </a>
        <div class="sell-status1"></div>
        <div class="wait-you" v-if="order.status == 1">
            <span class="wait-cancel" @click="deleteRe(order.id)">取消订单</span>
            <span class="wait-sure">支付订单</span>
        </div>
        <div class="wait-you" v-if="order.status == 2">
            <span class="wait-cancel" @click="cancel(order.id)">取消订单</span>
            <span class="wait-sure">联系客服</span>
        </div>
        <div class="wait-you" v-if="order.status == 3">
            <span class="wait-cancel">申请仲裁</span>
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
    prop: ['order'],
    data() {
        return {
            order:''
        }
    },
    method: {
        toDetail(orderId){
            this.$router.push("/order_detail/"+orderId);
        },
        deleteRe(orderId) {
            var that = this;     
            this.Http.get(this.Api.deleteReOrder(), {
                orderId:orderId
            }, function (result) {
                //confirm("你确定删除这个订单嘛")
                console.log(result);
                //移除订单结构
                this.$emit('remove',orderId)
                 
            })
        },
        cancel(orderId) {
            var that = this;     
            //移除订单结构
            this.$emit('remove',orderId)
            this.Http.get(this.Api.cancelOrder(), {
                orderId:orderId
            }, function (result) {
                //confirm("你确定删除这个订单嘛")
                console.log(result);
                
            })
        },
        sure(orderId) {
            var that = this;
            //移除订单结构
            this.$emit('remove',orderId)
            this.Http.get(this.Api.sureOrder(), {
                orderId:orderId
            }, function (result) {
                console.log(result);             
            })
        }
    }
}
</script>