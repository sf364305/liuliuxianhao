<template>
    <div class="popularity">
        <app-header :header="title"></app-header>
        <div class="popularity-img">
            <img src="../assets/images/popula.png" alt="">
        </div>
        <div class="popularity-con">
            <h2>快速提高人气</h2>
            <p>快速提高人气快速提高人气快速提高人气快速提高人气快速提高人气快速提高人气快速提高人气快速提高人气</p>
        </div>
        <form action="" method="" class="popular-form">
            <div>
                <label for="">选择平台：</label>
                <div class="right">
                    <label v-for="g in goods" :key="g.id" @click="changePlat(g.id)">
                        <!--<input type="radio" checked="checked" name="sell" value="1"/>-->
                        <img :src="$store.state.Setting.qiniuUrl + g.img" class="" v-bind:class="{'show':(goodsId == g.id)}">
                        </img>
                    </label>
                </div>
    
            </div>
            <div>
                <label for="">选择人气：</label>
                <input type="number" placeholder="请输入数量" v-model="quantity" v-bind:change="cal()" class="papular-pla" />
            </div>
            <div>
                <label for="">选择类型：</label>
                <!--<div @click="changeType(0)" v-bind:class="{'popular-type-select':popularType == 0}" class="popular-type" style="margin-left:10%;"> 时 </div>-->
                <div @click="changeType(1)" v-bind:class="{'popular-type-select':popularType == 1}" class="popular-type"> 天 </div>
                <div @click="changeType(2)" v-bind:class="{'popular-type-select':popularType == 2}" class="popular-type"> 周 </div>
                <div @click="changeType(3)" v-bind:class="{'popular-type-select':popularType == 3}" class="popular-type"> 月 </div>
            </div>
            <div>
                <label for="">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：</label>
                <input type="text" placeholder="" name="" readOnly="true" :value="'￥'+price" class="papular-price" />
                <span class="papular-text">价目表</span>
            </div>
            <div>
                <label for="">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</label>
                <span class="papular-rem" @click="addLess">-</span>
                <input type="text" placeholder="" name="" :value="count" v-bind:change="cal()" class="papular-nub" />
                <span class="papular-add" @click="addNum">+</span>
            </div>
            <div>
                <label for="">开始时间：</label>
                <input class="papular-start" v-on:change="dateChange()" readonly="readonly" name="appDateTime" id="appDateTime" type="text" vaule="" v-model="times" placeholder="请选择开始时间">
            </div>
            <div>
                <label for="">结束时间：</label>
                <input type="text" placeholder="" name="" readOnly="true" class="papular-over" />
            </div>
            <div>
                <label for="">刷人气平台ID：</label>
                <input type="text" placeholder="请输入平台ID" name="" value="" class="papular-id" />
            </div>
            <div class="add-com-papular">
                <textarea id="detail" name="detail" maxlength="200" placeholder="输入备注信息" rows="4"></textarea>
            </div>
            <div class="popularity-sub" style="border:none;">
                <router-link to="/popular_buy" replace class="popularity-submit">立即下单</router-link>
            </div>
            <div class="alert-outer-papular" style="padding-left:0;">
                <div class="alert-plat-papular">
                    <div class="papular-plat-head clearfix">
                        <span class="papular-plat-cancel" @click="closePopu">取消</span>
                        <span class="papular-plat-sure" @click="surePopu">确定</span>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import '../assets/js/touch.min.js'
