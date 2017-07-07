<template>
    <div>
        <router-link to="/detail" class="game-name" replace>
            <span class="name-title clearfix">
                <img :src="$store.state.Setting.qiniuUrl + order.goods.images[0].qiniuKey" alt="">
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
        </router-link>
        <div class="sell-status1"></div>
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