import Vue from 'vue'
import axios from 'axios'


// const base = 'http://localhost:8080/front';

const base = 'http://d9s0anp.hk1.mofasuidao.cn/front';
//const base = 'http://192.168.0.118:8081/front';
//const base = 'http://c.chovans.cn/front';

//API,接口列表
Vue.prototype.Api = {
    getConfig() {
        return base + '/home/getConfig'
    },
    getJsSign() {
        return base + '/utils/getJsSign'
    },
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
    },
    getQrCode() {
        return base + '/user/getQrCode';
    },
    getReferred() {
        return base + '/user/getReferred';
    },
    getCommission() {
        return base + '/user/getCommission';
    },
    getBuyInfoByStatus() {
        return base + '/order/getBuyInfoByStatus';
    },
    getMerchantInfoByStatus() {
        return base + '/order/getMerchantInfoByStatus';
    },
    getGoodsInfo() {
        return base + '/common/getGoodsInfo';
    },
    confirmOrder() {
        return base + '/order/confirmOrder';
    },
    payOrder() {
        return base + '/order/payOrder';
    },
    collection() {
        return base + '/collection/collect';
    },
    getCode() {
        return base + '/user/getCode';
    },
    deleteReOrder() {
        return base + '/order/delete';
    },
    cancelOrder() {
        return base + '/order/exit';
    },
    getOrderGoodsDetail() {
        return base + '/order/getOrderGoodsDetail';
    },
    sureOrder() {
        return base + '/order/sure';
    },
    arbitrationOrder() {
        return base + '/order/arbitration';
    },
    verified() {
        return base + '/user/certification';
    },
    popularityGoods() {
        return base + '/goods/popularityGoods';
    },
    confirmPopularOrder() {
        return base + '/order/confirmPopularOrder';
    },
    getUpGoods() {
        return base + '/goods/upGoods';
    },
    getDownGoods() {
        return base + '/goods/downGoods';
    },
    getComidityGoods() {
        return base + '/goods/goodsStatus';
    },
    calDate() {
        return base + '/utils/calDate';
    },
    getCollection() {
        return base + '/collection/getMyCollection';
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
            console.log(api, response.data);
            callback(response.data);
        }, (response) => {
            // 响应错误回调
            console.error('请求错误');
        });
    },
    upload(param, config, callback) {
        axios.post('http://up-z2.qiniu.com', param, config, callback)
            .then(response => {
                console.log("上传返回", response.data);
                callback(response.data.key);
            })

    }
};

// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         if (!Vue.prototype.Http.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//             // debugger;
//              Vue.$route.push('/');
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });