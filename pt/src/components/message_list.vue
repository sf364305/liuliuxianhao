<template>
    <div class="wait-send">
        <app-header :header="title"></app-header>
        <scroller :on-infinite="infinite" ref="scroller" style="margin-top:4rem;">
            <ul class="com-list">
                <li v-for="message in messageList" :key="message.id">
                  <div>
                    <a @click="toDetail(message.id)" class="game-name" style="padding-bottom: 3rem;">
                    <span class="name-title clearfix">
                        <em style="margin-left:2%;">{{message.message}}</em>
                    </span>
                      <div class="sell-inf clearfix" style="margin-left:2%;">
                        <em>消息时间：</em>
                        <span >{{message.createOn}}</span>
                      </div>
                    </a>
                    <div class="new-message" v-if="message.status =='NEW'">new</div>
                    <div class="wait-you">
                      <span class="wait-cancel" @click="deleteMessage(message.id)">删除</span>
                      <span class="wait-sure" @click="toDetail(message.id)">查看详情</span>
                    </div>

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
    name: 'message_list',
    data() {
        return {
            title: "消息列表",
            page: -1,
            size: 10,
            messageList: []
        }
    },
    created() {
        this.messageList = [];
        this.page = -1;
    },
    methods: {
        getMessageList(done) {
            var that = this;
            var params =  {
                page: that.page,
                size: that.size
            };
            var url = this.Api.getMessageList();
            this.Http.get(url,params, function (result) {
                if (done) done();
                if (result.data.messageList && result.data.messageList.length > 0) {
                    for (var i = 0; i < result.data.messageList.length; i++) {
                        that.messageList.push(result.data.messageList[i]);
                    }
                    that.$refs.scroller.finishInfinite(false);
                } else {
                    that.$refs.scroller.finishInfinite(true);
                }
            })
        },
        refresh(done) {
            this.page = 0;
            this.getMessageList(done);
        },
        infinite(done) {
            this.page += 1;
            this.getMessageList(done);
        },
        toDetail(messageId){
            this.$router.push("/message_detail/" + messageId);
        },
        deleteMessage(messageId) {
            var that = this;
            this.$iosConfirm("确定删除这条消息?")
                .then(function () {
                    that.Http.get(that.Api.getMessageOperate() + messageId+"/delete", null, function (result) {
                        if(result.code === 0){
                            for(var i = 0 ;i <that.messageList.length;i++){
                                if(that.messageList[i].id === messageId){
                                    that.messageList.splice(i,1);
                                }
                            }
                        }
                    })
                }, function () {

                });
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
