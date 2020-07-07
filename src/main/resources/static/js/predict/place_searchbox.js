$(function () {
    new Vue({
        el:'#place-search-box',//计划出行
        data(){
            return{
                cities:[],//城市集合
                startplace: '',//出发地
                selectdate:'',//出发日期
                date:'',//搜索用 出发日期
                checked:true
            }
        },
        methods:{
            selectStartCity(e){
                console.log(this.startplace);
            },
            //搜索前的数据校验
            SelectPlace(){
                if(this.startplace==""){
                    this.$message.error('出发地不可为空');return;
                }
                else if(this.selectdate==""){
                    this.$message.error('出行日期不可为空');return;
                }
                var getdate=this.selectdate.toString();
                var mydate = new Date().toLocaleDateString()//当前日期
                var mymonth=parseInt(mydate.split("/")[1])//当前月份
                var myday=parseInt(mydate.split("/")[2])//当前日期
                var getyear=parseInt(getdate.split(" ")[3])//获取年份
                var getmonth=getdate.split(" ")[1]//获取月份-英文
                var getday=parseInt(getdate.split(" ")[2])//获取日期
                // console.log(getdate)
                // console.log("getyear:"+getyear+"  getmonth:"+getmonth+"  getday:"+getday)
                // console.log("mymonth:"+mymonth+"myday:"+myday)
                var month=1;
                switch (getmonth) {//转化英文月份至数字月份
                    case "Jan":month=1;break;
                    case "Feb":month=2;break;
                    case "Mar":month=3;break;
                    case "Apr":month=4;break;
                    case "May":month=5;break;
                    case "Jun":month=6;break;
                    case "Jul":month=7;break;
                    case "Aug":month=8;break;
                    case "Sep":month=9;break;
                    case "Oct":month=10;break;
                    case "Nov":month=11;break;
                    case "Dec":month=12;break;
                }
                //如果选择的出行时间小于当前时间 不可以进行搜索
                if(getyear<2020){
                    this.$message.error('出行时间错误'); return;
                }
                else if(getyear==2020 && month<mymonth){
                    this.$message.error('出行时间错误'); return;
                }
                else if(getyear==2020 && month==mymonth && getday<myday){
                    this.$message.error('出行时间错误'); return;
                }

                // //输入查询数据正确 开始进行数据分析 post
                // this.month=getyear+'-'+month
                // let param  = new URLSearchParams()
                // param.append('departureCityName','重庆')
                // param.append('arrivalCityName','北京')

                // console.log("输入查询数据正确 开始进行数据分析 post")
                // axios.post('/Predict/WhenToFly', param)
                //     .then(function (response) {
                //         console.log(response);
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });

                //图表区域显示
                // $('.data_table2').removeClass('data_table_selected2')
                // $('.data_table2').addClass('data_table_selected2')
            }
        },
        created:function (){
            //获取城市信息 城市名+三字码
            axios.get("/cityList").then(res => {
                // console.log(res)
                this.cities = res.data
            }).catch(function (error) {
                console.log(error);
            })

        },
        components:{
        },

        template:`
         <div class="data_table" id="preditc-place-box">
            <el-divider content-position="right">飞去哪-机票单程</el-divider>
            <div id="predict-place-search-box" class="clearfix">

                <el-select v-model="startplace" clearable filterable
                           placeholder="出发地"
                           class="search-box-div2"
                           id="startplace"
                           @change="selectStartCity($event)">
                    <el-option
                            v-for="(item,index) in cities"
                            :key="index"
                            :label="item.cityname"
                            :value="item.cityname">
                        <span style="float: left">{{ item.cityname }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cityname }}</span>
                    </el-option>
                </el-select>

                <i class="el-icon-link search-box-div2 icon2" ></i>

                <el-date-picker class="block search-box-div2" id="select-date"
                        v-model="selectdate"
                        type="date"
                        placeholder="选择出行日期"
                        format="yyyy-MM-dd">
                </el-date-picker>

                <el-checkbox v-model="checked" class="search-box-div2" style="margin-left: 60px">全部舱型</el-checkbox>
                <el-button 
                    type="warning btn-search"
                    class="search-box-div2"
                     icon="el-icon-search"
                     @click="SelectPlace"
                     round>搜索</el-button>
            </div>
            
         </div>
        `
    })

})