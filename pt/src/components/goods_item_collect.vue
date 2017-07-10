<template>
    <div class="wait-send">
        <app-header :header="title"></app-header>
        <scroller :on-infinite="infinite" ref="scroller" style="margin-top:4rem;">
            <app-goods :goods="goods"></app-goods>
        </scroller>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
import Goods from '../templates/Goods.vue'
import SaleOrderItemSeller from './item/sale_order_item_seller.vue'
import LeaseOrderItemSeller from './item/lease_order_item_seller.vue'
export default {
    name: 'order_list',
    data() {
        return {
            title: "收藏列表",
            page: 0,
            size: 5,
            collections: [],
            status: 0,
            goods:[]
        }
    },
    activated() {
        this.collections = [];
        this.goods = [];
        this.page = 0;
        this.status = this.$route.params.status;
        if (this.status == 1) {
            this.title = "已上架";
        } else if (this.status == 0) {
            this.title = "已下架";
        } else if (this.status == 2) {
            this.title = "审核中";
        }
        this.getGoodsByStatus();
    },
    methods: {
        getGoodsByStatus(done) {
            var that = this;
            this.Http.get(this.Api.getCollection(), {
                page: that.page,
                size: that.size
            }, function (result) {
                if (done) done();
                if (result.data.collections.length > 0) {
                    for (var i = 0; i < result.data.collections.length; i++) {
                        that.collections.push(result.data.collections[i]);
                        that.goods.push(result.data.collections[i].goods);
                    }
                    that.$refs.scroller.finishInfinite(false);
                } else {
                    that.$refs.scroller.finishInfinite(true);
                }
                console.log("订单数量："+that.collections.length);
            })
        },
        refresh(done) {
            this.page = 0;
            this.getGoodsByStatus(done);
        },
        infinite(done) {
            this.page += 1;
            this.getGoodsByStatus(done);
        }
    },
    components: {
        "app-header": Header,
        "app-goods": Goods,
        "sale-order-item": SaleOrderItemSeller,
        "lease-order-item": LeaseOrderItemSeller
    }
}
</script>