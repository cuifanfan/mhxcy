<template>
  <div class="wrap">
    <header-diy
      :backHidden="2"
      :type="2"
      class="topbar"
      :titleName="pageName"
    ></header-diy>
    <div class="farmtab">
      <div @click="active = !active" :class="[active ? 'c1active' : '', 'c1']">
        设备列表
      </div>
      <div @click="active = !active" :class="[!active ? 'c1active' : '', 'c1']">
        分析统计
      </div>
    </div>
    <div class="content" v-if="active">
      <div class="panlewrap flexcenter">
        <div
          class="panle flexcenter"
          v-for="(item, index) in tablist"
          :key="index"
        >
          <div class="c1">
            <div class="num flexcenter">
              {{ item.num }}
            </div>
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
      </div>
      <div class="index2">
        <div class="title1">
          <span>气象监测</span>
          <div class="border"></div>
        </div>
        <!-- <div @click="goFarm" class="title2">全部设备</div> -->
      </div>
      <div class="scrolldiv">
        <div
          class="scrollchild"
          v-for="(item, index) in weatherList"
          :key="index"
        >
          <div class="detailwrap">
            <div class="d1wrap">
              <div class="d1 flexcenter">
                <div class="d2 flexcenter" v-if="item.status=='online'">在线</div>
                {{ item.name }}
              </div>
              <div class="btnd flexcenter" @click="goDetail2(2)">查看详情</div>
            </div>

            <div class="d3">
              <div class="d4" flexcenter>
                <image
                  mode="widthFix"
                  class="set"
                  src="@/static/image/adress2.png"
                />
                {{ item.address ? item.address : "-" }}
              </div>
              <div class="d4 flexcenter">
                <image
                  mode="widthFix"
                  class="set"
                  src="@/static/image/time.png"
                />
                {{ item.create_time }}
              </div>
            </div>
          </div>
          <div class="index1 index90">
            <div
              class="index91"
              :style="{ marginBottom: index == 6 || index == 7 ? '0' : '' }"
              v-for="(item, index) in item.arr"
              :key="index"
            >
              <image mode="widthFix" class="pic92" :src="item.pic" />
              <div class="index92">
                <div class="index93">
                  <span>{{ item.num }}</span
                  >{{ item.unit }}
                </div>
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="index2">
        <div class="title1">
          <span>墒情监测</span>
          <div class="border"></div>
        </div>
        <!-- <div @click="goFarm" class="title2">全部设备</div> -->
      </div>
      <div class="scrolldiv">
        <div class="scrollchild" v-for="(item, index) in soilList" :key="index">
          <div class="detailwrap">
            <div class="d1wrap">
              <div class="d1 flexcenter">
                <div class="d2 flexcenter" v-if="item.status=='online'">在线</div>
                {{ item.name }}
              </div>
              <div class="btnd flexcenter" @click="goDetail2(2)">查看详情</div>
            </div>

            <div class="d3">
              <div class="d4" flexcenter>
                <image
                  mode="widthFix"
                  class="set"
                  src="@/static/image/adress2.png"
                />
                {{item.address?item.address:'-'}}
              </div>
              <div class="d4 flexcenter">
                <image
                  mode="widthFix"
                  class="set"
                  src="@/static/image/time.png"
                />
                {{ item.record_time }}
              </div>
            </div>
          </div>
          <div class="index1 index90">
            <div
              class="index91"
              
            >
              <image mode="widthFix" class="pic92" src="@/static/image/s7.png" />
              <div class="index92">
                <div class="index93">
                  <span>{{item.ec}}</span
                  >us/cm
                </div>
                土壤EC值
              </div>
            </div>
            <div
              class="index91"
              
            >
              <image mode="widthFix" class="pic92" src="@/static/image/s8.png" />
              <div class="index92">
                <div class="index93">
                  <span>{{item.ph}}</span
                  >
                </div>
                土壤PH值
              </div>
            </div>
            <div
              class="index91" 
            >
              <image mode="widthFix" class="pic92" src="@/static/image/s5.png" />
              <div class="index92">
                <div class="index93">
                  <span>{{item.temperature}}</span
                  >℃
                </div>
                土壤温度
              </div>
            </div>
            <div
              class="index91"
              
            >
              <image mode="widthFix" class="pic92" src="@/static/image/s6.png" />
              <div class="index92">
                <div class="index93">
                  <span>{{item.humidity}}</span
                  >
                  %
                </div>
                土壤湿度
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="index2">
        <div class="title1">
          <span>虫情监测</span>
          <div class="border"></div>
        </div>
        <!-- <div @click="goFarm" class="title2">全部设备</div> -->
      </div>
      <div class="scrolldiv">
        <div class="scrollchild">
          <div class="detailwrap">
            <div class="d1wrap">
              <div class="d1 flexcenter">
                <div class="d2 flexcenter">在线</div>
                1号虫情仪
              </div>
              <div @click="goDetail2(4)" class="btnd flexcenter">查看详情</div>
            </div>

            <div class="d3">
              <div class="d4" flexcenter>
                <image
                  mode="widthFix"
                  class="set"
                  src="@/static/image/adress2.png"
                />
                (鄂托克前旗三段村)
              </div>
              <div class="d4 flexcenter">
                <image
                  mode="widthFix"
                  class="set"
                  src="@/static/image/time.png"
                />
                2022.02.10 16:25
              </div>
            </div>
          </div>
          <div class="cirbox">
            <qiun-data-charts
              type="ring"
              canvasId="four_a"
              :resshow="false"
              :opts="{
                legend: { position: 'bottom' },
                title: { name: '' },
                centerColor: 'red',
                title: { name: '总数' },
                subtitle: {
                  name: '100',
                  color: '#12A669',
                  fontSize: 20,
                },
              }"
              :chartData="chartData"
            />
          </div>
        </div>
        <div class="scrollchild">
          <div class="detailwrap">
            <div class="d1wrap">
              <div class="d1 flexcenter">
                <div class="d2 flexcenter">在线</div>
                1号虫情仪
              </div>
              <div @click="goDetail2(4)" class="btnd flexcenter">查看详情</div>
            </div>

            <div class="d3">
              <div class="d4" flexcenter>
                <image
                  mode="widthFix"
                  class="set"
                  src="@/static/image/adress2.png"
                />
                (鄂托克前旗三段村)
              </div>
              <div class="d4 flexcenter">
                <image
                  mode="widthFix"
                  class="set"
                  src="@/static/image/time.png"
                />
                2022.02.10 16:25
              </div>
            </div>
          </div>
          <div class="cirbox">
            <qiun-data-charts
              type="ring"
              canvasId="four_b"
              :resshow="false"
              :opts="{
                legend: { position: 'bottom' },
                title: { name: '' },
                centerColor: 'red',
                title: { name: '总数' },
                subtitle: {
                  name: '100',
                  color: '#12A669',
                  fontSize: 20,
                },
              }"
              :chartData="chartData"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-else>
      <div class="index1">
        <div class="header">
          <div class="header2">设备统计</div>
          <!-- <div class="header3">全部设备</div> -->
        </div>
        <div class="cirbox">
          <qiun-data-charts
            type="ring"
            canvasId="four_c"
            :resshow="false"
            :opts="{
              legend: { position: 'bottom' },
              title: { name: '' },
              centerColor: 'red',
              title: { name: '总数' },
              subtitle: {
                name: '100',
                color: '#12A669',
                fontSize: 20,
              },
            }"
            :chartData="chartDataSet"
          />
        </div>
      </div>
      <div class="index1">
        <div class="header">
          <div class="header2">设备状态</div>
          <!-- <div class="header3">全部设备</div> -->
        </div>
        <div class="cirbox">
          <qiun-data-charts
            type="pie"
            canvasId="four_d"
            :chartData="chartDataPie"
            :resshow="false"
            :opts="{
              legend: { position: 'right' },
            }"
          />
        </div>
      </div>
      <div class="index1">
        <div class="header">
          <div class="header2">设备工作时长占比</div>
          <!-- <div class="header3">全部设备</div> -->
        </div>
        <div class="cirbox">
          <qiun-data-charts
            type="pie"
            canvasId="four_e"
            :chartData="chartDataPie2"
            :resshow="false"
            :opts="{}"
          />
        </div>
      </div>
      <!-- <div class="index1 index11">
        <div class="title1">
          <span>设备异常统计</span>
          <div class="border"></div>
        </div>
        <div class="cirbox">
          <qiun-data-charts
            type="mix"
            canvasId="three_f"
            :resshow="false"
            :opts="{
              legend: { position: 'top', show: false },
              yAxis: {
                disableGrid: true,

                data: [
                  {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    fontColor: '#939599',
                    position: 'left',
                    title: '单位(次)',
                    titleOffsetX: -15,
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
      </div> -->
    </div>
  </div>
</template>

<script>
import headerDiy from "../component/header/header.vue";
import request from "../../common/utils/request";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      userInfo:null,
      soilList: [],
      weatherList: [],
      chartDataTemperature: {
        categories: ["00", "02", "04", "06", "08", "10", "12"],
        series: [
          {
            name: "今年",
            data: [15, 12, 13, 23, 25, 23, 22],
            type: "line",
            addPoint: true,
            color: "#17E6A1",
          },
        ],
        yAxis: [
          {
            // "max": 60,
            // "min": 0
          },
        ],
      },
      chartDataPie: {
        series: [
          {
            data: [
              // {
              //   name: "在线",
              //   value: 50,
              //   color: "#29CC96",
              // },
              // {
              //   name: "离线",
              //   value: 60,
              //   color: "#939599",
              // },
              // {
              //   name: "异常",
              //   value: 70,
              //   color: "#F56262",
              // },
            ],
          },
        ],
      },
      chartDataPie2: {
        series: [
          {
            data: [
              // {
              //   name: "工作时长",
              //   value: 50,
              //   color: "#317FF5",
              // },
              // {
              //   name: "离线时长",
              //   value: 60,
              //   color: "#F56262",
              // },
              // {
              //   name: "异常时长",
              //   value: 70,
              //   color: "#3199F5",
              // },
            ],
          },
        ],
      },
      chartData: {
        series: [
          {
            name: "红蜘蛛",
            data: 50,
            color: "#17E5CA",
          },
          {
            name: "草地贪叶蛾",
            data: 62,
            color: "#3199F5",
          },
          {
            name: "蝗虫",
            data: 23,
            color: "#F5A631",
          },
          {
            name: "玉米蓟马",
            data: 96,
            color: "#8F30BF",
          },
          {
            name: "黏虫",
            data: 42,
            color: "#17CAE5",
          },
        ],
      },
      chartDataSet: {
        series: [
          // {
          //   name: "气象监测站",
          //   data: 50,
          //   color: "#17E5CA",
          // },
          // {
          //   name: "虫情监测站",
          //   data: 23,
          //   color: "#F5A631",
          // },
          // {
          //   name: "土壤墒情仪",
          //   data: 96,
          //   color: "#8F30BF",
          // },
          // {
          //   name: "摄像机",
          //   data: 42,
          //   color: "#17CAE5",
          // },
        ],
      },
      tablist: [
      ],
      active: true,
      active2: true,
      active1: true,
      info: {
        one: 12.35,
        two: 12.35,
        three: 33.22,
        four: 85.2,
        five: 15,
      },
      pageName: "茶园种植",
      indexMenu: [
        {
          name: "农情监测",
          num: 5,
          pic: require("@/static/image/p3.png"),
        },
        {
          name: "智能控制",
          num: 52,
          pic: require("@/static/image/p4.png"),
        },
        {
          name: "农业知识库",
          num: 8,
          pic: require("@/static/image/p5.png"),
        },
        {
          name: "专家问诊",
          num: 13,
          pic: require("@/static/image/p10.png"),
        },
      ],
    };
  },
  onLoad() {
    this.userInfo=uni.getStorageSync('userInfo')
    this.getEnvironment()
    this.getCurrentMoisture()
    this.getAllDeviceStatusNow()
    this.getEachDeviceCountByUser()
    this.getAllDeviceWorkTimes()
  },
  methods: {
    getAllDeviceStatusNow(){
       
       request({
        url: "/data/iotdevice/getAllDeviceStatusNow",
        method: "get",
        isAuth: false,
        data: {userId:this.userInfo.userId},
      })
      .then((res) => { 
          let online=parseInt(res.data.online)
          let total=parseInt(res.data.total)
          this.chartDataPie.series[0]['data'].push({
                name: "在线",
                value: online,
                color: "#29CC96",
          })
           this.chartDataPie.series[0]['data'].push({
                name: "离线",
                value: total-online,
                color: "#939599",
          })
           this.chartDataPie.series[0]['data'].push({
                name: "异常",
                value:0,
                color: "yellow",
          })
       })
    },
    getAllDeviceWorkTimes(){
      request({
        url: "/data/iotdevice/getAllDeviceWorkTimes",
        method: "get",
        isAuth: false,
        data: {userId:this.userInfo.userId},
      })
      .then((res) => { 
        let online=res.data.worktimes
        let total=res.data.allimes
        this.chartDataPie2.series[0]['data'].push({
                name: "工作时长",
                value: online,
                color: "#317FF5",
        })
        this.chartDataPie2.series[0]['data'].push({
                name: "离线时长",
                value: total-online,
                color: "#F56262",
        })
        this.chartDataPie2.series[0]['data'].push({
                name: "异常时长",
                value: 0,
                color: "yellow",
        })
      })
    },
    getEachDeviceCountByUser(){
      request({
        url: "/data/iotdevice/getEachDeviceCountByUser",
        method: "get",
        isAuth: false,
        data: {userId:this.userInfo.userId},
      })
      .then((res) => { 
        
        let colorArr=['#17E5CA','#F5A631',"#8F30BF","#17CAE5"]
        res.data.deviceList.forEach((item,index)=>{
          this.chartDataSet.series.push({
            name: item.name,
            data: parseInt(item.value),
            color: colorArr[index],
          })
          this.tablist.push({
            num:parseInt(item.value),
            text:item.name
          })
        })
       })
    },
    getEnvironment() {
      request({
        url: "/data/meteorologicalrecords/getCurrentWeather",
        method: "get",
        isAuth: false,
        data: {
          userId:this.userInfo.userId
        },
      }).then((res) => {
        this.weatherList = res.data;
        this.weatherList.forEach((item2, index) => {
          let add = [];
          add[0] = {
            //num: item2.wind_speed!=null ? item2.wind_speed : "-",
            num: item2.wind_grade!=null?item2.wind_grade:'-',
            unit: "级",
            name: "风力",
            pic: require("@/static/image/new1.png"),
          };
          add[1] = {
            num: item2.wind_speed!=null ? item2.wind_speed : "-",
            unit: "m/s",
            name: "风速",
            pic: require("@/static/image/new2.png"),
          };
          add[2] = {
            num: item2.wind_direct!=null ? item2.wind_direct : "-",
            unit: "",
            name: "风向",
            pic: require("@/static/image/new3.png"),
          };
          add[3] = {
            num: item2.air_tem!=null ? item2.air_tem : "-",
            unit: "℃",
            name: "空气温度",
            pic: require("@/static/image/new4.png"),
          };
          add[4] = {
            num: item2.air_hum!=null ? item2.air_hum : "-",
            unit: "%RH",
            name: "空气湿度",
            pic: require("@/static/image/new5.png"),
          };
          add[5] = {
            num: item2.pm2point5!=null ? item2.pm2point5 : "-",
            unit: "ug/m3",
            name: "Pm2",
            pic: require("@/static/image/new6.png"),
          };
          add[6] = {
            num: item2.kpa!=null ? item2.kpa : "-",
            unit: "kpa",
            name: "大气压",
            pic: require("@/static/image/new7.png"),
          };
          add[7] = {
            num: item2.lux!=null ? item2.lux : "-",
            unit: "lux",
            name: "光照",
            pic: require("@/static/image/new8.png"),
          };
          this.$set(item2, "arr", add);
        });
      });
    }, 
    getCurrentMoisture() {
      request({
        url: "/data/moisturerecords/getCurrentMoisture",
        method: "get",
        isAuth: false,
        data: {
          userId:this.userInfo.userId
        },
      }).then((res) => {
        this.soilList=res.data
      });
    },
    goDetail2(val) {
      uni.navigateTo({
        url: "/pages/four2/detail/index?type=" + val,
      });
    },

    indexNavGo(index) {
      if (index == 0) {
        uni.navigateTo({
          url: "/pages/four2/index",
        });
      }
      if (index == 1) {
        uni.navigateTo({
          url: "/pages/wisdom/index",
        });
      }
    },
    goNews() {
      uni.navigateTo({
        url: "/pages/news/index",
      });
    },
    goFarm() {
      uni.navigateTo({
        url: "/pages/farming/index",
      });
    },
    goEdit() {
      uni.navigateTo({
        url: "/pages/farming/edit",
      });
    },
    changeTab(val) {
      this.active2 = !this.active2;
      if (val == 1) {
        this.info = {
          one: 12.35,
          two: 12.35,
          three: 33.22,
          four: 85.2,
          five: 15,
        };
      } else {
        this.info = {
          one: 11.35,
          two: 10.35,
          three: 53.22,
          four: 81.2,
          five: 20,
        };
      }
    },
  },
};
</script>

