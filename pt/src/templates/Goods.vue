<template>
    <ul class="com-list">
        <li v-for="(g,index) in goods" :key="g.name+g.id+index"  v-bind:class="{hit:g.hit}">
            <a class="game-name" replace @click="toDetail(index)">
                <span class="name-title clearfix">
                    <img :src="$store.state.Setting.qiniuUrl + g.category.img" alt="">
                    <em>{{"【"+g.grade+"级"+"·"+g.category.name+"】"}}{{g.name}}</em>
                </span>
                <span class="sever" v-if="g.type==0">
                    <em class="com-game">认证情况：</em>
                    <i class="game-sever" v-if="g.identification == 1">未认证</i>
                    <i class="game-sever" v-if="g.identification == 2">已认证</i>
                </span>
                <span class="price" v-if="g.type==0">￥{{g.price}}</span>
                <div class="sell-credit clearfix" v-if="g.type==0">
                    <em>卖家信用：</em>
                    <span v-for="n in g.merchant.creditLevel" :key="n.id"></span>
                </div>
                <div class="sell-inf clearfix" v-if="g.type==0">
                    <em>出售成功：</em>
                    <span>{{g.merchant.successNum}}笔</span>
                    <!-- <em>最近成交：</em>
                    <span v-if="g.merchant.successNum != null">
                        {{g.merchant.successNum}}
                    </span>
                    <span v-if="g.merchant.successNum == null">
                        暂无
                    </span> -->
                </div>
                <!-- <span class="sever" v-if="g.type==1">
                    <em class="com-game">绑定情况：</em>
                    <i class="game-sever" v-if="g.bind == 1">手机绑定</i>
                    <i class="game-sever" v-if="g.bind == 2">邮箱绑定</i>
                    <i class="game-sever" v-if="g.bind == 3">无绑定</i>
                    <i class="game-sever" v-if="g.bind == null">未知</i>
                </span> -->
                <span class="sever" v-if="g.type==1">
                    <em class="com-game">押金方式：</em>
                    <i class="game-sever" v-if="g.goodsLeaseInfo.deposit == 0">无需押金</i>
                    <i class="game-sever" v-if="g.goodsLeaseInfo.deposit == 1">押一付一</i>
                    <i class="game-sever" v-if="g.goodsLeaseInfo.deposit == 2">押二付一</i>
                    <i class="game-sever" v-if="g.goodsLeaseInfo.deposit == 3">押三付一</i>
                </span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.hourCost">￥{{g.goodsLeaseInfo.hourCost}}/时</span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.dayCost">￥{{g.goodsLeaseInfo.dayCost}}/日</span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.weekCost">￥{{g.goodsLeaseInfo.weekCost}}/周</span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.monthCost">￥{{g.goodsLeaseInfo.monthCost}}/月</span>
                <div class="lease-credit clearfix" v-if="g.type==1">
                    <em>租赁等级：</em>
                    <span>{{g.grade}}级</span>
                </div>
                <div class="lease-inf clearfix" v-if="g.type==1">
                    <em>租赁时间：</em>
                    <span>一天起租</span>
                </div>
            </a>
            <div class="sell-status1" v-if="g.type==0"></div>
            <div class="sell-status" v-if="g.type==1"></div>
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
            //var bol = $(".com-list").siblings("h2").attr("class");
            //if(bol == "posN") {
                //var a = $(".com-list").parent().parent().css("transform").split(',')[5].split(")")[0];
            //} else {
                //var a = $(".com-list").parent().css("transform").split(',')[5].split(")")[0];
            //}
            //let ls = window.localStorage;
            //ls.setItem("tranY",a);
            //document.cookie = "top=" + a;
            var goods = this.goods[idx];
            // var ls = window.localStorage;
            // ls.setItem(goods.id,"hit");
            // goods.hit = true;
            this.$store.commit('setGoods',goods);
            var goodsId = this.goods[idx].id;
            this.$router.push("/detail/"+goodsId);
        }
    }
}
</script>
