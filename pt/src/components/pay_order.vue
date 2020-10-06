<template>
    <div class="buy">
        <app-header :header="title"></app-header>
        <scroller ref="scroller" style="margin-bottom:4rem;margin-top:4rem;">
            <div class="buy-inf">商品信息</div>
            <ul class="pay-inf">
                <li class="clearfix">
                    <span>商品名称</span>
                    <em>{{order.goods.name}}</em>
                </li>
                <li class="clearfix">
                    <span>手机号码</span>
                    <em>{{order.phone}}</em>
                </li>
                <li class="clearfix">
                    <span>微信号</span>
                    <em>{{order.qq}}</em>
                </li>
                <li class="clearfix">
                    <span>应付总价</span>
                    <em>{{order.amount}}元</em>
                </li>
                <li class="clearfix">
                    <span>实付总价</span>
                    <em>{{order.amount}}元</em>
                </li>
            </ul>
            <div class="alertLoading"></div>
            <div class="pay-time">余额支付（{{cashAmount}}元）</div>
            <a @click="pay" class="pay-method" replace>去支付</a>

          <!-- 输入支付密码 -->
          <div class="g-model js-password-wrap" v-if="showPassword">
            <div class="bg"></div>
            <div class="popup" style="height: auto;">
              <div class="title">
                支付密码
              </div>
              <div class="content">
                <input type="password" value="" v-model="payPassword" class="password-input js-password">
              </div>
              <div class="password-submit" @click="cancelPay">取消</div>
              <div class="password-submit" @click="submitPay">提交</div>
            </div>
          </div>
        </scroller>
    </div>
</template>
<style>
  .hide{
    display: none;
  }
  .g-model {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
  .g-model .popup {
    width: 80%;
    height: 4rem;
    border-radius: 13px;
    background-color: #fff;
    overflow: hidden;
    text-align: center;
    margin-top: 4.5rem;
    margin-left: auto;
    margin-right: auto;
  }
  .g-model .popup .title {
    color: #333;
    font-size: 17px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  .g-model .popup .password-input {
    width: 75%;
    height: 4rem;
    border-radius: 8px;
    background: #FFFFFF;
    border: 1px solid rgba(204, 204, 204, 0.7);
    text-indent: 10px;
  }
  .g-model .popup .password-submit {
    width: 38%;
    height: 4rem;
    border-radius: 8px;
    font-size: 1.5rem;
    display: inline-flex;
    color: #fff;
    justify-content: center;
    align-items: center;
    background: #007aff;
    margin: 1.3rem auto;
  }
</style>
<script>
import Header from '../templates/Header.vue'
export default {
    name: 'pay_order',
    data() {
        return {
            title: "支付订单",
            order: {
                id: '',
                orderNo: '',
                goods:{
                    'name':''
                }
            },
            cashAmount:'',
            payPassword:'',
            showPassword:false
        }
    },
    created(){
        window.localStorage.setItem("waitPayOrderId",'');
        this.order.id = this.$route.params.id;
        this.getUserInfo();
        this.getOrderDetail();
    },
    methods: {
        pay() {
            if(this.$store.state.User.cashAmount < this.order.amount){
                this.toCharge();
            } else{
                this.showPassword = true;
            }

        },
        toCharge(){
            this.$iosAlert("余额不足");
            window.localStorage.setItem("waitPayOrderId",this.order.id);
            var token = "";
            var cookieArray = window.document.cookie.match('(^|;)?xianhao_token=([^;]*)(;|$)');
            if(cookieArray){
                token = cookieArray[2];
            }
            window.location.href = this.host +"mall/mine/account/charge?token="+token;
        },
        getOrderDetail() {
            var self = this;
            this.Http.get(this.Api.getOrderGoodsDetail(), {
                orderId: self.order.id
            }, function (result) {
                self.order = result.data.order;
            })
        },
        cancelPay(){
            this.showPassword = false;
        },
        submitPay(){
            var self = this;
            this.Http.get(this.Api.payOrderByCash(), {
                orderId: self.order.id,
                payPassword:self.payPassword
            }, function (result) {
                $(".alertLoading").css("display","none");
                self.$store.commit('setLoading', false);
                if (result.code === 0) {
                    self.showPassword = false;
                    self.$router.push('/buy_success');
                } else if (result.code === 888) {
                    self.toCharge();
                }
            })
        },
        getUserInfo() {
            var that = this;
            var user= this.$store.state.User;
            if(user && user.cashAmount){
                that.cashAmount = user.cashAmount;
            } else {
                this.Http.get(this.Api.getUserInfo(), null, function (result) {
                    that.cashAmount = result.data.user.cashAmount;
                    that.$store.commit('setUser', result.data.user);
                })
            }
        }
    },
    components: {
        'app-header': Header,
    }
}
</script>
