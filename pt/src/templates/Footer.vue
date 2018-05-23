<template>
    <div class="footer" style="z-index:999;">
        <div class="footer-wrapper">
            <ul class="nav">
                <li>
                    <router-link to="/home" v-bind:class="{ 'index-home':!isHome,'index-home-active': isHome }" replace>首页</router-link>
                </li>
                <li>
                    <router-link to="/person" v-bind:class="{ 'index-person':!isPerson,'index-person-active': isPerson }" replace>个人中心</router-link>
                </li>
                <li>
                    <router-link to="/my_sell" v-bind:class="{ 'index-sell':!isSale ,'index-sell-active': isSale}" replace>我要卖</router-link>
                </li>
                <!-- <li>
                    <router-link to="/server" v-bind:class="{ 'index-server':!isServer,'index-server-active': isServer }" replace>联系客服</router-link>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'footer',
    data() {
        return {
            normal:true,
            isHome:false,
            isPerson:false,
            isSale:false,
            isServer:false
        }
    },
    created(){
        this.setCurrTab();
    },
    methods: {
        setCurrTab(){
            this.$store.commit('clearFrom');
            var url = window.location.href;
            if(url.endsWith('home')){
                this.isHome = true;
            }else if(url.endsWith('person')){
                this.isPerson = true;
            }else if(url.endsWith('my_sell')){
                this.isSale = true;
            }else if(url.endsWith('server')){
                this.isServer = true;
            }
        }
    }
}
</script>

<style>
.nav {
    overflow: hidden;
    width: 100%;
    border-top: 1px solid #dcdcdc;
    background: #fff;
}

.nav li {
    float: left;
    width: 33.3333%;
    height: 4.5rem;
    line-height: 4.5rem;
    overflow: hidden;
}

.nav li:last-child {
    margin-right: 0;
}

.nav a {
    display: inline-block;
    width: 100%;
    padding-top: 1.2rem;
    text-align: center;
    font-size: 0.95rem;
}

</style>