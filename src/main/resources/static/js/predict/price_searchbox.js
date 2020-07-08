$(function () {
    //绘制的图表
    var test={
        // el:'#all-result-test',
        // name:'test',
        mounted:function () {            //AJAX操作不需要刷新浏览器
            console.log("test chars:")
            // var myChart = echarts.init(document.getElementById('all-result-test'));
            var test = this.$refs.chart;
            let myChart = echarts.init(test);
            console.log(test);
            var option = {
                title: {
                    text: '某地区蒸发量和降水量',
                    subtext: '纯属虚构'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['蒸发量', '降水量']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '蒸发量',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name: '降水量',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                        markPoint: {
                            data: [
                                {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                                {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },
        template:`
           <div id="all-result" ref="chart"> </div>
        `
    };
    //price图表显示框
    var price_result_box={
        data(){
            return{
            }
        },
        props:['startplace','endplace'],//父组件传值接收
        template:`
         <div id="price-result-box" class="data_table2">
                <div class="result-title-box clearfix">
                    <div><span>搜索结果</span></div>
                    <el-input v-model='startplace' :placeholder='startplace'></el-input>
                    <i class="el-icon-sort transformi" ></i>
                    <el-input v-model='endplace' :placeholder='endplace' ></el-input>
                </div>

                <div id="price-result-wrapper">
                    <!------一年内价格 月份------->
                    <div id="all-result-wrapper">
<!--                                <div id="all-result-test"></div>-->
<!--                        <test id="all-result-test"></test>-->
                    </div>

                    <!------出行价格 日期------->
                    <div id="go-result-wrapper">
                        <div class="result-title-box clearfix">
                            <div><span>去往日期</span></div>
                            <el-input v-model='startplace' :placeholder='startplace'></el-input>
                            <i class="el-icon-sort-up transformi" ></i>
                            <el-input v-model='endplace':placeholder='endplace' ></el-input>
                        </div>
<!--                        <test id="go-result-test"></test>-->
                    </div>

                    <!------返程价格 日期------->
                    <div id="return-result-wrapper">
                        <div class="result-title-box clearfix">
                            <div><span>返程日期</span></div>
                            <el-input v-model='startplace' :placeholder='startplace'></el-input>
                            <i class="el-icon-sort-down transformi" ></i>
                            <el-input v-model='endplace' :placeholder='endplace' ></el-input>
                        </div>
<!--                        <test id="return-result-test"></test>-->
                    </div>

                </div>
          </div>
        `
    }
    new Vue({
        el:'#price-search-box',//预测机票价格
        data(){
            return{
                cities:[],//城市集合
                startplace: '',//出发地
                endplace:'',//目的地
                selectmonth:'',//月份
                month:'',//选择的月份数 2020-7
                checked:true
            }
        },
        methods:{
            selectStartCity(e){
                console.log(this.startplace);
            },
            selectEndCity(e){
                console.log(this.endplace);
            },
            //搜索前的数据校验
            SelectPrice(){
                if(this.startplace==""){
                    this.$message.error('出发地不可为空');return;
                }
                else if(this.endplace==""){
                    this.$message.error('目的地不可为空');return;
                }
                else if(this.selectmonth==""){
                    this.$message.error('出行月不可为空');return;
                }

                var getdate=this.selectmonth.toString();
                var mymonth = new Date().getMonth()+1;//当前月份
                var getyear = parseInt(getdate.split(" ")[3]);//选择年份
                var getmonth=getdate.split(" ")[1];//选择月份
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
                };
                //如果选择的出行时间小于当前时间 不可以进行搜索
                if(getyear<2020){
                    this.$message.error('出行时间错误'); return;
                }
                if(getyear==2020 && month<mymonth){
                    this.$message.error('出行时间错误'); return;
                }
                //输入查询数据正确 开始进行数据分析 post
                this.month=getyear+'-'+month
                let param  = new URLSearchParams()
                param.append('departureCityName','重庆')
                param.append('arrivalCityName','北京')

                  console.log("输入查询数据正确 开始进行数据分析 post")
                 axios.post('/Predict/WhenToFly', param)
                    .then(function (response) {
                         console.log(response);
                    })
                  .catch(function (error) {
                       console.log(error);
                   });

                //图表区域显示
                $('.data_table2').removeClass('data_table_selected2')
                $('.data_table2').addClass('data_table_selected2')
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
            price_result_box,
        },

        template:`
        <div class="data_table data_table_selected" id="predict-price-box">
            <el-divider content-position="right">何时飞-机票往返</el-divider>
            <div id="predict-price-search-box" class="clearfix">
    
                <el-select v-model="startplace" clearable filterable
                    placeholder="出发地"
                    class="search-box-div"
                    id="startplace"
                    @change="selectStartCity($event)">
                    <el-option
                            v-for="item in cities"
                            :keys="item.cityname"
                            :label="item.cityname"
                            :value="item.cityname">
                        <span style="float: left">{{ item.cityname}}</span>
<!--                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cityname }}</span>-->
                    </el-option>
                </el-select>
    
                <i class="el-icon-sort search-box-div transformi" ></i>
    
                <el-select v-model="endplace" clearable filterable
                           placeholder="目的地"
                           id="endplace"
                           class="search-box-div"
                           @change="selectEndCity($event)">
                    <el-option
                            v-for="item in cities"
                            :keys="item.cityname"
                            :label="item.cityname"
                            :value="item.cityname">
                        <span style="float: left">{{ item.cityname }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cityname }}</span>
                    </el-option>
                </el-select>
    
                <div class="block search-box-div" id="select-month">
                    <el-date-picker
                            v-model="selectmonth"
                            type="month"
                            placeholder="出行月份"
                            format="yyyy/M">
                    </el-date-picker>
                </div>
    
                <el-checkbox v-model="checked" class="search-box-div">全部舱型</el-checkbox>
                <el-button type="warning btn-search" 
                    class="search-box-div" 
                    icon="el-icon-search" 
                    @click="SelectPrice"
                    round>
                    搜索
                </el-button>
            </div>
            
<!--           <test class="search-box-div"></test>-->
           <price_result_box
                :startplace="startplace"
                :endplace="endplace">
            </price_result_box>
    </div>
        `
    })

})