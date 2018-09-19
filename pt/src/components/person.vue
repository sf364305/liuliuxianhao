<template>
    <div class="person">
        <scroller :on-refresh="refresh" refreshText="刷新" ref="scroller">
            <div class="person-infor">
                <dl>
                    <dt>
                        <img :src="userInfo.user.avatar" alt="">
                    </dt>
                    <dd>{{userInfo.user.name}}</dd>
                </dl>
                <span class="my-mon">￥{{userInfo.user.commission}}</span>
            </div>
            <div class="person-dif clearfix">
                <span class="person-buyer" @click="showStatus" v-bind:class="{ 'buy-show': isSho }">买家管理</span>
                <span class="person-seller" @click="showStatus" v-bind:class="{ 'buy-show': !isSho }">卖家管理</span>
            </div>
            <ul class="person-dif-con">
                <li class="person-buyer-con clearfix" v-bind:class="{ 'person-con-show': isAct }">
                    <a @click="orderList(1)" class="person-unpaid" replace>未支付
                        <i v-if="userInfo.waitPayCount > 0">{{userInfo.waitPayCount}}</i>
                    </a>
                    <a @click="orderList(2)" class="person-send" replace>待发货
                        <i v-if="userInfo.waitDeliveryCount > 0">{{userInfo.waitDeliveryCount}}</i>
                    </a>
                    <a @click="orderList(3)" class="person-sure" replace>待确认
                        <i v-if="userInfo.waitSureCount > 0">{{userInfo.waitSureCount}}</i>
                    </a>
                    <a @click="orderList(-1)" class="person-arbitration" replace>仲裁中
                        <i v-if="userInfo.arbitrationCount > 0">{{userInfo.arbitrationCount}}</i>
                    </a>
                    <a @click="orderListCollect(6)" class="person-collect" replace>收藏
                        <i v-if="userInfo.collectionCount > 0">{{userInfo.collectionCount}}</i>
                    </a>
                    <router-link to="/all_order" class="person-all" replace>全部订单</router-link>
                </li>
                <li class="person-seller-con clearfix" v-bind:class="{ 'person-con-show': !isAct }">
                    <a @click="goodsList(1)" class="person-shelves" replace>已上架
                        <i v-if="userInfo.upShelvesCount > 0">{{userInfo.upShelvesCount}}</i>
                    </a>
                    <a @click="goodsList(0)" class="person-shelf" replace>已下架
                        <i v-if="userInfo.downShelvesCount > 0">{{userInfo.downShelvesCount}}</i>
                    </a>
                    <a @click="goodsList(2)" class="person-review" replace>审核中
                        <i v-if="userInfo.approveCount > 0">{{userInfo.approveCount}}</i>
                    </a>
                    <a @click="goodsList(3)" class="person-defeat" replace>审核失败
                        <i v-if="userInfo.rejectApproveCount > 0">{{userInfo.rejectApproveCount}}</i>
                    </a>
                    <a @click="merchantOrderList(3)" class="person-sended" replace>已发货
                        <i v-if="userInfo.deliveryCount > 0">{{userInfo.deliveryCount}}</i>
                    </a>
                    <a @click="merchantOrderList(2)" class="person-transaction" replace>待发货
                        <i v-if="userInfo.sellerWaitDeliveryCount > 0">{{userInfo.sellerWaitDeliveryCount}}</i>
                    </a>
                    <a @click="merchantOrderList(4)" class="person-seccess" replace>交易成功
                        <i v-if="userInfo.successCount > 0">{{userInfo.successCount}}</i>
                    </a>
                    <router-link to="/all_order_seller" class="person-all" replace>全部订单</router-link>
                </li>
            </ul>
            <div class="person-income-con clearfix">
                <!-- <router-link to="/my_code" class="person-code" replace>我的二维码
                    <span></span>
                </router-link>
                <router-link to="/my_promotion" class="person-promotion" replace>我的推广
                    <span></span>
                </router-link>
                <router-link to="/income_con" class="person-income" replace>收益详情
                    <span></span>
                </router-link> -->
                <router-link v-if="!userInfo.user.userStatus || userInfo.user.userStatus == 0" to="/certification" class="person-cer" replace>实名认证
                    <em>未认证</em>
                    <span></span>
                </router-link>
                <a v-if="userInfo.user.userStatus == 1" class="person-cer" replace>实名认证
                    <em>等待审核</em>
                </a>
                <a v-if="userInfo.user.userStatus == 2" class="person-cer" replace>实名认证
                    <em>审核通过</em>
                </a>
                <router-link v-if="userInfo.user.userStatus == 3" to="/certification" class="person-cer" replace>实名认证
                    <em>审核不通过</em>
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
            },
            isSho:true,
            isAct: true
        }
    },
    created() {
        this.getUserInfo();
    },
    activated() {
        this.getUserInfo();
    },
    methods: {
        showStatus() {
            if(this.isSho||this.isAct) {
                this.isSho = false;
                this.isAct = false;
            } else {
                this.isSho = true;
                this.isAct = true;
            }
        },
        getUserInfo() {
            var self = this;
            this.Http.get(this.Api.getUserInfo(), null, function (result) {
                self.userInfo = result.data;
                self.$store.commit('setUser',self.userInfo.user);
            })
        },
        refresh(done) {
            this.getUserInfo();
            setTimeout(function () {
                done();
            }, 1000);
        },
        orderList(status) {
            this.$router.push('/orders/' + status);
        },
        merchantOrderList(status) {
            this.$router.push('/orders_merchant/' + status);
        },
        goodsList(status){
            this.$router.push('/goods_list_merchant/'+status);
        },
        orderListCollect(status) {
            this.$router.push('/goods_item_collect/'+status);
        }
    },
    components: {
        'app-footer': Footer
    }
}
</script>
