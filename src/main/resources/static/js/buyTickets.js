var app = new Vue({
     el:'#ticket-app',
     data(){
         return{
             flightType:0,//机票类型，如单程：0、往返：1、多程：2
             departPlace:'',//出发地点
             destination:'',//目的地
             departTime:"",//出发时间
             arriveTime:"",//返程时间
             nowIndex:0, //标记被选中的排序方式
             goIndex:-1,//被选中航班的索引,>=0表示航班索引，-1表示还未选中航班，-2表示重新选择航班
             returnIndex:-1,//选中回程航班的索引
             depart:true,//用于标记是去程，还是回程
             company:[],
             cities:[],
             orderedTickets:[],
             flights:[],
             transitFlight:[],
             //航班信息
             sortMenu:[
                 {
                     title:"综合排序",
                     upon:false,
                     down:true,
                     count:1    //1表示被选中，2表示被选中，且状态与1态下相反，0表示未被选中
                 },
                 {
                     title: "起飞时间",
                     upon: false,
                     down: true,
                     count: 0
                 }],
         }
     },
     methods:{
         //根据条件查询机票
         searchTickets(){
             if(this.departPlace == "" || this.destination == ""){
                 this.$message.error("请选择出发城市和目的地")
                 return
             }
             //默认按照价格由低到高排序
             //选择往返机票时，先选择去程
             if (this.nowIndex == 0){
                 this.sortByPrice(this.departPlace, this.destination, this.departTime)
             }else{
                 this.sortByDepartTime(this.departPlace, this.destination, this.departTime)
             }
             var time = this.departTime.replace("-","/")
             time = time.replace("-","/")
             let param = new URLSearchParams()
             param.append('departureDate',time)
             param.append('departureCityName',this.departPlace)
             param.append('arrivalCityName',this.destination)
             axios.post('/transitInfo', param, {headers:{'Content-type':'application/x-www-form-urlencoded'}}).then(res => {
                 console.log(res)
             }).catch(function (error) {
                console.log("error in searchTicket")
             })
             this.clearCompanyStatus()
         },
         //选择机票，参数为机票的index
         choiceTicket(index){
             if(this.flightType == 0){
                 this.choiceSingleTicket(index)
             }else if(this.flightType == 1){
                 //先选择去程，再选择回程
                 this.choiceDoubleTicket(index)
             }else if(this.flightType == 2){

             }else{
                 console.log("error in choiceTicket")
             }
         },
         //重新选择机票，参数为选中机票的index
         reChoiceTicket(index){
             var ticket=this.getFlight()
             if(index == 0){
                 this.goIndex = -2
                 this.orderedTickets[0]=ticket
                 this.depart = true
                 if(this.nowIndex == 0){
                     this.sortByPrice(this.departPlace, this.destination, this.departTime)
                 }else{
                     this.sortByDepartTime(this.departPlace, this.destination, this.departTime)
                 }
             }else if(index == 1){
                 this.returnIndex = -2
                 this.orderedTickets[1]=ticket
                 this.depart = false
                 if(this.nowIndex == 0){
                     this.sortByPrice(this.destination, this.departPlace, this.arriveTime)
                 }else{
                     this.sortByDepartTime(this.destination, this.departPlace, this.arriveTime)
                 }
             }
             if(this.goIndex == -2 && this.returnIndex == -2){
                 this.goIndex = -1
                 this.returnIndex = -1
                 this.orderedTickets = []
                 if (this.flightType == 1){
                     if(this.nowIndex == 0){
                         this.sortByPrice(this.departPlace, this.destination, this.departTime)
                     }else{
                         this.sortByDepartTime(this.departPlace, this.destination, this.departTime)
                     }
                 }
             }
         },
         getFlight(){
             var ticket={
                 airlineName:"",
                 arrivalAirportName:"",
                 arrivalCityName:"",
                 arrivalDate:"",
                 arrivalTime:"",
                 arrivalcityTlc:"",
                 departureAirportName:"",
                 departureCityName:"",
                 departureDate:"",
                 departureTime:"",
                 departurecityTlc:"",
                 flightNumber:"",
                 price:"",
                 src:""
             }
             return ticket
         },
         //选择往返机票
         choiceDoubleTicket(index){
             var length = this.orderedTickets.length
             var ticket= this.getFlight()
             if(length >= 2){
                 //重新选择机票
                 if(length == 2 && (this.goIndex == -2 || this.returnIndex == -2)){
                     if(this.goIndex == -2 && this.returnIndex != -2){
                         this.copyTicketInfo(this.orderedTickets[0], this.flights[index])
                         this.goIndex = index
                     }
                     if (this.returnIndex == -2 && this.goIndex != -2){
                         this.copyTicketInfo(this.orderedTickets[1], this.flights[index])
                         this.returnIndex = index
                     }
                 }else{
                     this.$message.error("请先支付已选择的机票！")
                     return;
                 }
             } else {
                 //第一次选择机票
                 if(length == 0){
                     this.goIndex = index
                     this.depart = false
                     this.copyTicketInfo(ticket, this.flights[index])
                     this.orderedTickets.push(ticket)
                     //获取回程航班信息
                     this.clearCompanyStatus()
                     if (this.nowIndex == 0){
                         this.sortByPrice(this.destination, this.departPlace, this.arriveTime)
                     }else {
                         this.sortByDepartTime(this.destination, this.departPlace, this.arriveTime)
                     }
                 } else if (length == 1 && this.goIndex == -2){
                     //还未选择返程时，重新选择去程
                     this.goIndex = index
                     this.depart = false
                     this.copyTicketInfo(this.orderedTickets[0], this.flights[index])
                     //重新选择去程后，获取回程航班信息
                     this.clearCompanyStatus()
                     if (this.nowIndex == 0){
                         this.sortByPrice(this.destination, this.departPlace, this.arriveTime)
                     }else {
                         this.sortByDepartTime(this.destination, this.departPlace, this.arriveTime)
                     }
                 }else{
                     //第二次选票
                     this.returnIndex = index
                     this.copyTicketInfo(ticket, this.flights[index])
                     this.orderedTickets.push(ticket)
                 }
             }
         },
         //选择单程机票
         choiceSingleTicket(index){
             var length = this.orderedTickets.length
             if(length >= 1){
                 //重新选择机票
                 if( length == 1 && this.goIndex == -2){
                     this.copyTicketInfo(this.orderedTickets[0], this.flights[index])
                     this.goIndex = index
                 }else{
                     this.$message.error("请先支付已选择的机票！")
                     return
                 }
             }else{
                 //第一次选择机票
                 this.orderedTickets.push(this.flights[index])
                 this.goIndex = index
             }
         },
         sortChange(index){
             this.nowIndex = index
             //控制箭头显示方向
             if(this.sortMenu[index].count >= 2){
                 this.sortMenu[index].count = 1;
             }
             this.sortMenu[index].count ++;
             if (this.sortMenu[index].count == 2){
                 this.sortMenu[index].upon = !this.sortMenu[index].upon
                 this.sortMenu[index].down = !this.sortMenu[index].down
             }
             this.changeCount(index)
             //根据选择的排序方式获取航班信息
             if(index == 1){
                 this.sortByDepartTime(this.departPlace, this.destination, this.departTime)
             }else if(index == 0){
                 this.sortByPrice(this.departPlace, this.destination, this.departTime)
             }
         },
         changeCount(index){
             for(var i = 0; i < this.sortMenu.length; i++){
                 if(i != index){
                     this.sortMenu[i].count = 0;
                 }
             }
         },
         //根据价格进行排序
         sortByPrice(depart, destination, time){
             time = time.replace("-","/")
             time = time.replace("-","/")
             var param = new URLSearchParams()
             param.append('departureDate',time)
             param.append('departureCityName',depart)
             param.append('arrivalCityName',destination)
             if(this.sortMenu[0].down){
                 //带有航空公司的筛选
                 let index = this.isCompanyChecked()
                 if(index != -1){
                     param.append('airlineName', this.company[index].airlineName)
                     axios.post("/filter/chosenSynAsc",param, {headers:{'Content-type':'application/x-www-form-urlencoded'}}).then(res => {
                         // console.log(res)
                         this.flights = res.data
                         this.addCompanyLogo()
                     }).catch(function (error) {
                         console.log("error in sortByPrice")
                     })
                 }else{
                     axios.post("/filter/matchedSynAsc",param, {headers:{'Content-type':'application/x-www-form-urlencoded'}}).then(res => {
                         console.log(res)
                         this.flights = res.data
                         this.addCompanyLogo()
                     }).catch(function (error) {
                         console.log("error in sortByPrice")
                     })
                 }
             }else{
                 //带有航空公司的筛选
                 let index = this.isCompanyChecked()
                 if(index != -1){
                     param.append('airlineName', this.company[index].airlineName)
                     axios.post("/filter/chosenSynDesc",param, {headers:{'Content-type':'application/x-www-form-urlencoded'}}).then(res => {
                         // console.log(res)
                         this.flights = res.data
                         this.addCompanyLogo()
                     }).catch(function (error) {
                         console.log("error in sortByPrice")
                     })
                 }else{
                     axios.post("/filter/matchedSynDesc",param, {headers:{'Content-type':'application/x-www-form-urlencoded'}}).then(res => {
                         // console.log(res)
                         this.flights = res.data
                         this.addCompanyLogo()
                     }).catch(function (error) {
                         console.log("error in sortByPrice")
                     })
                 }
             }
         },
         //返回选中公司的序号
         isCompanyChecked(){
           let length = this.company.length
           for(var i = 0; i < length; i++){
               if (this.company[i].checked){
                   return i
               }
           }
           return -1
         },
         //根据时间进行排序
         sortByDepartTime(depart, dest, time){
             time = time.replace("-","/")
             time = time.replace("-","/")
             var param = new URLSearchParams()
             param.append('departureDate',time)
             param.append('departureCityName',depart)
             param.append('arrivalCityName',dest)
             if(this.sortMenu[1].down){
                 let index = this.isCompanyChecked()
                 if(index != -1){
                     param.append('airlineName', this.company[index].airlineName)
                     axios.post("/filter/chosenTimeAsc", param, {headers:{'Content-type':'application/x-www-form-urlencoded'}}).then(res => {
                         this.flights = res.data
                         this.addCompanyLogo()
                     }).catch(function (error) {
                         console.log("error in sortByTime")
                     })
                 }else{
                     axios.post("/filter/matchedTimeAsc", param, {headers:{'Content-type':'application/x-www-form-urlencoded'}}).then(res => {
                         this.flights = res.data
                         this.addCompanyLogo()
                     }).catch(function (error) {
                         console.log("error in sortByTime")
                     })
                 }
             }else{
                 let index = this.isCompanyChecked()
                 if(index != -1){
                     param.append('airlineName', this.company[index].airlineName)
                     axios.post("/filter/chosenTimeDesc", param, {headers:{'Content-type':'application/x-www-form-urlencoded'}}).then(res => {
                         this.flights = res.data
                         this.addCompanyLogo()
                     }).catch(function (error) {
                         console.log("error in sortByTime")
                     })
                 }else{
                     axios.post("/filter/matchedTimeDesc", param, {headers:{'Content-type':'application/x-www-form-urlencoded'}}).then(res => {
                         this.flights = res.data
                         this.addCompanyLogo()
                     }).catch(function (error) {
                         console.log("error in sortByTime")
                     })
                 }
             }
         },

         //控制航空公司单选
         choiceAirline(index){
             this.company[index].checked = true
             for(var i = 0; i < this.company.length; i++){
                 if(i != index){
                     this.company[i].checked = false
                 }
             }
             this.$forceUpdate();
             if (this.flightType == 0){
                 //选中某航空公司时，判断当前处于那种排序方式
                 if(this.nowIndex == 0){
                     this.sortByPrice(this.departPlace, this.destination, this.departTime)
                 }else{
                     this.sortByDepartTime(this.departPlace, this.destination, this.departTime)
                 }
             }else if(this.flightType == 1){
                 //往返情况下，根据去程和返程分开进行筛选
                 if(this.orderedTickets.length == 0 || (this.goIndex == -2 && this.returnIndex != -2)){
                     if(this.nowIndex == 0){
                         this.sortByPrice(this.departPlace, this.destination, this.departTime)
                     }else{
                         this.sortByDepartTime(this.departPlace, this.destination, this.departTime)
                     }
                 }else{
                     if (this.nowIndex == 0){
                         this.sortByPrice(this.destination, this.departPlace, this.arrivalTime)
                     }else{
                         this.sortByDepartTime(this.destination, this.departPlace, this.arrivalTime)
                     }
                 }
             }
         },
         //选择航班类型，单程、往返时，清空上一次选择留下的数据
         choiceFlightType(){
             this.orderedTickets = []
             this.flights = []
             this.goIndex = -1
             this.returnIndex = -1
             this.destination = ""
             this.departPlace = ""
             this.depart = true
             this.clearCompanyStatus()
         },
         //清空航空公司被选中状态
         clearCompanyStatus(){
             var length = this.company.length
             for(var i = 0; i < length; i++){
                 this.company[i].checked = false
             }
         },
         //给返回的航班信息添加logo
         addCompanyLogo(){
             var logo = new Map()
             logo.set("四川航空", './img/3U.png')
             logo.set("中国国航", "./img/CA.png" )
             logo.set("深圳航空", './img/ZH.png')
             logo.set("金鹏航空", './img/Y8.png')
             logo.set("西藏航空", "./img/TV.png")
             logo.set("东方航空", './img/MU.png')
             logo.set("海南航空", "./img/HU.png")
             logo.set("成都航空", "./img/EU.png")
             logo.set('东海航空', './img/DZ.png')
             logo.set("南方航空", "./img/CZ.png")
             let length = this.flights.length
             for(var i = 0; i < length; i++){
                 this.flights[i].src = logo.get( this.flights[i].airlineName)
                 // console.log(this.flights[i].src)
                 if (this.flights[i].src == undefined){
                     this.flights[i].src = "./img/default.png"
                 }
             }
         },
         copyTicketInfo(a, b){
             a.airlineName = b.airlineName
             a.arrivalAirportName = b.arrivalAirportName
             a.arrivalCityName = b.arrivalCityName
             a.arrivalDate = b.arrivalDate
             a.arrivalTime = b.arrivalTime
             a.arrivalcityTlc = b.arrivalcityTlc
             a.departureAirportName = b.departureAirportName
             a.departureCityName = b.departureCityName
             a.departureDate = b.departureDate
             a.departureTime = b.departureTime
             a.departurecityTlc = b.departurecityTlc
             a.flightNumber = b.flightNumber
             a.price = b.price
             a.src = b.src
         },
         refresh(){
             this.$forceUpdate();
         },
         //预加载图片
         loadImg(){
             let urls = ['./img/3U.png', './img/CA.png', './img/CZ.png', './img/default.png', './img/DZ.png',
                 './img/EU.png', './img/HU.png', './img/MU.png', './img/TV.png', './img/Y8.png', './img/ZH.png'];
             let promiseAll = [];
             let imgs = [];
             const len = urls.length
             for (let i = 0; i < len; i++) {
                 promiseAll[i] = new Promise((res, rej) => {
                     imgs[i] = new Image();
                     imgs[i].src = urls[i];
                     imgs.onload = () => {
                         res(imgs[i]);
                     }
                 })
             }
         }
     },
     created(){
         //初始化时间
         var time = new Date();
         this.departTime = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
         //请求获取城市列表
         axios.get("/cityList").then(res => {
             // console.log(res)
             this.cities = res.data
         }).catch(function (error) {
            console.log("error in get cities message")
         })
         //请求获取航空公司列表
         axios.get("/airlineList").then(res => {
             this.company = res.data
             //给航空公司添加属性checked
             var length = this.company.length
             for(var i = 0; i < length; i++){
                 this.company[i].checked = false
             }
         }).catch(function (error) {
            console.log("error in get company message")
         })
         this.loadImg()
     }
 });
 //设置网页宽度为pc屏幕宽度
 document.body.style.width = (window.screen.availWidth) + "px";



