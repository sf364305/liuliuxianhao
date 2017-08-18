<template>
    <div class="home">
        <scroller :on-refresh="refresh" :on-infinite="infinite" ref="scroller" style="margin-bottom:4rem;" class="scrollTop">
            <header class="index-logo" id="index-logo">
                <div style="width:80%;height:3rem;border-radius:0;" class="com-search-head">
                    <input type="text" value="" name="" class="search-word" placeholder="请输入关键字66" v-model="searchText" v-on:keyup.13="searchAll">
                    <a class="search-index" replace @click="searchAll"></a>
                </div>
            </header>
            <div>
                <app-banner></app-banner>
            </div>
            <div class="announcement">
                <ul class="announ" id="announ">
                    <li v-for="notice in $store.state.Notices" v-bind:key="notice.id">
                        <span>{{notice.content}}</span>
                    </li>
                </ul>
            </div>
            <section class="new-content">
                <ul class="clearfix">
                    <li>
                        <router-link to="/commodity/_0" class="index-sell-buy" replace>买卖账号</router-link>
                    </li>
                    <li>
                        <router-link to="/commodity/_1" class="index-lease" replace>租赁账号</router-link>
                    </li>
                    <li>
                        <router-link to="/popularity" class="index-popularity" replace>提高人气</router-link>
                    </li>
                </ul>
            </section>
            <ul class="project clearfix">
                <li v-for="(c,index) in $store.state.Categroy" v-bind:key="c.id" v-if="c.isShow">
                    <a class="index-ying" replace @click="linkCom(index)">
                        <img :src="$store.state.Setting.qiniuUrl + c.img" alt="">{{c.name}}</a>
                </li>
            </ul>
    
            <div class="index-news">
                <h2>最新寄售信息</h2>
                <app-goods :goods="goods"></app-goods>
            </div>
        </scroller>
        <div class="nav-bottom">
            <app-footer></app-footer>
        </div>
    </div>
</template>
<script>
//引入组件和图片
import Banner from '../templates/Banner.vue'
import Goods from '../templates/Goods.vue'
import Footer from '../templates/Footer.vue'
export default {
    name: 'home',
    data() {
        return {
            page: 0,
            size: 40,
            goods: [],
            searchText: "",
            timer: null
        }
    },
    created() {
        // this.getToken();
        // this.getConfig();

        // this.getNotices();
        // this.getCategroy();
        this.page = 0;
        this.getHomeGoodsList();
        this.getJsConfig();
        this.getUserInfo();
    },
    activated() {
        this.searchText = "";
        this.$store.commit('setIsSearch', false);

        //page
        var page = this.$store.state.ReferencePage;
        if (page) {
            this.$store.commit('setReferencePage', null);
            this.$router.push(page);
        }
    },
    deactivated() {
        // this.$refs.scroller.finishInfinite(true);
    },
    methods: {
        linkCom(ids) {
            var goodsId = this.$store.state.Categroy[ids].id;
            this.$router.push("/commodity/" + goodsId);
        },
        searchAll() {
            var text = this.searchText;
            if (text == "") {
                this.$router.push("/commodity/all");
            } else {
                this.$router.push("/commodity/__" + text);
            }
        },
        getHomeGoodsList(done) {
            var that = this;
            this.Http.get(this.Api.getHomeGoodsList(), {
                page: that.page,
                size: that.size
            }, function (result) {
                if (done) done();
                if (result.data.goods.length > 0) {
                    for (var i = 0; i < result.data.goods.length; i++) {
                        if (!that.contains(result.data.goods[i])) {
                            that.goods.push(result.data.goods[i]);
                            //加入缓存
                            that.$store.commit("setGoodsCache", result.data.goods[i]);
                        }
                    }
                    that.$refs.scroller.finishInfinite(false);
                } else {
                    that.$refs.scroller.finishInfinite(true);
                }
            })
        },
        getUserInfo() {
            var self = this;
            this.Http.get(this.Api.getUserInfo(), null, function (result) {
                self.userInfo = result.data;
                self.$store.commit('setUser', self.userInfo.user);
            })
        },
        contains(g) {
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id == g.id) {
                    return true;
                }
            }
            return false;
        },
        refresh(done) {
            this.page = 0;
            this.goods = [];
            this.getHomeGoodsList(done);
        },
        infinite(done) {
            this.page += 1;
            this.getHomeGoodsList(done);
        },
        getJsConfig() {
            var self = this;
            var url = location.href.split('#')[0];
            this.Http.get(this.Api.getJsSign(), {
                url: url
            }, function (result) {
                // debugger;
                // self.Wx.config = result.data.config;
                // //注册微信
                // self.Wx.register();
                var config = result.data.config;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: config.appId, // 必填，公众号的唯一标识
                    timestamp: config.timestamp, // 必填，生成签名的时间戳
                    nonceStr: config.nonceStr, // 必填，生成签名的随机串
                    signature: config.signature,// 必填，签名，见附录1
                    jsApiList: ["chooseWXPay", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "chooseImage", "previewImage", "uploadImage", "downloadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        title: "六六闲号", // 分享标题
                        link: config.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://qiniu.66mkt.com/66.jpg', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: '六六闲号', // 分享标题
                        desc: '买卖直播账号，上66闲号', // 分享描述
                        link: config.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://qiniu.66mkt.com/66.jpg', // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQQ({
                        title: '六六闲号', // 分享标题
                        desc: '买卖直播账号，上66闲号', // 分享描述
                        link: config.link, // 分享链接
                        imgUrl: 'http://qiniu.66mkt.com/66.jpg', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    wx.onMenuShareQZone({
                        title: '六六闲号', // 分享标题
                        desc: '买卖直播账号，上66闲号', // 分享描述
                        link: config.link, // 分享链接
                        imgUrl: 'http://qiniu.66mkt.com/66.jpg', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                })
            })
        }
    },
    mounted() {
        var a = 0;
        var announ = document.getElementById('announ');
        var liEle = announ.getElementsByTagName('li');
        var h = liEle[0].offsetHeight;
        var n = liEle.length;
        this.timer = setInterval(function () {
            a++;
            if (a > n - 1) {
                a = 0;
            }
            var top = a * h;
            announ.style.marginTop = -top + "px"
        }, 2000)
    },
    deactivated() {
        clearInterval(this.timer);

    },
    components: {
        'app-banner': Banner,
        'app-goods': Goods,
        'app-footer': Footer,

    }
}
</script>