<style scoped lang="scss">
.index1 {
  background: #ffffff;
  padding: 20rpx 32rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  margin-bottom: 0!important;
}
.index90 {
  background: #fafafa !important;
  display: flex;
  flex-wrap: wrap;
  .index91 {
    width: 50%;
    display: flex;
    margin-bottom: 20rpx;
    .index92 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 24rpx;
      margin-left: 20rpx;
      color: #939599;
      span {
        font-weight: bold;
        color: #000;
        font-size: 32rpx !important;
      }
    }
  }
}
.index11 {
  background: transparent !important;
  margin-bottom: 0 !important;
}
.title1 {
  position: relative;
  width: 290rpx;
  span {
    position: relative;
    z-index: 2;
  }
  .border {
    width: 290rpx;
    height: 8rpx;
    background: #29cc96;
    position: relative;
    top: -9rpx;
    z-index: 1;
  }
}
.fullpic {
  width: 100%;
  margin-top: 20rpx;
}
.index1 {
  background: #ffffff;
  padding: 20rpx 32rpx;
  margin-bottom: 30rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  margin: 26rpx 0;
}
.header {
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  padding-bottom: 20rpx;
  border-bottom: 1px solid#F5F5F5;
  align-items: center;
  .header3 {
    color: #29cc96;
  }
  .header2 {
    border-left: 2px solid #29cc96;
    padding-left: 15rpx;
    font-size: 28rpx;
    font-weight: bold;
  }
}
.fullw {
  width: 100%;
}
.scrolldiv {
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;
}
.scrollchild {
  padding: 24rpx;
  border-radius: 24rpx;
  background: #fff;
  width: 560rpx;
  flex-shrink: 0;
  margin-right: 30rpx;
}
.detailwrap {
  font-size: 24rpx;
  color: #626466;
  .set {
    width: 32rpx;
    margin-right: 8rpx;
  }
  .d1 {
    font-weight: bold;
    font-size: 32rpx;
    color: #000;
  }
  .d4 {
    display: flex;
    align-items: center;
  }
  .d2 {
    background: #ddf7ee;
    color: #29cc96;
    width: 64rpx;
    padding: 5rpx;
    font-weight: normal !important;
    font-size: 24rpx;
  }
  .d3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btnd {
    font-size: 28rpx;
    border-radius: 12rpx;
    color: #fff;
    background: #29cc96;
    width: 145rpx;
    height: 48rpx;
    padding: 5rpx;
  }
  .d1wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
  }
  .detailc1 {
    display: flex;
    justify-content: space-between;
  }
}
.index2 {
  display: flex;
  justify-content: space-between;
  font-size: 36rpx;
  font-weight: bold;
  align-items: center;
  margin: 30rpx 0 15rpx 0;
  .title2 {
    color: #12a669;
    font-size: 28rpx;
  }
  .title1 {
    span {
      position: relative;
      z-index: 2;
    }
  }
  .border {
    width: 144rpx;
    height: 8rpx;
    background: #29cc96;
    position: relative;
    top: -9rpx;
    z-index: 1;
  }
}
.content {
  margin: 0 32rpx;
}
.panlewrap {
  background: #fff;
  border-radius: 24rpx;
  margin-top: 30rpx;
  padding: 15rpx;
  justify-content: space-between!important;
  .text {
    color: #626466;
    font-size: 28rpx;
  }
  .panle:nth-child(1) {
    color: #29cc96;
  }
  .panle:nth-child(2) {
    color: #3199f5;
  }

  .panle:nth-child(3) {
    color: #17cae5;
  }
  .panle:nth-child(4) {
    color: #f5a631;
  }
   .panle:nth-child(5) {
    color: #8F30BF;
  }
  
  .panle {
    width: 25%;
    font-size: 64rpx;
    font-weight: bold;
    .text{
      font-weight: normal!important;
    }
  }
  .c1 {
  }
}
.farmtab {
  background: #fff;
  display: flex;
  .c1 {
    color: #939599;
    font-size: 32rpx;
    border-bottom: 2px solid #fff;
    width: 50%;
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
.index {
  margin: 0 32rpx;
  .index7 {
    margin-top: 40rpx;
    .index90 {
      background: #fafafa !important;
      display: flex;
      flex-wrap: wrap;
      .index91 {
        width: 50%;
        display: flex;
        margin-bottom: 20rpx;
        .index92 {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 24rpx;
          margin-left: 20rpx;
          color: #939599;
          span {
            font-weight: bold;
            color: #000;
            font-size: 32rpx !important;
          }
        }
      }
    }
    .index81 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #626466;
      .index83 {
        display: flex;
        align-items: center;
      }
      .index85 {
        position: relative;
        top: 8rpx;
      }
      .index82 {
        color: #3199f5;
        font-weight: bold;
        font-size: 48rpx;
      }
      .index84 {
        width: 40rpx;
        margin-left: 10rpx;
      }
    }
    .text {
      margin: 0 20rpx;
      color: #828282;
      font-size: 24rpx;
    }
    .pic72 {
      width: 32rpx;
    }
    .index72 {
      display: flex;
      align-items: center;
    }
    .index71 {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .index74 {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
    }
    .index73 {
      font-size: 24rpx;
      padding-bottom: 20rpx;
      border-bottom: 1px solid#F5F5F5;
      .index75 {
        color: #29cc96;
        font-size: 40rpx;
        font-weight: bold;
        padding: 20rpx 0 5rpx 0;
      }
      .index80 {
        font-size: 32rpx !important;
      }
      .index79 {
        color: #3199f5 !important;
      }
    }
  }
  .graytip {
    font-size: 28rpx;
    color: #313233;
    margin-top: 30rpx;
    .left {
      font-weight: bold;
    }
    .right {
      background-color: #29cc96;
      color: #fff;
      border-radius: 16rpx;
      font-size: 20rpx;
      margin-left: 20rpx;
      text-align: center;
      padding: 10rpx;
    }
  }
  .tabchange {
    color: #12a669;
    font-size: 24rpx;
    border-radius: 50rpx;
    border: 1px solid #29cc96;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0 30rpx;
    .one {
      text-align: center;
      flex: 1;
      height: 48rpx;
      line-height: 48rpx;
    }
    .two {
      background: #29cc96 !important;
      color: #fff !important;
    }
  }
  .graycontent {
    .infotitle {
      width: 85rpx;
    }
    .infowrap {
      display: flex;
      flex-wrap: wrap;
      margin-left: 10rpx;
    }
    .grayinfo {
      font-size: 28rpx;
      color: #626466;
    }
    .clearmagin {
      margin-left: 0 !important;
    }
    .numoften {
      font-size: 24rpx !important;
    }
    .grayinfo2 {
      display: flex;
      color: #000;

      align-items: baseline;
      margin-right: 10rpx;
    }
    .grayinfo4 {
      display: flex;
      align-items: center;
      color: #626466;
    }
    .numbold {
      font-weight: bold;
      font-size: 40rpx;
      margin: 0 10rpx;
    }
    .grayinfo1 {
      display: flex;
      padding: 15rpx 0;
      align-items: center;
      align-items: baseline;
    }
    .graycontent1 {
      background: #fafafa;
      padding: 16rpx 32rpx;
      .gray1 {
        font-size: 24rpx;
        font-weight: bold;
        border-bottom: 1px solid #f5f5f5;
        padding-bottom: 20rpx;
      }
      .gray5 {
        flex: 1;
        display: flex;
      }
      .gray2 {
        border-bottom: 2px solid#FAFAFA;
        color: #d8d8d8;
        padding: 10rpx 0;
        margin-right: 20rpx;
      }
      .gray4 {
        border-bottom: 2px solid#29CC96 !important;
        color: #000 !important;
      }
      .gray3 {
        width: 32rpx;
      }
    }
  }
  .addchild {
    font-size: 28rpx;
    margin-top: 20rpx;
    .picchild {
      width: 96rpx;
      margin-left: 30rpx;
    }
    .addchild2 {
      display: flex;
      flex-direction: column;
      width: 500rpx;

      .bottom {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #939599;
        margin-top: 30rpx;
      }
    }
  }
  .indexinfor {
    font-size: 28rpx;
    margin-top: 35rpx;
    padding: 10rpx 32rpx !important;
    .pic {
      width: 32rpx;
      margin-right: 10rpx;
    }
    .slh {
      text-overflow: ellipsis;
      overflow: hidden;
      color: #626466;
      white-space: nowrap;
      margin-right: 70rpx;
    }
  }
  .btnwrap {
    margin: 70rpx 0 0 0;
    color: #fff;
    padding-bottom: 50rpx;
    .btn {
      flex: 1;
      background: linear-gradient(135deg, #f5abb1 0%, #ff5533 100%);
      border-radius: 8px 8px 8px 8px;
      padding: 16rpx 16rpx;
      .btnpic {
        width: 64rpx;
      }
    }
    .left {
      margin-right: 20rpx;
    }
    .btn2 {
      margin-right: 34rpx;

      background: linear-gradient(134deg, #62b0f5 0%, #317ff5 100%) !important;
    }
  }

  .index3 {
    .tabtitle {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      font-size: 24rpx;
      color: #626466;
      padding-bottom: 20rpx;
      .tabadd1 {
      }
      .tabadd3 {
        color: #29cc96;
        background: rgba(41, 204, 150, 0.16);
        padding: 8rpx;
        font-size: 24rpx;
        border-radius: 8rpx;
        margin-right: 10rpx;
      }
    }
    .tabcontent {
      font-size: 24rpx;
    }
    .t7 {
      flex: auto !important;
      width: 100rpx;
      margin-left: 25rpx;
    }

    .t8 {
      flex: auto !important;
    }
    .t5 {
      justify-content: flex-start !important;
    }
    .t6 {
      justify-content: flex-end !important;
    }
    .t10 {
      margin-left: 10rpx;
    }
    .t9 {
      text-align: center;
    }
    .t3 {
      font-size: 20rpx;
      flex: 1.3 !important;
    }
    .t4 {
      flex: 1.3 !important;
    }
    .t1 {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 20rpx;
    }
    .child {
      display: flex;
      border-radius: 8rpx;
      .t2 {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .index2 {
    display: flex;
    justify-content: space-between;
    font-size: 36rpx;
    font-weight: bold;
    align-items: center;
    margin: 30rpx 0 15rpx 0;
    .title2 {
      color: #12a669;
      font-size: 28rpx;
    }
    .title1 {
      span {
        position: relative;
        z-index: 2;
      }
    }
    .border {
      width: 144rpx;
      height: 8rpx;
      background: #29cc96;
      position: relative;
      top: -9rpx;
      z-index: 1;
    }
  }
  .index1 {
    background: #ffffff;
    padding: 20rpx 32rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
  }
  .info {
    font-size: 28rpx;
    display: flex;
    align-items: center;
  }
  .info1 {
    margin-top: 20rpx;
    margin-bottom: 40rpx;
  }
  .info3 {
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
  }
  .infopic2 {
    width: 64rpx;
    margin-right: 16rpx;
  }
  .info4 {
    font-size: 24rpx;
  }
  .info6 {
    color: #fff;
  }
  .info5 {
    margin-bottom: 10rpx;
    span {
      font-weight: bold;
    }
  }
  .infopic {
    width: 32rpx;
    margin-right: 10rpx;
  }
}
</style>
