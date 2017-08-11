<template>
    <div class="detail-pictrue">
        <div class="detail-inner clearfix">
            <p class="detail-pic-left">
                点
                <br/>击
                <br/>图
                <br/>片
                <br/>查
                <br/>看
                <br/>大
                <br/>图
            </p>
            <div class="detail-pic-center" img-data="0" id="detailCenter">
                <img :src="$store.state.Setting.qiniuUrl + goods.goodsImages[0].qiniuKey" alt="" @click="clickBig" />
            </div>
            <div class="detail-pic-right">
                <div class="detail-right-inner" id="detailInner">
                    <div v-for="imgs in goods.goodsImages" :key="imgs.id">
                        <img :src="$store.state.Setting.qiniuUrl + imgs.qiniuKey" alt="" />
                    </div>
                </div>
                <div class="pic-top" @click="moveT"></div>
                <div class="pic-bottom" @click="moveT2"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
