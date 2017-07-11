<template>
    <div class="sell-infomation">
        <app-header :header="title"></app-header>
        <form id="form" action="" enctype="" method="post" class="clearfix">
            <div class="sell-first">点击添加图片</div>
            <input type="hidden" id="goods-id">
            <div class="pic-dis" style="display: none;"></div>
            <app-upload ref="images"></app-upload>
            <div class="sell-second">填写详细信息</div>
            <ul class="sell-information clearfix">
                <li class="clearfix">
                    <span>
                        <i>*</i>商品标题：</span>
                    <input id="name" name="name" type="text" value="" placeholder="请输入商品的标题" v-model="goodsInfo.title" />
                </li>
                <li class="clearfix">
                    <span>&nbsp;账号ID：</span>
                    <input id="account" name="account" type="number" value="" placeholder="没有填无" v-model="goodsInfo.accountId" />
                </li>
                <li class="clearfix">
                    <span>
                        <i>*</i>角色等级：</span>
                    <input id="grade" type="number" name="grade" value="" placeholder="请输入角色等级" v-model="goodsInfo.grade" />
                </li>
                <li class="sell-sex clearfix">
                    <span>
                        <i>*</i>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                    <div id="sex" name="sex" class="re_sele">
                        <label>
                            <input type="radio" checked="checked" name="sex" value="1" v-model="goodsInfo.sex" />
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">男</em>
                        </label>
                        <label>
                            <input type="radio" name="sex" value="2" v-model="goodsInfo.sex" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">女</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span>
                        <i>*</i>操作系统：</span>
                    <div id="system" name="system" class="re_sele">
                        <label>
                            <input type="radio" checked="checked" name="system" value="3" v-model="goodsInfo.system" />
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">通用</em>
                        </label>
                        <label>
                            <input type="radio" name="system" value="1" v-model="goodsInfo.system" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">安卓</em>
                        </label>
                        <label>
                            <input type="radio" name="system" value="2" v-model="goodsInfo.system" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">IOS</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span>
                        <i>*</i>客户端：</span>
                    <div id="client" name="client" class="re_sele">
                        <label>
                            <input type="radio" checked="checked" name="client" value="3" v-model="goodsInfo.client" />
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">通用</em>
                        </label>
                        <label>
                            <input type="radio" name="client" value="1" v-model="goodsInfo.client" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">手机端</em>
                        </label>
                        <label>
                            <input type="radio" name="client" value="2" v-model="goodsInfo.client" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">PC端</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span>
                        <i>*</i>账号绑定：</span>
                    <div id="binding" name="binding" class="re_sele">
                        <label>
                            <input type="radio" checked="checked" name="binding" value="3" v-model="goodsInfo.bind" />
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">无</em>
                        </label>
                        <label>
                            <input type="radio" name="binding" value="1" v-model="goodsInfo.bind" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">手机</em>
                        </label>
                        <label>
                            <input type="radio" name="binding" value="2" v-model="goodsInfo.bind" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">邮箱</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span>
                        <i>*</i>第三方授权：</span>
                    <div id="authorization" name="authorization" class="re_sele">
                        <label style="width: 24%; margin-right: 0;">
                            <input type="radio" checked="checked" name="authorization" value="4" v-model="goodsInfo.authorization" />
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">无</em>
                        </label>
                        <label style="width: 24%; margin-right: 0;">
                            <input type="radio" name="authorization" value="1" v-model="goodsInfo.authorization" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">QQ</em>
                        </label style="width: 24%; margin-right: 0;">
                        <label style="width: 24%; margin-right: 0;">
                            <input type="radio" name="authorization" value="2" v-model="goodsInfo.authorization" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">微信</em>
                        </label>
                        <label style="width: 24%; margin-right: 0;">
                            <input type="radio" name="authorization" value="3" v-model="goodsInfo.authorization" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">微博</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span>
                        <i>*</i>身份认证：</span>
                    <div id="identification" name="identification" class="re_sele">
                        <label>
                            <input type="radio" checked="checked" name="identification" value="1" v-model="goodsInfo.identification" />
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">未认证</em>
                        </label>
                        <label>
                            <input type="radio" name="identification" value="2" v-model="goodsInfo.identification" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">已认证</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span>
                        <i>*</i>押金方式：</span>
                    <div id="deposit" name="deposit" class="re_sele">
                        <label>
                            <input type="radio" checked="checked" name="deposit" value="1" v-model="goodsInfo.deposit" />
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">押一付一</em>
                        </label>
                        <label>
                            <input type="radio" name="deposit" value="2" v-model="goodsInfo.deposit" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">押二付一</em>
                        </label>
                        <label>
                            <input type="radio" name="deposit" value="3" v-model="goodsInfo.deposit" />
                            <i class="choice-sho" @click="changeMach"></i>
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
                        <label>
                            <input type="checkbox" name="check" class="lease-dis" value="1" />
                            <i class="choice-sho" v-bind:class="{'choiced-show':(goodsInfo.hourCost)}"></i>
                            <em class="choice-text" style="width: 12%;">时租</em>
                            <input type="number" name="check" class="lease-con" value="" placeholder="输入价格" v-model.number="goodsInfo.hourCost" />
                            <span>元/时</span>
                        </label>
                        <label>
                            <input type="checkbox" name="check" class="lease-dis" value="2" />
                            <i class="choice-sho" v-bind:class="{'choiced-show':(goodsInfo.dayCost)}"></i>
                            <em class="choice-text" style="width: 12%;">日租</em>
                            <input type="number" name="check" class="lease-con" value="" placeholder="输入价格" v-model.number="goodsInfo.dayCost" />
                            <span>元/天</span>
                        </label>
                        <label>
                            <input type="checkbox" name="check" class="lease-dis" value="3" />
                            <i class="choice-sho" v-bind:class="{'choiced-show':(goodsInfo.weekCost)}"></i>
                            <em class="choice-text" style="width: 12%;">周租</em>
                            <input type="number" name="check" class="lease-con" value="" placeholder="输入价格" v-model.number="goodsInfo.weekCost" />
                            <span>元/周</span>
                        </label>
                        <label>
                            <input type="checkbox" name="check" class="lease-dis" value="4" />
                            <i class="choice-sho" v-bind:class="{'choiced-show':(goodsInfo.monthCost)}"></i>
                            <em class="choice-text" style="width: 12%;">月租</em>
                            <input type="number" name="check" class="lease-con" value="" placeholder="输入价格" v-model.number="goodsInfo.monthCost" />
                            <span>元/月</span>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span>
                        <i>*</i>押金方式：</span>
                    <div id="deposit" name="deposit" class="re_sele">
                        <label>
                            <input type="radio" checked="checked" name="deposit" value="1" v-model="goodsInfo.deposit" />
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">押一付一</em>
                        </label>
                        <label>
                            <input type="radio" name="deposit" value="2" v-model="goodsInfo.deposit" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">押二付一</em>
                        </label>
                        <label>
                            <input type="radio" name="deposit" value="3" v-model="goodsInfo.deposit" />
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">押三付一</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span>
                        <i>*</i>支付方式：</span>
                    <div id="payway" name="payway" class="re_sele">
                        <label>
                            <input type="radio" checked="checked" name="payway" value="1" />
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">现金结算</em>
                        </label>
                        <!-- <label>
                                                        <input type="radio" name="payway" value="2"/>
                                                        <i class="choice-sho" @click="changeMach"></i>
                                                        <em class="choice-text">其他</em>
                                                    </label> -->
                    </div>
                </li>
                <!--<li class="clearfix">
                                        <span>
                                            <i>*</i>商品价格：</span>
                                        <input id="price" type="number" name="price" value="" placeholder=">=5元" v-model="goodsInfo.price" />
                                    </li>-->
            </ul>
            <ul class="account-infor">
                <li>
                    <label>
                        <i>*</i>直播账号</label>
                    <input type="text" name="" value="" placeholder="请输入直播账号" v-model="goodsInfo.account" class="accounts" />
                </li>
                <li>
                    <label>
                        <i>*</i>账号密码</label>
                    <input type="text" name="" value="" placeholder="请输入账号密码" v-model="goodsInfo.password" class="passwords" />
                </li>
                <li>
                    <label>
                        <i>*</i>联系手机</label>
                    <input type="text" name="" value="" maxlength="11" placeholder="请输入手机号码" v-model="goodsInfo.phone" class="telephones" />
                </li>
                <li>
                    <label>
                        <i>*</i>QQ号码</label>
                    <input type="text" name="" value="" placeholder="请输入QQ号码" v-model="goodsInfo.qq" class="qq" />
                </li>
            </ul>
            <div class="add-com">
                <h3>商品描述：</h3>
                <textarea id="detail" name="detail" maxlength="200" placeholder="输入商品的补充说明" rows="3" v-model="goodsInfo.detail"></textarea>
            </div>
            <div class="fill-foot">
                <em>(所有交易平台将收取10%的手续费)</em>
            </div>
            <div class="sell-next">
                <input type="button" :disabled="disabled" class="diyStart" @click="addGoods" value="提交" />
            </div>
        </form>
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
            goodsInfo: {
                type: 1,
                categoryId: '',
                images: "logo,logo1",
                title: '',
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
                qq: ''
            }
        }
    },
    created() {
        this.goodsInfo.categoryId = this.$route.params.categoryId;
    },
    methods: {
        changeMach: function (e) {
            $(e.target).addClass('choiced-show').parent().siblings().find('i').removeClass('choiced-show');
        },
        changeMach2: function (e) {
            if ($(e.target).hasClass('choiced-show')) {
                $(e.target).removeClass('choiced-show');
            } else {
                $(e.target).addClass('choiced-show');
            }
        },
        addGoods() {

            var errorMsg = null;
            debugger;
            if (!this.goodsInfo.title) {
                errorMsg = "请输入商品标题";
            } else if (!this.goodsInfo.grade) {
                errorMsg = "请输入等级";
            } else if (!this.goodsInfo.account) {
                errorMsg = "请输入商品账号";
            } else if (!this.goodsInfo.password) {
                errorMsg = "请输入密码";
            } else if (!this.goodsInfo.phone) {
                errorMsg = "请输入联系手机";
            } else if (!this.goodsInfo.qq) {
                errorMsg = "请输入QQ";
            } else if (this.goodsInfo.hourCost == ''
                && this.goodsInfo.dayCost == ''
                && this.goodsInfo.weekCost == ''
                && this.goodsInfo.monthCost == '') {
                errorMsg = "至少选择一种支付方式";
            } else if (this.$refs.images.images.length == 0) {
                errorMsg = "请至少上传一张图片";
            }
            if (errorMsg) {
                this.$iosAlert(errorMsg);
                return;
            }

            this.goodsInfo.images = this.$refs.images.images.join(",");
            var self = this;
            this.disabled = true;
            this.Http.get(this.Api.addGoods(), self.goodsInfo, function (result) {
                that.disabled = false;
                if (result.code == 0) {
                    self.$store.commit("clearFrom");
                    console.log(result);

                    self.$router.push("/person");
                } else {
                    self.$iosAlert(result.msg);
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