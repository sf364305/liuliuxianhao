import Vue from 'vue'
import axios from 'axios'



//const base = 'http://api.66xianhao.com/front';

// Vue.prototype.serverHost = 'http://localhost:8081/';
Vue.prototype.serverHost = 'http://server.66mkt.com/';

// Vue.prototype.host = 'http://c.chovans.cn/';
Vue.prototype.host = 'http://api.66xianhao.com/';
const base = Vue.prototype.host + 'front';

//API,接口列表
Vue.prototype.Api = {
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
    getMyCollection() {
        return base + '/collection/getMyCollection';
    },
    down() {
        return base + '/goods/down';
    },
    deleteGoods() {
        return base + '/goods/deleteGoods';
    },
    checkTime() {
        return base + '/order/choose';
    },
    getQiniuImage() {
        return base + '/qiniu/getImage';
    },
    refundPay() {
        return base + '/order/refundList';
    },
    getRefunedList(){
        return base + '/order/refundList';
    },
    addFeedback(){
        return base + '/home/addFeedback';
    },
    getRecomend(){
        return base + '/common/recomendGoods';
    },
    getCollection(){
        return base + '/common/isCollect';
    },
    getServerUrl(){
        return base + '/utils/getServerUrl';
    },
    getOrderServerUrl(){
        return base + '/utils/getOrderServerUrl';
    },
    getOnlineServer(){
        return Vue.prototype.serverHost + '/open/checkServer';
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


        axios.post(api, params, {
            emulateJSON: true,
            headers: {
                'Content-Type': 'application/json;charse=UTF-8'
            }
        }).then((response) => {
            // 响应成功回调,错误统一处理
            console.log(api, JSON.stringify(params), response.data);
            if (response.data.code != 0) {
                Vue.prototype.$iosAlert(response.data.msg);
            }
            callback(response.data);
        }, (response) => {
            // 响应错误回调
            Vue.prototype.$iosAlert("网络不好哦~");
            console.error('请求错误');
        });
    },
    upload(param, config, callback) {
        alert("开始上传");
        axios.post('http://up-z2.qiniu.com', param, config, callback)
            .then(response => {
                console.log("上传返回", response.data);
                callback(response.data.key);
            })

    }
};

Vue.prototype.callWxPay = function (payInfo) {
    var self = this;
    wx.chooseWXPay({
        timestamp: payInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payInfo.nonceStr, // 支付签名随机串，不长于 32 位
        package: payInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: payInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: payInfo.paySign, // 支付签名
        success: function (res) {
            // 支付成功后的回调函数
            self.$router.push("/buy_success");
        },
        fail: function (res) {
            //接口调用失败时执行的回调函数。
            self.$iosAlert(result.msg);
        },
        complete: function (res) {
            //接口调用完成时执行的回调函数，无论成功或失败都会执行。
        },
        cancel: function (res) {
            //用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
            self.$iosAlert('用户取消');
        },
        trigger: function (res) {
            //监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
        }
    });
}

Vue.prototype.callServer = function (orderId) {
    console.log('/order_server/'+orderId);
    this.$router.push('/order_server/'+orderId);
    // Vue.prototype.$iosAlert("客服系统升级维护中，请暂时通过公众号联系平台，感谢您的支持！");
}

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