<template>
  <div id="app">
    <div class="contianer">
      <!-- 路由中的几个组件在这里被渲染，默认被渲染的为第一个组件，也就是home组件  -->
      <keep-alive exclude="server">
        <!--<transition :name="transitionName">-->
        <router-view class="child-view"></router-view>
        <!--</transition>-->
      </keep-alive>
    </div>
    <div class="alertLoading">
      <div style="margin-top: 50%;text-align: center;">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
          <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
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
  }
}
</script>
<style>
.child-view {
  /*position: absolute;*/
  top: 0;
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