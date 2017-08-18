<template>
    <div class="wait-send">
        <app-header :header="title"></app-header>
        <scroller :on-infinite="infinite" ref="scroller" style="margin-top:4rem;">
            <ul class="com-list">
                <li v-for="o in orders" :key="o.id">
                    <div v-if="o.type==0">
                        <sale-order-item  v-on:remove="removeItems" :order="o"></sale-order-item>
                    </div>
                    <div v-if="o.type==1">
                        <lease-order-item  v-on:remove="removeItems" :order="o"></lease-order-item>
                    </div>
                    <div v-if="o.type==2" >
                        <hot-order-item  v-on:remove="removeItems" :order="o"></hot-order-item>
                    </div>
                </li>
            </ul>
        </scroller>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
import SaleOrderItem from './item/sale_order_item.vue'
import LeaseOrderItem from './item/lease_order_item.vue'
import HotOrderItem from './item/hot_order_item.vue'
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
        console.log("sss",this.$route.params.status);
        this.page = 0;
        this.status = this.$route.params.status;
        if (this.status == 1) {
            this.title = "待支付";
        } else if (this.status == 2) {
            this.title = "待发货";
        } else if (this.status == 3) {
            this.title = "待确认";
        } else if (this.status == 4) {
            this.title = "交易成功";
        } else if (this.status == 0) {
            this.title = "交易失败";
        } else if(this.status == -1){
            this.title = "仲裁中";
        }
         else if(this.status == 6){
            this.title = "收藏";
        }
        this.getBuyInfoByStatus();
    },
    methods: {
        getBuyInfoByStatus(done) {
            var that = this;
            var url = this.Api.getBuyInfoByStatus();
            var params =  {
                page: that.page,
                size: that.size
            }
            if(this.status == 0){
                url = this.Api.refundPay();
            }else{
                params.status = this.status;
            }
            this.Http.get(url,params, function (result) {
                if (done) done();
                if (result.data.orders && result.data.orders.length > 0) {
                    for (var i = 0; i < result.data.orders.length; i++) {
                        if(result.data.orders[i].status == that.status || (result.data.orders[i].arbitrationStatus == 1 && that.status == -1)){
                            that.orders.push(result.data.orders[i]);
                        }
                    }
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
            this.page += 1;
            this.getBuyInfoByStatus(done);
        },
        removeItems(orderId){
            for(var i = 0 ;i <this.orders.length;i++){
                if(this.orders[i].id == orderId){
                    this.orders.splice(i,1);
                }
            }
        }
    },
    components: {
        "app-header": Header,
        "sale-order-item": SaleOrderItem,
        "lease-order-item": LeaseOrderItem,
        "hot-order-item": HotOrderItem
    }
}
</script>