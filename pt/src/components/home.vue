<template>
    <div class="home">
        <header class="index-logo" id="index-logo">
            <router-link to="/commodity" class="search-index" replace></router-link>
            {{msg}}
        </header>
        <div>
           <app-banner :listImg="listImg"></app-banner>
        </div>
        <div class="announcement">
            <ul class="announ" id="announ">
                <li v-for="notice in notices" v-bind:key="notice.id">
                    <span :="notice.id">{{notice.title}}</span>
                </li>
            </ul>
        </div>
        <section class="new-content">
            <ul class="clearfix">
               <li><router-link to="/my_sell" class="index-sell-buy" replace>买卖账号</router-link></li>
               <li><router-link to="/lease" class="index-lease" replace>租赁账号</router-link></li>
               <li><router-link to="/popularity" class="index-popularity" replace>提高人气</router-link></li>
            </ul>
        </section>
        <ul class="project clearfix">
           <li><router-link to="/commodity" class="index-ying" replace><img src="../assets/images/ying.png" alt="">映客账号</router-link></li>
           <li><router-link to="/commodity" class="index-hua" replace><img src="../assets/images/hua.png" alt="">花椒账号</router-link></li>
           <li><router-link to="/commodity" class="index-mo" replace><img src="../assets/images/mo.png" alt="">陌陌账号</router-link></li>
           <li><router-link to="/commodity" class="index-hand" replace><img src="../assets/images/hand.png" alt="">快手账号</router-link></li>
           <li><router-link to="/commodity" class="index-else" replace><img src="../assets/images/esle.png" alt="">其它账号</router-link></li>
        </ul>
        <div class="index-news">
            <h2>最新寄售信息</h2>
            <ul class="com-list">
                <li>     
                    <router-link to="/detail" class="game-name" replace>
                        <span class="name-title clearfix">
                            <img src="../assets/images/little2.png" alt="">
                            <em>【55级男神】求围观</em>
                        </span>
                        <span class="sever">
                            <em class="com-game">绑定情况：</em>
                            <i class="game-sever">手机绑定</i>
                        </span>
                        <span class="price">￥2000</span>
                        <div class="sell-credit clearfix">
                            <em>卖家信用：</em>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="sell-inf clearfix">
                            <em>最近成交：</em>
                            <span>暂无</span>
                        </div>
                    </router-link>
                    <div class="sell-status1"></div>
                </li>
                <li>     
                    <router-link to="/detail" class="game-lease" replace>
                        <span class="name-title clearfix">
                            <img src="../assets/images/little1.png" alt="">
                            <em>【55级男神】求围观</em>
                        </span>
                        <span class="sever">
                            <em class="com-game">绑定情况：</em>
                            <i class="game-sever">手机绑定</i>
                        </span>
                        <span class="price">￥2000</span>
                        <div class="lease-credit clearfix">
                            <em>租赁等级：</em>
                            <span>22级</span>
                        </div>
                        <div class="lease-inf clearfix">
                            <em>租赁天数：</em>
                            <span>33</span>
                        </div>
                    </router-link>
                    <div class="sell-status"></div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
    .index-logo{
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

<script>
     import Vue from 'vue'
     //引入组件和图片
     import Banner from '../templates/Banner.vue'
     import a from '../assets/images/banner1.png'
     import b from '../assets/images/banner2.png'
     var vm = new Vue({
        beforeCreate(){

        },
        created(){
            alert(6)
            var that = this;
            this.Http.get(this.Api.getToken(),null,function(result){
                alert(55)
                // console.log(result);
                that.Http.setToken(result.data.token);
                // debugger;
                that.Http.get(that.Api.getQiniuToken(),null,function(_result){
                    // console.log(_result);
                });
            });

            //获取公告
            this.Http.get(this.Api.getNotices(),null,function(result){
                console.log(999);
                // debugger;
                // that.$set('notices',result.data.notices);
                that.notices = (result.data.notices);
                //that.$set(that.notices,result.data.notices,true) ;
                that.msg = '77777';
                // that.$set('msg','sdfsf');
            })
        }
    })
     export default {
        name: 'home',
        data() {
            return {
                listImg: [{
                    url: a
                }, {
                    url: b
                }],
                msg: '',
                notices: ''
            }
        },
        components: {
            'app-banner': Banner
        }
    }
</script>