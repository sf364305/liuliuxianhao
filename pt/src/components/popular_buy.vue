<template>
    <div class="popularity-buy">
        <header class="commodity-head">
            支付信息
            <span class="return-back" @click="ruturnBack"></span>
        </header>
        <div class="pay-popular">
            <h2>刷人气</h2>
            <ul>
                <li style="color: red;font-size: 1.33rem;">
                    <span>订单号：</span>
                    <em style="color: red">￥200</em>
                </li>
                <li>
                    <span>人气：</span>
                    <em>￥200</em>
                </li>
                <li>
                    <span>类型：</span>
                    <em>￥200</em>
                </li>
                <li>
                    <span>数量：</span>
                    <em>￥200</em>
                </li>
                <li>
                    <span>开始时间：</span>
                    <em>￥200</em>
                </li>
                <li>
                    <span>结束时间：</span>
                    <em>￥200</em>
                </li>
                <li>
                    <span>平台：</span>
                    <em>￥200</em>
                </li>
                <li>
                    <span>平台ID：</span>
                    <em>￥200</em>
                </li>
                <li>
                    <span>备注：</span>
                    <em>￥200</em>
                </li>
            </ul>
        </div>
        <div class="popular-paid-outer">
            <a herf="" title="">微信支付</a>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'popularity-buy',
        data() {
            return {
                
            }
        },
        methods: {
            ruturnBack: function() {
                this.$router.go(-1);
            }   
        }
    }
</script>