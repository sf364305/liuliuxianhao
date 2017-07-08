<template>
    <div class="popularity">
        <header class="commodity-head">
            人气专题
            <span class="return-back" @click="ruturnBack"></span>
        </header>
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
                <input type="text" placeholder="" name="" readOnly="true" value="点击选择 ∨" @click="changePupa" class="papular-plat"/>
            </div>
            <div>
                <label for="">选择人气：</label>
                <input type="text" placeholder="" name="" readOnly="true" value="点击选择 ∨" @click="changepPer" class="papular-pla"/>
            </div>
            <div>
                <label for="">选择类型：</label>
                <input type="text" placeholder="" name="" readOnly="true" value="点击选择 ∨" @click="changepD" class="papular-dif"/>
            </div>
            <div>
                <label for="">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：</label>
                <input type="text" placeholder="" name="" readOnly="true" value="￥200" class="papular-price"/>
                <span class="papular-text">价目表</span>
            </div>
            <div>
                <label for="">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</label>
                <span class="papular-rem" @click="addLess">-</span>
                <input type="text" placeholder="" name="" value="1" class="papular-nub" readOnly="true"/>
                <span class="papular-add" @click="addNum">+</span>
            </div>
            <div>
                <label for="">开始时间：</label>
                <input value="2017-07-11 15:42:00" class="papular-start" readonly="readonly" name="appDateTime" id="appDateTime" type="text">
            </div>
            <div>
                <label for="">结束时间：</label>
                <input type="text" placeholder="" name="" readOnly="true" value="2017-07-11 15:42:00" class="papular-over"/>
            </div>
            <div>
                <label for="">刷人气平台ID：</label>
                <input type="text" placeholder="请输入平台ID" name=""value="" class="papular-id"/>
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
                    <div>  
                        <div class="papular-plat-choice clearfix">
                            <label>
                                <input type="radio" checked="checked" name="sell" value="1"/>
                                <i class="choice-sho-platform choiced-ying-platform" @click="changePlat1"><span class="plat-show"></span></i>
                                <em class="choice-text-platform">映客账号</em>
                            </label>
                            <label>
                                <input type="radio" name="sell" value="2"/>
                                <i class="choice-hua-platform" @click="changePlat1"><span></span></i>
                                <em class="choice-text-platform">花椒账号</em>
                            </label>
                            <label>
                                <input type="radio" name="sell" value="2"/>
                                <i class="choice-mo-platform" @click="changePlat1"><span></span></i>
                                <em class="choice-text-platform">陌陌账号</em>
                            </label>
                            <label>
                                <input type="radio" name="sell" value="2"/>
                                <i class="choice-hand-platform" @click="changePlat1"><span></span></i>
                                <em class="choice-text-platform">快手账号</em>
                            </label>
                            <label>
                                <input type="radio" name="sell" value="2"/>
                                <i class="choice-else-platform" @click="changePlat1"><span></span></i>
                                <em class="choice-text-platform">其他账号</em>
                            </label>
                        </div>
                        <div class="alert-number-papular">
                            <input type="text" placeholder="" name="" value="" readOnly="true" class="papular-s"/>
                            <ul>
                                <li>500</li>
                                <li>1000</li>
                                <li>1500</li>
                                <li>2000</li>
                                <li>2500</li>
                                <li>3000</li>
                                <li>3500</li>
                                <li>4000</li>
                                <li>4500</li>
                                <li>5000</li>
                            </ul>
                        </div>
                        <div class="alert-method-papular">
                            <input type="text" placeholder="" name="" value="" readOnly="true" class="papular-m"/>
                            <ul>
                                <li>日租</li>
                                <li>周租</li>
                                <li>月租</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
     export default {
        name: 'popularity',
        data() {
            return {
                
            }
        },
        methods: {
            ruturnBack: function() {
                this.$router.go(-1);
            },
            addLess: function() {
                var inp = $(".papular-nub").val();
                inp--;
                if(inp < 0) {
                    inp = 0;
                }
                $(".papular-nub").val(inp);
            },
            addNum: function() {
                var inp = $(".papular-nub").val();
                inp++;
                $(".papular-nub").val(inp);
            },
            closePopu: function() {
                $(".alert-outer-papular").css("display", "none");
                $(".alert-plat-papular").animate({
                    "bottom" : "-22rem"
                }, 500)
            },
            changePupa: function() {
                $(".alert-outer-papular").css("display", "block");
                $(".alert-plat-papular").animate({
                    "bottom" : "0"
                }, 500);
                $(".papular-plat-choice").css("display", "block").siblings().css("display", "none");
            },
            changePlat1: function(e) {
                $(e.target).addClass('plat-show').parent().parent().siblings().find('span').removeClass('plat-show');
                var textA = $(e.target).parent().siblings('em').html();
                $(".alert-plat-papular").attr("data-text", textA);
            },
            surePopu: function() {
                var textB = $(".alert-plat-papular").attr("data-text");
                $(".papular-plat").val(textB);
                $(".alert-outer-papular").css("display", "none");
                $(".alert-plat-papular").animate({
                    "bottom" : "-22rem"
                }, 500)
            },
            changepPer: function() {
                $(".alert-outer-papular").css("display", "block");
                $(".alert-plat-papular").animate({
                    "bottom" : "0"
                }, 500);
                $(".alert-number-papular").css("display", "block").siblings().css("display", "none");
            },
            changepD: function() {
                $(".alert-outer-papular").css("display", "block");
                $(".alert-plat-papular").animate({
                    "bottom" : "0"
                }, 500);
                $(".alert-method-papular").css("display", "block").siblings().css("display", "none");
            }   
        },
        mounted() {
            var currYear = (new Date()).getFullYear();  
            var opt={};
            opt.date = {preset : 'date'};
            opt.datetime = {preset : 'datetime'};
            opt.time = {preset : 'time'};
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
        }
    }
</script>