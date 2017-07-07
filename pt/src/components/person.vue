<template>
    <div class="person">
        <scroller :on-refresh="refresh" refreshText="刷新" ref="scroller">
            <div class="person-infor">
                <dl>
                    <dt>
                        <img :src="userInfo.user.avatar" alt="">
                    </dt>
                    <dd>{{userInfo.user.realName}}</dd>
                </dl>
                <span class="my-mon">￥{{userInfo.user.commission}}</span>
            </div>
            <div class="person-dif clearfix">
                <span class="person-buyer buy-show" @click="showStatus">买家管理</span>
                <span class="person-seller" @click="showSta">卖家管理</span>
            </div>
            <ul class="person-dif-con">
                <li class="person-buyer-con person-con-show clearfix">
                    <router-link to="/unpaid" class="person-unpaid" replace>未支付
                        <i v-if="userInfo.waitPayCount > 0">{{userInfo.waitPayCount}}</i>
                    </router-link>
                    <router-link to="/wait_send" class="person-send" replace>待发货
                        <i v-if="userInfo.waitPayCount > 0">{{userInfo.waitPayCount}}</i>
                    </router-link>
                    <router-link to="/wait_sure" class="person-sure" replace>待确认
                        <i v-if="userInfo.waitSureCount > 0">{{userInfo.waitSureCount}}</i>
                    </router-link>
                    <router-link to="/arbitration" class="person-arbitration" replace>仲裁中
                        <i v-if="userInfo.arbitrationCount > 0">{{userInfo.arbitrationCount}}</i>
                    </router-link>
                    <router-link to="/arbitration" class="person-collect" replace>收藏
                        <i v-if="userInfo.arbitrationCount > 0">{{userInfo.arbitrationCount}}</i>
                    </router-link>
                    <router-link to="/all_order" class="person-all" replace>全部订单</router-link>
                </li>
                <li class="person-seller-con clearfix">
                    <router-link to="/unpaid" class="person-sended" replace>已发货
                        <i v-if="userInfo.deliveryCount > 0">{{userInfo.deliveryCount}}</i>
                    </router-link>
                    <router-link to="/wait_send" class="person-transaction" replace>交易中
                        <i v-if="userInfo.transactionCount > 0">{{userInfo.transactionCount}}</i>
                    </router-link>
                    <router-link to="/wait_sure" class="person-shelves" replace>已上架
                        <i v-if="userInfo.upShelvesCount > 0">{{userInfo.upShelvesCount}}</i>
                    </router-link>
                    <router-link to="/arbitration" class="person-review" replace>审核中
                        <i v-if="userInfo.approveCount > 0">{{userInfo.approveCount}}</i>
                    </router-link>
                    <router-link to="/arbitration" class="person-seccess" replace>交易成功
                        <i v-if="userInfo.successCount > 0">{{userInfo.successCount}}</i>
                    </router-link>
                    <router-link to="/arbitration" class="person-defeat" replace>交易失败
                        <i v-if="userInfo.failCount > 0">{{userInfo.failCount}}</i>
                    </router-link>
                    <router-link to="/all_order_seller" class="person-all" replace>全部订单</router-link>
                </li>
            </ul>
            <div class="person-income-con clearfix">
                <router-link to="/my_code" class="person-code" replace>我的二维码
                    <span></span>
                </router-link>
                <router-link to="/my_promotion" class="person-promotion" replace>我的推广
                    <span></span>
                </router-link>
                <router-link to="/income_con" class="person-income" replace>收益详情
                    <span></span>
                </router-link>
                <router-link to="/certification" class="person-cer" replace>实名认证
                    <em>未认证</em>
                    <span></span>
                </router-link>
            </div>
        </scroller>
        <div class="nav-bottom">
            <!-- 引入公用的尾部 footer组件 -->
            <app-footer></app-footer>
        </div>
    </div>
</template>
<style>

</style>
<script>
import Footer from '../templates/Footer.vue'
export default {
    name: 'perosn',
    data() {
        return {
            userInfo: {
                user: {}
            }
        }
    },
    mounted() {
        // this.userInfo.user = this.$store.state.Uesr;
        console.log(this.$store.state.Uesr);
        console.log(this.userInfo.user.avatar);
        this.getUserInfo();
    },
    methods: {
        showSta() {
            $(".person-seller").addClass('buy-show');
            $(".person-buyer").removeClass('buy-show');
            $(".person-seller-con").addClass('person-con-show');
            $(".person-buyer-con").removeClass('person-con-show');
        },
        showStatus() {
            $(".person-buyer").addClass('buy-show');
            $(".person-seller").removeClass('buy-show');
            $(".person-buyer-con").addClass('person-con-show');
            $(".person-seller-con").removeClass('person-con-show');
        },
        getUserInfo() {
            var self = this;
            this.Http.get(this.Api.getUserInfo(), null, function (result) {
                self.userInfo = result.data;
            })
        },
        refresh(done){
            this.getUserInfo();
            setTimeout(function(){
                done();
            },1000);
        }
    },
    components: {
        'app-footer': Footer
    }
}
</script>