<template>
  <div class="wrap">
    <header-diy class="topbar" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="index">
        <div>
          <div class="info3">
            <div
              class="info4"
              @click="indexNavGo(index)"
              v-for="(item, index) in indexMenu"
              :key="index"
            >
              <div class="info5 flexcenter">
                <image mode="widthFix" class="infopic2" :src="item.pic" />
              </div>
              <div class="info6">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="indexinfor flexcenter index1" @click="goNews">
          <image
            mode="widthFix"
            class="pic picindex1"
            src="@/static/image/lb.png"
          />
          <div class="slh">
            监测告警：2号虫情数量过高，当前为监测告警：2号虫情数量过高，当前为监测告警：2号虫情数量过高，当前为
          </div>
          <u-icon
            
            color="#939599"
            size="14"
            name="arrow-right"
          ></u-icon>
        </div>
        <div class="index1 index7" v-if="this.weatherInfo">
          <div class="index71">
            <div class="index72">
              <image
                mode="widthFix"
                class="pic72"
                src="@/static/image/p2.png"
              />
              <div class="text">{{this.weatherInfo.address}}</div>
              <u-icon color="#939599" size="14" name="arrow-right"></u-icon>
            </div>
            <div class="addmap" @click="goMap">
              <image
                class="pic72"
                mode="widthFix"
                src="@/static/image/p13.png"
              />
              设备
            </div>
          </div>
          <div class="index73 flexcenter">
            <div class="index74">
              <div class="index75">{{this.weatherInfo.gardenArea}}</div>
              茶园面积
            </div>
            <div class="index74">
              <div class="index75 index79">{{this.weatherInfo.gardenCount}}</div>
              茶园数量
            </div>
            <div class="index74">
              <div class="index75 index80">{{this.weatherInfo.teaSpecies}}</div>
              种植品类
            </div>
          </div>
          <div class="index81" v-if="this.weatherData.length>0">
            <div class="index83">
              <div class="index82">{{(this.weatherData[1]['max']+this.weatherData[1]['min'])/2}}</div>
              <div class="index85">℃</div>
            </div>
            <div class="index83">
              {{this.weatherData[1]['weatherLabel']}}
              <image
                mode="widthFix"
                class="index84"
                :src="this.weatherData[1]['weatherIcon']"
              />
            </div>
          </div>
          <div class="index1 index90">
            <div
              class="index91"
              :style="{ marginBottom: index == 6 || index == 7 ? '0' : '' }"
              v-for="(item, index) in list"
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
        <div class="index2">
          <div class="title1">
            <span>农事记录</span>
            <div class="border"></div>
          </div>
          <div @click="goFarm" class="title2">农事管理</div>
        </div>
        <div class="index3 index1">
          <div class="table">
            <!-- <div class="tabtitle">
              <div class="tabadd1 flexcenter">
                <div class="tabadd3">叮一下</div>
                今日“叮”了2次农事，点击完成详情！
              </div>
              <u-icon color="#C4C7CC" size="20" name="arrow-right"></u-icon>
            </div> -->
            <div class="tabcontent">
              <div class="child" v-for="(item, index) in 1" :key="index">
                <div class="addchild flexcenter">
                  <div class="addchild2">
                    <div class="top">
                      {{moment().format("YYYY") }}年，已完成<span class="boldspanadd">{{farmTotal}}</span> 项农事！
                    </div>
                    <div class="bottom">4月季节性病虫增加,可增加黄板,提高…</div>
                  </div>
                  <image
                    mode="widthFix"
                    @click="goEdit"
                    class="picchild"
                    src="@/static/image/click.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="index2">
          <div class="title1">
            <span>投入产出</span>
            <div class="border"></div>
          </div>
          <div class="title2" @click="goCompare">查看统计</div>
        </div>
        <div class="index3 index1 index33">
          <div class="tabchange flexcenter">
            <div
              @click="active1 = !active1"
              :class="[active1 ? 'two' : '', 'one five']"
            >
              投入统计
            </div>
            <div
              @click="active1 = !active1"
              :class="[!active1 ? 'two' : '', 'one three']"
            >
              产出统计
            </div>
          </div>
          <div class="graycontent">
            <div class="graycontent1">
              <div class="gray1 flexcenter">
                <div class="gray5" v-if="lookType">
                  <div
                    @click="changeTab(1)"
                    :class="[active2 ? 'gray4' : '', 'gray2']"
                  >
                    {{active1?'本季度':'本年'}}  
                  </div>
                  <div
                    @click="changeTab(2)"
                    :class="[!active2 ? 'gray4' : '', 'gray2']"
                  >
                    {{active1?'上季度':'去年'}}
                  </div>
                </div>
                <div class="gray5" v-if="!lookType">
                  <div class="lookcir flexcenter">
                    <div class="circhild flexcenter">
                      <div class="fk"></div>
                      上季度
                    </div>
                    <div class="circhild flexcenter">
                      <div class="fk fk2"></div>
                      上季度
                    </div>
                  </div>
                </div>

                <image
                  mode="widthFix"
                  v-if="lookType"
                  @click="lookType = !lookType"
                  class="gray3"
                  src="@/static/image/tj.png"
                />
                <image
                  mode="widthFix"
                  v-else
                  @click="lookType = !lookType"
                  class="gray3"
                  src="@/static/image/tj33.png"
                />
              </div>
              <div v-if="!lookType && active1" class="tjdiv">
                <div
                  v-for="(item, index) in investmentArr"
                  :key="index"
                  class="tjdivc1"
                >
                  <div class="jdtlabel">
                    {{ item.name }}
                  </div>
                  <div class="jdt">
                    <div class="jdt1">
                      <u-line-progress
                        height="8"
                        activeColor="#8F30BF"
                        inactiveColor="#FAFAFA"
                        :percentage="30"
                        :showText="false"
                      ></u-line-progress>
                      <div class="jdt3">
                        {{ item.val[0] }}
                        <span class="unit">{{ item.unit }}</span>
                      </div>
                    </div>
                    <div class="jdt1">
                      <u-line-progress
                        height="8"
                        activeColor="#29CC96"
                        inactiveColor="#FAFAFA"
                        :percentage="30"
                        :showText="false"
                      ></u-line-progress>
                      <div class="jdt3">
                        {{ item.val[1]
                        }}<span class="unit">{{ item.unit }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!lookType && !active1" class="tjdiv">
                <div
                  v-for="(item, index) in incomeArr"
                  :key="index"
                  class="tjdivc1"
                >
                  <div class="jdtlabel">
                    {{ item.name }}
                  </div>
                  <div class="jdt">
                    <div class="jdt1">
                      <u-line-progress
                        height="8"
                        activeColor="#8F30BF"
                        inactiveColor="#FAFAFA"
                        :percentage="30"
                        :showText="false"
                      ></u-line-progress>
                      <div class="jdt3">
                        {{ item.val[0] }}
                        <span class="unit">{{ item.unit }}</span>
                      </div>
                    </div>
                    <div class="jdt1">
                      <u-line-progress
                        height="8"
                        activeColor="#29CC96"
                        inactiveColor="#FAFAFA"
                        :percentage="30"
                        :showText="false"
                      ></u-line-progress>
                      <div class="jdt3">
                        {{ item.val[1]
                        }}<span class="unit">{{ item.unit }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <image
                mode="widthFix"
                v-if="!lookType"
                style="width: 100%"
                src="@/static/image/false26.png"
              /> -->
              <div v-if="lookType && active1" class="grayinfo">
                <div class="grayinfo1">
                  <div class="infotitle">灌溉:</div>
                  <div class="infowrap">
                    <div class="grayinfo2">
                      <div class="numbold clearmagin">{{ info.one }}</div>
                      <div class="numoften">吨</div>
                    </div>
                  </div>
                </div>
                <div class="grayinfo1">
                  <div class="infotitle">施肥:</div>
                  <div class="infowrap">
                    <div class="grayinfo4">二胺</div>
                    <div class="grayinfo2">
                      <div class="numbold">{{ info.two }}</div>
                      KG
                    </div>
                    <div class="grayinfo4">二胺</div>
                    <div class="grayinfo2">
                      <div class="numbold">{{ info.three }}</div>
                      KG
                    </div>
                    <div class="grayinfo4">二胺</div>
                    <div class="grayinfo2">
                      <div class="numbold">{{ info.four }}</div>
                      KG
                    </div>
                  </div>
                </div>
                <div class="grayinfo1">
                  <div class="infotitle">人力:</div>
                  <div class="infowrap">
                    <div class="grayinfo2">
                      <div class="numbold clearmagin">{{ info.five }}</div>
                      <div class="numoften">人/天</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <image
                mode="widthFix"
                v-if="lookType && !active1"
                style="width: 100%"
                src="@/static/image/false31.png"
              /> -->
              <div class="srdiv" v-if="lookType && !active1">
                <div
                  class="srdiv1"
                  v-for="(item, index) in income"
                  :key="index"
                >
                  <div class="srdiv2">{{ incomeBig[index] }}月</div>
                  <div class="srdiv3">
                    {{ item }}<span class="srdiv4">吨</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div v-if="active1" class="graytip flexcenter">
              <div class="left">
                相比去年同期，灌溉量下降10.5%，施肥量上升3.1%，施药频率下降2次。
              </div>
              <div class="right" @click="goPrice">
                {{ lookType ? "查看同期数据对比" : "查看茶叶价格动态" }}
              </div>
            </div> -->
            <div v-if="!active1" class="graytip flexcenter">
              <div class="left">
                依照当前市场合理价格， 预计您本季收入可达：350000元
              </div>
              <!-- <div class="right" @click="goPrice">查看茶叶价格动态</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { weekDay } from "../../common/utils/utils";
import headerDiy from "../component/header/header.vue";
import request from "../../common/utils/request";
import moment from 'moment'
import { weatherIdToName, wind } from "../../common/utils/weather";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      farmTotal:'-',
      weatherInfo: null,
      income: [
        12.32, 11.22, 12.32, 11.22, 12.32, 11.22, 12.32, 11.22, 12.32, 11.22,
        12.32, 11.22,
      ],
      incomeBig: [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
      ],
      incomeArr: [
        {
          name: "一月",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "二月",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "三月",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "四月",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "五月",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "六月",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "七月",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "八月",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "九月",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "十月",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "十一月",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "十二月",
          val: [5, 15],
          unit: "吨",
        },
      ],
      investmentArr: [
        {
          name: "人力",
          val: [5, 15],
          unit: "",
        },
        {
          name: "灌溉水",
          val: [5, 15],
          unit: "吨",
        },
        {
          name: "二胺",
          val: [5, 15],
          unit: "kg",
        },
        {
          name: "硫酸钾",
          val: [5, 15],
          unit: "kg",
        },
        {
          name: "尿素",
          val: [5, 15],
          unit: "kg",
        },
        {
          name: "噻虫嗪",
          val: [5, 15],
          unit: "kg",
        },
      ],
      lookType: true,
      moment,
      active2: true,
      active1: true,
      list: [],
      info: {
        one: 12.35,
        two: 12.35,
        three: 33.22,
        four: 85.2,
        five: 15,
      },
      weatherData:[],
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
    this.getEnvironment();
    this.askWeather();
    this.getFarmList();
    this.askInvestment(1);
    this.askInvestment(2)
  },
  methods: {
    askInvestment(type){
      let endTime=type==1?moment(moment().quarter(moment().quarter()).startOf('quarter').valueOf()).format('YYYY/MM/DD HH:mm:ss'):moment(moment().quarter(moment().quarter() - 1).startOf('quarter').valueOf()).format('YYYY/MM/DD HH:mm:ss')
      let startTime=type==2?moment(moment().quarter(moment().quarter()).endOf('quarter').valueOf()).format('YYYY/MM/DD HH:mm:ss'):moment(moment().quarter(moment().quarter() - 1).endOf('quarter').valueOf()).format('YYYY/MM/DD HH:mm:ss')
      let userInfo=uni.getStorageSync('userInfo')
      request({
        url: "/data/farmrecords/getAllPutIn",
        method: "get",
        isAuth: false,
        data: {
          startTime:endTime,
          endTime:startTime,
          userId:userInfo.userId
        },
      }).then((res) => {
        console.log('xxxxresxxx',res)
      })
    },
    getFarmList() {
      request({
        url: "/data/farmrecords/page",
        method: "get",
        isAuth: false,
        data: {
          current: this.current,
        },
      }).then((res) => {
        console.log("res5464545456456", res);
        this.farmTotal=res.data.total
        
      });
    },
    askWeather() {
      request({
        url: "/data-thirdpart/mojiWeather/getMojiByLonLat",
        method: "get",
        isAuth: false,
        data: {
          day: moment().format("YYYY-MM-DD HH:mm:ss"),
          lat: 39.97569,
          lon: 116.41136,
        },
      }).then((res) => {
        console.log("xxx", res);
        res.data.daily.forEach((item, index) => {
          let date = item.predict_date.split("-");
          let date2 = date[1] + "/" + date[2];

          //wind_dir_id
          let week = "";
          if (index == 0) {
            week = "昨天";
          } else if (index == 1) {
            week = "今天";
          } else {
            week = weekDay(item.predict_date);
          }
          
          
          let weatherList = weatherIdToName();
          let windList = wind();
          this.weatherData.push({
            dayLabel: date2,
            weatherLabel: weatherList[item.weather_id_day][2],
            weatherIcon: require("@/static/image/weather/W" +
              weatherList[item.weather_id_day][0] +
              ".png"),
            max: item.temp_high,
            min: item.temp_low,
            level: item.wind_level_night,
            wind: windList[item.wind_dir_day],
          });
        });
        uni.setStorageSync('MJweather',this.weatherData)
      });
    },
    getEnvironment() {
      let userInfo=uni.getStorageSync('userInfo')
      if(!userInfo){
        return
      }
      //传设备的id
      request({
        url: "/data/teabase/getBaseInfo?userId="+userInfo.userId,
        method: "get",
        isAuth: false,
        data: {},
      })
        .then((res) => {
          this.weatherInfo = res.data;
          console.log("xxx", res);
          this.list[0] = {
            num: this.weatherInfo.windGrade!=null?this.weatherInfo.windGrade:'-',
            unit: "级",
            name: "风力",
            pic: require("@/static/image/new1.png"),
          };
          this.list[1] = {
            num: this.weatherInfo.windSpeed!=null?this.weatherInfo.windSpeed:'-',
            unit: "m/s",
            name: "风速",
            pic: require("@/static/image/new2.png"),
          };
          this.list[2] = {
            num:this.weatherInfo.windDirect!=null?this.weatherInfo.windDirect:'-',
            unit: "",
            name: "风向",
            pic: require("@/static/image/new3.png"),
          };
          this.list[3] = {
            num: this.weatherInfo.soilTem!=null?this.weatherInfo.soilTem:'-',
            unit: "℃",
            name: "空气温度",
            pic: require("@/static/image/new4.png"),
          };
          this.list[4] = {
            num: this.weatherInfo.soilHum!=null?this.weatherInfo.soilHum:'-',
            unit: "%RH",
            name: "空气湿度",
            pic: require("@/static/image/new5.png"),
          };
          this.list[5] = {
            num: this.weatherInfo.pm10!=null?this.weatherInfo.pm10:'-',
            unit: "ug/m3",
            name: "Pm10",
            pic: require("@/static/image/new6.png"),
          };
          this.list[6] = {
            num: this.weatherInfo.kpa!=null?this.weatherInfo.kpa:'-',
            unit: "kpa",
            name: "大气压",
            pic: require("@/static/image/new7.png"),
          };
          this.list[7] = {
            num: this.weatherInfo.lux!=null?this.weatherInfo.lux:'-',
            unit: "lux",
            name: "光照",
            pic: require("@/static/image/new8.png"),
          };
          this.$forceUpdate();
        })

        .catch((err) => {
          console.log("err", err);
        });
    },
    goPrice() {
      if (this.lookType) {
        uni.navigateTo({
          url: "/pages/compare/index",
        });
      } else {
        uni.navigateTo({
          url: "/pages/price/index",
        });
      }
    },
    goCompare() {
      uni.navigateTo({
        url: "/pages/compare/index",
      });
    },
    goMap() {
      uni.navigateTo({
        url: "/pages/setMap/index",
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
      if (index == 3) {
        uni.navigateTo({
          url: "/pages/expert/index",
        });
      }
      if (index == 2) {
        uni.navigateTo({
          url: "/pages/expert/knowledge/index",
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
.srdiv {
  display: flex;
  flex-wrap: wrap;
  .srdiv2 {
    color: #626466;
    font-size: 28rpx;
  }
  .srdiv3 {
    font-weight: bold;
  }
  .srdiv4 {
    color: #626466;
    font-weight: normal !important;
    font-size: 24rpx !important;
  }
  .srdiv1 {
    width: 33.33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10rpx 0;
  }
}
.tjdiv {
  .tjdivc1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10rpx 0;
    .jdt {
      flex: 1;
    }
    .jdt1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .jdt3 {
        margin-left: 20rpx;
        font-weight: bold;
        .unit {
          color: #626466;
          font-size: 20rpx;
          font-weight: normal !important;
        }
      }
    }
    .jdtlabel {
      width: 100rpx;
      text-align: right;
      margin-right: 20rpx;
    }
  }
}
.picindex1 {
  width: 90rpx !important;
}
.pic92 {
  width: 64rpx;
}
.boldspanadd {
  font-weight: bold;
  color: #3199f5;
  font-size: 28rpx;
}
.addmap {
  display: flex;
  align-items: center;
  font-size: 20rpx;
}
.fk {
  width: 24rpx;
  height: 24rpx;
  background: #8f30bf;
  margin-right: 10rpx;
}
.circhild {
  margin-right: 20rpx;
}
.lookcir {
  height: 60rpx;
}
.fk2 {
  background: #29cc96 !important;
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
      padding: 10rpx 0;
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
      margin-right: 10rpx;
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
      justify-content: space-between;
      height: 120rpx;
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
        position: relative;
        top: 14rpx;
        font-size: 28rpx !important;
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
      width: 165rpx;
    }
  }
  .tabchange {
    color: #12a669;
    font-size: 24rpx;
    border-radius: 50rpx;
    overflow: hidden;
    box-sizing: border-box;
    margin: 30rpx 30rpx;
    .one {
      text-align: center;
      border: 1px solid #29cc96;
      box-sizing: border-box;
      flex: 1;
      height: 48rpx;
      line-height: 48rpx;
      overflow: hidden;
    }
    .three {
      border-top-right-radius: 100rpx;
      border-bottom-right-radius: 100rpx;
    }
    .five {
      border-top-left-radius: 100rpx;
      border-bottom-left-radius: 100rpx;
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
