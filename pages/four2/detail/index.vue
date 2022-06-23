<template>
  <div class="wrap">
    <header-diy  class="topbar" :type="2" :titleName="pageName"></header-diy>
    <!-- <div class="top">
      <div class="t1">
        <image mode="widthFix" class="datepic" src="@/static/image/xh.png" />
        <div class="text text3">信号强度</div>
      </div>
      <div class="t1">
        <div class="t5">80%</div>

        <div class="text">设备电量</div>
      </div>
      <div class="t1">
        <div class="t2">50<span>小时</span></div>
        <div class="text">工作强度</div>
      </div>
    </div> -->
    <div class="content clearcontent">
      <div class="test1">
        <div class="test3 flexcenter">
          <div @click="dateShow = true" class="inputdiy">{{ dateInput }}{{dateInput2?'-':''}}{{dateInput2}}</div>
          <div class="search">
            <image
              mode="widthFix"
              class="datepic"
              src="@/static/image/search2.png"
            />
          </div>
        </div>
        <div @click="showType = !showType" class="change flexcenter">
          <image
            mode="widthFix"
            class="change2"
            src="@/static/image/change2.png"
          />
          切换{{ !showType ? "图表" : "文字" }}
        </div>
      </div>
      <div v-if="!showType" class="tabflexnowrap">
        <div class="tabheader flexcenter tabheader2">
          <div
            class="c1"
            v-for="(item, index) in tabAll[urlType - 2]"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="tabnew">
          <div v-for="(item,index) in listAll" :key="index" class="tabcontent tabheader flexcenter">
            <div v-for="(item2,index2) in item" :key="index2" class="c1">{{item2}}</div>
           
          </div>
        </div>
      </div>
      <div v-if="showType" class="tabflexnowrap">
        <div class="tabheader flexcenter tabheader2">
          <div class="c1newwrap" v-if="index>0&&index<8"  v-for="(item, index) in tabAll[urlType-2]"
            :key="index">
            <div
            @click="changeChild(index)"
            :class="[activeChild == index ? 'c1addactive' : '', 'c1add']"
           
          >
            {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="showType" class="tabnew">
        <div class="cirbox">
          <qiun-data-charts
            type="mix"
            canvasId="three_b"
            :resshow="false"
            :ontouch="true"
            :opts="{
              legend: { show: false },
              enableScroll:true,
              yAxis: {
                disableGrid: true,

                data: [
                  {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    fontColor: '#939599',
                    position: 'left',
                    title: unitSet,
                    titleOffsetX: -20,
                    titleOffsetY: -5,
                    titleFontColor: '#939599',
                    max: chartDataTemperature
                      ? chartDataTemperature.yAxis[0].max
                      : 0,
                    min: chartDataTemperature
                      ? chartDataTemperature.yAxis[0].min
                      : 0,
                  },
                ],
              },
              xAxis: {
                fontSize:7,
                rotateLabel:true,
                scrollShow:true,
                itemCount:10,
                labelCount:7,
                scrollAlign:'left',
                axisLineColor: 'rgba(147,149,153,0.1)',
                disableGrid: false,
                gridColor: 'rgba(147,149,153,0.1)',
                gridType: 'solid',
                fontColor: '#939599',
              },
            }"
            :chartData="chartDataTemperature"
          />
        </div>
      </div>
      <!-- <image mode="widthFix" v-else class="fullpic" src="@/static/image/false30.png" /> -->
    </div>
    <!-- <div class="fixedbtn">
      <div class="btn2 flexcenter">
        <image mode="widthFix" class="close" src="@/static/image/close1.png" />
        关闭设备
      </div>
    </div> -->
    <u-calendar
      :closeOnClickOverlay="true"
      @close="dateShow = false"
      :show="dateShow"
      :mode="mode"
      monthNum="13"
      :minDate="minDate"
      @confirm="confirm"
    ></u-calendar>
  </div>
