<template>
    <div class="income-con">
        <app-header :header="title"></app-header>
        <ul class="income-pic clearfix">
            <li v-for="c in commission" :key="c.id">
                <img :src="c.fromUser.avatar" alt="" />
                <p>{{c.fromUser.name}}</p>
                <span>生成时间：{{c.createOn}}</span>
                <i>￥{{c.price}}</i>
            </li>
        </ul>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
export default {
    name: 'income-con',
    data() {
        return {
            title:"收益详情",
            page:0,
            size:20,
            commission:[]
        }
    },
    created(){
        this.getCommission();
    },
    methods: {
        getCommission(){
            var self = this;
            this.Http.get(this.Api.getCommission(),{
                page:self.page,
                size:self.size
            },function(result){
                for(var i = 0;i<result.data.commissions.lenght;i++){
                    commission.push(result.data.commissions[i]);
                }
            })
        }
    },
    components: {
        "app-header": Header
    }
}
</script>