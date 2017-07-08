<template>
    <div class="release_pic clearfix">
    
        <div class="realease_picbtn" v-for="img in images" :key="img">
            <img :src="$store.state.Setting.qiniuUrl + img" alt="" title="">
        </div>
    
        <div class="realease_picbtn" data="0">
            <img data-id="img_0" src="../assets/images/add.png" alt="" title="">
            <div style="display:none;" id="none"></div>
            <input @change="update" id="platFileBtn" name="file" type="file" multiple />
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            images: []
        }
    },
    methods: {
        update(e) {
            let file = e.target.files[0];
            let d = new Date();
            let type = file.name.split('.');
            let tokenParem = {
                'putPolicy': '{"name":"$(fname)","size":"$(fsize)","w":"$(imageInfo.width)","h":"$(imageInfo.height)","hash":"$(etag)"}',
                'key': 'orderReview/' + d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.valueOf() + '.' + type[type.length - 1],
                'bucket': 'liuliuxianhao',//七牛的地址，这个是你自己配置的（变量）
            };
            let param = new FormData(); //创建form对象
            param.append('chunk', '0');//断点传输
            param.append('chunks', '1');
            param.append('file', file, file.name)
            console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            //先从自己的服务端拿到token
            var that = this;
            this.Http.get(this.Api.getQiniuToken(), null,
                function (result) {
                    var token = result.data.config.token;
                    console.log("token", token);
                    param.append('token', token);
                    that.uploading(param, config, file.name);//然后将参数上传七牛
                    return;
                });
        },
        uploading(param, config, pathName) {
            var self = this;
            this.Http.upload(param, config,function(key){
                self.images.push(key);
            });
        },
    }
}
</script>