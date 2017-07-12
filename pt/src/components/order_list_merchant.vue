<template>
    <div class="wait-send">
        <app-header :header="title"></app-header>
        <scroller :on-infinite="infinite" ref="scroller" style="margin-top:4rem;">
            <ul class="com-list">
                <li v-for="o in orders" :key="o.id">
                    <div v-if="o.type==0">
                        <sale-order-item :order="o"></sale-order-item>
                    </div>
                    <div v-if="o.type==1">
                        <lease-order-item :order="o"></lease-order-item>
                    </div>
                </li>
            </ul>
        </scroller>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
import SaleOrderItemSeller from './item/sale_order_item_seller.vue'
import LeaseOrderItemSeller from './item/lease_order_item_seller.vue'
export default {
    name: 'order_list',
    data() {
        return {
            title: "订单列表",
            page: 0,
            size: 20,
            orders: [],
            status: 0,
        }
    },
    activated() {
        this.orders = [];
        this.page = 0;
        this.status = this.$route.params.status;
        if (this.status == 2) {
            this.title = "交易中";
        } else if (this.status == 3) {
            this.title = "已发货";
        } else if (this.status == 4) {
            this.title = "交易成功";
        } else if (this.status == 5) {
            this.title = "交易失败";
        }
        this.getMerchantInfoByStatus();
    },
    methods: {
        getMerchantInfoByStatus(done) {
            var that = this;
            this.Http.get(this.Api.getMerchantInfoByStatus(), {
                status:that.status,
                page: that.page,
                size: that.size
            }, function (result) {
                if (done) done();
                if (result.data.orders.length > 0) {
                    for (var i = 0; i < result.data.orders.length; i++) {
                        that.orders.push(result.data.orders[i]);
                    }
                    console.log(that.orders);
                    that.$refs.scroller.finishInfinite(false);
                } else {
                    that.$refs.scroller.finishInfinite(true);
                }
                console.log("订单数量："+that.orders.length);
            })
        },
        refresh(done) {
            this.page = 0;
            this.getMerchantInfoByStatus(done);
        },
        infinite(done) {
            this.page += 1;
            this.getMerchantInfoByStatus(done);
        }
    },
    components: {
        "app-header": Header,
        "sale-order-item": SaleOrderItemSeller,
        "lease-order-item": LeaseOrderItemSeller
    }
}
</script>