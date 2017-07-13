<template>
    <div class="sure-order">
        <app-alert></app-alert>
        <app-header :header="title"></app-header>
    
        <div class="tobuy-tit">商品信息</div>
        <ul class="sure-inf">
            <li class="clearfix">
                <span>商品名称：</span>
                <em>{{goods.name}}</em>
            </li>
            <li class="clearfix">
                <span>所属平台：</span>
                <em>{{goods.category.name}}</em>
            </li>
            <li class="clearfix">
                <span>商品类型：</span>
                <em v-if="goods.type == 0">直播账号</em>
                <em v-if="goods.type == 1">租赁账号</em>
            </li>
    
        </ul>
        <ul class="sure-stock" v-if="goods.type == 0">
            <li class="clearfix">
                <span>当前库存：</span>
                <em>1个</em>
            </li>
            <li class="clearfix">
                <span>单价：</span>
                <em>{{goods.price}}元</em>
            </li>
        </ul>
    
        <ul class="sure-stock" v-if="goods.type == 1">
    
            <li class="clearfix">
                <span>类型：</span>
                <em>
                    <select v-model="leaseType" @change="cal()">
                        <option v-if="goods.goodsLeaseInfo.hourCost" value="0">时租</option>
                        <option v-if="goods.goodsLeaseInfo.dayCost" value="1">日租</option>
                        <option v-if="goods.goodsLeaseInfo.weekCost" value="2">周租</option>
                        <option v-if="goods.goodsLeaseInfo.monthCost" value="3">月租</option>
                    </select>
    
                    <input type="number" v-model="goodsNum" class="num" placeholder="请输入数量" @input="cal()" maxlength="5" />
                </em>
            </li>
            <li class="clearfix">
                <span>押金：</span>
                <em>
                    <span v-if="goods.goodsLeaseInfo.deposit==1">押一付一</span>
                    <span v-if="goods.goodsLeaseInfo.deposit==2">押二付一</span>
                    <span v-if="goods.goodsLeaseInfo.deposit==3">押三付一</span>
                </em>
            </li>
            <li class="clearfix">
                <span>时间：</span>
                <em style="height: 6.5rem;">
                    <input readonly="readonly" v-model="startTime" id="appDateTime" type="text" placeholder="请选择开始时间" style="height: 1.5rem; padding-left:3%; -webkit-user-select: none;"> 
                    <br/>
                    <input readonly="readonly" v-model="endTime" type="text" placeholder="请选择开始时间" style="height: 1.5rem; padding-left:3%;-webkit-user-select: none;"> 
                </em>
            </li>
    
        </ul>
    
        <div class="tobuy-inf">交易信息</div>
        <section class="sure-contact">
            <form id="form" action="" method="post">
                <div class="telephone clearfix">
                    <label for="">
                        <em>*</em>手机号码：</label>
                    <input type="number" name="phone" value="" pattern="[0-9]{11}" placeholder="请输入手机号码" maxlength="11" v-model="phone" :value="$store.state.User.phone" />
                </div>
                <div class="qq-number clearfix">
                    <label for="">
                        <em>*</em>联系Q&nbsp;Q：</label>
                    <input type="number" name="userqq" value="" placeholder="请输入联系QQ" v-model="qq" :value="$store.state.User.qq" />
                </div>
            </form>
        </section>
        <ul class="sure-price">
            <li class="clearfix">
                <span>购买数：</span>
                <!-- <input type="number" value="1" class="sure-num"/> -->
                <em v-if="goodsNum != '' && goods.type == 1">{{goodsNum}}</em>
                <em v-if="goodsNum == '' && goods.type == 1"></em>
                <em v-if="goods.type == 0">1</em>
            </li>
            <li class="clearfix">
                <span>原价格：</span>
                <em v-if="goods.type == 0">{{goods.price}}元</em>
                <em v-if="goods.type == 1 && lessCost[leaseType] > 0">
                    {{lessCost[leaseType] * goodsNum}}元
                </em>
                <em v-if="goods.type == 1 && lessCost[leaseType] == 0">
                    卖家暂不支持此种租赁方式
                </em>
            </li>
            <li class="clearfix">
                <span>实付价：</span>
                <em v-if="goods.type == 0">{{goods.price}}元</em>
    
                <em v-if="goods.type == 1 && lessCost[leaseType] > 0">
                    {{lessCost[leaseType] * goodsNum}}元 + {{lessCost[leaseType] * goods.goodsLeaseInfo.deposit}}元 = {{lessCost[leaseType] * goodsNum + lessCost[leaseType] * goods.goodsLeaseInfo.deposit}} 元
                </em>
                <em v-if="goods.type == 1 && lessCost[leaseType] == 0">
                    卖家暂不支持此种方式
                </em>
            </li>
        </ul>
        <div class="tobuy-outer">
            <div class="tobuy-prompt">*请确认您的信息准确无误，确保您的交易安全！</div>
            <div class="protocol">
                <span class="pro-check"></span>
                <a href="###">《六六交易平台服务协议》</a>
            </div>
            <div class="wallet-submit">
                <span @click="submitOrder" class="detail-pay">确认购买</span>
            </div>
        </div>
         <div class="alertLoading"></div> 
    </div>
