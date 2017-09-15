<template>
    <div class="detail">
        <app-header :header="title"></app-header>
        <div class="swiper-container alert-big" v-bind:class="{ 'alert-show': isAlert }" style="position:fixed;z-index:1000;" id="alertBig">
            <div class="swiper-wrapper alert-trans" id="alertTrans">
                <div class="big-show swiper-slide" id="icons" v-for="imgs in goods.goodsImages" :key="imgs.id">
                    <img :src="$store.state.Setting.qiniuUrl + imgs.qiniuKey" @click="closeAlert" />
                </div>
            </div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
        <scroller  ref="scroller" style="">
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
                <div class="detail-pic-center" img-data="0" id="detailCenter">
                    <img :src="$store.state.Setting.qiniuUrl + goods.goodsImages[0].qiniuKey" alt="" @click="clickBig" />
                </div>
                <div class="detail-pic-right">
                    <div class="detail-right-inner" id="detailInner">
                        <div v-for="imgs in goods.goodsImages" :key="imgs.id">
                            <img :src="$store.state.Setting.qiniuUrl + imgs.qiniuKey" alt="" />
                        </div>
                    </div>
                    <div class="pic-top" @click="moveT"></div>
                    <div class="pic-bottom" @click="moveT2"></div>
                </div>
            </div>
            <div class="over-detail" v-bind:class="{ 'over-show': isOver }" style="padding-bottom:5rem;" id="overDetail">
                <div class="detail-inf clearfix">
                    <div class="detail-in-left">
                        <span class="detail-in-name">
                            <img :src="$store.state.Setting.qiniuUrl + goods.category.img" alt="" />
                            <em>{{goods.name}}</em>
                        </span>
                        <span v-if="goods.type == 1" class="detail-in-price">
                            <em v-if="goods.goodsLeaseInfo.dayCost">￥{{goods.goodsLeaseInfo.dayCost}}元/日</em>
                            <em v-if="goods.goodsLeaseInfo.weekCost">￥{{goods.goodsLeaseInfo.weekCost}}元/周</em>
                            <em v-if="goods.goodsLeaseInfo.monthCost">￥{{goods.goodsLeaseInfo.monthCost}}元/月</em>
                        </span>
                        <span v-else class="detail-in-price">￥{{goods.price}}</span>
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
                            <span>成交率：100%</span>
                            <!-- <span>{{goods.merchant.successNum}}笔（成交率：{{goods.merchant.successRate}}%）</span> -->
                            <!-- <em>最近成交：</em> -->
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
                                <em v-if="goods.sex == 1">
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
                    <h2 class="posN">猜你喜欢</h2>
                    <app-goods :goods="recommendGoods"></app-goods>
                </div>
            </div>
        </scroller>
        <div class="detail-buy clearfix">
            <span v-bind:class="{'detail-collect':true,'collect-active':isCollection}" @click="setCollection()">
                {{collection}}
            </span>
            <div @click="buy()" class="detail-btn" replace>立即购买</div>
        </div>
    </div>
</template>
<script> 
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import Header from '../templates/Header.vue'

