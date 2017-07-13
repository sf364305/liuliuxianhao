<template>
    <div class="popularity">
        <app-header :header="title"></app-header>
        <div class="popularity-img">
            <img src="../assets/images/popula.png" alt="">
        </div>
        <div class="popularity-con">
            <h2>快速提高人气</h2>
            <!-- <p>快速提高人气快速提高人气快速提高人气快速提高人气快速提高人气快速提高人气快速提高人气快速提高人气</p> -->
        </div>
        <form action="" method="" class="popular-form">
            <div>
                <label for="">选择平台：</label>
                <span type="text" placeholder="" name="" readOnly="true" value="点击选择 ∨" @click="changePupa" class="papular-plat">点击选择 ∨</span>
            </div>
            <div>
                <label for="">选择人气：</label>
                <!--<input type="number" v-model="quantity" v-bind:change="cal()" class="papular-pla" />-->
                <div type="number" v-bind:class="{'popular-type-select':quantity == 5000}" @click="getNum(5000)" style="margin-left:10%;" class="popular-number" value="5000">5000</div>
                <div type="number" v-bind:class="{'popular-type-select':quantity == 15000}" @click="getNum(15000)" class="popular-number" value="15000">15000</div>
                <div type="number" v-bind:class="{'popular-type-select':quantity == 25000}" @click="getNum(25000)" class="popular-number" value="25000">25000</div>
                <div type="number" v-bind:class="{'popular-type-select':quantity == 35000}" @click="getNum(35000)" class="popular-number" value="35000" style="margin-left:10%;">35000</div>
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
                <input type="text" placeholder="" name="" readOnly="true" :value="'￥'+price" class="papular-price" unselectable="on" />
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
                <input class="papular-start" v-model="startTime" readonly="readonly" name="appDateTime" id="appDateTime" type="text" placeholder="请选择开始时间" style="-webkit-user-select: none;" unselectable="on">
            </div>
            <div>
                <label for="">结束时间：</label>
                <input type="text" placeholder="结束时间" v-model="endTime" name="" readOnly="true" class="papular-over" unselectable="on" style="-webkit-user-select: none;" />
            </div>
            <div>
                <label for="">刷人气平台ID：</label>
                <input type="text" v-model="targetId" placeholder="请输入平台ID" name="" value="" class="papular-id" />
            </div>
            <div class="add-com-papular">
                <textarea id="detail" v-model="comment" name="detail" maxlength="200" placeholder="输入备注信息" rows="4"></textarea>
            </div>
            <div class="popularity-sub" style="border:none;">
                <a @click="addOrder" replace class="popularity-submit">立即下单</a>
            </div>
            <div class="alert-outer-papular" style="padding-left:0;">
                <div class="alert-plat-papular">
                    <div class="papular-plat-head clearfix">
                        <span class="papular-plat-cancel" @click="closePopu">取消</span>
                        <span class="papular-plat-sure" @click="surePopu">确定</span>
                    </div>
                    <div>
                        <div class="papular-plat-choice clearfix">
                            <label v-for="g in goods" :key="g.id">
                                <!--<input type="radio" checked="checked" name="sell" value="1"/>-->
                                <img :src="$store.state.Setting.qiniuUrl + g.goodsImages[0].qiniuKey" class="choice-sho-platform choiced-ying-platform" v-bind:class="{'show':(goodsId == g.id)}" @click="changePlat(g.id)">
                                </img>
                                <em class="choice-text-platform">{{g.name}}</em>
                            </label>
                        </div>
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
            mobiscrollInstance:null,
            title: "人气专题",
            goodsId: "",
            goods: [],
            popularType: 1,
            count: 1,
            quantity: "",
            price: 0,
            startTime: "",
            endTime: "",
            targetId: "",
            comment: "",
            id: '',
            popularNum: '',
        }
    },
    created() {
        
    },
    activated(){
        this.bindDate();
        this.popularityGoods();
    },
    methods: {
        popularityGoods() {
            var self = this;
            this.Http.get(this.Api.popularityGoods(), null, function (result) {
                self.goods = [];
                self.goods = result.data.goodses;
                self.goodsId = self.goods[0].id;
                $(".alert-plat-papular").attr("data-id", self.goodsId);
            })
        },
        getNum(num) {
            this.quantity = num;
        },
        changePupa() {
            //var daId = $(".alert-plat-papular").attr("data-id");
            $(".alert-outer-papular").css("display", "block");
            $(".alert-plat-papular").animate({
                "bottom": "0"
            }, 500);
            $(".papular-plat-choice").css("display", "block").siblings().css("display", "none");
        },
        closePopu() {
            var dataId = $(".alert-plat-papular").attr("data-id");
            this.goodsId = dataId;
            $(".alert-outer-papular").css("display", "none");
            $(".alert-plat-papular").animate({
                "bottom": "-22rem"
            }, 500)
        },
        surePopu: function () {
            $(".alert-plat-papular").attr("data-id", this.goodsId);
            for (var i = 0; i < $(".papular-plat-choice label").length; i++) {
                var bool = $(".papular-plat-choice label").eq(i).find("img").hasClass("show");
                if (bool == true) {
                    var textB = $(".papular-plat-choice label").eq(i).find("img").siblings("em").html();
                }
            }
            $(".papular-plat").text(textB);
            $(".alert-outer-papular").css("display", "none");
            $(".alert-plat-papular").animate({
                "bottom": "-22rem"
            }, 500)
        },
        changePlat(id) {
            this.goodsId = id;
            this.cal();
        },
        changeType(type) {
            this.popularType = type;
            this.cal();
            this.boolGet();
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
        },
        boolGet() {
            if (this.startTime != "") {
                this.dateChange();
            }
        },
        dateChange() {
            var self = this;
            this.Http.get(this.Api.calDate(), {
                startTime: self.startTime,
                num: self.count,
                type: self.popularType
            }, function (result) {
                self.endTime = result.data.endTime;
            })
        },
        addOrder() {
            var self = this;
            var param = {
                goodsId: this.goodsId,
                popularType: this.popularType,
                targetId: this.targetId,
                quantity: this.quantity,
                comment: this.comment,
                count: this.count,
                startTime: this.startTime
            }

            this.Http.get(this.Api.confirmPopularOrder(), param, function (result) {
                if (result.code === 0) {
                    console.log(result)
                    self.$store.commit('setOrder', result.data.order);
                    self.$router.push("/popular_buy");
                }
            })

        },
        addLess() {
            this.count -= 1
            if (this.count < 1) {
                this.count = 1;
            }
            this.boolGet();
        },
        addNum(){
            this.count += 1;
            this.boolGet();
        },
        bindDate() {
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
                    if (self.startTime != "") {
                        self.dateChange();
                    }
                }
            };
            var optDateTime = $.extend(opt['datetime'], opt['default']);
            var optTime = $.extend(opt['time'], opt['default']);
            self.mobiscrollInstance = $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
            // self.mobiscrollInstance.hide()
            // debugger;
        },
    },
    deactivated() {
        // self.mobiscrollInstance.hide()
    },
    destroyed() {
        // self.mobiscrollInstance.hide()
    },
    components: {
        "app-header": Header
    }
}
</script>