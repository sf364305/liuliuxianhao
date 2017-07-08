<template>
    <div class="sure-order">
        <app-load></app-load>
        <app-alert></app-alert>
        <app-header :header="title"></app-header>
        <ul class="sure-inf">
            <li class="clearfix">
                <span>订单号</span>
                <em>1336589665566555</em>
            </li>
            <li class="clearfix">
                <span>商品名称</span>
                <em>102级映客号装逼大号</em>
            </li>
            <li class="clearfix">
                <span>单价</span>
                <em>5000</em>
            </li>
            <li class="clearfix">
                <span>生成时间</span>
                <em>2017-07-05 16:50</em>
            </li>
            <li class="clearfix">
                <span>订单状态</span>
                <em>待付款</em>
            </li>
            <li class="clearfix">
                <span>仲裁状态</span>
                <em>未仲裁</em>
            </li>
        </ul> 
        <div class="tobuy-inf">商品信息</div>
        <ul class="order-contact">
            <li class="clearfix">
                <span>所属平台</span>
                <em>陌陌</em>
            </li>
            <li class="clearfix">
                <span>授权情况</span>
                <em>未授权</em>
            </li>
            <li class="clearfix">
                <span>账号等级</span>
                <em>85级</em>
            </li>
            <li class="clearfix">
                <span>ID</span>
                <em>2017-07-05 16:50</em>
            </li>
            <li class="clearfix">
                <span>性别</span>
                <em>女</em>
            </li>
            <li class="clearfix">
                <span>绑定情况</span>
                <em>手机绑定</em>
            </li>
            <li class="clearfix">
                <span>描述</span>
                <em>手机绑定手机绑定手机绑定手机绑定</em>
            </li>
        </ul>
        <div class="order-button clearfix">
            <span class="order-button-delete">删除</span>
            <span class="order-button-sure">继续支付</span>  
        </div>
    </div>
</template>
<script>
import Alert from '../templates/Alert.vue'
import Load from '../templates/Load.vue'
import Header from '../templates/Header.vue'
export default {
    name: 'order_detail',
    data() {
        return {
            title: "订单详情"     
        }
    },
    created() {
        
    },
    methods: {
        
    },
    components: {
        'app-header': Header,
        'app-alert': Alert,
        'app-load': Load
    }
}
</script>