export default {
    name: 'detail',
    data() {
        return {
            title: "商品详情",
            goodsId: "",
            goods: {
                sex: 0,
                goodsImages: [{ 'qiniuKey': 'logo_index.png' }],
                category: {
                    img: "logo_index.png"
                },
                merchant: {
                    creditLevel: ""
                },
                name: "加载中"
            },
            isCollection: false,
            isOver: false,
            isAlert: false,
            collection: "收藏",//isCollection ? "已收藏" : "收藏",
            isDetail: true,
            recommendGoods: []
        }
    },
    activated() {
        //搜索条件禁止回填
        this.$store.commit('setIsSearch', true);
        //重置goods
        this.goods = {
            sex: 0,
            goodsImages: [{ 'qiniuKey': 'logo_index.png' }],
            category: {
                img: "logo_index.png"
            },
            merchant: {
                creditLevel: ""
            },
            name: "加载中"
        }
        this.isShow = true;
        this.goodsId = this.$route.params.id;

        // this.goods = this.$store.state.Goods;

        // if (!this.$store.state.GoodsCache[this.goodsId]) {
            this.getGoodsInfor();
        // } else {
            // this.goods = this.$store.state.GoodsCache[this.goodsId];
            // console.log("读取缓存商品", this.goods);
        // }
        this.$store.commit('setGoods',null);
        this.getRecomend();
        this.getCollection();
        this.isOver = false;
        this.isAlert = false;
        var alertTrans = document.getElementById('alertTrans');
        var detailCenter = document.getElementById('detailCenter');
        var detailInner = document.getElementById('detailInner');
        setTimeout(function() {
            detailCenter.setAttribute("img-data",0);
            detailInner.style.marginTop = 0 + "px";
            alertTrans.style.transform = "translateX(0)";
        },500);
        this.$store.commit('setGoods', null);
        this.getRecomend();
        this.getCollection();
        setTimeout(function () {
            $(".detail-pic-center").attr("img-data", 0);
            $(".detail-right-inner").css({
                "marginTop": 0
            })
        }, 500)

    },
    methods: {
        moveT: function () {
            var detailInner = document.getElementById('detailInner'),
             divEle = detailInner.getElementsByTagName('div'),
             detailCenter = document.getElementById('detailCenter'),
             divImg = detailInner.getElementsByTagName('img'),
             cenImg = detailCenter.getElementsByTagName('img'),
             imgNu = detailCenter.getAttribute("img-data");
            show(true, imgNu)
            function show(bool, deNum) {
                var divH = divEle[0].offsetHeight;
                var divL = divEle.length;
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
                var imgS = divImg[Math.abs(deNum)].getAttribute("src");
                cenImg[0].setAttribute("src", imgS);
                detailCenter.setAttribute("img-data", deNum);
                var leg = deNum * divH; 
                detailInner.style.marginTop = leg+'px';
            }
        },
        moveT2: function () {
            var detailInner = document.getElementById('detailInner'),
             divEle = detailInner.getElementsByTagName('div'),
             detailCenter = document.getElementById('detailCenter'),
             divImg = detailInner.getElementsByTagName('img'),
             cenImg = detailCenter.getElementsByTagName('img'),
             imgNu = detailCenter.getAttribute("img-data");
            show(false, imgNu)
            function show(bool, deNum) {
                var divH = divEle[0].offsetHeight;
                var divL = divEle.length;
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
                var imgS = divImg[Math.abs(deNum)].getAttribute("src");     
                cenImg[0].setAttribute("src", imgS);
                detailCenter.setAttribute("img-data", deNum);
                var leg = deNum * divH;
                detailInner.style.marginTop = leg+ "px";
            }
        },
        clickBig() {

            var alertTrans = document.getElementById('alertTrans');
            var detailCenter = document.getElementById('detailCenter');
            document.getElementById('alertBig').style.display="block";
            document.getElementById('overDetail').style.display="none";
            var a = Math.abs($(".detail-pic-center").attr("img-data"));
            var swiper = new Swiper('.swiper-container', {
                // 如果需要前进后退按钮
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                onlyExternal: true,
            });
            if(a==0) {
                alertTrans.style.transform = "translateX(0)";
            } else {
                swiper.slideTo(a, 0, false);
            }
        },
        closeAlert() {
            document.getElementById('alertBig').style.display="none";
            document.getElementById('overDetail').style.display="block";
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
        getGoodsInfor() {
            var that = this;
            this.Http.get(this.Api.getGoodsInfor(), {
                goodsId: that.goodsId
            }, function (result) {
                console.log(result,+"6588")
                that.goods = result.data.goods;
                that.Wx.register(window.location.href.split("#")[1],that.goods);
            })
        },
        getRecomend() {
            var that = this;
            this.Http.get(this.Api.getRecomend(), {
                goodsId: that.goodsId
            }, function (result) {
                that.recommendGoods = result.data.recomendGoodses;
                that.recommendGoods.forEach(function (element) {
                    //加入缓存
                    that.$store.commit("setGoodsCache", element);
                }, that);

            })
        },
        getCollection() {
            var that = this;
            this.Http.get(this.Api.getCollection(), {
                goodsId: that.goodsId,
                userId: that.userId
            }, function (result) {
                that.isCollection = result.data.isCollect;
                that.collection = result.data.isCollect ? "已收藏" : "收藏";
            })
        },
        buy() {
            var self = this;
            if (this.$store.state.User.userStatus == 0
                || this.$store.state.User.userStatus == 3) {
                this.$iosConfirm("发布商品需要实名认证，现在去实名?").then(function () {
                    self.$router.push("/certification");
                }, function () {
                    console.log('取消');
                });
            }else{
                this.$store.commit('setGoods', this.goods);
                this.$router.push('/sure_order');
            }
        },
        deactivated() {
            // this.$destroy();
        }

    },
    watch: {
        '$route'(to, from) {
            if (to.fullPath.indexOf("detail") > 0) {
                this.goodsId = this.$route.params.id;

                // if (!this.$store.state.GoodsCache[this.goodsId]) {
                    this.getGoodsInfor();
                // } else {
                    // this.goods = this.$store.state.GoodsCache[this.goodsId];
                    // console.log("读取缓存商品", this.goods);
                // }
                var self = this;
                var t = setTimeout(function () {
                    self.$refs.scroller.scrollTo(0, 0, false);
                    clearTimeout(t);
                }, 300);
            }
        }
    },
    components: {
        "app-header": Header,
        'app-goods': function (resolve) {
                //异步组件写法
                require(['../templates/Goods.vue'], resolve)
        },
    }
}
</script>