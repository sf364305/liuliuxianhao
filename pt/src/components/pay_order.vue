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
            <div class="pay-time">余额支付（{{amountView.cashAmount}}元）</div>
            <ul class="pay-inf">
              <li class="clearfix">
                <span>我的余额</span>
                <em style="width:40%">{{amountView.cashAmount}}元</em>
                <span class="refresh-btn" @click="getOrderDetail">刷新</span>
              </li>
              <li class="clearfix">
                <span>商品价格</span>
                <em>{{-amountView.orderAmount}}元</em>
              </li>
              <li class="clearfix">
                <span>合计</span>
                <em>{{amountView.remainAmount}}元</em>
              </li>
            </ul>

            <a @click="pay" class="pay-method">{{btnText}}</a>

          <!-- 输入支付密码 -->
          <div class="g-model js-password-wrap" v-if="showPassword">
            <div class="bg"></div>
            <div class="popup" style="height: auto;">
              <div class="title">
                支付密码
              </div>
              <div class="content">
                <input type="password" value="" v-model="payPassword" class="password-input js-password"/>
              </div>
              <div class="to-set-pay-password" @click="toSetPayPassword">
                <p>设置支付密码?</p>
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
    font-size: 1.7rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
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
  .refresh-btn{
    width: 25%;
    background-color: #015ebd;
    color: #FFF !important;
    text-align: center;
    margin: 0.2rem;
  }
  .to-set-pay-password {
    margin-top: 1rem;
    font-size: 1.25rem;
    color:red;
    text-align: left;
    padding-left: 3rem;
    height: 1.8rem;
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
            amountView:{

            },
            cashAmount:'',
            payPassword:'',
            showPassword:false,
            needCharge:false,
            btnText:'去支付'
        }
    },
    watch:{
        needCharge:{
            handler(newVal, oldVal){
                if(newVal){
                    this.btnText = '去充值';
                } else {
                    this.btnText = '去支付';
                }
            }
        }
    },
    created(){
        window.localStorage.setItem("waitPayOrderId",'');
        this.order.id = this.$route.params.id;
        this.getOrderDetail();
    },
    methods: {
        pay() {
            if(this.amountView.cashAmount < this.order.amount){
                this.toCharge();
            } else{
                this.showPassword = true;
            }

        },
        toCharge(){
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
            $(".alertLoading").css("display","block");
            self.$store.commit('setLoading', true);
            this.Http.get(this.Api.toPayOrderDetail(), {
                orderId: self.order.id
            }, function (result) {
                $(".alertLoading").css("display","none");
                self.$store.commit('setLoading', false);
                self.order = result.data.order;
                self.amountView = result.data.amountView;
                self.needCharge = result.data.amountView.needCharge;
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
                    this.$iosAlert("余额不足");
                    self.toCharge();
                }
            })
        },
        toSetPayPassword(){
            window.localStorage.setItem("waitPayOrderId",this.order.id);
            var token = "";
            var cookieArray = window.document.cookie.match('(^|;)?xianhao_token=([^;]*)(;|$)');
            if(cookieArray){
                token = cookieArray[2];
            }
            window.location.href = this.host +"mall/mine/pay/password/reset?token="+token;
        }
    },
    components: {
        'app-header': Header,
    }
}
</script>
