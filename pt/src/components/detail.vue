<template>
    <div class="detail">
        <app-header :header="title"></app-header>
        <div class="detail-inner clearfix">
            <p class="detail-pic-left">
                点
                <br/>击
                <br/>图
                <br/>片
                <br/>查
                <br/>看
                <br/>大
                <br/>图
            </p>
            <div class="detail-pic-center" img-data="0">
                <img :src="$store.state.Setting.qiniuUrl + goods.goodsImages[0].qiniuKey" alt="" @click="clickBig"/>
            </div>
            <div class="detail-pic-right">
                <div class="detail-right-inner">
                    <div v-for="imgs in goods.goodsImages" :key="imgs.id">
                        <img :src="$store.state.Setting.qiniuUrl + imgs.qiniuKey" alt="" />
                    </div>
                </div>
                <div class="pic-top" @click="moveT"></div>
                <div class="pic-bottom" @click="moveT2"></div>
            </div>
        </div>
        <div class="alert-big">
            <div class="big-show" id="icons">
                <img v-for="imgs in goods.goodsImages" :key="imgs.id" :src="$store.state.Setting.qiniuUrl + imgs.qiniuKey" @click="closeAlert"/>
            </div>
            <div class="pic-left-alert" @click="moveLeft"></div>
            <div class="pic-right-alert" @click="moveRight"></div>
        </div>
        <div class="over-detail" style="padding-bottom:5rem;">
            <div class="detail-inf clearfix">
                <div class="detail-in-left">
                    <span class="detail-in-name">
                        <img :src="$store.state.Setting.qiniuUrl + goods.category.img" alt="" />
                        <em>{{goods.name}}</em>
                    </span>
                    <span class="detail-in-price">￥{{goods.price}}</span>
                </div>
                <div class="detail-in-position">
                    <div class="sell-first1 clearfix">
                        <span>
                            <em>首次出售</em>
                        </span>
                        <em>商品属性：</em>
                    </div>
                    <div class="sell-credit clearfix">
                        <span v-for="n in goods.merchant.creditLevel" :key="n.id"></span>
                        <em>卖家信用：</em>
                    </div>
                    <div class="sell-deal clearfix">
                        <span>{{goods.merchant.successNum}}笔（成交率：{{goods.merchant.successRate}}%）</span>
                        <em>最近成交：</em>
                    </div>
                </div>
            </div>
            <div class="detail-information">
                <div class="detail-nav clearfix">
                    <span v-bind:class="{'detail-show':isDetail}" @click="detail(true)">商品信息</span>
                    <span v-bind:class="{'detail-show':!isDetail}" @click="detail(false)">交易说明</span>
                </div>
                <div class="detail-else">
                    <ul class="detail-content" v-if="isDetail">
                        <li>
                            <span>所属平台</span>
                            <em>{{goods.category.name}}</em>
                        </li>
                        <li>
                            <span>账户类型</span>
                            <em>
                                手机账号
                            </em>
                        </li>
                        <li>
                            <span>账号等级</span>
                            <em>
                                {{goods.grade}}级
                            </em>
                        </li>
                        <li>
                            <span>性别</span>
                            <em v-if="goods.sex == 0">
                                男
                            </em>
                            <em v-if="goods.sex == 2">
                                女
                            </em>
                        </li>
                        <li>
                            <span>绑定情况</span>
                            <em v-if="goods.bind == 1">
                                手机绑定
                            </em>
                            <em v-if="goods.bind == 2">
                                邮箱绑定
                            </em>
                            <em v-if="goods.bind == 3">
                                未绑定
                            </em>
                        </li>
                        <li>
                            <span>认证情况</span>
                            <em v-if="goods.identification == 1">
                                未认证
                            </em>
                            <em v-if="goods.identification == 2">
                                已认证
                            </em>
                        </li>
                        <li v-if="goods.type == 1">
                            <span>价格详情</span>
                            <em>
                                <span v-if="goods.goodsLeaseInfo.hourCost">{{goods.goodsLeaseInfo.hourCost}}元/时</span>
                                <span v-if="goods.goodsLeaseInfo.dayCost">{{goods.goodsLeaseInfo.dayCost}}元/日</span>
                                <span v-if="goods.goodsLeaseInfo.weekCost">{{goods.goodsLeaseInfo.weekCost}}元/周</span>
                                <span v-if="goods.goodsLeaseInfo.monthCost">{{goods.goodsLeaseInfo.monthCost}}元/月</span>
                            </em>
                        </li>
                        <li>
                            <span>描述</span>
                            <em>{{goods.detail}}</em>
                        </li>
                    </ul>
                    <ul class="descripe" v-if="!isDetail">
                        <li>
                            <h2>1.下单支付</h2>
                            <p>选择满意的账号下单并支付</p>
                        </li>
                        <li>
                            <h2>2.联系客服</h2>
                            <p>在个人中心-买家-待发货订单中联系客服，等候发货</p>
                        </li>
                        <li>
                            <h2>3.等待发货</h2>
                            <p>客服开始验号，截图给买家确认是否继续购买，客服进行换绑</p>
                        </li>
                        <li>
                            <h2>4.买家验收</h2>
                            <p>买家换绑成功后，登录账号进行验收及密码修改</p>
                        </li>
                        <li>
                            <h2>5.确认收货</h2>
                            <p>待买家确认收货，或者自动确认收货：48小时。</p>
                        </li>
                        <li>
                            <h2>6.卖家收款</h2>
                            <p>买家确认收货，交易完成，66闲号通过微信转账给卖家，货款直接到微信钱包。</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="detail-love">
                <h2>猜你喜欢</h2>
                <app-goods :goods="recommendGoods"></app-goods>
            </div>
        </div>
        <div class="detail-buy clearfix">
            <span v-bind:class="{'detail-collect':true,'collect-active':isCollection}" @click="setCollection()">
                {{collection}}
            </span>
            <div @click="buy()" class="detail-btn" replace>立即购买</div>
        </div>
    </div>
