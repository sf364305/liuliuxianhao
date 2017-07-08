<template>
    <div class="my-code">
        <app-header :header="title"></app-header>
        <div class="code-list">
            <img :src="path" alt="" style="width: 100%;">
        </div>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
export default {
    name: 'my-code',
    data() {
        return {
            title:'我的二维码',
            path:""
        }
    },
    created(){
        this.path = "http://c.chovans.cn/front/getCode/" + this.Http.token+"/";
        console.log(this.path);
    },
    methods: {
    },
    components:{
        "app-header":Header
    }
}
</script>