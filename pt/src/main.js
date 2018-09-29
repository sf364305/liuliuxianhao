// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
// 引入router路由
import Router from 'vue-router'
//  引入http
import Http from './http/Http'
// 刷新 加载更多 https://github.com/wangdahoo/vue-scroller
import VueScroller from 'vue-scroller'
import iosAlertView from 'vue-ios-alertview'

// 引入项目的四个模块组件
import './assets/css/reset.css'
import './assets/css/animate.min.css'
import './assets/js/swiper.animate1.0.2.min.js'
import './assets/css/style.css'
import './assets/js/jquery-1.11.3.min.js'
//import './assets/js/zepto.js'
import './assets/js/mobiscroll_002.js'
import './assets/js/mobiscroll_004.js'
import './assets/css/mobiscroll_002.css'
import './assets/css/mobiscroll.css'
import './assets/js/mobiscroll.js'
import './assets/js/mobiscroll_003.js'
import './assets/js/mobiscroll_005.js'
import './assets/css/mobiscroll_003.css'
import './assets/js/common.js'
import loading from './templates/Loading'
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
import my_promotion from './components/my_promotion'
import income_con from './components/income_con'
import buy_success from './components/buy_success'
import buy_defeat from './components/buy_defeat'
import order_list from './components/order_list'
import order_list_merchant from './components/order_list_merchant'
import goods_list_merchant from './components/goods_list_merchant'
import goods_item_collect from './components/goods_item_collect'
import order_detail from './components/order_detail'
import refuned_list from './components/refuned_list'
import error_404 from './components/error_404'
import error_500 from './components/error_500'
import order_server from './components/order.server'
// 使用router
Vue.use(Router)
Vue.use(Vuex)
Vue.use(VueScroller)
Vue.use(iosAlertView);

