<template>
    <div class="popularity">
        <app-header :header="title"></app-header>
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
                <input type="text" placeholder="" name="" readOnly="true" value="点击选择 ∨" @click="selectCategroyTrigger" class="papular-plat" />
            </div>
            <div>
                <label for="">选择人气：</label>
                <input type="text" placeholder="" name="" readOnly="true" value="点击选择 ∨" class="papular-pla" />
            </div>
            <div>
                <label for="">选择类型：</label>
                <input type="text" placeholder="" name="" readOnly="true" value="点击选择 ∨" class="papular-dif" />
            </div>
            <div>
                <label for="">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：</label>
                <input type="text" placeholder="" name="" readOnly="true" value="￥200" class="papular-price" />
                <span class="papular-text">价目表</span>
            </div>
            <div>
                <label for="">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</label>
                <span class="papular-rem" @click="addLess">-</span>
                <input type="text" placeholder="" name="" value="1" class="papular-nub" readOnly="true" />
                <span class="papular-add" @click="addNum">+</span>
            </div>
            <div>
                <label for="">开始时间：</label>
                <input value="2017-07-11 15:42:00" class="papular-start" readonly="readonly" name="appDateTime" id="appDateTime" type="text">
            </div>
            <div>
                <label for="">结束时间：</label>
                <input type="text" placeholder="" name="" readOnly="true" value="2017-07-11 15:42:00" class="papular-over" />
            </div>
            <div>
                <label for="">刷人气平台ID：</label>
                <input type="text" placeholder="请输入平台ID" name="" value="" class="papular-id" />
            </div>
            <div class="add-com-papular">
                <textarea id="detail" name="detail" maxlength="200" placeholder="输入备注信息" rows="4"></textarea>
            </div>
            <div class="popularity-sub" style="border:none;">
                <router-link to="/popular_buy" replace class="popularity-submit">立即下单</router-link>
            </div>
        </form>
        <picker v-model="selectCategroy" :dataItems="categroy" @change="categroyChange">
            <div class="top-content" slot="top-content">Top of the content.</div>
            <div class="bottom-content" slot="bottom-content">Bottom of the content.</div>
        </picker>
        <picker v-model="selectQuantity" :dataItems="quantity" @change="quantityChange">
            <div class="top-content" slot="top-content">Top of the content.</div>
            <div class="bottom-content" slot="bottom-content">Bottom of the content.</div>
        </picker>
        <picker v-model="selectTypes" :dataItems="types" @change="typeChange">
            <div class="top-content" slot="top-content">Top of the content.</div>
            <div class="bottom-content" slot="bottom-content">Bottom of the content.</div>
        </picker>
    </div>
</template>
<script>
import '../assets/js/touch.min.js'
import Header from '../templates/Header.vue'

export default {
    name: 'popularity',
    data() {
        return {
            title: "人气专题",
            selectCategroy: false,
            selectQuantity: false,
            selectTypes: false,
            categroy: [{ values: ["1", "2"] }],
            quantity: [{ values: [500, 1000, 2000, 5000, 10000] }],
            types: [{ values: ["日租", "周租", "月租"] }],
        }
    },
    created() {
        this.categroy = this.$store.state.Categroy;
    },
    activated() {

    },
    methods: {
        selectCategroyTrigger() {
            this.selectCategroy = !this.selectCategroy;
        },
        categroyChange() {

        },
        quantityChange() {

        },
        typeChange() {

        },
        addLess() {
            var inp = $(".papular-nub").val();
            inp--;
            if (inp < 0) {
                inp = 0;
            }
            $(".papular-nub").val(inp);
        },
        addNum() {
            var inp = $(".papular-nub").val();
            inp++;
            $(".papular-nub").val(inp);
        },
        categoryChange() {

        },
        quantityChange() {

        },
        typeChange() {

        }


    },
    mounted() {

    },
    components: {
        "app-header": Header
    }
}
</script>