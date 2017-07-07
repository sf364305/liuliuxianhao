<template>
    <div id="server">
        <h1>{{title}}</h1>
        <div class="messeage-tit">
            <h2>*客服在线时间</h2>
            <p>工作日 09:00 - 21:00</p>
            <p>周六日 10:00 - 21:00</p>
        </div>
        <form aciton="" method="" class="server-form">
            <div>
                <label for="">电话</label>
                <input type="text" placeholder="请输入您的手机号码" name="" value="" class="server-tele" />
            </div>
            <div>
                <label for="">QQ</label>
                <input type="text" placeholder="请输入您的QQ号码" name="" value="" class="server-qq" />
            </div>
            <div class="add-com server-messeage" style="border: none;">
                <h2>留言内容：</h2>
                <textarea id="detail" name="detail" maxlength="200" placeholder="请输入您的留言" rows="8"></textarea>
            </div>
            <div class="server-sub" style="border: none;">
                <input type="submit" name="" value="提交" class="server-submit" @click="closeShow" />
            </div>
        </form>
        <div class="server-alert-outer" @click="closeAlert">
            <div class="server-alert">
                <h2>提示</h2>
                <p>提交成功</p>
            </div>
        </div>
        <div class="nav-bottom">
            <!-- 引入公用的尾部 footer组件 -->
            <app-footer></app-footer>
        </div>
    </div>
</template>
<style>

</style>
<script>
import Footer from '../templates/Footer.vue'
export default {
    data: function () {
        return {
            title: '给我们留言'
        }
    },
    methods: {
        closeAlert: function () {
            $(".server-alert-outer").css("display", "none")
        },
        closeShow: function () {
            $(".server-alert-outer").css("display", "block")
        }
    }, components: {
        'app-footer': Footer
    }
}
</script>

<style>
.finished {
    display: none;
}
</style>