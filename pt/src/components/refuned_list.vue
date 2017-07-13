<template>
    <div class="wait-send">
        <app-header :header="title"></app-header>
        <scroller :on-infinite="infinite" ref="scroller" style="margin-top:4rem;">
            <ul class="com-list">
                <li v-for="r in refunds" :key="r.id">
                    <a @click="toDetail(r.order.goods.id)" class="game-name" replace style="padding-bottom: 0.5rem;">
                        <span class="name-title clearfix">
                            <img :src="$store.state.Setting.qiniuUrl + r.order.goods.category.img" alt="">
                            <em>{{r.order.goods.name}}</em>
                        </span>
                        <span class="sever">
                            <em class="com-game">所属卖家：</em>
                            <i class="game-sever">{{r.merchant.name}}</i>
                        </span>
                        <div class="sell-inf clearfix">
                            <em>生成时间：</em>
                            <span>{{r.createOn}}</span>
                        </div>
                        <div class="sell-inf clearfix">
                            <em>退款金额：</em>
                            <span style="color:red">￥{{r.amount}}</span>
                        </div>
                        <div class="sell-inf clearfix">
                            <em>退款状态：</em>
                            <span v-if="r.status == 0">待退款(退款将原路返回)</span>
                            <span v-if="r.status == 1">退款成功</span>
                            <span v-if="r.status == 2">退款失败</span>
                        </div>
                    </a>
                    <div class="sell-status1" v-if="r.order.type==0"></div>
                    <div class="sell-status" v-if="r.order.type==1"></div>
                    <div class="sell-hot" v-if="r.order.type==2"></div>
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
            title: "退款列表",
            page: 0,
            size: 20,
            refunds: []
        }
    },
    activated() {
        this.refunds = [];
        this.page = 0;
        this.getRefunedList();
    },
    methods: {
        getRefunedList(done) {
            var that = this;
            this.Http.get(this.Api.getRefunedList(), {
                page: that.page,
                size: that.size
            }, function (result) {
                if (done) done();
                if (result.data.refunds && result.data.refunds.length > 0) {
                    for (var i = 0; i < result.data.refunds.length; i++) {
                        that.refunds.push(result.data.refunds[i]);
                    }
                    that.$refs.scroller.finishInfinite(false);
                } else {
                    that.$refs.scroller.finishInfinite(true);
                }
            })
        },
        
        refresh(done) {
            this.page = 0;
            this.getRefunedList(done);
        },
        infinite(done) {
            this.page += 1;
            this.getRefunedList(done);
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