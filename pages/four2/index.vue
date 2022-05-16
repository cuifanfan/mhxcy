<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="farmtab">
      <div @click="active = 1" :class="[active == 1 ? 'c1active' : '', 'c1']">
        环境监测
      </div>
      <div @click="active = 2" :class="[active == 2 ? 'c1active' : '', 'c1']">
        长势检测
      </div>
      <div @click="active = 3" :class="[active == 3 ? 'c1active' : '', 'c1']">
        视频检测
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
        <div class="scrollchild">
          <div class="detailwrap">
            <div class="d1wrap">
              <div class="d1 flexcenter">
                <div class="d2 flexcenter">在线</div>
                1号气象站
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
          <div class="oftenpanle">
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon1.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">27.3℃</div>
                温度
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon2.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">27.3%</div>
                湿度
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon3.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">32444Lux</div>
                光照
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon4.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">454645mm</div>
                降雨
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon5.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">东偏南</div>
                风向
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon6.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">12.2m/s</div>
                风速
              </div>
            </div>
          </div>
        </div>
        <div class="scrollchild">
          <div class="detailwrap">
            <div class="d1wrap">
              <div class="d1 flexcenter">
                <div class="d2 flexcenter">在线</div>
                1号气象站
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
          <div class="oftenpanle">
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon1.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">27.3℃</div>
                温度
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon2.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">27.3%</div>
                湿度
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon3.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">32444Lux</div>
                光照
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon4.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">454645mm</div>
                降雨
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon5.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">东偏南</div>
                风向
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon6.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">12.2m/s</div>
                风速
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
        <div class="scrollchild">
          <div class="detailwrap">
            <div class="d1wrap">
              <div class="d1 flexcenter">
                <div class="d2 flexcenter">在线</div>
                1号墒情仪
              </div>
              <div class="btnd flexcenter" @click="goDetail2(3)">查看详情</div>
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
          <div class="oftenpanle">
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon1.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">27.5摄氏度</div>
                土壤温度(-10cm)
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon2.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">44.93%</div>
                土壤湿度(-10cm)
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon1.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">27.5摄氏度</div>
                土壤温度(-10cm)
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon2.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">44.93%</div>
                土壤湿度(-10cm)
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon1.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">27.5摄氏度</div>
                土壤温度(-10cm)
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon2.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">44.93%</div>
                土壤湿度(-10cm)
              </div>
            </div>
          </div>
        </div>
        <div class="scrollchild">
          <div class="detailwrap">
            <div class="d1wrap">
              <div class="d1 flexcenter">
                <div class="d2 flexcenter">在线</div>
                1号墒情仪
              </div>
              <div class="btnd flexcenter" @click="goDetail2(3)">查看详情</div>
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
          <div class="oftenpanle">
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon1.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">27.5摄氏度</div>
                土壤温度(-10cm)
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon2.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">44.93%</div>
                土壤湿度(-10cm)
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon1.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">27.5摄氏度</div>
                土壤温度(-10cm)
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon2.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">44.93%</div>
                土壤湿度(-10cm)
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon1.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">27.5摄氏度</div>
                土壤温度(-10cm)
              </div>
            </div>
            <div class="oftenpanlechild flexcenter">
              <image
                mode="widthFix"
                class="oftenpic"
                src="@/static/image/addicon2.png"
                alt=""
              />
              <div class="oftenright">
                <div class="oftenbold">44.93%</div>
                土壤湿度(-10cm)
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
    <div v-if="active == 2 || active == 3" class="content">
      <div class="test1">
        <div class="test2" v-if="active == 2">当前共计3个长势监测站</div>
        <div class="test2" v-else>当前共计3个视频监控摄像头</div>
        <div class="test3 flexcenter">
          <u--input
            placeholder="请输入站点名称"
            border="surround"
            v-model="value"
            @change="change"
          ></u--input>
          <div class="search">
            <u-icon color="#939599" size="25" name="search"></u-icon>
          </div>
        </div>
      </div>
      <div class="test5">
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
    </div>
  </div>
</template>
<script>
import headerDiy from "../component/header/header.vue";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
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
      pageName: "农情检测",
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
  methods: {
    typeSelect() {},
    goDetail2(type) {
      uni.navigateTo({
        url: "/pages/four2/detail/index?type="+type,
      });
    },
    goDetail() {
      if (this.active == 2) {
        uni.navigateTo({
          url: "/pages/four2/site/index",
        });
      } else {
        uni.navigateTo({
          url: "/pages/four2/camera/index",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
      padding: 15rpx;
      font-size: 28rpx;
      color: #626466;
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