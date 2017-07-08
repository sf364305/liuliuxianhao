<template>
    <div class="home">
        <scroller :on-infinite="infinite" ref="scroller">
            <header class="index-logo" id="index-logo">
                <router-link to="/commodity/all" class="search-index" replace></router-link>
            </header>
            <div>
                <app-banner></app-banner>
            </div>
            <div class="announcement">
                <ul class="announ" id="announ">
                    <li v-for="notice in $store.state.Notices" v-bind:key="notice.id">
                        <span>{{notice.title}}</span>
                    </li>
                </ul>
            </div>
            <section class="new-content">
                <ul class="clearfix">
                    <li>
                        <router-link to="/commodity/0" class="index-sell-buy" replace>买卖账号</router-link>
                    </li>
                    <li>
                        <router-link to="/commodity/2" class="index-lease" replace>租赁账号</router-link>
                    </li>
                    <li>
                        <router-link to="/popularity" class="index-popularity" replace>提高人气</router-link>
                    </li>
                </ul>
            </section>
            <ul class="project clearfix">
                <li v-for="(c,index) in $store.state.Categroy" v-bind:key="c.id">
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
            <!-- 引入公用的尾部 footer组件 -->
            <app-footer></app-footer>
        </div>
        
    </div>
</template>
<script>
import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
//引入组件和图片
import Banner from '../templates/Banner.vue'
import Goods from '../templates/Goods.vue'
import Footer from '../templates/Footer.vue'
import a from '../assets/images/banner1.png'
import b from '../assets/images/banner2.png'
export default {
    name: 'home',
    data() {
        return {
            page: 0,
            size: 10,
            goods: []
        }
    },
    created() {
        // this.getToken();
        // this.getConfig();

        // this.getNotices();
        // this.getCategroy();
        this.getHomeGoodsList();
    },
    methods: {
        linkCom(ids) {
            var goodsId = this.$store.state.Categroy[ids].name;
            this.$router.push("/commodity/"+goodsId);
        },
        getHomeGoodsList() {
            var that = this;
            this.Http.get(this.Api.getHomeGoodsList(), {
                page: that.page,
                size: that.size
            }, function (result) {
                that.goods = result.data.goods;
                console.log(result.data.goods)
            })
        },
        refresh(done) {
            done();
        },
        infinite(done) {
            var self = this;
            done();
        }
    },
    components: {
        'app-banner': Banner,
        'app-goods': Goods,
        'app-footer': Footer
    }
}
</script>

<style>
.index-logo {
    position: relative;
    width: 100%;
    height: 5rem;
    background: url("../assets/images/logo_index.png") center center no-repeat;
    background-size: 28.4% auto;
}

.search-index {
    position: absolute;
    right: 6%;
    top: 0rem;
    width: 2.2rem;
    height: 5rem;
    background: url("../assets/images/search.png") center center no-repeat;
    background-size: 100% auto;
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