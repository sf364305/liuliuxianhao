<template>
    <div class="release_pic clearfix">
        <div class="realease_picbtn" v-for="(img,index) in images" :key="img">
            <img :src="$store.state.Setting.qiniuUrl + img" alt="" title="" @click="del(index)">
        </div>
        <div class="realease_picbtn" data="0">
            <img data-id="img_0" src="../assets/images/add.png" alt="" title="">
            <div style="display:none;" id="none"></div>
            <input id="platFileBtn" @change="update" name="file" type="file" accept="image/*" multiple="true"/>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            images: []
            //localIds: []
        }
    },
    props: ['images'],
    activated() {
        //this.Wx.register();
    },
    methods: {
        // selectImg() {
        //     this.Wx.register(undefined,undefined,this.wxUpdate());
        // },
        wxUpdate() {
            var self = this;
            wx.chooseImage({
                count: 9, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    self.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    self.syncUpload(self.localIds);
                },
                fail: function (res) {
                   alert("调用相册失败，请刷新重试："+ JSON.stringify(res));
               }
            });
        },
        syncUpload(localImagesIds) {
            var self = this;
            var localId = localImagesIds[0];
            // alert(localId)
            //解决IOS无法上传的坑
            if (localId.indexOf("wxlocalresource") != -1) {
                localId = localId.replace("wxlocalresource", "wxLocalResource");
            }
            wx.uploadImage({
                localId: localId,
                isShowProgressTips: 1,
                success: function (res) {
                    var serverId = res.serverId; // 返回图片的服务器端ID
                    self.Http.get(self.Api.getQiniuImage(), {
                        mediaId: serverId
                    }, function (result) {
                        self.images.push(result.data.key);
                        //其他对serverId做处理的代码
                        self.localIds.splice(0, 1);
                        if (self.localIds.length > 0) {
                            self.syncUpload(self.localIds);
                        }
                    });
                }
            });
        },
        del(index) {
            var self = this;
            this.$iosConfirm("删除图片?")
                .then(function () {
                    self.images.splice(index, 1);
                }, function () {
                    console.log('取消');
                });
        },
        update(e) {
            let param = new FormData(); //创建form对象
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            let file = e.target.files[0];
            // console.log(file.name+"666");
            try {
                let d = new Date();
                let type = file.name.split('.');
                let tokenParem = {
                    'putPolicy': '{"name":"$(fname)","size":"$(fsize)","w":"$(imageInfo.width)","h":"$(imageInfo.height)","hash":"$(etag)"}',
                    'key': 'orderReview/' + d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.valueOf() + '.' + type[type.length - 1],
                    'bucket': 'liuliuxianhao',//七牛的地址，这个是你自己配置的（变量）
                };
                param.append('chunk', '0');//断点传输
                param.append('chunks', '1');
                param.append('file', file, file.name)
                // alert("拼装成功数据");
            } catch (e) {
                alert(e);
            }
            //先从自己的服务端拿到token
            var that = this;
            that.Http.get(that.Api.getQiniuToken(), null,
                function (result) {
                    // alert("获取token："+result.data.config.token);
                    var token = result.data.config.token;
                    param.append('token', token);
                    that.uploading(param, config, file.name);//然后将参数上传七牛
                });
            // console.log(param+"888")
        },
        uploading(param, config, pathName) {
            var self = this;
            this.Http.upload(param, config, function (key) {
                self.images.push(key);
            });
        },
    }
}
</script>
