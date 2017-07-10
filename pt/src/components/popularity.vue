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
                        <img :src="$store.state.Setting.qiniuUrl + g.goodsImages[0].qiniuKey" class="" v-bind:class="{'show':(goodsId == g.id)}">
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
                <div @click="changeType(1)" v-bind:class="{'popular-type-select':popularType == 1}" class="popular-type" style="margin-left:10%;"> 天 </div>
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
                <input class="papular-start" v-model="startTime" readonly="readonly" name="appDateTime" id="appDateTime" type="text" placeholder="请选择开始时间">
            </div>
            <div>
                <label for="">结束时间：</label>
                <input type="text" placeholder="结束时间" v-model="endTime" name="" readOnly="true" class="papular-over" />
            </div>
            <div>
                <label for="">刷人气平台ID：</label>
                <input type="text" v-model="targetId" placeholder="请输入平台ID" name="" value="" class="papular-id" />
            </div>
            <div class="add-com-papular">
                <textarea id="detail" v-model="comment" name="detail" maxlength="200" placeholder="输入备注信息" rows="4"></textarea>
            </div>
            <div class="popularity-sub" style="border:none;">
                <a @click="addOrder"  replace class="popularity-submit">立即下单</a>
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
            endTime: "",
            targetId: "",
            comment: ""
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
                this.dateChange();
            }
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
        addOrder() {
            var self = this;
            var param = {
                goodsId:this.goodsId,
                popularType: this.popularType,
                targetId: this.targetId,
                quantity: this.quantity,
                comment: this.comment,
                count: this.count,
                startTime:this.startTime
            }

            this.Http.get(this.Api.confirmPopularOrder(), param , function (result) {
                if (result.code === 0) {
                    self.$store.commit('setOrder', result.data.order);
                    self.$router.push("/popular_buy");
                } else {
                    self.$iosAlert(result.msg);
                }
            })

        },
        addLess: function () {
            this.count -= 1
            if (this.count < 0) {
                this.count = 0;
            }
        },
        addNum: function () {
            this.count += 1;
        }
    },
    mounted() {
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

        // $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
        var optDateTime = $.extend(opt['datetime'], opt['default']);
        var optTime = $.extend(opt['time'], opt['default']);
        $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
        // $("#appTime").mobiscroll(optTime).time(optTime);
    },
    components: {
        "app-header": Header
    }
}
</script>