</template>
<script> 

import Header from '../templates/Header.vue'
import Goods from '../templates/Goods.vue'
export default {
    name: 'detail',
    data() {
        return {
            title: "商品详情",
            goodsId: "",
            goods: {
                sex: 0,
                goodsImages:[{'qiniuKey':'logo_index.png'}],
                category:{
                    img:"logo_index.png"
                },
                merchant: {
                    creditLevel:""
                },
                name:"加载中"
            },
            isCollection: false,
            collection: "收藏",//isCollection ? "已收藏" : "收藏",
            isDetail: true,
            recommendGoods: []
        }
    },
    created() {
        this.goodsId = this.$route.params.id;
        this.getGoodsInfo();

    },
    activated() {
    this.goodsId = this.$route.params.id;
        this.getGoodsInfo();
    },
    methods: {
        moveT: function () {
            var imgNu = $(".detail-pic-center").attr("img-data");
            show(true, imgNu)
            function show(bool, deNum) {
                var divH = $(".detail-right-inner div").height();
                var divL = $(".detail-right-inner div").length;
                if (bool) {
                    deNum++;
                    if (deNum > 0) {
                        deNum = 0;
                    }
                } else {
                    deNum--;
                    if (deNum <= -divL + 1) {
                        deNum = -divL + 1;
                    }
                }
                var imgS = $(".detail-right-inner div").eq(Math.abs(deNum)).children("img").attr("src");
                $(".detail-pic-center img").attr("src", imgS);
                $(".detail-pic-center").attr("img-data", deNum);
                var leg = deNum * divH;
                $(".detail-right-inner").animate({
                    "marginTop": leg
                }, 500)
            }
        },
        moveT2: function () {
            var imgNu = $(".detail-pic-center").attr("img-data");
            show(false, imgNu)
            function show(bool, deNum) {
                var divH = $(".detail-right-inner div").height();
                var divL = $(".detail-right-inner div").length;
                if (bool) {
                    deNum++;
                    if (deNum > 0) {
                        deNum = 0;
                    }
                } else {
                    deNum--;
                    if (deNum <= -divL + 1) {
                        deNum = -divL + 1;
                    }
                }
                console.log(deNum);
                var imgS = $(".detail-right-inner div").eq(Math.abs(deNum)).children("img").attr("src");
                console.log(imgS)
                $(".detail-pic-center img").attr("src", imgS);
                $(".detail-pic-center").attr("img-data", deNum);
                var leg = deNum * divH;
                $(".detail-right-inner").animate({
                    "marginTop": leg
                }, 500)
            }
        },
        moveLeft() {
            var divL = $(".detail-right-inner div").length;
            var imgD =  $(".alert-big").attr("img-data");
            moveA(imgD, true);
            function moveA(index, bool) {
                if(bool) {
                    index++;
                    if(index > 0) {
                        index = 0;
                    }
                } else {
                    index--;
                    if(index < -divL+1) {
                        index = -divL+1;
                    }
                }
                $(".alert-big").attr("img-data", index);
                console.log(Math.abs(index));
                $(".big-show img").eq(Math.abs(index)).fadeIn(400).siblings().fadeOut(400);
                $(".big-show-pointer span").eq(Math.abs(index)).addClass("show-pointer").siblings().removeClass("show-pointer");
            }
        },
        moveRight() {
            var divL = $(".detail-right-inner div").length;
            var imgD =  $(".alert-big").attr("img-data");
            
            moveA(imgD, false);
            function moveA(index, bool) {
                if(bool) {
                    index++;
                    if(index > 0) {
                        index = 0;
                    }
                } else {
                    index--;
                    if(index < -divL+1) {
                        index = -divL+1;
                    }
                }
                $(".alert-big").attr("img-data", index);
                console.log(Math.abs(index));
                $(".big-show img").eq(Math.abs(index)).fadeIn(400).siblings().fadeOut(400);
                $(".big-show-pointer span").eq(Math.abs(index)).addClass("show-pointer").siblings().removeClass("show-pointer");
            }
        },
        clickBig() {
            var divL = $(".detail-right-inner div").length;
            $(".alert-big").css("display", "block");
            if(divL == 1) {
                $(".pic-left-alert").css("display", "none");
                $(".pic-right-alert").css("display", "none");
                $(".big-show-pointer").css("display", "none");
            }
            $(".big-show-pointer span").eq(0).addClass("show-pointer");
            var index = $(".detail-pic-center").attr("img-data");
            console.log(index);
            $(".big-show img").eq(Math.abs(index)).css("display", "block").siblings().css("display", "none");
            $(".alert-big").attr("img-data", index);
        },
        closeAlert() {
            $(".alert-big").css("display", "none");
        },
        detail(i) {
            this.isDetail = i;
        },
        setCollection() {
            var that = this;
            that.isCollection = !that.isCollection;
            that.collection = that.isCollection ? "已收藏" : "收藏";
            this.Http.get(this.Api.collection(), {
                goodsId: that.goodsId
            }, function (result) {

            })
        },
        getGoodsInfo() {
            var that = this;
            this.Http.get(this.Api.getGoodsInfo(), {
                goodsId: that.goodsId
            }, function (result) {
                console.log(result);
                
                that.goods = result.data.goods;
                that.goods.sex = that.goods.goodsSaleInfo != null ? that.goods.goodsSaleInfo.sex : that.goods.goodsLeaseInfo.sex;
                that.goods.grade = that.goods.goodsSaleInfo != null ? that.goods.goodsSaleInfo.grade : that.goods.goodsLeaseInfo.grade;
                that.goods.bind = that.goods.goodsSaleInfo != null ? that.goods.goodsSaleInfo.bind : that.goods.goodsLeaseInfo.bind;
                that.goods.identification = that.goods.goodsSaleInfo != null ? that.goods.goodsSaleInfo.identification : that.goods.goodsLeaseInfo.identification;
                that.isCollection = result.data.isCollection;
                that.collection = that.isCollection ? "已收藏" : "收藏";
                that.recommendGoods = result.data.recomendGoodses;
            })
        },
        buy() {
            this.$store.commit('setGoods', this.goods);
            this.$router.push('/sure_order');
        }
    },
    components: {
        "app-header": Header,
        'app-goods': Goods,
    }
}
</script>