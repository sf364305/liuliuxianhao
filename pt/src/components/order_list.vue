<template>
    <div class="wait-send">
        <app-header :header="title"></app-header>
        <scroller :on-infinite="infinite" ref="scroller">
            <ul class="com-list">
                <li v-for="o in orders" :key="o.id">
                    <div v-if="o.type==0">
                        <sale-order-item :order="o"></sale-order-item>
                    </div>
                    <div v-if="o.type==1">
                        <lease-order-item :order="o"></lease-order-item>
                    </div>
                    <div v-if="o.type==2">
                        <lease-order-item :order="o"></lease-order-item>
                    </div>
                </li>
            </ul>
        </scroller>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
import SaleOrderItem from './item/sale_order_item.vue'
import LeaseOrderItem from './item/sale_order_item.vue'
import HotOrderItem from './item/hot_order_item.vue'
export default {
    name: 'popularity-buy',
    data() {
        return {
            title: "标题",
            page: 0,
            size: 20,
            orders: []
        }
    },
    create(){
        this.getBuyInfoByStatus();
    },
    methods: {
        getBuyInfoByStatus(done) {
            var that = this;
            this.Http.get(this.Api.getBuyInfoByStatus(), {
                page: that.page,
                size: that.size
            }, function (result) {
                if (result.data.orders.length > 0) {
                    for (var i = 0; i < result.data.orders.length; i++) {
                        that.orders.push(result.data.orders[i]);
                    }
                    if(done)done();
                    that.$refs.scroller.finishInfinite(false);
                } else {
                    that.$refs.scroller.finishInfinite(true);
                }
            })
        },
        refresh(done) {
            this.page = 0;
            this.getBuyInfoByStatus(done);
        },
        infinite(done) {
            this.page+=1;
            this.getBuyInfoByStatus(done);
        }
    },
    components: {
        "sale-order-item": SaleOrderItem,
        "lease-order-item": LeaseOrderItem,
        "hot-order-item": HotOrderItem
    }
}
</script>