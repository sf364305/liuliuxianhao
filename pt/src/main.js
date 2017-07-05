// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
// 引入router路由
import Router from 'vue-router'
//  引入http
import Http from './http/Http'

// 引入项目的四个模块组件
import './assets/css/reset.css'
import './assets/css/style.css'
import './assets/js/jquery-1.11.3.min.js'
import './assets/js/common.js'
import './assets/js/touch.min.js'
import server from './components/server'
import home from './components/home'
import person from './components/person'
import my_sell from './components/my_sell'
import commodity from './components/commodity'
import detail from './components/detail'
import sure_order from './components/sure_order'
import buy from './components/buy'
import sell_infomation from './components/sell_infomation'
import lease_information from './components/lease_information'
import certification from './components/certification'
import certification_else from './components/certification_else'
import popularity from './components/popularity'
import popular_buy from './components/popular_buy'
import wait_send from './components/wait_send'
import all_order from './components/all_order'
import all_order_seller from './components/all_order_seller'
import my_code from './components/my_code'
// 使用router
Vue.use(Router)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    Setting: {},
    Categroy:[],
    Banner:[],
    Notices:[]
  },
  mutations: {
    setSetting(state, setting) {
      state.Setting = setting;
    },
    setCategroy(state,categroy){
      state.Categroy = categroy;
    },
    setNotices(state,notices){
      state.Notices = notices;
    }
  },
  getters: {
    getSetting: state => {
      return state.Setting;
    }
  }
})

// 定义路由
var routes = [{
  path: '/',
  component: home
}, {
  path: '/home',
  component: home
}, {
  path: '/server',
  component: server
}, {
  path: '/person',
  component: person
}, {
  path: '/my_sell',
  component: my_sell
}, {
  path: '/commodity',
  component: commodity
}, {
  path: '/detail',
  component: detail
}, {
  path: '/sure_order',
  component: sure_order
}, {
  path: '/buy',
  component: buy
}, {
  path: '/sell_infomation',
  component: sell_infomation
}, {
  path: '/lease_information',
  component: lease_information
}, {
  path: '/certification',
  component: certification
}, {
  path: '/certification_else',
  component: certification_else
}, {
  path: '/popularity',
  component: popularity
}, {
  path: '/popular_buy',
  component: popular_buy
}, {
  path: '/wait_send',
  component: wait_send
}, {
  path: '/all_order',
  component: all_order
}, {
  path: '/all_order_seller',
  component: all_order_seller
}, {
  path: '/my_code',
  component: my_code
}]
// 实例化路由
var vueRouter = new Router({
  routes
})
// 创建和挂载根实例
new Vue({
  el: '#app',
  store:store,
  router: vueRouter,
  template: '<App></App>',
  components: { App }
})