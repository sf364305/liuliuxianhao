<template>
  <div id="app">
      <div class="contianer">
        <!-- 路由中的几个组件在这里被渲染，默认被渲染的为第一个组件，也就是home组件  -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <vue-loading v-if="$store.state.Loading" type="spin" color="rgb(101, 186, 239)" :size="{ width: '20%', height: '20%' }" style="padding: 40%;transform: translateY(30%);z-index: 99999;position: absolute;left: 0;top: 0;"></vue-loading>
  </div>
</template>
<script>
import vueLoading from 'vue-loading-template'
export default{
    components: {
        vueLoading
    }
  
}
</script>

<style>
/*test*/
#app {
}
.nav-top {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -600px;
  z-index: 99;
}
.banner{
  width: 100%;
  height: 370px;
  overflow: hidden;
}
.footer {
  overflow: hidden;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: scale(1.2);
  opacity: 0;
}
</style>