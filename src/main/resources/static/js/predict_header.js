$(function() {
    new Vue({
        el:'#header-wrapper',
        data(){
            return{
                //轮播图的图片资源
                images:[{
                    id:0,
                    idview:'https://dimg04.c-ctrip.com/images/0zg39120003riydtl97A9.jpg'
                },
                    {
                        id:1,
                        idview:'https://dimg04.c-ctrip.com/images/0zg6y120003o516dq2617.jpg'
                    },
                    {
                        id:2,
                        idview:'https://pic.c-ctrip.com/AssetCatalog/schedule-online/new-banner.png'
                        // idview:'https://dimg04.c-ctrip.com/images/0zg5p120003qavysnFDAA.jpg'
                    }]
            }
        },//data
        template:`
            <div class="block">
                <el-carousel>
                    <el-carousel-item v-for="(item,index) in images" :key="index">
                        <img :src="item.idview" class="carousel-image">
                    </el-carousel-item>
                </el-carousel>
            </div>
            `
});
});