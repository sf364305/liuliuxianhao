<template>
    <div class="certification-else">
        <header class="commodity-head">
            实名认证
            <span class="return-back" @click="ruturnBack"></span>
        </header>
        <form action="" method="" class="certification-form">
            <div>
                <label for="">身份证：</label>
                <input type="text" placeholder="请输入您的身份证" name="" value=""/>
            </div>
            <div>
                <label for="">真实姓名：</label>
                <input type="text" placeholder="请输入您的真实姓名" name="" value=""/>
            </div>
            <div>
                <label for="">手机号码：</label>
                <input type="text" placeholder="请输入您的手机号码" name="" value=""/>
            </div>
            <div class="certification-tele">
                <input type="text" placeholder="请输入验证码" name="" value="" class="certification-num"/>
                <span class="get-num" @click="getNum" data-num="1">获取验证码</span>
                <em class="time-num">60s</em>
            </div>
            <div class="certification-sub">
                <input type="submit" placeholder="" name="" value="提交" class="certification-submit"/>
            </div>
        </form>
    </div>
</template>
<script>

     export default {
        name: 'certification-else',
        data() {
            return {
                
            }
        },
        methods: {
            ruturnBack: function() {
                this.$router.go(-1);
            },
            getNum: function(e) {
                var num = $(e.target).attr("data-num");
                console.log(num);
                $(e.target).attr("data-num", 2);
                if(num == 1) {    
                    var a = 60;
                    $(e.target).addClass('get-num-active');
                    var timer = setInterval(show, 1000);
                    function show () {
                        a--;
                        console.log(a)
                        if(a < 0) {
                            a = 60;
                            clearInterval(timer);
                            $(e.target).removeClass('get-num-active');
                            $(e.target).attr("data-num", 1);
                        }
                        $('.time-num').html(a+'s');
                    }  
                } else {
                    return;
                }

            }
        }
    }
</script>