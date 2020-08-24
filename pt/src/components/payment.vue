<template>
  <div class="">
    <app-header :header="title"></app-header>
    <div>
      <div class="tab-row">
        <div class="zhifubao-tab" :class="{on:tabType == 'zhifubao'}" @click="changePayType('zhifubao')">
          <i><img src="http://qiniu.66xianhao.com/o_1efhilcsh5e81ff717k016t113ck9.jpg"/></i>
          <p>支付宝</p>
        </div>
        <div class="online-tab" :class="{on:tabType == 'bank'}" @click="changePayType('bank')">
          <i><img src="http://qiniu.66xianhao.com/o_1egggdr1v111n18fvuq8dc2jnc9.png"/></i>
          <p>线下转账</p>
        </div>

      </div>
      <div class="content-div" v-if="tabType == 'zhifubao'">
        <div class="info-row">
          <label>支付宝名称：</label>
          <p>六六协创（厦门）网络科技有限公司</p></div>
        <div class="info-row">
          <label>支付宝账号：</label>
          <p>{{account}}</p>
          <span class="copy-btn" v-clipboard:copy="account" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
        </div>
      </div>
      <div class="content-div" v-if="tabType == 'bank'">
        <div class="info-row">
          <label>开户银行：</label>
          <p>中国建设银行</p>
        </div>
        <div class="info-row">
          <label>账号户名：</label>
          <p>{{bankAccountName}}</p>
          <span class="copy-btn" v-clipboard:copy="bankAccountName" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
        </div>
        <div class="info-row">
          <label>开户行：</label>
          <p>福建厦门湖滨支行</p>
        </div>
        <div class="info-row">
          <label>银行账号：</label>
          <p>{{bankAccount}}</p>
          <span class="copy-btn" v-clipboard:copy="bankAccount" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
        </div>
      </div>

      <div class="tip-div">
        <div><i class="tip-star">*</i><p class="tip-title">温馨提示：</p></div>
        <div><p class="tip-content">1、建议先联系客服，确认账号是否还在，再进行转账</p></div>
        <div><p class="tip-content">2、转账时，请再三确认账号和名称是否正确，如有疑问可以联系企业QQ客服：800179661</p></div>
      </div>
    </div>
  </div>
</template>
<script>
    import Header from '../templates/Header.vue'

    export default {
        name: 'payment',
        data() {
            return {
                title: "平台充值",
                account: "xmliuliuxiechuang@163.com",
                bankAccountName: "六六协创（厦门）网络科技有限公司",
                bankAccount: "3510 1551 0010 5254 0872",
                tabType:"zhifubao"
            }
        },
        methods: {
            onCopy(e) {
                this.$iosAlert("复制成功");
            },
            onError(e) {
                this.$iosAlert("复制失败");
            },
            changePayType(type){
                this.tabType = type;
            }
        },
        components: {
            "app-header": Header
        }
    }
</script>
<style>
  .tab-row {
    margin-top: 2rem;
    height: 3rem;
    line-height: 3.5rem;
    margin-left: 1rem;
    display: flex;
  }

  .zhifubao-tab,.online-tab{
    padding-left:3rem;
    border: #a9b1b9 solid 1px;
    border-radius: 0.3rem;
    display: flex;
    width:10rem;
    margin-left:1rem;
    box-shadow: 1px 1px 5px 2px rgba(50, 50, 50, 0.2), 1px 1px 1px -11px rgba(50, 50, 50, 0.2);
  }
  .zhifubao-tab i,.online-tab i{
    width: 2rem;
    padding-top: 0.3rem;

    height: 2.5rem;
    margin-right: 0.3rem;
  }
  .zhifubao-tab img,.online-tab img{
    width:100%
  }

  .zhifubao-tab p,.online-tab p {
    text-align: center;
    font-size: 1.2rem;
    line-height: 3rem;
  }
  .zhifubao-tab.on{
    border: 1px solid #07a0f8;
  }

  .online-tab.on{
    border: 1px solid #b38f47;
  }

  .content-div {
    margin: 2rem 1rem;
    box-shadow: 1px 1px 5px 2px rgba(50, 50, 50, 0.2), 1px 1px 1px -11px rgba(50, 50, 50, 0.2);
    padding: 2rem 1rem 1rem 1rem;
  }

  .content-div .info-row {
    display: flex;
    margin-bottom: 1rem;
  }

  .content-div .info-row label {
    color: #7d7676;
    font-size: 1rem;
    margin-right: 0.5rem;
  }

  .content-div .info-row p {
    font-size: 1rem;
    font-weight: 900;
  }

  .copy-btn{
    color:blue;
    font-size:1rem;
    margin-left:1rem;
    font-weight: 700;
  }
  .tip-div{
    margin:2rem 1rem 0 1rem;
  }
  .tip-star{
    font-size: 1rem;
    color:red;
    float: left;
  }
  .tip-title{
    font-size: 1rem;
    font-weight: 900;
  }
  .tip-content{
    color: #7d7676;
    font-size: 1rem;
  }
  .commodity-head{
    background: #007aff;
    color:#FFF;
  }
</style>
