<template>
    <div class="commodity">
        <header class="index-logo-com" id="index-logo">
            <form action="" method="post" class="search-key">
                <div style="border-radius:20px;border:1px solid #aaa;">
                    <input type="text" value="" name="" class="search-word" placeholder="请输入您想要查找的关键字" v-model="condition.keyword" style="width:85%;margin-left:5%;font-size:1rem;">
                    <a class="search-index-com" replace @click="searchAll"></a>
                </div>
            </form>
            <span class="return-back" @click="back"></span>
        </header>
        <ul class="com-choice clearfix">
            <li class="com-text comtext-show" @click="change1">商品类型</li>
            <li class="com-text2" @click="change2">筛选</li>
            <li class="com-text3" @click="change3">默认排序</li>
        </ul>
        <div class="alert-com-outer" @click="closeA"></div>
        <ul class="alert-com">
            <li class="alert-com-diff">
                <label class="alert-all-dif" @click="changeType('')">
                    <span style="width:87%;" v-if="condition.type === ''" class="com-sell-all chioced-comd">>全部</span>
                    <span style="width:87%;" v-else class="com-sell-all">全部</span>
                </label>
                <label class="alert-all-dif" @click="changeType(0)">
                    <span style="width:87%;" v-if="condition.type == '0'" class="com-sell chioced-comd">>买卖</span>
                    <span style="width:87%;" v-else class="com-sell">买卖</span>
                </label>
                <label class="alert-all-dif" @click="changeType(1)">
                    <span style="width:87%;" v-if="condition.type == '1'" class="com-lease chioced-comd">>租赁</span>
                    <span style="width:87%;" v-else class="com-lease">租赁</span>
                </label>
            </li>
            <li class="alert-com-inf alert-com-show">
                <form action="" method="post">
                    <!--<div class="clearfix">
                                <label for="">关键词：</label>
                                <input v-model="condition.keyword" type="text" value="" name="" class="key-word" placeholder="请输入想查找的关键信息" style="border: none;width: 75%;text-align: left;">
                            </div>-->
                    <div class="plat-comm clearfix">
                        <span>平台：</span>
                        <label>
                            <input type="radio" checked="checked" name="plat" value=""></input>
                            <i class="choice-sho" v-bind:class="{'choiced-show':!condition.categoryId}" @click="changePlat('')"></i>
                            <em class="choice-text">全部</em>
                        </label>
                        <label v-for="(c,index) in $store.state.Categroy" v-bind:key="c.id">
                            <input type="radio" v-model="condition.categoryId" name="plat" :value="c.id"></input>
                            <i class="choice-sho" v-bind:class="{'choiced-show':condition.categoryId == c.id}" @click="changePlat(index)"></i>
                            <em class="choice-text">{{c.name}}</em>
                        </label>
                    </div>
                    <div class="clearfix">
                        <label for="">价格范围：</label>
                        <input type="number" v-model="condition.minPrice" value="" name="" class="key-price" placeholder="0">
                        <i>-</i>
                        <input type="number" v-model="condition.maxPrice" value="" name="" class="key-price2" placeholder="200000">
                    </div>
                    <div class="clearfix">
                        <label for="">等级：</label>
                        <input type="number" v-model="condition.minLevel" value="" name="" class="key-leve" placeholder="0">
                        <i>-</i>
                        <input type="number" v-model="condition.maxLevel" value="" name="" class="key-leve2" placeholder="999">
                    </div>
                    <div class="sex-com clearfix">
                        <span>性别：</span>
                        <label>
                            <input v-model="condition.sex" type="radio" checked="checked" name="sex" value=""></input>
                            <i class="choice-sho" v-bind:class="{'choiced-show':condition.sex===''}" @click="changeSex('')"></i>
                            <em class="choice-text">不限</em>
                        </label>
                        <label>
                            <input v-model="condition.sex" type="radio" name="sex" value="0"></input>
                            <i class="choice-sho" v-bind:class="{'choiced-show':condition.sex == '0'}" @click="changeSex(0)"></i>
                            <em class="choice-text">男</em>
                        </label>
                        <label>
                            <input v-model="condition.sex" type="radio" name="sex" value="1"></input>
                            <i class="choice-sho" v-bind:class="{'choiced-show':condition.sex == '1'}" @click="changeSex(1)"></i>
                            <em class="choice-text">女</em>
                        </label>
                    </div>
                    <div class="bind-com clearfix">
                        <span>绑定情况：</span>
                        <label>
                            <input v-model="condition.bind" type="radio" checked="checked" name="bind" value="1"></input>
                            <i class="choice-sho" v-bind:class="{'choiced-show':condition.bind == 1}" @click="changeBind(1)"></i>
                            <em class="choice-text">手机</em>
                        </label>
                        <label>
                            <input v-model="condition.bind" type="radio" name="bind" value="2"></input>
                            <i class="choice-sho" v-bind:class="{'choiced-show':condition.bind == 2}" @click="changeBind(2)"></i>
                            <em class="choice-text">邮箱</em>
                        </label>
                        <label>
                            <input v-model="condition.bind" type="radio" name="bind" value="3"></input>
                            <i class="choice-sho" v-bind:class="{'choiced-show':condition.bind == 3}" @click="changeBind(3)"></i>
                            <em class="choice-text">无绑定</em>
                        </label>
                    </div>
                    <div class="certification-com clearfix">
                        <span>身份认证：</span>
                        <label>
                            <input v-model="condition.identification" type="radio" checked="checked" name="identification" value="2"></input>
                            <i class="choice-sho" v-bind:class="{'choiced-show':condition.identification == 2}" @click="changeIden(2)"></i>
                            <em class="choice-text">已认证</em>
                        </label>
                        <label>
                            <input v-model="condition.identification" type="radio" name="identification" value="1"></input>
                            <i class="choice-sho" v-bind:class="{'choiced-show':condition.identification == 1}" @click="changeIden(1)"></i>
                            <em class="choice-text">未认证</em>
                        </label>
                    </div>
                    <div class="com-sub">
                        <input type="reset" name="" value="重置" class="com-reset" @click="reset()"></input>
                        <input type="button" name="" value="确定" class="com-submit" @click="submit(true)"></input>
                    </div>
                </form>
            </li>
            <li class="alert-com-time">
                <div class="price-sort">
                    <label class="alert-all-dif" @click="submit(true)">
                        <em v-if="condition.sort===''" class="com-time-show">>默认排序</em>
                        <em v-else class="">默认排序</em>
                        <input v-model="condition.sort" type="radio" value="" name="price" class="key-word" checked="checked">
                        <span>（按时间倒序）</span>
                    </label>
                    <label class="alert-all-dif" @click="submit(true)">
                        <em v-if="condition.sort==1" class="com-time-show">>价格↓</em>
                        <em v-else class="">价格↓</em>
                        <input v-model="condition.sort" type="radio" value="1" name="price" class="key-word" checked="checked">
                        <span style="padding-left: 20%">（按价格从高到低）</span>
                    </label>
                    <label class="alert-all-dif" @click="submit(true)">
                        <em v-if="condition.sort=='0'" class="com-time-show">>价格↑</em>
                        <em v-else class="">价格↑</em>
                        <span style="padding-left: 20%">（按价格从低到高）</span>
                        <input v-model="condition.sort" type="radio" value="0" name="price" class="key-word" placeholder="">
                    </label>
                </div>
            </li>
        </ul>
        <scroller :on-infinite="infinite" ref="scroller" style="margin-top:7rem;">
            <app-goods :goods="goods"></app-goods>
        </scroller>
    </div>
