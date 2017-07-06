<template>
    <div class="commodity">
        <header class="commodity-head">
            账号搜索
            <span class="return-back"></span>
        </header>
        <ul class="com-choice clearfix">
            <li class="com-text" @click="change1">商品类型</li>
            <li class="com-text2" @click="change2">筛选</li>
            <li class="com-text3" @click="change3">默认排序</li>
        </ul>
        <div class="alert-com-outer" @click="closeA"></div>
        <ul class="alert-com">
            <li class="alert-com-diff">
                <h2>>全部</h2>
                <label class="alert-all-dif">
                    <input v-model="condition.sellbuy" type="radio" value="1" name="sellbuy" class="key-word" checked="checked">
                    <span style="width:87%;">买卖</span>
                </label>
                <label class="alert-all-dif">
                    <span style="width:87%;">租赁</span>
                     <input v-model="condition.sellbuy" type="radio" value="2" name="sellbuy" class="key-word" placeholder="">
                </label>
            </li>
            <li class="alert-com-inf alert-com-show">
                <form action="" method="post">
                    <div class="clearfix">
                        <label for="">关键词：</label>
                        <input v-model="condition.keyword" type="text" value="" name="" class="key-word" placeholder="请输入想查找的关键信息" style="border: none;width: 75%;text-align: left;">
                    </div>
                    <div class="plat-comm clearfix">
                        <span>平台：</span>
                        <label>
                            <input type="radio" checked="checked" name="plat" value=""></input>
                            <i class="choice-sho choiced-show" @click="changeSex"></i>
                            <em class="choice-text">全部</em>
                        </label>
                        <label v-for="c in $store.state.Categroy" v-bind:key="c.id">
                            <input type="radio" v-model="condition.categroId" name="plat" :value="c.id"></input>
                            <i class="choice-sho" @click="changeSex"></i>
                            <em class="choice-text">{{c.name}}</em>
                        </label>
                    </div>
                    <div class="clearfix">
                        <label for="">价格范围：</label>
                        <input type="number" v-model="condition.minPrice" value="" name="" class="key-price" placeholder="0" >
                        <i>-</i>
                        <input type="number" v-model="condition.maxPrice" value="" name="" class="key-price2" placeholder="200000">
                    </div>
                    <div class="clearfix">
                        <label for="">等级：</label>
                        <input type="number" v-model="condition.minLevel" value="" name="" class="key-leve" placeholder="0">
                        <i>-</i>
                        <input type="number" v-model="condition.maxLevel" value="" name="" class="key-leve2" placeholder="999">
                    </div>
                    <div class="sex-com clearfix">
                        <span>性别：</span>
                        <label>
                            <input v-model="condition.sex" type="radio" checked="checked" name="sex" value=""></input>
                            <i class="choice-sho choiced-show" @click="changeSex"></i>
                            <em class="choice-text">不限</em>
                        </label>
                        <label>
                            <input v-model="condition.sex" type="radio" name="sex" value="1"></input>
                            <i class="choice-sho" @click="changeSex"></i>
                            <em class="choice-text">男</em>
                        </label>
                        <label>
                            <input v-model="condition.sex" type="radio" name="sex" value="2"></input>
                            <i class="choice-sho" @click="changeSex"></i>
                            <em class="choice-text">女</em>
                        </label>
                    </div>
                    <div class="bind-com clearfix">
                        <span>绑定情况：</span>
                        <label>
                            <input v-model="condition.bind" type="radio" checked="checked" name="bind" value="1"></input>
                            <i class="choice-sho choiced-show" @click="changeSex"></i>
                            <em class="choice-text">手机</em>
                        </label>
                        <label>
                            <input v-model="condition.bind" type="radio" name="bind" value="2"></input>
                            <i class="choice-sho" @click="changeSex"></i>
                            <em class="choice-text">邮箱</em>
                        </label>
                        <label>
                            <input v-model="condition.bind" type="radio" name="bind" value="3"></input>
                            <i class="choice-sho" @click="changeSex"></i>
                            <em class="choice-text">无绑定</em>
                        </label>
                    </div>
                    <div class="certification-com clearfix">
                        <span>身份认证：</span>
                        <label>
                            <input v-model="condition.identification" type="radio" checked="checked" name="bind" value="2"></input>
                            <i class="choice-sho choiced-show" @click="changeSex"></i>
                            <em class="choice-text">已认证</em>
                        </label>
                        <label>
                            <input v-model="condition.identification" type="radio" name="bind" value="1"></input>
                            <i class="choice-sho" @click="changeSex"></i>
                            <em class="choice-text">未认证</em>
                        </label>
                    </div>
                    <div class="com-sub">
                        <input type="reset" name="" value="重置" class="com-reset"></input>
                        <input type="button" name="" value="确定" class="com-submit" @click="submit"></input>
                    </div>
                </form>
            </li>
            <li class="alert-com-time">
                <h2>>默认排序
                    <em>（按时间倒序）</em>
                </h2>
                <div class="price-sort">
                    <label class="alert-all-dif">
                        价格↓
                        <input v-model="condition.priceSort" type="radio" value="1" name="price" class="key-word" checked="checked">
                        <span>（按价格从高到低）</span>
                    </label>
                    <label class="alert-all-dif">
                        价格↑
                        <span>（按价格从低到高）</span>
                         <input v-model="condition.priceSort" type="radio" value="2" name="price" class="key-word" placeholder="">
                    </label>
                </div>
            </li>
        </ul>
        <scroller :on-infinite="infinite" ref="scroller" style="margin-top:6rem;">
            <app-goods :goods="goods"></app-goods>
        </scroller>
    </div>