</template>
<script>
import '../assets/js/touch.min.js'
import Alert from '../templates/Alert.vue'
import Header from '../templates/Header.vue'
export default {
    name: 'sure_order',
    data() {
        return {
            title: "确认订单",
            goods: { name: '', category: { name: '' } },
            goodsNum: "",
            leaseType: 0,
            lessCost: [0, 0, 0, 0],
            phone: "",
            qq: "",
            startTime: "",
            endTime: ""
        }
    },
    activated() {
        this.goods = this.$store.state.Goods;
        console.log("订单商品：", this.goods);
        if (this.goods.type == 1) {
            this.lessCost[0] = this.goods.goodsLeaseInfo.hourCost;
            this.lessCost[1] = this.goods.goodsLeaseInfo.dayCost;
            this.lessCost[2] = this.goods.goodsLeaseInfo.weekCost;
            this.lessCost[3] = this.goods.goodsLeaseInfo.monthCost;
        }
    },
    mounted() {
        var self = this;
        setTimeout(function () {
            self.initDatePicker();
        }, 1000);

    },
    methods: {
        cal() {
            if (!this.goodsNum || !this.startTime) {
                return;
            }
            var per = 1;
            if (this.leaseType == 0) {
                per = this.lessCost[0];
            } else if (this.leaseType == 1) {
                per = this.lessCost[1];
            } else if (this.leaseType == 2) {
                per = this.lessCost[2];
            } else if (this.leaseType == 3) {
                per = this.lessCost[3];
            }

            if (this.startTime) {
                this.dateChange();
                this.checkTime();
            }
        },
        submitOrder() {
            var self = this;
            if (!(/^1[34578]\d{9}$/.test(self.phone))) {
                this.$iosAlert("手机号码有误，请重填");
                return false;
            } else if (!(/^\d{6,12}$/.test(self.qq))) {
                this.$iosAlert("qq号码有误，请重填");
                return false;
            }else if(self.goods.type == 1 && !self.startTime){
                this.$iosAlert("请选择开始时间");
                return false;
            }
            var amount = 0;
            if (this.goods.type == 0) {
                amount = this.goods.price;
            } else if (this.goods.type == 1) {
                amount = this.lessCost[this.leaseType] * this.goodsNum + this.lessCost[this.leaseType] * this.goods.goodsLeaseInfo.deposit;
            }
            $(".alertLoading").css("display","block");
            self.$store.commit('setLoading', true);      
            this.Http.get(this.Api.confirmOrder(), {
                phone: self.phone,
                qq: self.qq,
                amount: amount,
                goodsId: self.goods.id,
                deposit: self.goods.goodsLeaseInfo == null ? "" : self.goods.goodsLeaseInfo.deposit,
                leaseType: self.leaseType,
                goodsNum: self.goodsNum,
                startTime:self.startTime
            }, function (result) {
                console.log(result)
                $(".alertLoading").css("display","none");
                self.$store.commit('setLoading', false);
                if (result.code === 0) {
                    var order = {
                        goodsName: result.data.goodsName,
                        amount: result.data.amount,
                        phone: result.data.phone,
                        qq: result.data.qq,
                        orderId: result.data.orderId
                    }
                    self.$store.commit('setOrder', order);
                    self.$router.push("/buy");
                }
            })
        },
        initDatePicker() {
            var self = this;
            var currYear = (new Date()).getFullYear();
            var opt = {};
            opt.date = { preset: 'date' };
            opt.datetime = { preset: 'datetime' };
            opt.time = { preset: 'time' };
            opt.default = {
                theme: 'android-ics light', //皮肤样式
                display: 'modal', //显示方式 
                mode: 'scroller', //日期选择模式
                dateFormat: 'yyyy-mm-dd',
                timeFormat: 'HH:mm:ss',
                lang: 'zh',
                showNow: true,
                nowText: "今天",
                startYear: currYear - 10, //开始年份
                endYear: currYear + 10,//结束年份
                onSelect: function (valueText, inst) {
                    self.startTime = valueText;
                    self.cal();
                }
            };

            console.log("初始化时间控件");
            var optDateTime = $.extend(opt['datetime'], opt['default']);
            var optTime = $.extend(opt['time'], opt['default']);
            $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
        },
        dateChange() {
            var self = this;
            this.Http.get(this.Api.calDate(), {
                startTime:self.startTime,
                num:self.goodsNum,
                type:self.leaseType
            }, function (result) {
                self.endTime = result.data.endTime;
            })
        },
        checkTime(){
            var self = this;
            this.Http.get(this.Api.checkTime(), {
                goodsId:self.goods.id,
                startTime:self.startTime,
                goodsNum:self.goodsNum,
                leaseType:self.leaseType
            }, function (result) {
                if(result.data.result){
                    self.$iosAlert("您选择的时间与其他用户冲突");
                }
            })
        }
    },
    components: {
        'app-header': Header,
        'app-alert': Alert
    }
}
</script>