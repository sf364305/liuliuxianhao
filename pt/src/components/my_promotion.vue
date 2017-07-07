<template>
    <div class="my-promotion">
        <app-header :header="title"></app-header>
        <scroller :on-refresh="refresh" :on-infinite="infinite" ref="scroller" style="margin-top:4rem;">
            <ul class="promotion-pic clearfix">
                <li v-for="(u,index) in users" :key="u.id">
                    <img :src="u.avatar" />
                    <p>{{u.name}}</p>
                    <span>{{u.createOn}}</span>
                    <i>{{index+1}}.</i>
                </li>
            </ul>
        </scroller>
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
export default {
    name: 'my-promotion',
    data() {
        return {
            title: "我的推广",
            page: 0,
            size: 12,
            users: []
        }
    },
    activated() {
        this.getReferred();
    },
    methods: {
        getReferred(done) {
            var self = this;
            this.Http.get(this.Api.getReferred(), {
                page: self.page,
                size: self.size
            }, function (result) {
                for (var i = 0; i < result.data.users.length; i++) {
                    self.users.push(result.data.users[i]);
                }
                self.$refs.scroller.finishPullToRefresh();
                if (result.data.users.length > 0) {
                    if(done)
                        done();
                } else {
                    if(done)
                        done();
                    self.$refs.scroller.finishInfinite(true);
                }
            })
        },
        refresh(done) {
            this.page = 0;
            this.getReferred(done);
        },
        infinite(done) {
            this.page+=1;
            this.getReferred(done);
        }
    },
    components: {
        "app-header": Header
    }
}
</script>