<template>
    <div class="income-con">
        <header class="commodity-head">
            我的收益
            <span class="return-back" @click="ruturnBack"></span>
        </header>
        <ul class="income-pic clearfix">
            <li>
                <img src="../assets/images/papulity.png" alt=""/>
                <p>你就是唯一</p>
                <span>生成时间：2017-7-5</span>
                <i>￥150</i>
            </li>
            <li>
                <img src="../assets/images/papulity.png" alt=""/>
                <p>你就是唯一</p>
                <span>生成时间：2017-7-5</span>
                <i>￥150</i>
            </li>
            <li>
                <img src="../assets/images/papulity.png" alt=""/>
                <p>你就是唯一</p>
                <span>生成时间：2017-7-5</span>
                <i>￥150</i>
            </li>
            <li>
                <img src="../assets/images/papulity.png" alt=""/>
                <p>你就是唯一</p>
                <span>生成时间：2017-7-5</span>
                <i>￥150</i>
            </li><li>
                <img src="../assets/images/papulity.png" alt=""/>
                <p>你就是唯一</p>
                <span>生成时间：2017-7-5</span>
                <i>￥150</i>
            </li>
        </ul>
    </div>
</template>
<script>
     export default {
        name: 'income-con',
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