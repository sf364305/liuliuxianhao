<template>
    <ul class="com-list">
        <li v-for="(g,index) in goods" :key="g.name">
            <a class="game-name" replace @click="toDetail(index)" style="padding-bottom:3rem;">
                <span class="name-title clearfix">
                    <img :src="$store.state.Setting.qiniuUrl + g.category.img" alt="">
                    <em>{{g.name}}</em>
                </span>
                <span class="sever" v-if="g.type==0">
                    <em class="com-game">绑定情况：</em>
                    <i class="game-sever" v-if="g.goodsSaleInfo != null && g.goodsSaleInfo.bind == 1">手机绑定</i>
                    <i class="game-sever" v-if="g.goodsSaleInfo != null && g.goodsSaleInfo.bind == 2">邮箱绑定</i>
                    <i class="game-sever" v-if="g.goodsSaleInfo != null && g.goodsSaleInfo.bind == 3">无绑定</i>
                    <i class="game-sever" v-if="g.goodsSaleInfo == null">未知</i>
                </span>
                <span class="price" v-if="g.type==0">￥{{g.price}}</span>
                <div class="sell-credit clearfix" v-if="g.type==0">
                    <em>卖家信用：</em>
                    <span v-for="n in g.merchant.creditLevel" :key="n.id"></span>
                </div>
                <div class="sell-inf clearfix" v-if="g.type==0">
                    <em>最近成交：</em>
                    <span v-if="g.merchant.successNum != null">
                        {{g.merchant.successNum}}
                    </span>
                    <span v-if="g.merchant.successNum == null">
                        暂无
                    </span>
                </div>
                <span class="sever" v-if="g.type==1">
                    <em class="com-game">绑定情况：</em>
                    <i class="game-sever" v-if="g.goodsLeaseInfo != null && g.goodsLeaseInfo.bind == 1">手机绑定</i>
                    <i class="game-sever" v-if="g.goodsLeaseInfo != null && g.goodsLeaseInfo.bind == 2">邮箱绑定</i>
                    <i class="game-sever" v-if="g.goodsLeaseInfo != null && g.goodsLeaseInfo.bind == 3">无绑定</i>
                    <i class="game-sever" v-if="g.goodsLeaseInfo == null">未知</i>
                </span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.hourCost">￥{{g.goodsLeaseInfo.hourCost}}/时</span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.dayCost">￥{{g.goodsLeaseInfo.dayCost}}/日</span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.weedCos">￥{{g.goodsLeaseInfo.weedCos}}/周</span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.monthCost">￥{{g.goodsLeaseInfo.monthCost}}/月</span>
                <div class="lease-credit clearfix" v-if="g.type==1">
                    <em>租赁等级：</em>
                    <span>{{g.goodsLeaseInfo.grade}}级</span>
                </div>
                <div class="lease-inf clearfix" v-if="g.type==1">
                    <em>租赁时间：</em>
                    <span>不低于1小时</span>
                </div>
            </a>
            <div class="sell-status1" v-if="g.type==0"></div>
            <div class="sell-status" v-if="g.type==1"></div>
            <!--按钮-->
            <div class="wait-you" v-if="order.status == 2">
                <span class="wait-cancel" @click="cancel(order.id)">删除订单</span>
                <span class="wait-sure" @click="server()">编缉</span>
            </div>      
        </li>
    </ul>
</template>
<script>
export default {
    name: 'goods',
    data() {
        return {
            // goods: []
        }
    },
    props: ['goods'],
    methods:{
        toDetail(idx){
            var goodsId = this.goods[idx].id;
            this.$router.push("/detail/"+goodsId);
        }
    }
}
</script>