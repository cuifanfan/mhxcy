<template>
  <div class="wrap">
    <header-diy
      :backHidden="1"
      :type="2"
      class="topbar"
      :titleName="pageName"
    ></header-diy>
    <div class="farmtab">
      <div @click="active = !active" :class="[active ? 'c1active' : '', 'c1']">
        投入统计
      </div>
      <div @click="ccClick" :class="[!active ? 'c1active' : '', 'c1']">
        产出统计
      </div>
    </div>
    <div class="content index1 index22" v-if="active">
      <div class="header header7">
        <div class="header2">人力投入</div>
      </div>
      <div>
        <div class="cirbox" v-if="humanResourcesFlag">
          <qiun-data-charts
            type="mix"
            :chartData="humanResources"
            canvasId="one_b"
            :opts="{
              legend: { position: 'top' },
              xAxis: {
                axisLineColor: 'rgba(147,149,153,0.1)',
                disableGrid: false,
                gridColor: 'rgba(147,149,153,0.1)',
                gridType: 'solid',
                fontColor: '#939599',
              },
              yAxis: {
                data: [
                  {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    fontColor: '#939599',
                    titleFontColor: '#939599',
                    title: '单位(KG)',
                    titleOffsetX: -5,
                    titleOffsetY: -10,
                  },
                ],
              },
            }"
          />
        </div>
      </div>
      <div class="header header7">
        <div class="header2">灌溉投入</div>
      </div>
      <div>
        <div class="cirbox" v-if="ggFlag">
          <qiun-data-charts
            type="mix"
            canvasId="three_gg"
            :resshow="false"
            :opts="{
              legend: { position: 'top' },
              yAxis: {
                disableGrid: true,

                data: [
                  {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    fontColor: '#939599',
                    position: 'left',
                    title: '单位(KG)',
                    titleOffsetX: -10,
                    titleOffsetY: -10,
                    titleFontColor: '#939599',
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
            :chartData="chartDataRain"
          />
        </div>
      </div>
      <div class="header header7">
        <div class="header2">施肥投入</div>
      </div>
      <div>
        <div class="cirbox" v-if="sfFlag">
          <qiun-data-charts
            type="mix"
            canvasId="three_fertilizer"
            :reshow="false"
            :opts="{
              legend: { position: 'top' },
              yAxis: {
                data: [
                  {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    fontColor: '#939599',
                    titleFontColor: '#939599',
                    position: 'left',
                    title: '销售额/万',
                    // max: fertilizer ? fertilizer.yAxis[0].max : 0,
                    // min: fertilizer ? fertilizer.yAxis[0].min : 0,
                  },
                  {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    fontColor: '#939599',
                    titleFontColor: '#939599',
                    position: 'right',
                    title: '',
                    // max: fertilizer ? fertilizer.yAxis[0].max : 0,
                    // min: fertilizer ? fertilizer.yAxis[0].min : 0,
                    disabled: true,
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
            :chartData="fertilizer"
          />
        </div>
      </div>
      <div class="header header7">
        <div class="header2">施药投入</div>
      </div>
      <div>
        <div class="cirbox" v-if="syFlag">
          <qiun-data-charts
            type="mix"
            canvasId="three_fertilizer2"
            :reshow="false"
            :opts="{
              legend: { position: 'top' },
              yAxis: {
                data: [
                  {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    fontColor: '#939599',
                    titleFontColor: '#939599',
                    position: 'left',
                    title: '销售额/万',
                    // max: fertilizer ? fertilizer.yAxis[0].max : 0,
                    // min: fertilizer ? fertilizer.yAxis[0].min : 0,
                  },
                  {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    fontColor: '#939599',
                    titleFontColor: '#939599',
                    position: 'right',
                    title: '',
                    // max: fertilizer ? fertilizer.yAxis[0].max : 0,
                    // min: fertilizer ? fertilizer.yAxis[0].min : 0,
                    disabled: true,
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
            :chartData="fertilizerSy"
          />
        </div>
      </div>
    </div>
    <div class="content index1 index22" v-show="!active">
      <div class="header header7">
        <div class="header2">鲜叶产出</div>
      </div>
      <div>
        <div class="cirbox" v-if="xyFlag">
          <qiun-data-charts
            type="mix"
            canvasId="three_leaf3"
            :resshow="false"
            :opts="{
              legend: { position: 'top' },
              yAxis: {
                disableGrid: true,
                data: [
                  {
                    axisLineColor: 'rgba(147,149,153,0.1)',
                    fontColor: '#939599',
                    position: 'left',
                    title: '单位(KG)',
                    titleOffsetX: -10,
                    titleOffsetY: -10,
                    titleFontColor: '#939599',
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
            :chartData="chartDataXy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerDiy from "../component/header/header.vue";
import request from "../../common/utils/request";
import moment from "moment";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      xyFlag: false,
      sfFlag: false,
      syFlag: false,
      syChartData: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [
          {
            name: "今年",
            data: [],
            type: "line",
            addPoint: true,
            color: "#29CC96",
            textColor: "#17E6A1",
            textSize: 8,
          },
          {
            name: "去年",
            data: [],
            type: "line",
            addPoint: true,
            color: "#3199F5",
            textColor: "#3199F5",
            textSize: 8,
          },
        ],
        yAxis: [
          {
            // "max": 60,
            // "min": 0
          },
        ],
      },
      humanResourcesFlag: false,
      humanResources: {
        categories: [],
        series: [
          {
            name: "去年",
            data: [],
            type: "column",
            color: "#17E5A1",
            unit: "",
          },
          {
            name: "今年",
            data: [],
            type: "column",
            color: "#3199F5",
            unit: "",
          },
        ],
      },
      moment,
      userInfo: "",
      chartDataXy: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [
          {
            name: "去年",
            data: [],
            type: "column",
            color: "#17E5A1",
            unit: "",
          },
          {
            name: "今年",
            data: [],
            type: "column",
            color: "#3199F5",
            unit: "",
          },
        ],
      },

      fertilizer: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [],
        yAxis: [
          {
            max: 20,
            min: 0,
          },
          {
            max: 200,
            min: 0,
          },
        ],
      },
      fertilizerSy: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [],
        yAxis: [
          {
            max: 20,
            min: 0,
          },
          {
            max: 200,
            min: 0,
          },
        ],
      },
      tablist: [
        {
          num: 10,
          text: "摄像头",
        },
        {
          num: 4,
          text: "气象监测",
        },
        {
          num: 96,
          text: "虫情监测",
        },
        {
          num: 12,
          text: "墒情监测",
        },
      ],
      active: true,
      active2: true,
      active1: true,
      chartDataRain: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        series: [
          {
            name: "今年",
            data: [],
            type: "line",
            addPoint: true,
            color: "#29CC96",
            textColor: "#17E6A1",
            textSize: 8,
          },
          {
            name: "去年",
            data: [],
            type: "line",
            addPoint: true,
            color: "#3199F5",
            textColor: "#3199F5",
            textSize: 8,
          },
        ],
        yAxis: [
          {
            // "max": 60,
            // "min": 0
          },
        ],
      },
      list: [
        {
          num: 15,
          unit: "mm",
          name: "降雨量",
          pic: require("@/static/image/s1.png"),
        },
        {
          num: 44.9,
          unit: "%",
          name: "相对湿度",
          pic: require("@/static/image/s2.png"),
        },
        {
          num: "西北风",
          unit: "",
          name: "风向",
          pic: require("@/static/image/s3.png"),
        },
        {
          num: 3,
          unit: "m/s",
          name: "风速",
          pic: require("@/static/image/s4.png"),
        },
        {
          num: 23,
          unit: "℃",
          name: "土壤温度",
          pic: require("@/static/image/s5.png"),
        },
        {
          num: 23,
          unit: "%",
          name: "土壤湿度",
          pic: require("@/static/image/s6.png"),
        },
        {
          num: 0.35,
          unit: "us/cm",
          name: "土壤EC值",
          pic: require("@/static/image/s7.png"),
        },
        {
          num: 6.5,
          unit: "",
          name: "土壤PH值",
          pic: require("@/static/image/s8.png"),
        },
      ],
      info: {
        one: 12.35,
        two: 12.35,
        three: 33.22,
        four: 85.2,
        five: 15,
      },
      pageName: "投入产出",
      ggFlag: false,
      //去年的施药
      agoSyArr: [],
      //今年的施药
      nowSyArr: [],
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
    this.userInfo = uni.getStorageSync("userInfo");
    let ago = moment().add(-1, "y").format("YYYY");

    this.getAllHumanUseEachMonthByYear(ago, 0);
    //查询施肥
    this.getAllPutInEachMonthByYear(ago, 0, "施肥");
    this.getAllPutInEachMonthByYear(ago, 0, "灌溉");
    //除草和病虫防治的施药
    this.getAllPutInEachMonthByYear(ago, 0, "除草");
    //鲜叶
    //this.getAllPutInEachMonthByYear(ago, 0, "采摘");
  },
  methods: {
    ccClick() {
      this.active = !this.active;
      let ago = moment().add(-1, "y").format("YYYY");
      if(!this.xyFlag){
        this.getAllPutInEachMonthByYear(ago, 0, "采摘");
      }
       
    },
    getAllPutInEachMonthByYear(year, type, val) {
      request({
        url: "/data/farmrecords/getAllPutInEachMonthByYear",
        method: "get",
        isAuth: false,
        data: {
          content: val,
          userId: this.userInfo.userId,
          year: year,
        },
      }).then((res) => {
        //获取所有的项目
        let all = [];
        let now = moment().format("YYYY");
        res.data.forEach((item, index) => {
          item.list.forEach((item2, index2) => {
            let flag = all.find((item3) => {
              return item3.name == item2.name;
            });
            if (!flag) {
              all.push({
                name: item2.name,
                val: item2.value,
                data: [],
              });
            } else {
              // console.log('xxx',item2.value)
              flag.val += item2.value;
            }
          });
        });

        all.forEach((item, index) => {
          res.data.forEach((item2, index2) => {
            let flag = item2.list.find((item3) => {
              return item3.name == item.name;
            });
            let addValue = flag ? flag.value : 0;
            item.data.push(addValue);
          });
        });
        console.log(val, all);
        if (type == 0) {
          this.getAllPutInEachMonthByYear(now, 1, val);
        }
        if (val == "灌溉" && type == 0) {
          let water = all.find((item) => {
            return item.name == "水";
          });
          if (water) {
            this.chartDataRain.series[1]["data"] = water.data;
          }
        }
        if (val == "灌溉" && type == 1) {
          let water = all.find((item) => {
            return item.name == "水";
          });
          if (water) {
            this.chartDataRain.series[0]["data"] = water.data;
          }
          this.ggFlag = true;
        }
        if (val == "除草" && type == 0) {
          this.agoSyArr = this.agoSyArr.concat(all);
        }
        if (val == "病虫防治" && type == 0) {
          this.agoSyArr = this.agoSyArr.concat(all);
        }
        if (val == "除草" && type == 1) {
          this.nowSyArr = this.nowSyArr.concat(all);
          let ago = moment().add(-1, "y").format("YYYY");
          this.getAllPutInEachMonthByYear(ago, 0, "病虫防治");
        }
        if (val == "采摘" && type == 0) {
          all.forEach((item) => {
            if (item.name == "鲜叶") {
             this.chartDataXy["series"][0]["data"] = item.data;
             console.log('鲜叶',item.data)
            }
          });
        }
        if (val == "采摘" && type == 1) {
          all.forEach((item) => {
            if (item.name == "鲜叶") {
              this.chartDataXy["series"][1]["data"] = item.data;
              console.log('鲜叶now',item.data)
            }
            
          });
          this.xyFlag = true;  
        }
        if (val == "施肥" && type == 0) {
          all.forEach((item) => {
            this.fertilizer.series.push({
              name: "去年" + item.name,
              data: item.data,
              type: "line",
              addPoint: true,
              color: `#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, "0")}`,
              index: 1,
            });
          });
        }
        if (val == "施肥" && type == 1) {
          all.forEach((item) => {
            this.fertilizer.series.push({
              name: item.name,
              data: item.data,
              type: "line",
              addPoint: true,
              color: `#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, "0")}`,
              index: 1,
            });
          });

          this.sfFlag = true;
        }
        if (val == "病虫防治" && type == 1) {
          this.nowSyArr = this.nowSyArr.concat(all);
          
          //合并同类项目
          let getOnlyAgo = this.combin(this.agoSyArr);
          let getOnlyNow = this.combin(this.nowSyArr);
          
         
          getOnlyAgo.forEach((item) => {
            this.fertilizerSy.series.push({
              name: "去年" + item.name,
              data: item.data,
              type: "line",
              addPoint: true,
              color: `#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, "0")}`,
              index: 1,
            });
          });
          getOnlyNow.forEach((item) => {
            this.fertilizerSy.series.push({
              name: item.name,
              data: item.data,
              type: "line",
              addPoint: true,
              color: `#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padEnd(6, "0")}`,
              index: 1,
            });
          });
          this.syFlag = true;
        }
      });
    },
    //合并施药
    combin(arr) {
      let only = [];
      arr.forEach((item) => {
        let flag = only.find((item2) => {
          return item2.name == item.name;
        });
        if (!flag) {
          only.push(item);
        } else {
          flag.data = this.sumItem(flag.data, item.data);
        }
      });
      return only;
    },
    sumItem(arr1, arr2) {
      if (arr2.length == 0) {
        return arr1;
      } else {
        arr1.map(function (value, index) {
          arr2[index] += value;
        });
      }
      return arr2;
    },
    getAllHumanUseEachMonthByYear(year, type) {
      request({
        url: "/data/farmrecords/getAllHumanUseEachMonthByYear",
        method: "get",
        isAuth: false,
        data: {
          userId: this.userInfo.userId,
          year: year,
        },
      }).then((res) => {
        if (type == 0) {
          let now = moment().format("YYYY");
          this.getAllHumanUseEachMonthByYear(now, 1);
          let dateSet = [];
          let agoSet = [];
          res.data.forEach((item) => {
            dateSet.push(item.month);
            agoSet.push({
              value: item.humanUse ? item.humanUse : 0,
              color: "#17E5A1",
            });
          });
          this.humanResources.categories = dateSet;
          this.humanResources["series"][0]["data"] = agoSet;
        } else {
          let dateSet = [];
          let agoSet = [];
          res.data.forEach((item) => {
            dateSet.push(item.month);
            agoSet.push({
              value: item.humanUse ? item.humanUse : 0,
              color: "#3199F5",
            });
          });
          this.humanResources["series"][1]["data"] = agoSet;
          this.humanResourcesFlag = true;
        }
      });
    },
    goDetail2() {
      uni.navigateTo({
        url: "/pages/four2/detail/index",
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
.index22 {
  margin-top: 30rpx !important;
}
.index11 {
  background: transparent !important;
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
  border-bottom: 1px solid #f5f5f5;
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
  margin-top: 20rpx;
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
  .panle {
    width: 25%;
    font-size: 64rpx;
    font-weight: bold;
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
      border-bottom: 1px solid #f5f5f5;
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
        border-bottom: 2px solid #fafafa;
        color: #d8d8d8;
        padding: 10rpx 0;
        margin-right: 20rpx;
      }
      .gray4 {
        border-bottom: 2px solid #29cc96 !important;
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
