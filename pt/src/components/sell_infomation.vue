<template>
    <div class="sell-infomation">
        <header class="commodity-head">
            我要卖
            <span class="return-back" @click="ruturnBack"></span>
        </header>
        <form id="form" action="" enctype="" method="post"  class="clearfix"> 
            <div class="sell-first">点击添加图片</div>
            <input type="hidden" id="goods-id">
            <div class="pic-dis" style="display: none;"></div>
            <div class="release_pic clearfix">
                <div class="realease_picbtn" data="0">
                    <img data-id="img_0" src="../assets/images/add.png" alt="" title="">
                    <div style="display:none;" id="none"></div>
                    <input  id="platFileBtn" name="file" type="file" multiple />
                </div>
            </div>
            <div class="sell-second">填写详细信息</div>
            <ul class="sell-information clearfix">
                <li class="clearfix">
                    <span><i>*</i>商品标题：</span>
                    <input id="name" name="name" type="text" value="" placeholder="请输入商品的标题"/>
                </li>
                <li class="clearfix">
                    <span>&nbsp;账号ID：</span>
                    <input id="account" name="account" type="number" value="" placeholder="没有填无"/>
                </li>
                <li class="clearfix">
                    <span><i>*</i>角色等级：</span>
                    <input id="grade" type="number" name="grade" value="" placeholder="请输入角色等级"/>
                </li>
                <li class="sell-sex clearfix">
                    <span><i>*</i>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
                    <div id="sex" name="sex" class="re_sele">
                        <label>
                            <input type="radio" checked="checked" name="sex" value="1" v-model="sexs"/>
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">男</em>
                        </label>
                        <label>
                            <input type="radio" name="sex" value="2" v-model="sexs"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">女</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span><i>*</i>操作系统：</span>
                    <div id="system" name="system" class="re_sele">
                        <label>
                            <input type="radio" checked="checked"  name="system" value="3" v-model="systems"/>
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">通用</em>
                        </label>
                        <label>
                            <input type="radio"  name="system" value="1" v-model="systems"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">安卓</em>
                        </label>
                        <label>
                            <input type="radio" name="system" value="2" v-model="systems"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">IOS</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span><i>*</i>客户端：</span>
                    <div id="client" name="client" class="re_sele">
                        <label>
                            <input type="radio" checked="checked"  name="client" value="3" v-model="clients"/>
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">通用</em>
                        </label>
                        <label>
                            <input type="radio"  name="client" value="1" v-model="clients"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">手机端</em>
                        </label>
                        <label>
                            <input type="radio" name="client" value="2" v-model="clients"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">PC端</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span><i>*</i>账号绑定：</span>
                    <div id="binding" name="binding" class="re_sele">
                        <label>
                            <input type="radio" checked="checked"  name="binding" value="3" v-model="bindings"/>
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">无</em>
                        </label>
                        <label>
                            <input type="radio" name="binding" value="1" v-model="bindings"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">手机</em>
                        </label>
                        <label>
                            <input type="radio" name="binding" value="2" v-model="bindings"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">邮箱</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span><i>*</i>第三方授权：</span>
                    <div id="authorization" name="authorization" class="re_sele">
                        <label style="width: 24%; margin-right: 0;">
                            <input type="radio" checked="checked"  name="authorization" value="4" v-model="authorizations"/>
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">无</em>
                        </label>
                        <label style="width: 24%; margin-right: 0;">
                            <input type="radio"  name="authorization" value="1" v-model="authorizations"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">QQ</em>
                        </label style="width: 24%; margin-right: 0;">
                        <label style="width: 24%; margin-right: 0;">
                            <input type="radio" name="authorization" value="2" v-model="authorizations"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">微信</em>
                        </label>
                        <label style="width: 24%; margin-right: 0;">
                            <input type="radio" name="authorization" value="3" v-model="authorizations"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">微博</em>
                        </label>
                    </div>
                </li>
                 <li class="sell-sex clearfix">
                    <span><i>*</i>身份认证：</span>
                    <div id="identification" name="identification" class="re_sele">
                        <label>
                            <input type="radio" checked="checked"  name="identification" value="1" v-model="identifications"/>
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">未认证</em>
                        </label>
                        <label>
                            <input type="radio" name="identification" value="2" v-model="identifications"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">已认证</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span><i>*</i>押金方式：</span>
                    <div id="deposit" name="deposit" class="re_sele">
                        <label>
                            <input type="radio" checked="checked"  name="deposit" value="1" v-model="deposits"/>
                            <i class="choice-sho choiced-show" @click="changeMach"></i>
                            <em class="choice-text">押一付一</em>
                        </label>
                        <label>
                            <input type="radio" name="deposit" value="2" v-model="deposits"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">押二付一</em>
                        </label>
                        <label>
                            <input type="radio" name="deposit" value="3" v-model="deposits"/>
                            <i class="choice-sho" @click="changeMach"></i>
                            <em class="choice-text">押三付一</em>
                        </label>
                    </div>
                </li>
                <li class="sell-sex clearfix">
                    <span><i>*</i>支付方式：</span>
                    <div id="payway" name="payway" class="re_sele">
                        <label>
                            <input type="radio" checked="checked"  name="payway" value="1"/>
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
                <li class="clearfix">
                    <span><i>*</i>商品价格：</span>
                    <input id="price" type="number" name="price" value="" placeholder=">=5元" v-model="prices"/>
                </li>
            </ul>
            <div class="add-com">
                <h3>商品描述：</h3>
                <textarea id="detail" name="detail" maxlength="200" placeholder="输入商品的补充说明" rows="3"></textarea>
            </div>
            <div class="fill-foot">
                <em>(所有交易平台将收取10%的手续费)</em>
            </div>
            <div class="sell-next">
                <input type="button" class="diyStart" @click="addGoods" value="下一步" />
            </div>
            <input type="hidden" name="" :value=sexs class="sexValue">
            <input type="hidden" name="" :value=systems class="systemValue">
            <input type="hidden" name="" :value=clients class="clientValue">
            <input type="hidden" name="" :value=bindings class="bindingValue">
            <input type="hidden" name="" :value=authorizations class="authorizationValue">
            <input type="hidden" name="" :value=identifications class="identificationValue">
            <input type="hidden" name="" :value=prices class="priceValue">
            <input type="hidden" name="" :value=deposits class="depositValue">
            <input type="hidden" name="" :value=details class="detailValue">
        </form>
    </div>