</template>
<style>

</style>
<script>

import Goods from '../templates/Goods.vue'
export default {
    name: 'detail',
    data() {
        return {
            goods: [],
            condition: {
                type: "",
                sellbuy:"",
                keyword: "",
                categroId: "",
                priceSort:"",
                minPrice: "",
                maxPrice: "",
                minLevel: "",
                maxLevel: "",
                sex: "",
                bind: "",
                identification: "",
                page: 0,
                size: 20
            }
        }
    },
    created() {
        this.submit();
    },
    methods: {
        change1: function () {
            $(".alert-com, .alert-com-outer").css("display", "block");
            $(".alert-com-diff").css("display", "block").siblings().css("display", "none");
        },
        change2: function () {
            $(".alert-com, .alert-com-outer").css("display", "block");
            $(".alert-com-inf").css("display", "block").siblings().css("display", "none");
        },
        change3: function () {
            $(".alert-com, .alert-com-outer").css("display", "block");
            $(".alert-com-time").css("display", "block").siblings().css("display", "none");
        },
        closeA: function () {
            $(".alert-com, .alert-com-outer").css("display", "none");
        },
        changeSex: function (e) {
            $(e.target).addClass('choiced-show').parent().siblings().find('i').removeClass('choiced-show');
        },
        submit() {
            //获取列表
            var that = this;
            setTimeout(function () {
                that.condition.page = 0;
                that.$refs.scroller.triggerPullToRefresh();
                that.goods = [];
                that.Http.get(that.Api.getGoodsList(), that.condition, function (result) {
                    that.goods = result.data.goods;
                    that.$refs.scroller.finishPullToRefresh();
                })
                that.closeA();
            }, 300);
        },
        refresh(done) {
            done();
        },
        infinite(done) {
            var that = this;
            that.condition.page += 1;
            this.Http.get(this.Api.getGoodsList(), this.condition, function (result) {
                if (result.data.goods.length > 0) {
                    for (var i = 0; i < result.data.goods.length; i++) {
                        that.goods.push(result.data.goods[i]);
                    }
                    done();
                } else {
                    that.$refs.scroller.finishInfinite(true);
                }
            })
        }
    },
    components: {
        'app-goods': Goods
    }
}
</script>