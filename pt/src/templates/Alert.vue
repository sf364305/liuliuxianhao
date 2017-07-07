<template>
    <div class="alert-comfirm2">
        <div class="alert-comfirm-com">
            <h2>提示</h2>
            <p>收藏成功</p>
            <div class="alert-comfirm-sure2 clearfix">
                <span class="comfirm-sure2" @click="closeA">确定</span>
            </div>
        </div>
   </div>
</template>
<style>
    .alert-comfirm, .alert-comfirm2, .alert-comfirm3 {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 999;
    }
    .alert-comfirm-com {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 85%;
        height: 12rem;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background: #fff;
    }
    .alert-comfirm-com h2 {
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: center;
        font-size: 1.3rem;
    }
    .alert-comfirm-com p {
        width: 90%;
        height: 3.5rem;
        padding: 1rem 5%;
        font-size: 1.1rem;
    }
    .alert-comfirm-sure span, .alert-comfirm-sure2 span, .alert-comfirm-sure3 span {
        float: left;
        width: 50%;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        font-size: 1.3rem;
    }
    .alert-comfirm-sure2 .comfirm-sure2, .alert-comfirm-sure3 .comfirm-sure3 {
        width: 100%;
    }
    .comfirm-sure {
        color: #0bb20c;
        box-shadow: 0px -1px 0px 0px #d7d7d7, 
        -1px 0px 0px 0px #d7d7d7;
    }
    .comfirm-sure2, .comfirm-sure3 {
        color: #0bb20c;
        box-shadow: 0px -1px 0px 0px #d7d7d7, 
        0px 0px 0px 0px #d7d7d7;
    }
    .comfirm-cancel {
        box-shadow: 0px -1px 0px 0px #d7d7d7, 
        0px 0px 0px 0px #d7d7d7;
    }
</style>
<script>
    export default {
        name: 'alert-comfirm2',
        methods: {
            closeA() {
                $('.alert-comfirm2').css("display","none");
            }
        }
    }
</script>