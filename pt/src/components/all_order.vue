<template>
    <div class="all-order">
        <app-header :header="title"></app-header>
        <div class="all-order-list">
            <a @click="orderList(1)" class="person-unpaid-all" replace>未支付
                <i>{{user.waitPayCount}}</i>
                <span></span>
            </a>
            <a @click="orderList(2)" class="person-send-all" replace>待发货
                <i>{{user.waitDeliveryCount}}</i>
                <span></span>
            </a>
            <a @click="orderList(3)" class="person-sure-all" replace>待确认
                <i>{{user.waitSureCount}}</i>
                <span></span>
            </a>
            <a @click="orderList(4)" class="person-arbitration-all" replace>交易成功
                <i>{{user.completeCount}}</i>
                <span></span>
            </a>
            <a @click="refunedList()" class="person-arbitration-all" replace>交易失败
                <i>{{user.refundCount}}</i>
                <span></span>
            </a>
            <a @click="orderList(-1)" class="person-arbitration-all" replace>仲裁中
                <i>{{user.arbitrationCount}}</i>
                <span></span>
            </a>
            <a @click="orderListCollect(6)" class="person-arbitration-all" replace>收藏
                <i>{{user.collectionCount}}</i>
                <span></span>
            </a>
        </div>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
export default {
    name: 'sell-infomation',
    data() {
        return {
            title: '全部订单',
            user: {
                waitPayCount: '加载中',
                waitSureCount: '加载中',
                waitDeliveryCount: '加载中',
                arbitrationCount: '加载中',
                refundCount: '加载中',
                completeCount: '加载中',
                collectionCount:'加载中'
            }
        }
    },
    activated() {
        this.getUserInfo();
    },
    methods: {
        getUserInfo() {
            var self = this;
            this.Http.get(this.Api.getUserInfo(), null, function (result) {
                self.user = result.data;
                if(result.data.user.freezeStatus === 'FROZEN'){
                    self.quit();
                }
            })
        },
        orderList(status) {
            this.$router.push('/orders/' + status);
        },
        orderListCollect(status) {
            this.$router.push('/goods_item_collect/'+status);
        },
        refunedList(){
            this.$router.push('/refunedList');
        }
    }, components: {
        "app-header": Header
    }
}
</script>
