import Vue from 'vue'
import axios from 'axios'


// const base = 'http://localhost:8080/front';
const base = 'http://c.chovans.cn/front';

Vue.prototype.Setting = null;
//API,接口列表
Vue.prototype.Api = {
    getToken() {
        return base + '/utils/getToken';
    },
    getQiniuToken() {
        return base + '/utils/getUploadToken';
    },
    getNotices() {
        return base + '/common/getNotices';
    },
    getCategroy() {
        return base + '/home/getCategory';
    },
    getConfig() {
        return base + '/home/getConfig';
    },
    getBanners() {
        return base + '/home/getBanners';
    },
    addGoods() {
        return base + '/sale/addGoods';
    },
    getGoodsList() {
        return base + '/common/getGoodsList';
    },
    getHomeGoodsList() {
        return base + '/home/getHomeGoodsList';
    },
    getUserInfo() {
        return base + '/user/getUserInfo';
    }
};

//Http基本类，统一处理
Vue.prototype.Http = {
    token: null,
    setToken(_token) {
        console.log('设置token：' + _token);
        this.token = _token;
    },
    get: function (api, params, callback) {

        if (!api) {
            console.error('url is empty');
            return;
        }

        //添加请求token
        if (params === null) {
            params = {};
        }
        // debugger;
        if (api !== Vue.prototype.Api.getToken()) {
            params.token = this.token;
        }
        console.log("参数：" + JSON.stringify(params));

        axios.post(api, params, {
            emulateJSON: true,
            headers: {
                'Content-Type': 'application/json;charse=UTF-8'
            }
        }).then((response) => {
            // 响应成功回调
            callback(response.data);
        }, (response) => {
            // 响应错误回调
            console.error('请求错误');
        });
    }
};

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (!Vue.prototype.Http.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            // debugger;
             Vue.$route.push('/');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });