import Vue from 'vue'
import axios from 'axios'


// const base = 'http://localhost:8080/front';
const base = 'http://c.chovans.cn/front';

//API,接口列表
Vue.prototype.Api = {
    getToken(){
        return base + '/utils/getToken';
    },
    getQiniuToken(){
        return base + '/utils/getUploadToken';
    } ,
    getNotices(){
        return base+'/common/getNotices';
    }
};

//Http基本类，统一处理
Vue.prototype.Http = {
    token:null,
    setToken(_token){
        console.log("设置token："+_token);
        this.token = _token;
    },
    get: function (api, params, callback) {

        if (!api) {
            console.error('url is empty');
            return;
        }

        //添加请求token
        if(params === null){
            params = {};
        }
        // debugger;
        if(api !== Vue.prototype.Api.getToken()){
            params.token = this.token;
        }
        console.log("参数："+JSON.stringify(params));

        axios.post(api, params,{emulateJSON: true}).then((response) => {
            // 响应成功回调
            callback(response.data);
        }, (response) => {
            // 响应错误回调
            console.error('请求错误');
        });
    }
};