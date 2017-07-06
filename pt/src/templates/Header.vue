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
            console.log("返回:"+this.$store.state.FromView);
            this.$router.push(this.$store.state.FromView);
            // this.$router.back(-1);
        }
    }
}
</script>