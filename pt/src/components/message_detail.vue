<template>
  <div class="sure-order">
    <app-load></app-load>
    <app-header :header="title"></app-header>
    <scroller ref="scroller" style="margin-bottom:4rem;">
      <div class="message-detail">
        <div class="clearfix">
          <div class="title-row">消息时间:</div>
          <p>{{message.createOn}}</p>
        </div>

        <div class="clearfix">
          <div class="title-row">内容:</div>
          <p>{{message.message}}</p>
        </div>
      </div>
      <div class="message-btn clearfix">
        <span class="message-btn-delete" @click="deleteMessage(message.id)">删除</span>
      </div>
    </scroller>
  </div>
</template>
<style>
  .message-detail {
    margin-top: 4rem;
    padding: 1rem 1rem;
    font-size: 1.5rem;
  }

  .message-detail span {
    width: 5rem;
  }

  .message-btn-delete {
    width: 40%;
    height: 2.8rem;
    line-height: 2.8rem;
    text-align: center;
    float: right;
    background: #d40e0e;
    color: #fff;
    margin-top:2rem;
    margin-right:1rem;
  }
</style>
<script>
    import Load from '../templates/Load.vue'
    import Header from '../templates/Header.vue'

    export default {
        name: 'message_detail',
        data() {
            return {
                title: "消息详情",
                message: {
                    id: '',
                    message: '',
                    createOn: ''
                }
            }
        },

        created() {
            this.message = {};
            this.message.id = this.$route.params.id;
            this.getMessageDetail();
        },
        // activated() {
        //     this.message = {};
        //     this.message.id = this.$route.params.id;
        //     this.getMessageDetail();
        // },
        methods: {
            getMessageDetail() {
                var self = this;
                this.Http.get(this.Api.getMessageOperate() + self.message.id, null, function (result) {
                    self.message = result.data.message;
                    if(result.code === 0 && result.data.message.status === 'NEW'){
                        self.messageRead(self.message.id)
                    }
                })
            },
            messageRead(messageId){
                var self = this;
                this.Http.get(this.Api.getMessageOperate() + messageId+"/read", null, function (result) {
                })
            },
            deleteMessage(messageId) {
                var that = this;
                this.$iosConfirm("确定删除这条消息?")
                    .then(function () {
                        that.Http.get(that.Api.getMessageOperate() + messageId+"/delete", null, function (result) {
                            if(result.code === 0){
                                that.$router.push("/person");
                            }
                        })
                    }, function () {

                    });
            }
        },
        components: {
            'app-header': Header,
            'app-load': Load
        }
    }
</script>
