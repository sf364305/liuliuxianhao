<template>
  <div class="">
    <app-header :header="title"></app-header>
    <div>
      <div class="tab-row">
        <div class="zhifubao-tab">
          <i><img src="http://qiniu.66xianhao.com/o_1efhilcsh5e81ff717k016t113ck9.jpg"/></i>
          <p>支付宝</p>
        </div>

      </div>
      <div class="content-div">
        <div class="info-row">
          <label>支付宝名称：</label>
          <p>六六协创（厦门）网络科技有限公司</p></div>
        <div class="info-row">
          <label>支付宝账号：</label>
          <p>{{account}}</p>
          <span class="copy-btn" v-clipboard:copy="account" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
        </div>


      </div>
      <div class="tip-div">
        <div><i class="tip-star">*</i><p class="tip-title">温馨提示：</p></div>
        <div><p class="tip-content">1、建议先联系客服，确认账号是否还在，再进行转账</p></div>
        <div><p class="tip-content">2、转账时，请再三确认账号和名称是否正确，如有疑问可以联系官网客服</p></div>
      </div>
    </div>
  </div>
</template>
<script>
    import Header from '../templates/Header.vue'

    export default {
        name: 'certification-else',
        data() {
            return {
                title: "平台充值",
                account: "xmliuliuxiechuang@163.com"
            }
        },
        methods: {
            onCopy(e) {
                this.$iosAlert("复制成功");
            },
            onError(e) {
                this.$iosAlert("复制失败");
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
  }

  .zhifubao-tab {
    padding-left:3rem;
    border: #0d75d5 solid 1px;
    border-radius: 0.3rem;
    display: flex;
    width:12rem;
    box-shadow: 1px 1px 5px 2px rgba(50, 50, 50, 0.2), 1px 1px 1px -11px rgba(50, 50, 50, 0.2);
  }
  .zhifubao-tab i{
    width: 2rem;
    padding-top: 0.5rem;

    height: 2.5rem;
    margin-right: 0.3rem;
  }
  .zhifubao-tab img{
    width:100%
  }

  .zhifubao-tab p {
    text-align: center;
    font-size: 1.6rem;
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
