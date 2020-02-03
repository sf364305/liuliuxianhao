<template>
    <div class="sell-infomation">
        <app-header :header="title"></app-header>
        <!-- <scroller ref="scroller" style="margin-bottom:4rem;margin-top:4rem;"> -->
            <form id="form" action="" enctype="" method="post" class="clearfix">
                <div class="sell-first">点击添加图片</div>
                <input type="hidden" id="goods-id">
                <div class="pic-dis" style="display: none;"></div>
                <app-upload ref="images" :images="images"></app-upload>
                <div style="text-align:center;color:red;">图片请一张一张上传</div>
                <div class="sell-second">填写详细信息</div>
                <ul class="sell-information clearfix">
                    <li class="clearfix">
                        <span>
                            <i>*</i>商品标题：</span>
                        <input id="name" name="name" type="text" value="" placeholder="请输入商品的标题" v-model="goods.name" maxlength="50"/>
                    </li>
                    <li class="clearfix">
                        <span>&nbsp;账号ID：</span>
                        <input id="account" name="account" type="text" value="" placeholder="没有填无" v-model="goods.accountId" maxlength="30"/>
                    </li>
                    <li class="clearfix">
                        <span>
                            <i>*</i>角色等级：</span>
                        <input id="grade" type="number" name="grade" value="" placeholder="请输入角色等级" v-model="goods.grade" max="9"/>
                    </li>
                    <li class="sell-sex clearfix">
                        <span>
                            <i>*</i>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                        <div id="sex" name="sex" class="re_sele">
                            <label>
                                <input type="radio" checked="checked" name="sex" value="0" v-model="goods.sex" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.sex == 0}"></i>
                                <em class="choice-text">男</em>
                            </label>
                            <label>
                                <input type="radio" name="sex" value="1" v-model="goods.sex" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.sex == 1}"></i>
                                <em class="choice-text">女</em>
                            </label>
                        </div>
                    </li>
                    <li class="sell-sex clearfix">
                        <span>
                            <i>*</i>操作系统：</span>
                        <div id="system" name="system" class="re_sele">
                            <label>
                                <input type="radio" checked="checked" name="system" value="3" v-model="goods.system" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.system == 3}"></i>
                                <em class="choice-text">通用</em>
                            </label>
                            <label>
                                <input type="radio" name="system" value="1" v-model="goods.system" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.system == 1}"></i>
                                <em class="choice-text">安卓</em>
                            </label>
                            <label>
                                <input type="radio" name="system" value="2" v-model="goods.system" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.system == 2}"></i>
                                <em class="choice-text">IOS</em>
                            </label>
                        </div>
                    </li>
                    <li class="sell-sex clearfix">
                        <span>
                            <i>*</i>客户端：</span>
                        <div id="client" name="client" class="re_sele">
                            <label>
                                <input type="radio" checked="checked" name="client" value="3" v-model="goods.client" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.client == 3}"></i>
                                <em class="choice-text">通用</em>
                            </label>
                            <label>
                                <input type="radio" name="client" value="1" v-model="goods.client" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.client == 1}"></i>
                                <em class="choice-text">手机端</em>
                            </label>
                            <label>
                                <input type="radio" name="client" value="2" v-model="goods.client" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.client == 2}"></i>
                                <em class="choice-text">PC端</em>
                            </label>
                        </div>
                    </li>
                    <li class="sell-sex clearfix">
                        <span>
                            <i>*</i>账号绑定：</span>
                        <div id="binding" name="binding" class="re_sele">
                            <label>
                                <input type="radio" checked="checked" name="binding" value="3" v-model="goods.bind" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.bind == 3}"></i>
                                <em class="choice-text">无</em>
                            </label>
                            <label>
                                <input type="radio" name="binding" value="1" v-model="goods.bind" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.bind == 1}"></i>
                                <em class="choice-text">手机</em>
                            </label>
                            <label>
                                <input type="radio" name="binding" value="2" v-model="goods.bind" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.bind == 2}"></i>
                                <em class="choice-text">邮箱</em>
                            </label>
                        </div>
                    </li>
                    <li class="sell-sex clearfix">
                        <span style="width:28%;">
                            <i>*</i>第三方授权：</span>
                        <div id="authorization" name="authorization" class="re_sele" style="width:70%;">
                            <label style="width: 24%; margin-right: 0;">
                                <input type="radio" checked="checked" name="authorization" value="4" v-model="goods.authorization" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.authorization == 4}"></i>
                                <em class="choice-text">无</em>
                            </label>
                            <label style="width: 24%; margin-right: 0;">
                                <input type="radio" name="authorization" value="1" v-model="goods.authorization" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.authorization == 1}"></i>
                                <em class="choice-text">QQ</em>
                            </label style="width: 24%; margin-right: 0;">
                            <label style="width: 24%; margin-right: 0;">
                                <input type="radio" name="authorization" value="2" v-model="goods.authorization" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.authorization == 2}"></i>
                                <em class="choice-text">微信</em>
                            </label>
                            <label style="width: 24%; margin-right: 0;">
                                <input type="radio" name="authorization" value="3" v-model="goods.authorization" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.authorization == 3}"></i>
                                <em class="choice-text">微博</em>
                            </label>
                        </div>
                    </li>
                    <li class="sell-sex clearfix">
                        <span>
                            <i>*</i>身份认证：</span>
                        <div id="identification" name="identification" class="re_sele">
                            <label>
                                <input type="radio" checked="checked" name="identification" value="1" v-model="goods.identification" />
                                <i class="choice-sho"  v-bind:class="{'choiced-show':goods.identification == 1}"></i>
                                <em class="choice-text">未认证</em>
                            </label>
                            <label>
                                <input type="radio" name="identification" value="2" v-model="goods.identification" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.identification == 2}"></i>
                                <em class="choice-text">已认证</em>
                            </label>
                        </div>
                    </li>
                    <li class="sell-sex clearfix">
                        <span>
                            <i>*</i>押金方式：</span>
                        <div id="deposit" name="deposit" class="re_sele">
                            <label>
                                <input type="radio" checked="checked" name="deposit" value="0" v-model="goods.deposit"/>
                                <i class="choice-sho"  v-bind:class="{'choiced-show':goods.deposit == 0}" @click="shows"></i>
                                <em class="choice-text">无需押金</em>
                            </label>
                            <label>
                                <input type="radio" checked="checked" name="deposit" value="1" v-model="goods.deposit" />
                                <i class="choice-sho"  v-bind:class="{'choiced-show':goods.deposit == 1}" @click="shows"></i>
                                <em class="choice-text">押一付一</em>
                            </label>
                            <label>
                                <input type="radio" name="deposit" value="2" v-model="goods.deposit" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.deposit == 2}" @click="shows"></i>
                                <em class="choice-text">押二付一</em>
                            </label>
                            <label>
                                <input type="radio" name="deposit" value="3" v-model="goods.deposit" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.deposit == 3}" @click="shows"></i>
                                <em class="choice-text">押三付一</em>
                            </label>
                        </div>
                    </li>
                    <li class="lease-diff sell-sex clearfix">
                        <div class="lease-diff-head">
                            <span>出租方式：</span>
                            <em>（写上价格，可多选）</em>
                        </div>
                        <div class="lease-check">
                            <!-- <label>
                                <input type="checkbox" name="check" class="lease-dis" value="1" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':(goods.hourCost)}"></i>
                                <em class="choice-text" style="width: 12%;">时租</em>
                                <input type="number" name="check" class="lease-con" value="" placeholder="输入价格" v-model.number="goods.hourCost" maxlength="9"/>
                                <span>元/时</span>
                            </label> -->
                            <label>
                                <input type="checkbox" name="check" class="lease-dis" value="2" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':(goods.dayCost)}"></i>
                                <em class="choice-text" style="width: 12%;">日租</em>
                                <input type="number" name="check" class="lease-con" value="" placeholder="输入价格" v-model.number="goods.dayCost"  @keyup="keyShow" maxlength="9"/>
                                <span>元/天</span>
                            </label>
                            <label>
                                <input type="checkbox" name="check" class="lease-dis" value="3" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':(goods.weekCost)}"></i>
                                <em class="choice-text" style="width: 12%;">周租</em>
                                <input type="number" name="check" class="lease-con" value="" placeholder="输入价格" v-model.number="goods.weekCost" @keyup="keyShow" maxlength="9" />
                                <span>元/周</span>
                            </label>
                            <label>
                                <input type="checkbox" name="check" class="lease-dis" value="4" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':(goods.monthCost)}"></i>
                                <em class="choice-text" style="width: 12%;">月租</em>
                                <input type="number" name="check" class="lease-con" value="" placeholder="输入价格" v-model.number="goods.monthCost" @keyup="keyShow" maxlength="9" />
                                <span>元/月</span>
                            </label>
                        </div>
                    </li>
                    <li class="sell-sex clearfix">
                        <span>
                            <i>*</i>支付方式：</span>
                        <div id="payway" name="payway" class="re_sele">
                            <label>
                                <input type="radio" checked="checked" name="payway" value="1" />
                                <i class="choice-sho choiced-show"></i>
                                <em class="choice-text" style="width:75%;">现金结算</em>
                            </label>
                        </div>
                    </li>
                </ul>
                <div class="add-com">
                    <h3>商品描述：</h3>
                    <textarea id="detail" name="detail" maxlength="200" placeholder="输入商品的补充说明" rows="3" v-model="goods.detail"></textarea>
                </div>
                <div class="fill-foot">
                    <em>(所有交易平台将收取10%的手续费)</em>
                </div>
                <div class="sell-second" style="border-top:1px solid #dcdcdc;margin-top:0.5rem;">填写账号信息</div>
                <ul class="account-infor">
                    <li>
                        <label>
                            <i>*</i>账号</label>
                        <input type="text" name="" value="" placeholder="请输入账号" v-model="goods.account" class="accounts" maxlength="30"/>
                    </li>
                    <li>
                        <label>
                            <i>*</i>密码</label>
                        <input type="text" name="" value="" placeholder="请输入密码" v-model="goods.password" class="passwords" maxlength="30" />
                    </li>
                    <li>
                        <label>
                            <i>*</i>联系手机</label>
                        <input type="text" name="" value="" placeholder="请输入手机号码" v-model="goods.phone" class="telephones"  maxlength="11" />
                    </li>
                    <li>
                        <label>
                            <i>*</i>微信号</label>
                        <input type="text" name="" value="" placeholder="请输入微信号" v-model="goods.qq" class="qq"  maxlength="15"/>
                    </li>
                </ul>
                <div class="sell-next">
                    <input type="button"  class="diyStart" @click="addGoods" value="提交" />
                </div>
            </form>
        <!-- </scroller> -->
    </div>