const store = new Vuex.Store({
    state: {
        Setting: {},
        Categroy: [],
        Banner: [],
        Notices: [],
        User: {},
        FromView: new Array(),
        Goods: {},
        Order: {},
        Loading: false,
        IsSearch: false,
        GoodsCache: {},
        ReferencePage: null
    },
    mutations: {
        setReferencePage(state, page) {
            state.ReferencePage = page;
        },
        setGoodsCache(state, goods) {
            if (goods.id)
                state.GoodsCache[goods.id] = goods;
        },
        setSetting(state, setting) {
            state.Setting = setting;
        },
        setCategroy(state, categroy) {
            state.Categroy = categroy;
        },
        setNotices(state, notices) {
            state.Notices = notices;
        },
        setBanner(state, banners) {
            state.Banner = banners;
        },
        setUser(state, user) {
            state.User = user;
        },
        pushFrom(state, from) {
            state.FromView.push(from);
        },
        popFrom(state) {
            state.FromView.pop(); // = state.FromView.slice(0, state.FromView.length - 1);
        },
        clearFrom(state) {
            while (state.FromView.length > 1) {
                state.FromView.pop();
            }
        },
        setGoods(state, goods) {
            state.Goods = goods;
        },
        setOrder(state, order) {
            state.Order = order;
        },
        setLoading(state, loading) {
            state.Loading = loading;
        },
        setIsSearch(state, is) {
            state.IsSearch = is;
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
    component: loading,
    meta: {
      keepAlive: true
    }
}, {
    path: '/home',
    component: home,
    meta: {
      keepAlive: true
    }
}, {
    path: '/server',
    component: server,
    meta: {
      keepAlive: false
    }
}, {
    path: '/person',
    component: person,
    meta: {
      keepAlive: true
    }
}, {
    path: '/my_sell',
    component: my_sell,
    meta: {
      keepAlive: true
    }
}, {
    path: '/commodity/:id',
    component: commodity,
    meta: {
      keepAlive: true
    }
}, {
    path: '/detail/:id',
    component: detail,
    meta: {
      keepAlive: true
    }
}, {
    path: '/sure_order',
    component: sure_order,
    meta: {
      keepAlive: true
    }
}, {
    path: '/buy',
    component: buy,
    meta: {
      keepAlive: true
    }
}, {
    path: '/sell_infomation/:categoryId',
    component: sell_infomation,
    meta: {
      keepAlive: true
    }
}, {
    path: '/lease_information/:categoryId',
    component: lease_information,
    meta: {
      keepAlive: true
    }
}, {
    path: '/certification',
    component: certification,
    meta: {
      keepAlive: true
    }
}, {
    path: '/certification_else',
    component: certification_else,
    meta: {
      keepAlive: true
    }
}, {
    path: '/popularity',
    component: popularity,
    meta: {
      keepAlive: true
    }
}, {
    path: '/popular_buy',
    component: popular_buy,
    meta: {
      keepAlive: true
    }
}, {
    path: '/wait_send',
    component: wait_send,
    meta: {
      keepAlive: true
    }
}, {
    path: '/all_order',
    component: all_order,
    meta: {
      keepAlive: true
    }
}, {
    path: '/all_order_seller',
    component: all_order_seller,
    meta: {
      keepAlive: true
    }
}, {
    path: '/my_code',
    component: my_code,
    meta: {
      keepAlive: true
    }
}, {
    path: '/my_promotion',
    component: my_promotion,
    meta: {
      keepAlive: true
    }
}, {
    path: '/income_con',
    component: income_con,
    meta: {
      keepAlive: true
    }
}, {
    path: '/buy_success',
    component: buy_success,
    meta: {
      keepAlive: true
    }
}, {
    path: '/buy_defeat',
    component: buy_defeat,
    meta: {
      keepAlive: true
    }
}, {
    path: '/orders/:status',
    component: order_list,
    meta: {
      keepAlive: false
    }
}, {
    path: '/orders_merchant/:status',
    component: order_list_merchant,
    name:'order_list_merchant',
    meta: {
      keepAlive: false
    }
}, {
    path: '/goods_list_merchant/:status',
    component: goods_list_merchant,
    meta: {
      keepAlive: false
    }
}, {
    path: '/goods_item_collect/:status',
    component: goods_item_collect,
    meta: {
      keepAlive: false
    }
}, {
    path: '/order_detail/:id',
    component: order_detail,
    meta: {
      keepAlive: true
    }
}, {
    path: '/refunedList',
    component: refuned_list,
    meta: {
      keepAlive: false
    }
}, {
    path: '/error_404',
    component: error_404,
    meta: {
      keepAlive: true
    }
}, {
    path: '/error_500',
    component: error_500,
    meta: {
      keepAlive: true
    }
}, {
    path: '/order_server/:orderId',
    component: order_server,
    meta: {
      keepAlive: true
    }
}];

// 实例化路由
var vueRouter = new Router({
    routes
})

Router.prototype.goBack = function () {
    this.isBack = true
}

vueRouter.beforeEach((to, from, next) => {
    console.log(from.path);
    $(".alertLoading").fadeIn(100);
    var t = setTimeout(function () {
        if (to.path != "/") { // 判断该路由是否需要登录权限
            if (Vue.prototype.Http.token) { // 通过vuex state获取当前的token是否存在
                var v = vm.$store.state.FromView[vm.$store.state.FromView.length - 1];
                if (v == to.path) {
                    console.log("pop");
                    vm.$store.commit('popFrom');
                } else {
                    console.log("push");
                    vm.$store.commit('pushFrom', from.path);
                }
                //vm.Wx.register();
                next();
                // vm.Wx.register(window.location.href.split("#")[1]);
                console.log("当前路由：", vm.$store.state.FromView);
            } else {
                next({
                    path: '/'
                    // query: { redirect: from.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        } else {
            next();
        }
        clearTimeout(t);
    }, 100);

    _czc.push([to.path, to.path, from.path]);

})


vueRouter.afterEach((to, from) => {
    setTimeout(function () {
        $(".alertLoading").hide();
    }, to.fullPath.indexOf("detail") > 0 ? 600 : 300);
})

// 创建和挂载根实例
var vm = new Vue({
    el: '#app',
    store: store,
    router: vueRouter,
    template: '<App></App>',
    components: { App }
})
