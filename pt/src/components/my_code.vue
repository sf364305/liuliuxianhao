<template>
    <div class="my-code">
        <header class="commodity-head">
            分享二维码
            <span class="return-back" @click="ruturnBack"></span>
        </header>
        <div class="code-list">
            <img src="" alt="">
        </div>
    </div>
</template>
<script>
     export default {
        name: 'my-code',
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