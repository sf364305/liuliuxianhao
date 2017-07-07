<template>
    <div class="my-code">
        <app-header :header="title"></app-header>
        <div class="code-list">
            <img src="" alt="">
        </div>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
export default {
    name: 'my-code',
    data() {
        return {
            title:'我的二维码'
        }
    },
    methods: {
        returnBack: function () {
            // this.$router.go(-1);
        }
    },
    components:{
        "app-header":Header
    }
}
</script>