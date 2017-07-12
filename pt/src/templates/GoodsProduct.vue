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
                    <i class="game-sever" v-if="g.bind == 1">手机绑定</i>
                    <i class="game-sever" v-if="g.bind == 2">邮箱绑定</i>
                    <i class="game-sever" v-if="g.bind == 3">无绑定</i>
                    <i class="game-sever" v-if="g.bind == null">未知</i>
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
                    <i class="game-sever" v-if="g.bind == 1">手机绑定</i>
                    <i class="game-sever" v-if="g.bind == 2">邮箱绑定</i>
                    <i class="game-sever" v-if="g.bind == 3">无绑定</i>
                    <i class="game-sever" v-if="g.bind == null">未知</i>
                </span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.hourCost">￥{{g.goodsLeaseInfo.hourCost}}/时</span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.dayCost">￥{{g.goodsLeaseInfo.dayCost}}/日</span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.weedCos">￥{{g.goodsLeaseInfo.weedCos}}/周</span>
                <span class="price" v-if="g.type==1 && g.goodsLeaseInfo.monthCost">￥{{g.goodsLeaseInfo.monthCost}}/月</span>
                <div class="lease-credit clearfix" v-if="g.type==1">
                    <em>租赁等级：</em>
                    <span>{{g.grade}}级</span>
                </div>
                <div class="lease-inf clearfix" v-if="g.type==1">
                    <em>租赁时间：</em>
                    <span>不低于1小时</span>
                </div>
            </a>
            <div class="sell-status1" v-if="g.type==0"></div>
            <div class="sell-status" v-if="g.type==1"></div>
            <!--按钮-->
            <div class="wait-you" v-if="g.status==1">
                <span class="wait-cancel" @click="delGoods(index)">删除商品</span>
                <span class="wait-sure" @click="editGoods(index)">编缉</span>
            </div>
            {{goods.isShelves}}
            <div class="wait-you" v-if="g.isShelves">
                <span class="wait-sure" style="width:100%;" @click="downGoods(index)">下架</span>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'GoodsProduct',
    data() {
        return {
            // goods: []
        }
    },
    props: ['goods'],
    created() {
    },
    methods: {
        toDetail(idx) {
            var goodsId = this.goods[idx].id;
            this.$router.push("/detail/" + goodsId);
        },
        editGoods(idx) {
            var goods = this.goods[idx];
            this.$store.commit('setGoods', goods);
            if (goods.type == 0) {
                this.$router.push('/sell_infomation/0');
            } else if (goods.type == 1) {
                this.$router.push('/lease_information/0');
            }
        },
        delGoods(idx) {
            var goods = this.goods[idx];
            var self = this;
            
            this.$iosConfirm("确定取消?")
                .then(function () {
                    self.Http.get(self.Api.deleteGoods(), {
                        goodsId: goods.id
                    }, function (result) {
                        if (result.code === 0) {
                            self.$emit('remove', goods.id);
                            self.$iosAlert("删除成功");
                        } else {
                            self.$iosAlert(result.data.msg);
                        }
                    })
                }, function () {
                    console.log('取消');
                });
        },
        downGoods(idx) {    
            var goods = this.goods[idx];
            var self = this;
            
            this.$iosConfirm("确定取消?")
                .then(function () {
                    //移除订单结构
                    self.Http.get(self.Api.down(), {
                        goodsId: goods.id
                    }, function (result) {
                        if (result.code === 0) {
                            self.$emit('remove', goods.id);
                            self.$iosAlert("下架成功");
                        } else {
                            self.$iosAlert(result.data.msg);
                        }
                    })
                }, function () {
                    console.log('取消');
                });
        }
    }
}
</script>