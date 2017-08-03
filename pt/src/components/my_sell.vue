<template>
    <div class="my-sell">
        <header class="commodity-head">
            我要卖
        </header>
        <form action="" method="" name="" class="sell-form">
            <div class="sell-diff">1.选择类型</div>
            <div class="sell-content clearfix">
                <label @click="changeSell">
                    <i class="choice-sho-sell" v-bind:class="{'choiced-show-sell':isSell}"></i>
                    <em class="choice-text-sell">出售</em>
                </label>
                <label @click="changeSell">
                    <i class="choice-sho-sell" v-bind:class="{'choiced-show-sell':!isSell}"></i>
                    <em class="choice-text-sell">出租</em>
                </label>
            </div>
            <div class="sell-diff">2.选择平台</div>
            <div class="sell-platform clearfix">
                <label v-for="c in $store.state.Categroy" :key="c.id" @click="changePlat(c.id)">
                    <!--<input type="radio" checked="checked" name="sell" value="1"/>-->
                    <img :src="$store.state.Setting.qiniuUrl + c.img" class="choice-sho-platform choiced-ying-platform" v-bind:class="{'plat-show':(categroyId == c.id)}">
                    </img>
                    <em class="choice-text-platform">{{c.name}}</em>
                </label>
            </div>
            <div class="sell-next-in">
                <a @click="nextStep" class="sell-in-next">下一步</a>
            </div>
        </form>
        <div class="nav-bottom">
            <!-- 引入公用的尾部 footer组件 -->
            <app-footer></app-footer>
        </div>
    </div>
</template>
<style>
.intro {
    font-size: 20px;
    color: #000;
    margin: 20px auto;
}
</style>
<script>
import Footer from '../templates/Footer.vue'
export default {
    data() {
        return {
            isSell: true,
            categroyId: ""
        }
    },
    created() {
        this.categroyId = this.$store.state.Categroy[0].id;
    },

    methods: {
        changeSell() {
            this.isSell = !this.isSell;
        },
        changePlat(id) {
            this.categroyId = id;
        },
        nextStep() {
            //检验是否实名认证
            if(this.$store.state.User.userStatus == 0
            ||this.$store.state.User.userStatus == 3){
                this.$router.push("/certification");
                return;
            }
            if (this.isSell) {
                this.$router.push("/sell_infomation/"+this.categroyId);
            } else {
                this.$router.push("/lease_information/"+this.categroyId);
            }
        }
    },
    components: {
        'app-footer': Footer
    }
}
</script>
