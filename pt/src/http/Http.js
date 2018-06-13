import Vue from 'vue'
import axios from 'axios'

//开发环境
// Vue.prototype.host = 'http://localhost:8080/';
// Vue.prototype.serverHost = 'http://localhost:8081/';

//测试环境
//Vue.prototype.host = 'http://test.api.66mkt.com/';
//Vue.prototype.serverHost = 'http://test.server.66mkt.com/';
//正式环境
Vue.prototype.host = 'https://api.66xianhao.com/';
Vue.prototype.serverHost = 'https://server.66xianhao.com/';

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
    getGoodsInfor() {
        return base + '/common/getGoodsInfo';
    },
    confirmOrder() {
        return base + '/order/confirmOrder';
    },
    payOrder() {
        return base + '/order/payOrder';
        // return base + '/order/payOrder/v2';
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
    getRefunedList() {
        return base + '/order/refundList';
    },
    addFeedback() {
        return base + '/home/addFeedback';
    },
    getRecomend() {
        return base + '/common/recomendGoods';
    },
    getCollection() {
        return base + '/common/isCollect';
    },
    getServerUrl() {
        return base + '/utils/getServerUrl';
    },
    getOrderServerUrl() {
        return base + '/utils/getOrderServerUrl';
    },
    getOnlineServer() {
        return Vue.prototype.serverHost + 'open/checkServer';
    }
};

Vue.prototype.Wx = {
    config: {},
    register: function(page, goods,callback) {
        var self = this;
        var url = location.href.split('#')[0];
        Vue.prototype.Http.get(Vue.prototype.Api.getJsSign(), {
            url: url
        }, function (result) {
            self.config = result.data.config;
            console.log("config",result.data.config);
            // //注册微信
            if(self.config == undefined || !self.config){
                alert("注册失败")
                console.error("config error");
                return;
            }
    
            var config = self.config;
            var _link = config.link || "";
            var _img = "http://qiniu.66mkt.com/66.jpg";
            var _title = config.title;
            var _desc = config.desc;
            if (page) {
                if (_link.indexOf("?") > 0) {
                    _link = config.link + "&page=" + page;
                } else {
                    _link = config.link + "?page=" + page;
                }
            }
            if (goods && goods.goodsImages.length > 0) {
                _img = "http://qiniu.66mkt.com/" + goods.goodsImages[0].qiniuKey;
                _title = goods.name;
                _desc = goods.detail;
            }
    
            console.log("分享链接", _link);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: config.appId, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature, // 必填，签名，见附录1
                jsApiList: ["chooseWXPay", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "chooseImage", "previewImage", "uploadImage", "downloadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function() {
                wx.onMenuShareTimeline({
                    title: _title, // 分享标题
                    link: _link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: _img, // 分享图标
                    success: function() {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({
                    title: _title, // 分享标题
                    desc: _desc, // 分享描述
                    link: _link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: _img, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    success: function() {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareQQ({
                    title: _title, // 分享标题
                    desc: _desc, // 分享描述
                    link: _link, // 分享链接
                    imgUrl: _img, // 分享图标
                    success: function() {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });
    
                wx.onMenuShareQZone({
                    title: _title, // 分享标题
                    desc: _desc, // 分享描述
                    link: _link, // 分享链接
                    imgUrl: _img, // 分享图标
                    success: function() {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function() {
                        // 用户取消分享后执行的回调函数
                    }
                });

                if(callback){
                    callback();
                }
            })
            return true;
        },function(){})

        
    }
}

//Http基本类，统一处理
Vue.prototype.Http = {
    token: null,
    setToken(_token) {
        console.log('设置token：' + _token);
        this.token = _token;
    },
    get: function(api, params, callback,failcallback) {

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
            if (window.location.href.indexOf("localhost") > 0 ||
                window.location.href.indexOf("test") > 0 ||
                window.location.href.indexOf("c.chovans.cn") > 0) {
                console.info(api, JSON.stringify(params), response.data);
            }

            if (response.data.code != 0) {
                Vue.prototype.$iosAlert(response.data.msg);
            }
            callback(response.data);
        }, (response) => {
            // 响应错误回调
            // Vue.prototype.$iosAlert("网络不好哦~");
            if(failcallback) {
                window.document.cookie = "xianhao_token=" + ";path=/;expires=" + new Date().toGMTString();
                window.location.reload();
            }
            console.error('请求错误');
        });
    },
    upload(param, config, callback) {
        axios.post('https://up-z2.qbox.me', param, config,callback)
            .then(response => {
                callback(response.data.key);
            })
    }
};

Vue.prototype.callWxPay2 = function(payInfo) {
    var self = this;
    wx.chooseWXPay({
        timestamp: payInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payInfo.nonceStr, // 支付签名随机串，不长于 32 位
        package: payInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: payInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: payInfo.paySign, // 支付签名
        success: function(res) {
            // 支付成功后的回调函数
            self.$router.push("/buy_success");
        },
        fail: function(res) {
            //接口调用失败时执行的回调函数。
            self.$iosAlert(res.msg);
        },
        complete: function(res) {
            //接口调用完成时执行的回调函数，无论成功或失败都会执行。
        },
        cancel: function(res) {
            //用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
            self.$iosAlert('用户取消');
        },
        trigger: function(res) {
            //监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
        }
    });
}

Vue.prototype.callWxPay = function(payInfo) {
    var self = this;

    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId":payInfo.appId,     //公众号名称，由商户传入     
            "timeStamp":payInfo.timeStamp,         //时间戳，自1970年以来的秒数     
            "nonceStr":payInfo.nonceStr, //随机串     
            "package":payInfo.package,     
            "signType":payInfo.signType,         //微信签名方式：     
            "paySign":payInfo.paySign //微信签名 
        },
        function(res){     
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                // 支付成功后的回调函数
                self.$router.push("/buy_success");
            }else if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
                // 支付成功后的回调函数
                self.$iosAlert('用户取消');
            }else{
                self.$iosAlert(res.msg);
            }
        }
    ); 
}

Vue.prototype.callServer = function(orderId) {
    console.log('/order_server/' + orderId);
    this.$router.push('/order_server/' + orderId);
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

//右侧入