<template>
    <div>
        <router-link to="/detail" class="game-lease" replace>
            <span class="name-title clearfix">
                <img :src="$store.state.Setting.qiniuUrl + order.goods.images[0].qiniuKey" alt="">
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
        </router-link>
        <div class="sell-status"></div>
        <div class="wait-you">
            <span class="wait-cancel">取消</span>
            <span class="wait-sure">确定</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'order',
    prop: ['order']
}
</script>