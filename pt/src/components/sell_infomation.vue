<template>
    <div class="sell-infomation">
        <app-header :header="title"></app-header>
        <!-- <scroller ref="scroller" style="margin-bottom:4rem;margin-top:4rem;"> -->
            <form id="form" action="" enctype="" method="post" class="clearfix">
                <div class="sell-first">点 击 添 加 图 片</div>
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
                  <li class="sell-sex clearfix" v-if="isShortVideo">
                    <span><i>*</i>账号类型：</span>
                    <div id="accountType" name="accountType" class="re_sele">
                      <label style="float: left;width: 50%;height: 3rem;margin-right: 2%;">
                        <input type="radio" checked="checked" name="accountType" value="0" v-model="goods.accountType" style="display: none;"/>
                        <i class="choice-sho" v-bind:class="{'choiced-show':goods.accountType == 0}"></i>
                        <em class="choice-text">粉丝号</em>
                      </label>
                      <label style="float: left;width: 45%;height: 3rem;margin-right: 2%;">
                        <input type="radio" name="accountType" value="1" v-model="goods.accountType" style="display: none;"/>
                        <i class="choice-sho" v-bind:class="{'choiced-show':goods.accountType == 1}"></i>
                        <em class="choice-text">等级号</em>
                      </label>
                    </div>
                  </li>
                    <li class="clearfix" v-if="isShortVideo">
                      <span><i>*</i>粉丝数量：</span>
                      <input id="fansCount" type="number" name="fansCount" value="" placeholder="请输入粉丝数量" v-model="goods.fansCount" maxlength="9"/>
                    </li>
                    <li class="clearfix" v-if="isDouyin">
                      <span><i>*</i>点赞数量：</span>
                      <input id="likeCount" type="number" name="likeCount" value="" placeholder="请输入点赞数量" v-model="goods.likeCount" maxlength="9"/>
                    </li>
                    <li class="sell-sex clearfix" v-if="isShortVideo">
                          <span>
                              <i>*</i>粉丝偏向：
                          </span>
                      <div id="fansType" name="fansType" class="re_sele">
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" checked="checked" name="fansType" value="0" v-model="goods.fansType"  style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.fansType == '0'}"></i>
                          <em class="choice-text">均衡</em>
                        </label>
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="fansType" value="1" v-model="goods.fansType" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.fansType == '1'}"></i>
                          <em class="choice-text">男粉多</em>
                        </label>
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="fansType" value="2" v-model="goods.fansType" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.fansType == '2'}"></i>
                          <em class="choice-text">女粉多</em>
                        </label>
                      </div>
                    </li>
                    <li class="clearfix">
                        <span>&nbsp;账号ID：</span>
                        <input id="account" name="account" type="text" value="" placeholder="没有填无" v-model="goods.accountId" maxlength="30"/>
                    </li>
                    <li class="clearfix">
                        <span>
                            <i>*</i>角色等级：</span>
                        <input id="grade" type="number" name="grade" value="" placeholder="请输入角色等级" v-model="goods.grade" maxlength="9"/>
                    </li>
                    <li class="clearfix" v-if="isMomo">
                        <span><i>*</i>财富等级：</span>
                        <input id="wealthGrade" type="number" name="wealthGrade" value="" placeholder="请输入财富等级" v-model="goods.wealthGrade" maxlength="9"/>
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
                    <li class="clearfix" v-if="isLive">
                          <span>
                              <i>*</i>改名价格：</span>
                      <input id="renameAmount" type="number" name="renameAmount" value="" placeholder="请输入下次改名价格" v-model="goods.renameAmount" maxlength="9"/>
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
                                <i class="choice-sho"  v-bind:class="{'choiced-show':goods.client == 2}"></i>
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
                                <i class="choice-sho"  v-bind:class="{'choiced-show':goods.bind == 3}"></i>
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
                            </label>
                            <label style="width: 24%; margin-right: 0;">
                                <input type="radio" name="authorization" value="2" v-model="goods.authorization" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.authorization == 2}"></i>
                                <em class="choice-text">微信</em>
                            </label>
                            <label style="width: 24%; margin-right: 0;">
                                <input type="radio" name="authorization" value="3" v-model="goods.authorization" />
                                <i class="choice-sho"  v-bind:class="{'choiced-show':goods.authorization == 3}"></i>
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
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.identification == 1}"></i>
                                <em class="choice-text">未认证</em>
                            </label>
                            <label>
                                <input type="radio" name="identification" value="2" v-model="goods.identification" />
                                <i class="choice-sho" v-bind:class="{'choiced-show':goods.identification == 2}"></i>
                                <em class="choice-text">已认证</em>
                            </label>
                        </div>
                    </li>
                    <li class="sell-sex clearfix" v-if="isShortVideo">
                            <span>
                                <i>*</i>加V认证：
                            </span>
                      <div id="authenticationType" name="authenticationType" class="re_sele">
                        <label style="float: left;width: 29%;height: 3rem;margin-right: 2%;">
                          <input type="radio" checked="checked" name="authenticationType" value="0" v-model="goods.authenticationType"  style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.authenticationType == '0'}"></i>
                          <em class="choice-text">未认证</em>
                        </label>
                        <label style="float: left;width: 29%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="authenticationType" value="1" v-model="goods.authenticationType" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.authenticationType == '1'}"></i>
                          <em class="choice-text">个人认证</em>
                        </label>
                        <label style="float: left;width: 29%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="authenticationType" value="2" v-model="goods.authenticationType" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.authenticationType == '2'}"></i>
                          <em class="choice-text">企业认证</em>
                        </label>
                        <label style="float: left;width: 29%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="authenticationType" value="3" v-model="goods.authenticationType" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.authenticationType == '3'}"></i>
                          <em class="choice-text">机构认证</em>
                        </label>
                      </div>
                    </li>
                    <li class="sell-sex clearfix" v-if="isShortVideo">
                          <span>
                              <i>*</i>有无违规：
                          </span>
                      <div id="violation" name="violation" class="re_sele">
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" checked="checked" name="violation" value="0" v-model="goods.violation"  style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.violation == '0'}"></i>
                          <em class="choice-text">无违规</em>
                        </label>
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="violation" value="1" v-model="goods.violation" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.violation == '1'}"></i>
                          <em class="choice-text">有违规</em>
                        </label>
                      </div>
                    </li>
                    <li class="sell-sex clearfix">
                        <span>
                            <i>*</i>有无直播间：
                        </span>
                        <div id="openLive" name="openLive" class="re_sele">
                          <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                            <input type="radio" checked="checked" name="openLive" value="0" v-model="goods.openLive"  style="display: none;"/>
                            <i class="choice-sho" v-bind:class="{'choiced-show':goods.openLive == '0'}"></i>
                            <em class="choice-text">无直播间</em>
                          </label>
                          <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                            <input type="radio" name="openLive" value="1" v-model="goods.openLive" style="display: none;"/>
                            <i class="choice-sho" v-bind:class="{'choiced-show':goods.openLive == '1'}"></i>
                            <em class="choice-text">有直播间</em>
                          </label>
                        </div>
                    </li>
                    <li class="sell-sex clearfix" v-if="isShortVideo">
                      <span><i>*</i>长视频：</span>
                      <div id="longVideo" name="longVideo" class="re_sele">
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" checked="checked" name="longVideo" value="0" v-model="goods.longVideo"  style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.longVideo == '0'}"></i>
                          <em class="choice-text">未开通</em>
                        </label>
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="longVideo" value="1" v-model="goods.longVideo" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.longVideo == '1'}"></i>
                          <em class="choice-text">已开通</em>
                        </label>
                      </div>
                    </li>
                    <li class="sell-sex clearfix" v-if="isKuaishou">
                      <span><i>*</i>快接单功能：</span>
                      <div id="quickOrder" name="quickOrder" class="re_sele">
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" checked="checked" name="quickOrder" value="0" v-model="goods.quickOrder"  style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.quickOrder == '0'}"></i>
                          <em class="choice-text">未开通</em>
                        </label>
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="quickOrder" value="1" v-model="goods.quickOrder" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.quickOrder == '1'}"></i>
                          <em class="choice-text">已开通</em>
                        </label>
                      </div>
                    </li>
                    <li class="sell-sex clearfix" v-if="isKuaishou">
                      <span><i>*</i>快手小店：</span>
                      <div id="quickShop" name="quickShop" class="re_sele">
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" checked="checked" name="quickShop" value="0" v-model="goods.quickShop"  style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.quickShop == '0'}"></i>
                          <em class="choice-text">未开通</em>
                        </label>
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="quickShop" value="1" v-model="goods.quickShop" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.quickShop == '1'}"></i>
                          <em class="choice-text">已开通</em>
                        </label>
                      </div>
                    </li>
                    <li class="sell-sex clearfix" v-if="isKuaishou">
                      <span><i>*</i>付费教学视频：</span>
                      <div id="teachingVideo" name="teachingVideo" class="re_sele">
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" checked="checked" name="teachingVideo" value="0" v-model="goods.teachingVideo"  style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.teachingVideo == '0'}"></i>
                          <em class="choice-text">未开通</em>
                        </label>
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="teachingVideo" value="1" v-model="goods.teachingVideo" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.teachingVideo == '1'}"></i>
                          <em class="choice-text">已开通</em>
                        </label>
                      </div>
                    </li>
                    <li class="sell-sex clearfix" v-if="isDouyin">
                      <span><i>*</i>星图功能：</span>
                      <div id="starImage" name="starImage" class="re_sele">
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" checked="checked" name="starImage" value="0" v-model="goods.starImage"  style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.starImage == '0'}"></i>
                          <em class="choice-text">未开通</em>
                        </label>
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="starImage" value="1" v-model="goods.starImage" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.starImage == '1'}"></i>
                          <em class="choice-text">已开通</em>
                        </label>
                      </div>
                    </li>
                    <li class="sell-sex clearfix" v-if="isDouyin">
                      <span><i>*</i>抖音橱窗：</span>
                      <div id="showcase" name="showcase" class="re_sele">
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" checked="checked" name="showcase" value="0" v-model="goods.showcase"  style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.showcase == '0'}"></i>
                          <em class="choice-text">未开通</em>
                        </label>
                        <label style="float: left;width: 30%;height: 3rem;margin-right: 2%;">
                          <input type="radio" name="showcase" value="1" v-model="goods.showcase" style="display: none;"/>
                          <i class="choice-sho" v-bind:class="{'choiced-show':goods.showcase == '1'}"></i>
                          <em class="choice-text">已开通</em>
                        </label>
                      </div>
                    </li>
                    <li class="clearfix" v-if="isLive">
                      <span>&nbsp;贵族：</span>
                      <input id="nobleGrade" name="nobleGrade" type="text" value="" placeholder="贵族" v-model="goods.nobleGrade" maxlength="20"/>
                    </li>
                    <li class="clearfix" v-if="isLive">
                      <span>贵族到期时间：</span>
                      <input id="nobleExpireDate" name="nobleExpireDate" type="text" value="" placeholder="例：2020.5.15" v-model="goods.nobleExpireDate" maxlength="10"/>
                    </li>

                    <li class="sell-sex clearfix">
                        <span><i>*</i>支付方式：</span>
                        <div id="payMethod" name="payMethod" class="re_sele">
                            <label>
                                <input type="radio" checked="checked" name="payMethod" value="0" v-model="goods.payMethod" style="display: none;"/>
                                <i class="choice-sho choiced-show"></i>
                                <em class="choice-text" style="width:75%;">现金结算</em>
                            </label>
                        </div>
                    </li>
                    <li class="clearfix">
                        <span>
                            <i>*</i>商品价格：</span>
                        <input id="price" type="number" name="price" value="" placeholder=">=5元" v-model="goods.price"  maxlength="10"/>
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
                        <input type="text" name="" value="" placeholder="请输入账号" v-model="goods.account" class="accounts"  maxlength="30"/>
                    </li>
                    <li>
                        <label>
                            <i>*</i>密码</label>
                        <input type="text" name="" value="" placeholder="请输入密码" v-model="goods.password" class="passwords"  maxlength="30"/>
                    </li>
                    <li>
                        <label>
                            <i>*</i>联系手机</label>
                        <input type="text" name="" value="" placeholder="请输入手机号码" v-model="goods.phone" class="telephones"  maxlength="11"/>
                    </li>
                    <li>
                        <label>
                            <i>*</i>微信号</label>
                        <input type="text" name="" value="" placeholder="请输入微信号" v-model="goods.qq" class="qq"  maxlength="25"/>
                    </li>
                </ul>
                <div class="sell-next">
                    <input type="button" :disabled="disabled" class="diyStart" @click="addGoods" value="下 一 步" />
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
            title: "我要卖",
            errorMsg: "",
            disabled: false,
            images:[],
            goods: {
                goodsId:'',
                type: 0,
                categoryId: '',
                images: '',
                name: '',
                detail: '',
                accountId: '',
                grade: '',
                sex: '1',
                client: '3',
                system: '3',
                bind: '3',
                authorization: '4',
                identification: '1',
                price: '',
                hourCost: '',
                dayCost: '',
                weekCost: '',
                monthCost: '',
                deposit: '',
                account: '',
                password: '',
                phone: '',
                qq: '',
                wealthGrade: '',
                renameAmount: '',
                openLive: '0',
                payMethod: '0',
                fansCount: '',
                likeCount:'',
                nobleGrade: '',
                nobleExpireDate: '',
                fansType:'0',
                authenticationType: '0',
                violation: '0',
                longVideo: '0',
                quickOrder: '0',
                starImage: '0',
                quickShop: '0',
                showcase: '0',
                teachingVideo: '0',
                accountType: '0'
            }
        }
    },
    computed: {
        isMomo: function(){
            return this.goods.categoryId == this.$store.state.Setting.momoId
        },
        isDouyin: function(){
            return this.goods.categoryId == this.$store.state.Setting.douyinId
        },
        isKuaishou: function(){
            return this.goods.categoryId == this.$store.state.Setting.kuaishouId
        },
        isShortVideo: function(){
            return this.isDouyin || this.isKuaishou
        },
        isLive: function(){
            return !(this.isDouyin || this.isKuaishou)
        }
    },
    created() {
        this.images=[];
        if (this.$route.params.categoryId == 0) {
            this.goods = this.$store.state.Goods;
            this.goods.goodsId = this.$store.state.Goods.id;
            this.goods.categoryId = this.$store.state.Goods.category.id;
            for(var i = 0;i < this.goods.goodsImages.length;i++){
                this.images.push(this.goods.goodsImages[i].qiniuKey);
            }
        } else {
            this.goods.categoryId = this.$route.params.categoryId;
        }
        //this.Wx.register(window.location.href.split("#")[1]);
    },
    methods: {
        addGoods() {
            var errorMsg;
            if (!this.goods.name) {
                errorMsg = "请输入商品标题";
            } else if (!this.goods.grade) {
                errorMsg = "请输入等级";
            } else if (this.goods.grade && !/^\d+$/.test(this.goods.grade)) {
                errorMsg = "等级需为整数";
            } else if (!this.goods.price) {
                errorMsg = "请输入商品价格";
            } else if (!this.goods.account) {
                errorMsg = "请输入商品账号";
            } else if (!this.goods.password) {
                errorMsg = "请输入密码";
            } else if (!this.goods.phone) {
                errorMsg = "请输入联系手机";
            } else if (!this.goods.qq) {
                errorMsg = "请输入微信号";
            } else if (this.isShortVideo && !this.goods.fansCount) {
                errorMsg = "请输入粉丝数量";
            } else if (this.isShortVideo && this.goods.fansCount && !/^\d+$/.test(this.goods.fansCount)){
                errorMsg = "粉丝数量需为整数";
            } else if (this.isDouyin && !this.goods.likeCount) {
                errorMsg = "请输入点赞数量";
            } else if (this.isDouyin && this.goods.likeCount && !/^\d+$/.test(this.goods.likeCount)) {
                errorMsg = "点赞数量需为整数";
            } else if (this.isMomo && !this.goods.wealthGrade) {
                errorMsg = "请输入财富等级";
            } else if (this.isMomo && this.goods.wealthGrade && !/^\d+$/.test(this.goods.wealthGrade)) {
                errorMsg = "财富等级需为整数";
            } else if (this.isLive && this.goods.nobleExpireDate && !/^\d{4}\.\d{1,2}\.\d{1,2}$/.test(this.goods.nobleExpireDate)){
                errorMsg = "请输入正确的过期日期";
            } else if (this.isLive && !this.goods.renameAmount){
                errorMsg = "请输入下次改名价格";
            } else if (this.$refs.images.images.length == 0) {
                errorMsg = "请至少上传一张图片";
            }

            if (errorMsg) {
                this.$iosAlert(errorMsg);
                return;
            }

            this.goods.images = this.$refs.images.images.join(",");
            var self = this;
            self.disabled = true;
            this.Http.get(this.Api.addGoods(), self.goods, function (result) {
                self.disabled = false;
                if (result.code == 0) {
                    self.$iosAlert("提交成功，平台将在1个工作日内审核，请关注公众号接收提醒。");
                    self.$store.commit("clearFrom");
                    self.$router.push("/person");
                }
            })
        },
        initQiniu() { }
    },
    components: {
        "app-header": Header,
        'app-upload': Upload,
    }
}
</script>
