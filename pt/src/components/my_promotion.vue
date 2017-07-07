<template>
    <div class="my-promotion">
        <app-header :header="title"></app-header>
        <ul class="promotion-pic clearfix">
            <li v-for="(u,index) in users" :key="u.id">
                <img :src="u.avatar" :alt="u.id"/>
                <p>{{u.name}}</p>
                <span>{{u.createOn}}</span>
                <i>{{index+1}}.</i>
            </li>
        </ul>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
export default {
    name: 'my-promotion',
    data() {
        return {
            title:"我的推广",
            page:0,
            size:12,
            users:[]
        }
    },
    created(){
        this.getReferred();
    },
    methods: {
        getReferred(){
            var self = this;
            this.Http.get(this.Api.getReferred(),{
                page:self.page,
                size:self.size
            },function(result){
                for(var i = 0;i<result.data.users.lenght;i++){
                    users.push(result.data.users[i]);
                }
            })
        }
    },
    components: {
        "app-header": Header
    }
}
</script>