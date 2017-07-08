<template>
    <div class="all-order">
        <app-header :header="title"></app-header>
        <div class="all-order-list">
            <router-link to="/unpaid" class="person-sended-all" replace>已发货
                <i>0</i>
                <span></span>
            </router-link>
            <router-link to="/wait_send" class="person-transaction-all" replace>交易中
                <i>0</i>
                <span></span>
            </router-link>
            <router-link to="/wait_sure" class="person-shelves-all" replace>已上架
                <i>0</i>
                <span></span>
            </router-link>
            <router-link to="/arbitration" class="person-review-all" replace>审核中
                <i>0</i>
                <span></span>
            </router-link>
            <router-link to="/arbitration" class="person-seccess-all" replace>交易成功
                <i>0</i>
                <span></span>
            </router-link>
            <router-link to="/arbitration" class="person-defeat-all" replace>交易失败
                <i>0</i>
                <span></span>
            </router-link>
        </div>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
export default {
    name: 'sell-infomation',
    data() {
        return {
            title: '全部订单'
        }
    },
    methods: {
    },
    components: {
        "app-header": Header
    }
}
</script>