<style>
.index-logo {
    position: relative;
    width: 100%;
    height: 5rem;
}

.search-index {
    position: absolute;
    right: 5%;
    top: 0rem;
    width: 2.2rem;
    height: 3rem;
    background: url("../assets/images/search.png") center center no-repeat;
    background-size: 80% auto;
}

.announcement {
    overflow: hidden;
    width: 85%;
    height: 3rem;
    padding-left: 10%;
    color: #333;
    background: url("../assets/images/advert.png") 20px center no-repeat;
    background-size: 4% auto;
}

.announcement-alert {
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 100;
}

.announ-alert {
    overflow-x: hidden;
    width: 92%;
    height: 20rem;
    padding-top: 8rem;
    margin: 0 auto;
    color: #fff;
}

.announ-close {
    position: absolute;
    top: auto;
    left: 0;
    right: 0;
    bottom: 5rem;
    margin: auto;
    width: 2rem;
    height: 2rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 1px solid #dcdcdc;
    color: #fff;
    line-height: 2rem;
    text-align: center;
}

.announ-alert li {
    margin: 0.5rem 0;
}

.announ li {
    overflow: hidden;
    height: 3rem;
    padding-left: 2%;
    background-color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 3rem;
}

.new-content {
    padding: 0.63rem;
    background: #e9e9e9;
}

.new-content ul li {
    float: left;
    width: 33%;
    height: 3rem;
    border-right: 1px solid #999;
    line-height: 3rem;
}

.new-content ul li:last-child {
    border-right: none;
}

.new-content ul li a {
    display: block;
    padding-left: 45%;
    font-size: 1.08rem;
}

.index-sell-buy {
    background: url("../assets/images/sell_buy.png") 15% 0 no-repeat;
    background-size: 31% auto;
}

.index-lease {
    background: url("../assets/images/lease.png") 15% 0 no-repeat;
    background-size: 31% auto;
}

.new-content .index-popularity {
    background: url("../assets/images/papulity.png") 15% 0 no-repeat;
    background-size: 31% auto;
}
</style>