</template>
<script>
     export default {
        name: 'sell-infomation',
        data() {
            return {
                uploadimgs:'',
                pickfiles:'',
                sexs:'',
                systems:'',
                clients:'',
                bindings:'',
                authorizations:'',
                identifications:'',
                deposits:'',
                accounts:'',
                passwords:'',
                telephones:'',
                qq:'',
                details:'',
                prices: ''
            }
        },
        beforeCreate() {

        },
        created() {
            this.addGoods();
        },
        methods: {
            changeMach: function(e) {
                $(e.target).addClass('choiced-show').parent().siblings().find('i').removeClass('choiced-show');
            },
            ruturnBack: function() {
                this.$router.go(-1);
            },
            addGoods() {
                var tit = $("#name").val(),
                    accountId = $("#account").val(),
                    grade = $("#grade").val(),
                    sex = $(".sexValue").val(),
                    client = $(".clientValue").val(),
                    system = $(".systemValue").val(),
                    bind = $(".bindingValue").val(),
                    authorization = $(".authorizationValue").val(),
                    identification = $(".identificationValue").val(),
                    leasesh = $(".leasesh").val(),
                    leasesd = $(".leasesd").val(),
                    leasesw = $(".leasesw").val(),
                    leasesm = $(".leasesm").val(),
                    leaseshBool = $(".leaseshBool").val(),
                    leasesdBool = $(".leasesdBool").val(),
                    leaseswBool = $(".leaseswBool").val(),
                    leasesmBool = $(".leasesmBool").val(),
                    deposit = $(".depositValue").val(),
                    account = $(".accounts").val(),
                    password = $(".passwords").val(),
                    phone = $(".telephones").val(),
                    detail = $("#detail").val(),
                    price = $(".priceValue").val(),
                    qq = $(".qq").val();
                    if(sex=="") {
                        sex = 1;
                    }
                    if(client=="") {
                        client = 3;
                    }
                    if(system=="") {
                        system = 3;
                    }
                    if(bind=="") {
                        bind = 3;
                    }
                    if(authorization=="") {
                        authorization = 3;
                    }
                    if(identification=="") {
                        identification = 1;
                    }
                    if(deposit=="") {
                        deposit = 1;
                    }
                var goodsInfo = {
                    type: 1,
                    categoryId: "402880e75cfcace3015cfcb25e050000",
                    images: "logo,logo1",
                    title: tit,
                    detail: detail,
                    accountId: accountId,
                    grade: grade,
                    sex: sex,
                    client: client,
                    system: system,
                    bind: bind,
                    authorization: authorization,
                    identification: identification,
                    price: price,
                    hourCost: leasesh+'-'+leaseshBool,
                    dayCost: leasesd+'-'+leasesdBool,
                    weekCost: leasesw+'-'+leaseswBool,
                    monthCost: leasesm+'-'+leasesmBool,
                    deposit: deposit,
                    account: account,
                    password: password,
                    phone: phone,
                    qq: qq,
                };
                this.Http.get(this.Api.addGoods(), goodsInfo, function (result) {
                    console.log(result + "0");
                })
            }
        }
    }
</script>