</template>
<script>
import headerDiy from "../../component/header/header.vue";
import request from "../../../common/utils/request";
import moment from "moment";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      listOver:false,
      size:20,
      current:1,
      moment,
      minDate:moment().add(-1, 'y').format("YYYY-MM-DD"),
      listAll:[],
      deviceId:null,
      urlType: null,
      unitSet: "",
      chartDataTemperature: {
        categories: ["1.15", "2.15", "3.15", "4.15", "5.15", "6.15", "7.15"],
        series: [
          {
            name: "今年",
            data: [1111, 1210, 2222, 3333, 4444, 5899, 6554],
            type: "line",
            addPoint: true,
            color: "#3199F5",
          },
        ],
        yAxis: [
          {
            // "max": 60,
            // "min": 0
          },
        ],
      },
      dateInput: "请输入查询日期",
      dateInput2:'',
      dateShow: false,
      mode: "range",
      activeChild: 1,
      showType: true,
      value: "",
      tabAll: [
        [
          "时间",
          "空气温度(℃)",
          "空气湿度(%)",
          "光照(Lux)",
          "大气压(kpa)",
          "风力",
          "风速", 
          "pm2",
          "风向",
        ],
        [ 
          "时间",
          "EC(us/cm)",
          "PH",
          '土壤温度(℃)',
          '土壤湿度(%)',
        ],
      
      ],
      tabAllChart:[
        [
          "时间",
          "空气温度(℃)",
          "空气湿度(%)",
          "光照(Lux)",
          "大气压(kpa)",
          "风力",
          "风速", 
          "pm2"
        ],
      ],
      showType: false,
      showType2: false,
      pageName: "一号",
      pageType:['','气象站','墒情仪','虫情仪'],
      numValue: "",
      typeList: [
        {
          name: "种类1",
        },
        {
          name: "种类2",
        },
        {
          name: "保密",
        },
      ],
      typeList2: [
        {
          name: "品种1",
        },
        {
          name: "品种2",
        },
        {
          name: "保密",
        },
      ],
      nameValue: "",
      typeValue: "",
      chartAll:[],
    };
  },
  onLoad(option) {
    this.urlType = option.type;
    this.deviceId=option.id
    if(this.urlType==2){
      this.chartAll=[[],[],[],[],[],[],[],[],[]]
      this.meteorologicalrecords()
      
    }else if(this.urlType==3){
      this.chartAll=[[],[],[],[],[]]
      this.meteorologicalrecords()
       
    }
    this.pageName=this.deviceId
  },
  onReachBottom() {
    console.log("触底了");
    if(!this.listOver){
      this.current++;
      //if(this.urlType==2){
        this.meteorologicalrecords()
      //}else if(this.urlType==3){
        //this.moisturerecords()
      //}
     
    }
  },
  methods: {
    changeChild(index){
      this.activeChild = index
      this.chartDataTemperature.series[0].data=this.chartAll[index]
    },
    meteorologicalrecords(init){
      let data={
          deviceId: this.deviceId,
          current: this.current,
          size:this.size,
      }
      if(this.dateInput2){
        data.startDate=this.dateInput
        data.endDate=this.dateInput2
      }
      let urlSet=this.urlType==2?'meteorologicalrecords':'moisturerecords'
      request({
        url: "/data/"+urlSet+"/page",
        method: "get",
        isAuth: false,
        data:data,
      }).then((res) => {
        if(init){
          this.listAll=[]
          if(this.urlType==2){
            this.chartAll=[[],[],[],[],[],[],[],[],[]]
          }else{
            this.chartAll=[[],[],[],[],[]]
          }
          
        }
        let add=[]
        res.data.records.reverse()
        res.data.records.forEach((item,index)=>{
          let addOne=[]
          if(this.urlType==2){
            addOne=[
              item.createTime,
              item.airTem,
              item.airHum,
              item.lux,
              item.kpa,
              item.windGrade,
              item.windSpeed,
              item.pm2point5,
              item.windDirect,
            ]
          }else if(this.urlType==3){
            addOne=[
              item.recordTime,
              item.ec,
              item.ph,
              item.temperature,
              item.humidity
            ]
          }
          add.push(addOne)
          addOne.forEach((item3,index3)=>{
            this.chartAll[index3].push(item3)
          })
        })
        
        
        this.listAll =this.listAll.concat(add)
        this.chartDataTemperature.categories=this.chartAll[0]
        this.chartDataTemperature.series[0].data=this.chartAll[1]
        console.log('515546',this.listAll)
        console.log('chaadddd',this.chartAll)
        if (res.data.records.length == 0) {
          uni.showToast({
            title: "暂无更多数据",
            icon: "none",
            duration: 850,
          });
          this.listOver=true
        }
      })
    },
    confirm(e) {
      this.dateShow = false;
      this.dateInput = e[0];
      this.dateInput2=e[e.length-1]
      this.current=1
      if(this.urlType==2){
        this.meteorologicalrecords(true)
      }
      console.log(this.dateInput2)
      console.log(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.cirbox{
  background: #fff;
}
.tabflexnowrap {
  overflow: scroll;
  
  .tabheader2{
    .c1{
      background: #fff;
    }
    .c1newwrap:nth-child(1){
        padding-left: 32rpx;
    }
    .c1newwrap{
      background: #fff;
      display: flex;
      flex-shrink: 0;
      padding: 16rpx 0rpx;
      .c1add{
        padding: 8rpx 32rpx;
      }
    
    }
  }
  .tabheader{
    justify-content: left!important;
    background: #fff;
  }
  .c1{
    flex-shrink: 0;
  }
}
.wrap {
  padding-bottom: 200rpx;
}
.c1add {
  border-radius: 100px;
  border: 1px solid #fff;
  box-sizing: border-box;
  padding: 8rpx 0;
}
.c1addactive {
  border: 1px solid #3199f5 !important;
  color: #3199f5 !important;
}
.top {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #939599;
  padding: 20rpx;
  font-size: 28rpx;
  .text3 {
    position: relative;
    top: 10rpx;
  }
  .datepic {
    width: 64rpx;
    margin-bottom: 20rpx;
  }
  .t5 {
    font-size: 64rpx;
    color: #29cc96;
    font-weight: bold;
  }
  .t1 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .t2 {
    font-size: 64rpx;
    font-weight: bold;
    color: #f5a631;
    span {
      font-size: 28rpx !important;
      font-weight: normal;
      color: #c4c7cc !important;
    }
  }
}
.fullpic {
  width: 100%;
}
.fixedbtn {
  position: fixed;
  bottom: 0;
  padding: 30rpx;
  width: 100%;
  z-index: 11;
  background: #fff;
  box-sizing: border-box;
  .btn2 {
    background: #f56262;
    color: #fff;
    border-radius: 100rpx;
    width: 100%;
    padding: 20rpx 0;
    font-size: 28rpx;
  }
  .close {
    width: 40rpx;
    margin-right: 40rpx;
  }
}
.tabcontent {
  background: transparent !important;
  font-weight: bold;
}

.tabheader {
  font-size: 24rpx;
  color: #626466;
  .c1 {
    width: 24%;
    padding: 20rpx 0;
    display: flex;
    justify-content: center;
    text-align: center;
  }
}
.clearcontent {
  margin: 0 !important;
}
.content {
  .change {
    font-size: 28rpx;
    color: #3199f5;
  }
  .change2 {
    width: 48rpx;
    margin-right: 10rpx;
  }
  .test5 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .inputdiy {
    background: #fafafa;
    font-size: 24rpx;
    color: #c4c7cc;
    height: 64rpx;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 40rpx;
  }
  .datepic {
    width: 48rpx;
  }
  .test6 {
    border-radius: 32rpx;
    overflow: hidden;
    width: 330rpx;
    margin-top: 30rpx;
    background: #fff;
    .videopic {
      width: 100%;
    }
    .text {
      padding: 15rpx;
      font-size: 28rpx;
      color: #626466;
    }
  }
  .test1 {
    background: #fff;
    padding: 20rpx;
    color: #626466;
    font-size: 28rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .test3 {
    position: relative;
    margin-right: 30rpx;
    background: #fafafa;
    border-radius: 200rpx;
    flex: 1;
    overflow: hidden;
    .u-border {
      border: none !important;
    }
    .search {
      position: absolute;
      right: 20rpx;
      top: 10rpx;
    }
  }
}
.wrapcommonfarm {
  margin: 45rpx 0;
}
.farmtab {
  background: #fff;
  display: flex;
  .c1 {
    color: #939599;
    font-size: 32rpx;
    border-bottom: 2px solid #fff;
    width: 33.333%;
    display: flex;
    justify-content: center;
    padding: 20rpx 0;
    margin: 0 30rpx;
  }
  .c1active {
    font-size: 36rpx !important;
    color: #313233 !important;
    border-bottom: 2px solid #12a669 !important;
  }
}
.content {
  margin: 32rpx;
  .farmtitle {
    font-weight: bold;
    margin-bottom: 10rpx;
  }
  .farmcontent {
    font-size: 24rpx;
    font-weight: bold;
  }
  .tip {
    font-size: 28rpx;
    color: #939599;
  }
  .content3 {
    margin: 40rpx 0 30rpx 0;
  }
  .input2 {
    display: flex;
  }
  .disablewrap {
    display: flex;
    padding: 12rpx 18rpx;
    justify-content: space-between;
    width: 100%;
  }
  .title {
    padding-left: 20rpx;
    border-left: 4rpx solid #29cc96;
    font-weight: bold;
    font-size: 32rpx;

    margin-bottom: 16rpx;
  }
  .form {
    color: #626466;
    font-size: 28rpx;
    .name {
      margin: 25rpx 0;
    }
    .input {
      background: #fafafa !important;
      border: none;
      border-radius: 16rpx;
    }
    .u-border {
      border: none;
    }
    .uni-input-input {
      color: #c4c7cc;
      font-weight: bold;
      border: none;
    }
  }
  .titlewrap {
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    .date {
      color: #626466;
      font-size: 24rpx;
    }
    span {
      color: #626466;
    }
  }
}
</style>