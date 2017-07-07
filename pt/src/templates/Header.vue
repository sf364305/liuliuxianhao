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
            var v = this.$store.state.FromView[this.$store.state.FromView.length-1];
            this.$router.push(v);
            console.log("跳转页面",v);
            // this.$router.back(-1);
        }
    }
}
</script>