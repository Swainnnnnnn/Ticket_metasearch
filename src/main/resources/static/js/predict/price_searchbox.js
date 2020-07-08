$(function () {
    new Vue({
        el:'#price-search-box',//预测机票价格
        data(){
            return{
                cities:[],//城市集合
                priceinfo:[],//搜索的价格集合 日期+去往价格+返程价格
                startplace: '',//出发地
                endplace:'',//目的地
                selectmonth:'',//月份
                month:'',//选择的月份数 2020-7
                checked:true,
            }
        },
        methods:{
            selectStartCity(e){
                // console.log(this.startplace);
            },
            selectEndCity(e){
                // console.log(this.endplace);
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
                this.month=getyear+'/'+month
                let param  = new URLSearchParams()
                param.append('departureCityName',this.startplace)
                param.append('arrivalCityName',this.endplace)
                param.append('departureMonth',this.month)

                console.log("输入查询数据正确 开始进行数据分析 post----何时飞")
                // console.log(this.month)
                axios.post("/Predict/WhenToFly", param,
                    {headers:{'Content-type':'application/x-www-form-urlencoded'}})
                    .then(res => {
                        this.priceinfo=res.data

                        /*******************构建图表************************/
                            //启程chart
                        var gochart = this.$refs.gochart;
                        let mygoChart = echarts.init(gochart);
                        //返程chart
                        var backchart = this.$refs.backchart;
                        let mybackChart = echarts.init(backchart);

                        var date = []
                        var gopriceinfo = []
                        var backpriceinfo =[]
                        for (var i=0;i<this.priceinfo.length;i++){
                            date.push(this.priceinfo[i].departureDate)//日期
                            gopriceinfo.push(this.priceinfo[i].GoPrice)//启程价格
                            backpriceinfo.push(this.priceinfo[i].BackPrice)//返程价格
                        }
                        //启程
                        var gooption = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    crossStyle: {
                                        color: '#999'
                                    }
                                }
                            },
                            title: {
                                left: 'center',
                                text: ''
                            },
                            legend: {
                                data: ['何时飞——机票价格预测——启程']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    name: '日期',
                                    data: date,//日期
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '机票价格',
                                    axisLabel: {
                                        formatter: '{value} 元'
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '机票价格',
                                    type: 'bar',
                                    data: gopriceinfo,//启程机票价格
                                    markPoint: {
                                        data: [
                                            {type: 'max', name: '最高价格'},
                                            {type: 'min', name: '最低价格'}
                                        ]
                                    },
                                    markLine: {
                                        data: [
                                            {type: 'average', name: '平均票价'}
                                        ]
                                    },
                                    itemStyle: {
                                        normal: {
                                            //这里是重点
                                            color: function(params) {
                                                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                                if(params.dataIndex%2==0)
                                                    return '#c23531'
                                                else
                                                    return  '#2f4554'
                                            }
                                        }
                                    }
                                },
                            ],
                        };
                        //返程
                        var backoption = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    crossStyle: {
                                        color: '#999'
                                    }
                                }
                            },
                            title: {
                                left: 'center',
                                text: ''
                            },
                            legend: {
                                data: ['何时飞——机票价格预测——返程']
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    name: '日期',
                                    data: date,//日期
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '机票价格',
                                    axisLabel: {
                                        formatter: '{value} 元'
                                    }
                                }
                            ],
                            series: [
                                {
                                    name: '机票价格',
                                    type: 'bar',
                                    data: backpriceinfo,//启程机票价格
                                    markPoint: {
                                        data: [
                                            {type: 'max', name: '最高价格'},
                                            {type: 'min', name: '最低价格'}
                                        ]
                                    },
                                    markLine: {
                                        data: [
                                            {type: 'average', name: '平均票价'}
                                        ]
                                    },
                                    itemStyle: {
                                        normal: {
                                            //这里是重点
                                            color: function(params) {
                                                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                                if(params.dataIndex%2==0)
                                                    return '#61a0a8'
                                                else
                                                    return  '#d48265'
                                            }
                                        }
                                    }
                                },
                            ],
                        };
                        mygoChart.setOption(gooption);
                        mybackChart.setOption(backoption);
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
            axios.get("/cityList1").then(res => {
                // console.log(res)
                this.cities = res.data
            }).catch(function (error) {
                console.log(error);
            })

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
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.citytlc }}</span>
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
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.citytlc}}</span>
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
            
              <!-- -------------------构建图表区域------------------------------->

         <div id="price-result-box" class="data_table2">
                <div class="result-title-box clearfix">
                    <div><span>搜索结果</span></div>
<!--                    <el-input v-model='startplace' :placeholder='startplace'></el-input>-->
<!--                    <i class="el-icon-sort transformi" ></i>-->
<!--                    <el-input v-model='endplace' :placeholder='endplace' ></el-input>-->
                </div>

                <div id="price-result-wrapper">
                    <!------一年内价格 月份------->
<!--                    <div id="all-result-wrapper">-->
<!--                    &lt;!&ndash;-&#45;&#45;&#45;&#45;月份价格图表-&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--                        <test id="all-result-test"></test>-->
<!--                    </div>-->

                    <!------出行价格 日期------->
                    <div id="go-result-wrapper">
                        <div class="result-title-box clearfix">
                            <div><span>去往日期</span></div>
                            <el-input v-model='startplace' :placeholder='startplace'></el-input>
                            <i class="el-icon-sort-up transformi" ></i>
                            <el-input v-model='endplace':placeholder='endplace' ></el-input>
                        </div>
                        <!-------启程价格图表------->
                         <div id="all-result" ref="gochart"> </div>
                    </div>

                    <!------返程价格 日期------->
                    <div id="return-result-wrapper">
                        <div class="result-title-box clearfix">
                            <div><span>返程日期</span></div>
                            <el-input v-model='startplace' :placeholder='startplace'></el-input>
                            <i class="el-icon-sort-down transformi" ></i>
                            <el-input v-model='endplace' :placeholder='endplace' ></el-input>
                        </div>
                        <!-------返程价格图表------->
                           <div id="all-result" ref="backchart"> </div>
                    </div>

                </div>
          </div>
            
    </div>
        `
    })

})