</template>
<script>
import Header from '../templates/Header.vue'
import Upload from '../templates/upload.vue'
export default {
    name: 'sell-infomation',
    data() {
        return {
            title: "我要出租",
            disabled:false,
            images:[],
            goods: {
                goodsId:"",
                type: 1,
                categoryId: '',
                images: "",
                name: '',
                detail: '',
                accountId: '',
                grade: '',
                sex: '0',
                client: '3',
                system: '3',
                bind: '3',
                authorization: '4',
                identification: '1',
                hourCost: '',
                dayCost: '',
                weekCost: '',
                monthCost: '',
                deposit: '1',
                account: '',
                password: '',
                phone: '',
                qq: '',
                payMethod: '0'
            }
        }
    },
    activated() {
        this.images=[];
        this.Wx.register(undefined,undefined,undefined);
        this.Wx.register(window.location.href.split("#")[1]);
        if (this.$route.params.categoryId == 0) {
            this.goods = this.$store.state.Goods;
            this.goods.goodsId = this.$store.state.Goods.id;
            this.goods.categoryId = this.$store.state.Goods.category.id;
            this.goods.deposit = this.$store.state.Goods.goodsLeaseInfo.deposit;
            this.goods.hourCost = this.$store.state.Goods.goodsLeaseInfo.hourCost;
            this.goods.dayCost = this.$store.state.Goods.goodsLeaseInfo.dayCost;
            this.goods.weekCost = this.$store.state.Goods.goodsLeaseInfo.weekCost;
            this.goods.monthCost = this.$store.state.Goods.goodsLeaseInfo.monthCost;
            for(var i = 0;i < this.goods.goodsImages.length;i++){
                this.images.push(this.goods.goodsImages[i].qiniuKey);
            }
        } else {
            this.goods.categoryId = this.$route.params.categoryId;
        }
    },
    methods: {
        shows(e) {
            $(e.target).addClass("choiced-show").parent().siblings().find("i").removeClass("choiced-show");
        },
        keyShow(e) {
            $(e.target).siblings("i").addClass("choiced-show");
        },
        addGoods() {
            console.log(this.goods.deposit);
            // return false;
            var errorMsg = null;
            if (!this.goods.name) {
                errorMsg = "请输入商品标题";
            } else if (!this.goods.grade) {
                errorMsg = "请输入等级";
            } else if (!this.goods.account) {
                errorMsg = "请输入商品账号";
            } else if (!this.goods.password) {
                errorMsg = "请输入密码";
            } else if (!this.goods.phone) {
                errorMsg = "请输入联系手机";
            } else if (!this.goods.qq) {
                errorMsg = "请输入微信号";
            } else if (this.goods.hourCost == ''
                && this.goods.dayCost == ''
                && this.goods.weekCost == ''
                && this.goods.monthCost == '') {
                errorMsg = "至少选择一种支付方式";
            }else if (this.$refs.images.images.length == 0) {
                errorMsg = "请至少上传一张图片";
            }
            if (errorMsg) {
                this.$iosAlert(errorMsg);
                return;
            }

            this.goods.images = this.$refs.images.images.join(",");
            var self = this;
            this.disabled = true;
            this.Http.get(this.Api.addGoods(), self.goods, function (result) {
                self.disabled = false;
                if (result.code == 0) {
                    self.$iosAlert("提交成功，平台将在1个工作日内审核，请关注公众号接收提醒。");
                    self.$store.commit("clearFrom");
                    self.$router.push("/person");
                }
            })
        }
    },
    components: {
        "app-header": Header,
        'app-upload': Upload,
    }
}
</script>
