<template>
    <div class="popularity">
        <app-header :header="title"></app-header>
        <scroller  ref="scroller" style="margin-bottom:4rem;margin-top:4rem;">
            <div class="popularity-img">
                <img src="../assets/images/popula.png" alt="">
            </div>
            <div class="popularity-con">
                <h2>快速提高人气</h2>
                <p>由于最近平台规则改动频繁，价格有所变动，下单前请与客服联系，资讯最新价格再下单，谢谢配合。</p>
            </div>
            <form action="" method="" class="popular-form">
                <div>
                    <label for="">选择平台：</label>
                    <span type="text" placeholder="" name="" readOnly="true" value="点击选择 ∨" @click="changePupa" class="papular-plat" id="popularText">点击选择 ∨</span>
                </div>
                <div class="clearfix">
                    <label for="" style="width: 20%;">选择人气：</label>
                    <!--<input type="number" v-model="quantity" v-bind:change="cal()" class="papular-pla" />-->
                    <div class="pop-right clearfix" style="float: left;width: 70%; margin-left:8%;">                      
                        <div type="number" v-bind:class="{'popular-type-select':quantity == 5000}" @click="getNum(5000)" style="" class="popular-number" value="5000">5000</div>
                        <div type="number" v-bind:class="{'popular-type-select':quantity == 15000}" @click="getNum(15000)" class="popular-number">15000</div>
                        <div type="number" v-bind:class="{'popular-type-select':quantity == 25000}" @click="getNum(25000)" class="popular-number">25000</div>
                        <div type="number" v-bind:class="{'popular-type-select':quantity == 35000}" @click="getNum(35000)" class="popular-number" style="">35000</div>
                    </div>
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
            </form>
        </scroller>
        <div class="alert-outer-papular" v-bind:class="{ 'outer-papular': isAle }" style="padding-left:0;">
            <div class="alert-plat-papular" id="alertPlat">
                <div class="papular-plat-head clearfix">
                    <span class="papular-plat-cancel" @click="closePopu">取消</span>
                    <span class="papular-plat-sure" @click="surePopu">确定</span>
                </div>
                <div>
                    <div class="papular-plat-choice clearfix" id="popularPlat">
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
            isAle: false,
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
                document.getElementById('alertPlat').setAttribute("data-id", self.goodsId);
            })
        },
        getNum(num) {
            this.quantity = num;
        },
        changePupa() {
            //添加阻止事件
            document.addEventListener("touchmove", function (e) {    //禁止浏览器默认行为
                e.preventDefault();
            }, false);
            this.isAle = true;
            var elent = document.getElementById('alertPlat');
            var eleH = elent.offsetHeight;
            elent.style.bottom = 0;
            //this.$refs.scroller.scrollTo(0,500,true);
        },
        closePopu() {
            var dataId = document.getElementById('popularPlat').getAttribute("data-id");
            this.goodsId = dataId;
            this.isAle = false;
        },
        surePopu: function () {
            var popularPlat = document.getElementById('popularPlat');
            var popularPlatL = popularPlat.getElementsByTagName('label');
            popularPlat.setAttribute("data-id", this.goodsId);
            for (var i = 0; i < popularPlatL.length; i++) {
                var bool = popularPlatL[i].firstChild.className.split(' ').length;
                if (bool == 3) {
                    var textB = popularPlatL[i].lastChild.innerHTML;
                }
            }
            document.getElementById('popularText').innerHTML = textB;
            this.isAle = false;  
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
                        per = this.goods[i].goodsPopularityInfo.hourPrice * 10000;
                    } else if (this.popularType == 1) {
                        per = this.goods[i].goodsPopularityInfo.dayPrice * 10000;
                    } else if (this.popularType == 2) {
                        per = this.goods[i].goodsPopularityInfo.weekPrice * 10000;
                    } else if (this.popularType == 3) {
                        per = this.goods[i].goodsPopularityInfo.monthPrice * 10000;
                    }
                }
            }
            this.price = (Math.round(per) * this.count * this.quantity)/10000;
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