<template>
    <div class="all-order">
        <app-header :header="title"></app-header>
        <div class="all-order-list">
            <a @click="merchantOrderList(3)" class="person-sended-all" replace>已发货
                <i>{{user.deliveryCount}}</i>
                <span></span>
            </a>
            <a @click="merchantOrderList(2)" class="person-transaction-all" replace>交易中
                <i>{{user.transactionCount}}</i>
                <span></span>
            </a>
            <a @click="merchantOrderList(-1)" class="person-shelves-all" replace>仲裁中
                <i>{{user.merchantArbitrationCount}}</i>
                <span></span>
            </a>
            <a @click="goodsList(1)" class="person-shelves-all" replace>已上架
                <i>{{user.upShelvesCount}}</i>
                <span></span>
            </a>
            <a @click="goodsList(0)" class="person-shelves-all" replace>已下架
                <i>{{user.downShelvesCount}}</i>
                <span></span>
            </a>
            <a @click="goodsList(2)" class="person-shelves-all" replace>审核中
                <i>{{user.approveCount}}</i>
                <span></span>
            </a>
            <a @click="merchantOrderList(4)" class="person-seccess-all" replace>交易成功
                <i>{{user.successCount}}</i>
                <span></span>
            </a>
            <a @click="merchantOrderList(5)" class="person-defeat-all" replace>交易失败
                <i>{{user.failCount}}</i>
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
                deliveryCount: "加载中",
                transactionCount: "加载中",
                successCount: "加载中",
                failCount: "加载中",
                upShelvesCount: "加载中",
                downShelvesCount: "加载中",
                approveCount: "加载中",
                merchantArbitrationCount: "加载中",
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
            })
            console.log(self.user);
        },
        merchantOrderList(status) {
            this.$router.push('/orders_merchant/' + status);
        },
        goodsList(status){
            this.$router.push('/goods_list_merchant/'+status);
        }
    },
    components: {
        "app-header": Header
    }
}
</script>