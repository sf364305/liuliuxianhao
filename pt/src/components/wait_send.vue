<template>
    <div class="wait-send">
        <header class="commodity-head">
            待发货
            <span class="return-back" @click="ruturnBack"></span>
        </header>
        <ul class="com-list">
            <li>     
                <router-link to="/detail" class="game-name" replace>
                    <span class="name-title clearfix">
                        <img src="../assets/images/little2.png" alt="">
                        <em>【55级男神】求围观</em>
                    </span>
                    <span class="sever">
                        <em class="com-game">所属卖家：</em>
                        <i class="game-sever">帅到没朋友</i>
                    </span>
                    <span class="price">￥2000</span>
                    <div class="sell-inf clearfix">
                        <em>生成时间：</em>
                        <span>2017-07-06-22:00</span>
                    </div>
                </router-link>
                <div class="sell-status1"></div>
                <div class="wait-you">
                    <span class="wait-cancel">取消</span>
                    <span class="wait-sure">确定</span>
                </div>
            </li>
            <li>     
                <router-link to="/detail" class="game-lease" replace>
                    <span class="name-title clearfix">
                        <img src="../assets/images/little1.png" alt="">
                        <em>【55级男神】求围观</em>
                    </span>
                    <span class="sever">
                        <em class="com-game">出租类型：</em>
                        <i class="game-sever">月租</i>
                    </span>
                    <span class="price">￥2000</span>
                    <div class="lease-credit clearfix">
                        <em>开始时间：</em>
                        <span>2017-07-06-22:00</span>
                    </div>
                    <div class="lease-inf clearfix">
                        <em>结束时间：</em>
                        <span>2017-07-06-22:00</span>
                    </div>
                </router-link>
                <div class="sell-status"></div>
                <div class="wait-you">
                    <span class="wait-cancel">取消</span>
                    <span class="wait-sure">确定</span>
                </div>
            </li>
            <li>     
                <router-link to="/detail" class="game-lease" replace>
                    <span class="name-title clearfix">
                        <img src="../assets/images/little1.png" alt="">
                        <em>【55级男神】求围观</em>
                    </span>
                    <span class="sever">
                        <em class="com-game">平台：</em>
                        <i class="game-sever">映客</i>
                    </span>
                    <span class="price">￥2000</span>
                    <div class="lease-credit clearfix">
                        <em>人气：</em>
                        <span>1000</span>
                    </div>
                    <div class="lease-inf clearfix">
                        <em>服务时间：</em>
                        <span>2017-07-06-22:00至2017-07-06-22:00</span>
                    </div>
                </router-link>
                <div class="sell-status"></div>
                <div class="wait-you">
                    <span class="wait-cancel">取消</span>
                    <span class="wait-sure">确定</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'popularity-buy',
        data() {
            return {
                
            }
        },
        methods: {
            ruturnBack: function() {
                this.$router.go(-1);
            }   
        }
    }
</script>