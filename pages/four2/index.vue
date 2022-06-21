<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="farmtab">
      <div @click="changeTab(1)" :class="[active == 1 ? 'c1active' : '', 'c1']">
        环境监测
      </div>
      <div @click="changeTab(2)" :class="[active == 2 ? 'c1active' : '', 'c1']">
        长势监测
      </div>
      <div @click="changeTab(3)" :class="[active == 3 ? 'c1active' : '', 'c1']">
        视频监测
      </div>
    </div>
    <div v-if="active == 1" class="content">
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
              <div class="btnd flexcenter" @click="goDetail2(2,item)">查看详情</div>
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
              <div class="btnd flexcenter" @click="goDetail2(2,item)">查看详情</div>
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
              <div @click="goDetail2(4,item)" class="btnd flexcenter">查看详情</div>
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
              <div @click="goDetail2(4,item)" class="btnd flexcenter">查看详情</div>
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
    <div v-if="active == 2 || active == 3" class="content">
      <div class="test1">
        <div class="test2" v-if="active == 2">当前共计3个长势监测站</div>
        <div class="test2" v-if="active == 3 && videoListGetFlag">
          当前共计{{ videoList.length }}个视频监控摄像头
        </div>
        <div class="test3 flexcenter">
          <u--input
            v-if="active == 2"
            placeholder="请输入监测站名称"
            border="surround"
            v-model="siteValue"
          ></u--input>
          <u--input
            v-else
            placeholder="请输入摄像头名称"
            border="surround"
            v-model="videoValue"
          ></u--input>
          <div class="search" @click="searchHandle">
            <u-icon color="#939599" size="25" name="search"></u-icon>
          </div>
        </div>
      </div>
      <div class="test5" v-if="active == 2">
        <div
          class="test6"
          @click="goDetail"
          v-for="(item, index) in 5"
          :key="index"
        >
          <div class="imgwraps">
            <image
              mode="widthFix"
              class="videopic"
              src="@/static/image/videopic.png"
            />
            <image
              mode="widthFix"
              v-if="active == 3"
              class="play"
              src="@/static/image/play.png"
            />
          </div>
          <div class="text">{{ index + 1 }}号长势监测站</div>
        </div>
      </div>
      <div class="test5" v-if="active == 3">
        <div
          class="test6"
          @click="goDetail(item)"
          v-for="(item, index) in videoListShow"
          :key="index"
        >
          <div class="addvideowrap">
            <div class="imgwraps">
              <image
                mode="widthFix"
                class="videopic"
                :src=" baseUrl+item.cover"
              />
              <image
                mode="widthFix"
                v-if="active == 3"
                class="play"
                src="@/static/image/play.png"
              />
            </div>
            <div class="text">
              <div>
                {{ item.deviceName }}
              </div>
              {{ item.url == "" ? "离线" : "在线" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerDiy from "../component/header/header.vue";
import request from "../../common/utils/request";
import { BASE_URL } from "../../common/utils/config";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      userInfo:null,
      baseUrl:BASE_URL,
      weatherList: [],
      videoListShow: [],
      videoValue: "",
      siteValue: "",
      videoListGetFlag: false,
      videoList: [],
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
      value: "",
      active: 1,
      showType: false,
      showType2: false,
      pageName: "农情监测",
      soilList: [],
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
    };
  },
  onLoad() {
    let userInfo=uni.getStorageSync('userInfo')
    this.userInfo=userInfo
    this.getEnvironment();
    this.getCurrentMoisture()
  },
  onShow() {
    if (uni.getStorageSync("four2TabIndex")) {
      this.index = uni.getStorageSync("four2TabIndex");
    } else {
      this.index = 1;
    }
  },
  methods: {
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
            num:1,
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
        console.log('xxxscadas',this.weatherList)
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
    searchHandle() {
      if (this.active == 3) {
        let arr = this.videoList.filter((item) => {
          return item.deviceName.indexOf(this.videoValue) > -1;
        });
        this.videoListShow = arr;
      }
    },
    onBackPress(e) {
      uni.setStorageSync("four2TabIndex", "");
    },
    typeSelect() {},
    changeTab(index) {
      this.active = index;
      uni.setStorageSync("four2TabIndex", index);
      if (!this.videoListGetFlag && index == 3) {
        this.askVideo();
      }
    },
    askVideo() {
      let userInfo=uni.getStorageSync('userInfo')
      request({
        url: "/data-thirdpart/fluorite/getVideoList/"+userInfo.userId+"?type=2",
        method: "get",
        isAuth: false,
        data: {},
      })
        .then((res) => {
          console.log("res", res);
          this.videoList = JSON.parse(JSON.stringify(res.data));
          this.videoListShow = res.data;
          this.videoListGetFlag = true;
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    goDetail2(type,item) { 
      uni.navigateTo({
        url: "/pages/four2/detail/index?type=" + type+'&id='+item.name,
      });
    },
    goDetail(item) {
      if (this.active == 2) {
        uni.navigateTo({
          url: "/pages/four2/site/index",
        });
      } else {
        console.log(item);
        if (item.url) {
          uni.navigateTo({
            url:
              "/pages/four2/camera/index?videourl=" +
              item.url +
              "&name=" +
              item.deviceName +
              "&token=" +
              item.accessToken,
          });
        } else {
          uni.showToast({
            title: "当前设备离线",
            icon: "none",
            duration: 1200,
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.addvideowrap{
  height: 476rpx;
}
.index1 {
  background: #ffffff;
  padding: 20rpx 32rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
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
    border-radius: 8rpx;
    margin-right: 10rpx;
  }
  .d2warning {
    background: rgba(245, 98, 98, 0.16) !important;
    color: rgba(245, 98, 98, 1) !important;
  }
  .d3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 20rpx;
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
.fullw {
  width: 100%;
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
  padding-bottom: 30rpx;
}
.content {
  .imgwraps {
    position: relative;
    .play {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 64rpx;
    }
  }
  .test6 {
    border-radius: 32rpx;
    overflow: hidden;
    margin: 30rpx 0;
    background: #fff;
    .videopic {
      width: 100%;
    }
    .text {
      padding: 15rpx 30rpx;
      font-size: 28rpx;
      color: #626466;
      display: flex;
      justify-content: space-between;
    }
  }
  .test1 {
    color: #626466;
    font-size: 28rpx;
  }
  .test3 {
    position: relative;
    margin-top: 20rpx;
    background: #fff;
    border-radius: 200rpx;
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
  margin-bottom: 0 !important;
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