</template>
<style>

</style>
<script>
import Goods from '../templates/Goods.vue'
import Header from '../templates/Header.vue'
export default {
    name: 'detail',
    data() {
        return {
            goods: [],
            condition: {
                type: "",
                keyword: "",
                categoryId: "",
                sort: "",
                minPrice: "",
                maxPrice: "",
                minLevel: "",
                maxLevel: "",
                sex: "",
                bind: "",
                identification: "",
                page: 0,
                size: 20
            },
            title: "商品列表",
        }
    },
    activated() {
        this.goods = [];
        if (this.$store.state.IsSearch == false) {
            this.reset();
            if (this.$route.params.id == "0" || this.$route.params.id == "1") {
                this.condition.type = this.$route.params.id;
                this.condition.categoryId = "";
            } else {
                this.condition.categoryId = this.$route.params.id;
                if (this.$route.params.id != "all") {
                    this.condition.keyword = this.$route.params.id;
                }
            }
            
        }

        this.submit();
        this.$store.commit('setIsSearch', false);


    },
    methods: {
        back() {
            var v = this.$store.state.FromView[this.$store.state.FromView.length - 1];
            this.$router.push(v);
            console.log("跳转页面", v);
            // this.$router.back(-1);
        },
        reset() {
            //进入重置搜索条件
            this.condition = {
                type: "",
                keyword: "",
                categoryId: "",
                sort: "",
                minPrice: "",
                maxPrice: "",
                minLevel: "",
                maxLevel: "",
                sex: "",
                bind: "",
                identification: "",
                page: 0,
                size: 20
            }
        },
        searchAll() {
            var text = this.condition.keyword;
            this.submit(true);
        },
        change1: function () {
            //添加阻止事件
            document.addEventListener("touchmove", function (e) {    //禁止浏览器默认行为
                e.preventDefault();
            }, false);
            $(".alert-com, .alert-com-outer").css("display", "block");
            $(".alert-com-diff").css("display", "block").siblings().css("display", "none");
            $(".com-text").addClass('comtext-show').siblings().removeClass('comtext-show');
        },
        change2: function () {
            //添加阻止事件
            document.addEventListener("touchmove", function (e) {    //禁止浏览器默认行为
                e.preventDefault();
            }, false);
            $(".alert-com, .alert-com-outer").css("display", "block");
            $(".alert-com-inf").css("display", "block").siblings().css("display", "none");
            $(".com-text2").addClass('comtext-show').siblings().removeClass('comtext-show');
        },
        change3: function () {
            //添加阻止事件
            document.addEventListener("touchmove", function (e) {    //禁止浏览器默认行为
                e.preventDefault();
            }, false);
            $(".alert-com, .alert-com-outer").css("display", "block");
            $(".alert-com-time").css("display", "block").siblings().css("display", "none");
            $(".com-text3").addClass('comtext-show').siblings().removeClass('comtext-show');
        },
        closeA: function () {
            $(".alert-com, .alert-com-outer").css("display", "none");
            //移除添加阻止事件
            document.addEventListener("touchmove", function (e) {    //禁止浏览器默认行为
                e.preventDefault();
            }, true);
        },
        changeSex(sex) {
            this.condition.sex = sex;
            // $(e.target).addClass('choiced-show').parent().siblings().find('i').removeClass('choiced-show');
        },
        changeBind(bind) {
            this.condition.bind = bind;
        },
        changeIden(identification) {
            this.condition.identification = identification;
        },
        changePlat(index) {
            if (index) {
                this.condition.categoryId = this.$store.state.Categroy[index].id;
            } else {
                this.condition.categoryId = ''
            }

        },
        changeType(type) {
            this.condition.type = type;// < 0?'':type;
            this.submit(true);
        },
        submit(clear) {
            //移除添加阻止事件
            document.addEventListener("touchmove", function (e) {    //禁止浏览器默认行为
                e.preventDefault();
            }, true);
            //获取列表
            if (clear) {
                this.goods = [];
            }
            var that = this;
            that.condition.page = 0;
            that.Http.get(that.Api.getGoodsList(), that.condition, function (result) {
                if (result.data.goods && result.data.goods.length > 0) {
                    for (var i = 0; i < result.data.goods.length; i++) {
                        if (!that.contains(result.data.goods[i])) {
                            that.goods.push(result.data.goods[i]);
                        }
                    }
                }
                that.$refs.scroller.finishInfinite(true);
            })
            that.closeA();
        },
        refresh(done) {
            self.goods = [];
            this.condition.page = 0;
            done();
        },
        infinite(done) {
            var that = this;
            this.submit();
            that.condition.page += 1;
        },
        activated() {
            self.goods = [];
        },
        contains(g) {
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id == g.id) {
                    return true;
                }
            }
            return false;
        }
    },
    components: {
        'app-goods': Goods,
        "app-header": Header
    }
}
</script>