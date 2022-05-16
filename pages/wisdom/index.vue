<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="farmtab">
      <div @click="active = 1" :class="[active == 1 ? 'c1active' : '', 'c1']">
        监测统计
      </div>
      <div @click="active = 2" :class="[active == 2 ? 'c1active' : '', 'c1']">
        任务管理
      </div>
      <div @click="active = 3" :class="[active == 3 ? 'c1active' : '', 'c1']">
        任务记录
      </div>
    </div>
    <div v-if="active == 1" class="content">
      <div class="r1">
        <div
          @click="activeChild = index"
          :class="[activeChild == index ? 'r3' : '', 'r2']"
          v-for="(item, index) in 3"
          :key="index"
        >
          {{ index + 1 }}号茶园
        </div>
      </div>
      <div>
        <div
          class="wrapcommon wrapcommonfarm"
          v-for="(item, index) in 12"
          :key="index"
        >
          <div class="titlewrap">
            <div class="title">{{ index + 1 }}号水肥机</div>
          </div>
          <div class="titleinfos">
            <div class="r5">
              <div class="r6">设备型号：<span>全自动智能施肥机</span></div>
              <div class="r6">
                设备状态：<span><div class="online zt">在线</div></span>
              </div>
              <div class="r6">
                运行状态：<span><div class="offline zt">待机中</div></span>
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
        </div>
      </div>
    </div>
    <div v-if="active == 2" class="content">
      <div class="r1">
        <div
          @click="activeChild = index"
          :class="[activeChild == index ? 'r3' : '', 'r2']"
          v-for="(item, index) in 3"
          :key="index"
        >
          {{ index + 1 }}号茶园
        </div>
      </div>
      <div>
        <div
          class="wrapcommon wrapcommonfarm"
          v-for="(item, index) in 12"
          :key="index"
        >
          <div class="titlewrap">
            <div class="title title3">
              <div class="task" v-if="index > 0">进行中</div>
              <div class="task task5" v-if="index == 0">未进行</div>
              <div class="task2" v-if="index > 0">
                距任务结束 <span>01:59:59</span>
              </div>
              <div class="task2" v-if="index == 0">
                预约开始 <span>01:59:59</span>
              </div>
            </div>
          </div>
          <div class="green">
            <div class="g1">
              任务类型：
              <div class="g2">定时任务</div>
            </div>
            <div class="g1">
              任务地块：
              <div class="g2">A区-1号地块</div>
            </div>
            <div class="g1">
              轮灌组:：
              <div class="g2">1组</div>
            </div>
            <div class="g1">
              任务时间：
              <div class="g2">每天 07:00</div>
            </div>
            <div class="g1">
              灌溉类型：
              <div class="g2">水</div>
            </div>
            <div class="g1">
              灌溉时长：
              <div class="g2">03:00:00</div>
            </div>
            <div class="g1 g1clear">
              运行时长:：
              <div class="g2">02:10:10</div>
            </div>
          </div>
          <div class="greenbtn" v-if="index > 0">
            <div class="one">暂停任务</div>
            <div class="one one2">结束任务</div>
          </div>
          <div class="greenbtn" v-if="index == 0">
            <div class="one one8">开始任务</div>
            <div class="one one2 one9">删除任务</div>
          </div>
        </div>
      </div>
      <div class="btnfixed">
        <div class="btnsumit btnwidth" @click="addTask">
          <u-icon name="plus-circle" color="#fff" size="23"></u-icon>
          <span class="addtask1">
             新建任务
          </span>
        </div>
      </div>
    </div>
    <div v-if="active == 3" class="content">
      <div class="r1">
        <div
          @click="activeChild = index"
          :class="[activeChild == index ? 'r3' : '', 'r2']"
          v-for="(item, index) in 3"
          :key="index"
        >
          {{ index + 1 }}号茶园
        </div>
      </div>
      <div class="look" @click="goHistroy">查看历史记录</div>
      <div class="looklist">
        <div class="listc" v-for="(item,index) in 12 " :key="index">
          <div class="listchild">
            <span>开始时间</span>
            <span class="one">2022.02.20  07:00:00</span>
            <div class="info">已完成</div>
          </div>
          <div class="listchild">
            <span class="two">灌溉时长：01小时00分</span>
            <span class="two">轮灌组:一组</span>
          </div>
          <div class="listchild">
            <span class="two">灌溉类型：水(自动控制)</span>
            <span class="two">灌溉量：12m³</span>
          </div>
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
      list: [
        {
          num: 15,
          unit: "mm",
          name: "降雨量",
          pic: require("@/static/image/k1.png"),
        },
        {
          num: 44.9,
          unit: "%",
          name: "相对湿度",
          pic: require("@/static/image/k2.png"),
        },
        {
          num: "西北风",
          unit: "",
          name: "风向",
          pic: require("@/static/image/k3.png"),
        },
        {
          num: 3,
          unit: "m/s",
          name: "风速",
          pic: require("@/static/image/k4.png"),
        },
        {
          num: 7.9,
          unit: "",
          name: "土壤酸碱度",
          pic: require("@/static/image/k5.png"),
        },
        {
          num: 1.5,
          unit: "M",
          name: "液位传感器",
          pic: require("@/static/image/k6.png"),
        },
      ],
      activeChild: 0,
      value: "",
      active: 1,
      showType: false,
      showType2: false,
      pageName: "智能控制",
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
    goHistroy(){
      uni.navigateTo({
        url: "/pages/wisdom/history/index",
      });
    },
    addTask() {
      uni.navigateTo({
        url: "/pages/wisdom/addWisdom/index",
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
.content {
  .addtask1{
    margin-left: 20rpx;
  }
  .looklist{
    
    border-radius: 16rpx;
    font-size: 28rpx;
   
    color: #626466;
    .listc{
      margin-bottom: 20rpx;
      background: #fff;
      padding: 20rpx;
      border-radius: 16rpx;
    }
    .listchild{
      display: flex;
      justify-content: space-between;
      
    }
  }
  .btnwidth {
    width: 80%;
    left: 10%;
    position: relative;
  }
  .btnfixed {
    background: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    padding: 20rpx 0;
  }
  .greenbtn {
    display: flex;
    font-size: 28rpx;
    color: #fff;
    display: flex;
    margin-top: 30rpx;
    justify-content: space-around;
    .one {
      width: 144rpx;
      background: #29cc96;
      border-radius: 16rpx;
      padding: 10rpx 0;
      text-align: center;
    }
    .one8 {
      background: #3199f5 !important;
      color: #fff !important;
    }
    .one9 {
      background: #fde6e6 !important;
      color: #f56262 !important;
      border: 1px solid #f56262 !important;
    }
    .one2 {
      border: 1px solid#3199F5;
      color: #3199f5;
      background: #deeffd;
    }
  }
  .green {
    background: #eefbf7;
    padding: 14rpx 20rpx;
    border-radius: 16rpx;
    font-size: 28rpx;
    color: #626466;
    .g1 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10rpx;
    }
    .g1clear {
      margin-bottom: 0 !important;
    }
    .g2 {
      color: #000 !important;
    }
  }
  .index90 {
    .pic92 {
      width: 64rpx;
      height: 64rpx;
    }
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
        span {
          font-weight: bold;
          color: #000;
          font-size: 32rpx !important;
        }
      }
    }
  }
  .r6 {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    color: #939599;
    margin-bottom: 14rpx;
    span {
      color: #313233;
      font-size: 32rpx;
    }
    .zt {
      font-size: 24rpx;
      color: #fff;

      border-radius: 16rpx;
      padding: 5rpx 16rpx;
    }
    .online {
      background: #29cc96;
    }
    .dj {
      background: #3199f5;
    }
    .offline {
      background: #f56262;
    }
  }
  .r3 {
    background: #29cc96 !important;
    color: #fff !important;
  }
  .look {
    font-size: 28rpx;
    color: #313233;
    text-decoration: underline;
    display: flex;
    justify-content: right;
    margin-bottom: 20rpx;
  }
  .r1 {
    display: flex;
    font-size: 28rpx;

    color: #939599;
    border-radius: 16rpx;
    .r2 {
      background: #fff;
      padding: 10rpx;
      margin-right: 20rpx;
      border-radius: 8rpx;
    }
  }
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
  .title3 {
    border-left: none !important;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .title {
    padding-left: 20rpx;
    border-left: 4rpx solid #29cc96;
    font-weight: bold;
    font-size: 32rpx;
    margin-bottom: 16rpx;
    .task5 {
      color: #626466 !important;
      background: rgba(98, 100, 102, 0.16) !important;
    }
    .task2 {
      color: #939599;
      span {
        color: #000 !important;
      }
    }
    .task {
      font-size: 24rpx;
      color: #29cc96;
      background: rgba(41, 204, 150, 0.16);
      padding: 5rpx 10rpx;
      border-radius: 10rpx;
    }
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