import Header from '../templates/Header.vue'
export default {
    name: 'popularity',
    data() {
        return {
            title: "人气专题",
            goodsId: "",
            goods: [],
            popularType: 0,
            count: 1,
            quantity: 1000,
            price: 0,
            startTime: "",
            endTime: ""
        }
    },
    created() {
        this.popularityGoods();
    },
    methods: {
        popularityGoods() {
            var self = this;
            this.Http.get(this.Api.popularityGoods(), null, function (result) {
                self.goods = [];
                self.goods = result.data.goodses;
            })
        },
        changePlat(id) {
            this.goodsId = id;
            this.cal();
        },
        changeType(type) {
            this.popularType = type;
            this.cal();
        },
        cal() {
            if (!this.goodsId || !this.popularType || !this.count || !this.quantity) {
                return;
            }
            var per = 1;
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id == this.goodsId) {
                    if (this.popularType == 0) {
                        per = this.goods[i].goodsPopularityInfo.hourPrice;
                    } else if (this.popularType == 1) {
                        per = this.goods[i].goodsPopularityInfo.dayPrice;
                    } else if (this.popularType == 2) {
                        per = this.goods[i].goodsPopularityInfo.weekPrice;
                    } else if (this.popularType == 3) {
                        per = this.goods[i].goodsPopularityInfo.monthPrice;
                    }
                }
            }

            this.price = per * this.count * this.quantity;
            if (this.startTime) {
                console.log("开始时间", this.startTime);
            }
        },
        dateAdd(interval, number, date) {
            switch (interval) {
                case "y ": {
                    date.setFullYear(date.getFullYear() + number);
                    return date;
                    break;
                }
                case "q ": {
                    date.setMonth(date.getMonth() + number * 3);
                    return date;
                    break;
                }
                case "m ": {
                    date.setMonth(date.getMonth() + number);
                    return date;
                    break;
                }
                case "w ": {
                    date.setDate(date.getDate() + number * 7);
                    return date;
                    break;
                }
                case "d ": {
                    date.setDate(date.getDate() + number);
                    return date;
                    break;
                }
                case "h ": {
                    date.setHours(date.getHours() + number);
                    return date;
                    break;
                }
                case "m ": {
                    date.setMinutes(date.getMinutes() + number);
                    return date;
                    break;
                }
                case "s ": {
                    date.setSeconds(date.getSeconds() + number);
                    return date;
                    break;
                }
                default: {
                    date.setDate(date.getDate() + number);
                    return date;
                    break;
                }
            }
        },
        dateChange() {
            debugger;
            console.log("chang");
            if (!$("#appDateTime").val())
                return;
            this.startTime = $("#appDateTime").val();
            var start = new Date(this.startTime);
            var unit = 'd';

            if (popularType == 0){
                unity ='h';
            }else if(popularType == 1){
                unity ='d';
            }else if(popularType == 2){
                unity ='w';
            }else if(popularType == 3){
                unity ='m';
            }

            var newDate = this.DateAdd(unit, count, start);
            console.log(newDate);
        },
        addLess: function () {
            var inp = $(".papular-nub").val();
            inp--;
            if (inp < 0) {
                inp = 0;
            }
            this.count = inp;
        },
        addNum: function () {
            var inp = $(".papular-nub").val();
            inp++;
            this.count = inp;
        },
        closePopu: function () {
            $(".alert-outer-papular").css("display", "none");
            $(".alert-plat-papular").animate({
                "bottom": "-22rem"
            }, 500)
        },
        changePupa: function () {
            $(".alert-outer-papular").css("display", "block");
            $(".alert-plat-papular").animate({
                "bottom": "0"
            }, 500);
            $(".papular-plat-choice").css("display", "block").siblings().css("display", "none");
        },
        changePlat1: function (e) {
            $(e.target).addClass('plat-show').parent().parent().siblings().find('span').removeClass('plat-show');
            var textA = $(e.target).parent().siblings('em').html();
            $(".alert-plat-papular").attr("data-text", textA);
        },
        surePopu: function () {
            var textB = $(".alert-plat-papular").attr("data-text");
            $(".papular-plat").val(textB);
            $(".alert-outer-papular").css("display", "none");
            $(".alert-plat-papular").animate({
                "bottom": "-22rem"
            }, 500)
        },
        changepPer: function () {
            $(".alert-outer-papular").css("display", "block");
            $(".alert-plat-papular").animate({
                "bottom": "0"
            }, 500);
            $(".alert-number-papular").css("display", "block").siblings().css("display", "none");
        },
        changepD: function () {
            $(".alert-outer-papular").css("display", "block");
            $(".alert-plat-papular").animate({
                "bottom": "0"
            }, 500);
            $(".alert-method-papular").css("display", "block").siblings().css("display", "none");
        },
    },
    mounted() {
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
            lang: 'zh',
            showNow: true,
            nowText: "今天",
            startYear: currYear - 10, //开始年份
            endYear: currYear + 10 //结束年份
        };

        $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
        var optDateTime = $.extend(opt['datetime'], opt['default']);
        var optTime = $.extend(opt['time'], opt['default']);
        $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
        $("#appTime").mobiscroll(optTime).time(optTime);
    },
    components: {
        "app-header": Header
    }
}
</script>