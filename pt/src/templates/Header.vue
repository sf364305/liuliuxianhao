<template>
    <header class="commodity-head">
        {{header}}
        <span class="return-back" @click="back"></span>
    </header>
</template>
<script>
export default {
    name: 'header',
    props: ['header'],
    methods: {
        back() {
            if(this.header == "商品详情") {
                let ls = window.localStorage;
                let oldStop = ls.getItem('tranY');
                ls.setItem("transY",oldStop);
            }
            var v = this.$store.state.FromView[this.$store.state.FromView.length-1];
            this.$router.push(v);
            console.log("跳转页面",v);
            // this.$router.back(-1);
        }
    }
}
</script>
