<template>
    <div>
        <a @click="toDetail(order.id)" class="game-lease" replace style="padding-bottom: 3rem;">
            <span class="name-title clearfix">
                <img :src="$store.state.Setting.qiniuUrl + order.goods.category.img" alt="">
                <em>{{order.goods.name}}</em>
            </span>
            <span class="sever">
                <em class="com-game">出租类型：</em>
                <i v-if="order.leaseType==0" class="game-sever">时租</i>
                <i v-if="order.leaseType==1" class="game-sever">日租</i>
                <i v-if="order.leaseType==2" class="game-sever">周租</i>
                <i v-if="order.leaseType==3" class="game-sever">月租</i>
            </span>
            <span class="price">￥{{order.amount}}</span>
            <div class="lease-credit clearfix">
                <em>开始时间：</em>
                <span>{{order.startTime}}</span>
            </div>
            <div class="lease-inf clearfix">
                <em>结束时间：</em>
                <span>{{order.endTime}}</span>
            </div>
        </a>
        
        <div class="sell-status"></div>
        
        <div class="wait-you" v-if="order.status == 1 && order.arbitrationStatus !=1">
            <span class="wait-cancel" @click="deleteRe(order.id)">删除订单</span>
            <span class="wait-sure">支付订单</span>
        </div>
        <div class="wait-you" v-if="order.status == 2 && order.arbitrationStatus !=1">
            <span class="wait-cancel" @click="cancel(order.id)">取消订单</span>
            <span class="wait-sure">联系客服</span>
        </div>
        <div class="wait-you" v-if="order.status == 3 && order.arbitrationStatus !=1">
            <span class="wait-cancel" @click="arbitrationStatus(order.id)">申请仲裁</span>
            <span class="wait-sure" @click="sure(order.id)">确认收货</span>
        </div>
        
        <div class="wait-you" v-if="order.arbitrationStatus == 1">
            <span class="wait-sure" @click="sure(order.id)" style="width:100%;">联系客服</span>
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
    created(){
        
    },
    props: ['order'],
    methods: {
        toDetail(orderId){
            this.$router.push("/order_detail/"+orderId);
        },
        deleteRe(orderId) {
            var that = this; 
            //移除订单结构    
            this.$emit('remove',orderId)
            this.Http.get(this.Api.deleteReOrder(), {
                orderId:orderId
            }, function (result) {
                //confirm("你确定删除这个订单嘛")
                console.log(result);               
            })
        },
        cancel(orderId) {
            var that = this;     
            //移除订单结构
            this.$emit('remove',orderId)
            this.Http.get(this.Api.cancelOrder(), {
                orderId:orderId
            }, function (result) {
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
        ,
        arbitration(orderId) {
            var that = this;
            //移除订单结构
            this.$emit('remove',orderId)
            this.Http.get(this.Api.arbitrationOrder(), {
                orderId:orderId
            }, function (result) {
                console.log(result);             
            })
        }
    }
}
</script>