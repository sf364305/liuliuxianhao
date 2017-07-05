<template>
    <div class="my-promotion">
        <header class="commodity-head">
            我的推广
            <span class="return-back" @click="ruturnBack"></span>
        </header>
        <ul class="promotion-pic clearfix">
            <li>
                <img src="../assets/images/papulity.png" alt=""/>
                <p>你就是唯一</p>
                <span>2017-7-5</span>
                <i>1.</i>
            </li>
            <li>
                <img src="../assets/images/papulity.png" alt=""/>
                <p>你就是唯一</p>
                <span>2017-7-5</span>
                <i>3.</i>
            </li>
            <li>
                <img src="../assets/images/papulity.png" alt=""/>
                <p>你就是唯一</p>
                <span>2017-7-5</span>
                <i>3.</i>
            </li>
            <li>
                <img src="../assets/images/papulity.png" alt=""/>
                <p>你就是唯一</p>
                <span>2017-7-5</span>
                <i>4.</i>
            </li><li>
                <img src="../assets/images/papulity.png" alt=""/>
                <p>你就是唯一</p>
                <span>2017-7-5</span>
                <i>5.</i>
            </li>
        </ul>
    </div>
</template>
<script>
     export default {
        name: 'my-promotion',
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