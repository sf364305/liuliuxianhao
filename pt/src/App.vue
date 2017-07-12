<template>
  <div id="app">
    <div class="contianer">
      <!-- 路由中的几个组件在这里被渲染，默认被渲染的为第一个组件，也就是home组件  -->
      <keep-alive>
      <!--<transition :name="transitionName">-->
        <router-view class="child-view"></router-view>
      <!--</transition>-->
      </keep-alive>
    </div>
    <vue-loading v-if="$store.state.Loading" type="bubbles" color="#666" :size="{ width: '20%', height: '20%' }" style="padding: 40%;transform: translateY(30%);z-index: 100;position: absolute;left: 0;top: 0;"></vue-loading>
  </div>
</template>
<script>
import vueLoading from 'vue-loading-template'
export default {
  data() {
    return {
      transitionName: 'slide-left'
    }
  }
  , beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack
    if (isBack) {
    this.transitionName = 'slide-right'
    } else {
    this.transitionName = 'slide-left'
    }
    this.$router.isBack = false
    next()
  },
  components: {
    vueLoading
  }
}
</script>
<style>
.child-view {
  /*position: absolute;*/
  top:0;
  left: 0;
  width: 100%;
  transition: all .8s cubic-bezier(.55, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 1;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}

.nav-top {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -600px;
  z-index: 99;
}

.banner {
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

.slide-fade-enter,
.slide-fade-leave-active {
  transform: scale(1.2);
  opacity: 0;
}
</style>