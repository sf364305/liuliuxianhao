<template>
    <div class="swiper-container banner-index">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="banner in banners" :key=banner.id style="overflow: hidden;height:12rem;">
                <a :href="banner.url" v-if="banner.url.startsWith('http:')">
                    <img :src="$store.state.Setting.qiniuUrl + banner.qiniuKey" alt="">
                </a>
                <a href="javascript:void(0);" v-if="!banner.url.startsWith('http:')">
                    <img :src="$store.state.Setting.qiniuUrl + banner.qiniuKey" alt="">
                </a>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
    name: 'banner',
    data() {
        return {
            banners: []
        }
    },
    created() {
        this.getBanner();
    },
    methods: {
        getBanner() {
            var that = this;
            this.Http.get(this.Api.getBanners(), null, function (result) {
                that.banners = result.data.banners;
                //当dom发生变化，更新后执行的回调
                that.$nextTick(function () {
                    this.show();
                })
            })
        },
        show() {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                loop: true,
                speed: 600,
                autoplay: 2000,
                onTouchEnd: function () {
                    swiper.startAutoplay()
                }
            });
        }
    },
    mounted() {
        console.log('mounted', this);
    }
}
</script>
<style>
.banner-index img {
    display: block;
    width: 100%;
    height: 20rem;
}
</style>