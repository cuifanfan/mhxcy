<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="titleparam">环境参数告警值</div>
      <div class="param">
        <div class="list" v-for="(item, index) in list" :key="index">
          <div class="c1">
            {{ index + 1 }}.{{ item.name }}（{{ item.unit }}）
          </div>
          <div class="c2">
            <div class="c3">
              <div class="c4">
                <u--input
                  type="number"
                  v-model="item['val'][0]"
                  border="none"
                  clearable
                ></u--input>
              </div>

              <div class="c5">~</div>
              <div class="c4">
                <u--input
                  type="number"
                  border="none"
                  v-model="item['val'][1]"
                  clearable
                ></u--input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btntwo">
        <div @click="goBack" class="two1 two2">取消</div>
        <div @click="submit" class="two1 two3">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import headerDiy from "../../component/header/header.vue";
import request from "../../../common/utils/request";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      list: [
        {
          name: "温度",
          unit: "℃",
          val: ["", ""],
        },
        {
          name: "湿度",
          unit: "%",
          val: ["", ""],
        },
        {
          name: "风速",
          unit: "m/s",
          val: ["", ""],
        },
        {
          name: "光照",
          unit: "Lux",
          val: ["", ""],
        },
        {
          name: "土壤温度",
          unit: "℃",
          val: ["", ""],
        },
        {
          name: "土壤湿度",
          unit: "%",
          val: ["", ""],
        },
        {
          name: "土壤EC值",
          unit: "us/cm",
          val: ["", ""],
        },
        {
          name: "土壤PH值",
          unit: "",
          val: ["", ""],
        },
      ],

      activeChild: 0,
      value: "",
      active: 3,
      showType: false,
      showType2: false,
      pageName: "告警参数设置",
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
      activeone: 4,
      date: [
        {
          day: 22,
          week: "六",
          slide: false,
        },
        {
          day: 23,
          week: "日",
          slide: false,
        },
        {
          day: 24,
          week: "一",
          slide: true,
        },
        {
          day: 25,
          week: "二",
          slide: true,
        },
        {
          day: 26,
          week: "三",
          slide: true,
        },
        {
          day: 27,
          week: "四",
          slide: false,
        },
        {
          day: 28,
          week: "五",
          slide: false,
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
      teaName: "",
      handleType:1,
      
    };
  },
  onLoad(option) {
    this.teaId = option.id;
    this.teaName = option.name;
    //取之前的参数
    let get = uni.getStorageSync("setParams");
    if (get) {
      this.handleType=2
      this.initParams(get);
    }
  },
  methods: {
    typeSelect() {},
    initParams(val) {
      let get = JSON.parse(val);
      console.log('get',get)
      this.$set(this.list[0],'val', [get.airTemMin, get.airTemMax])
      this.$set(this.list[1],'val', [get.airHumMin, get.airHumMax])
      this.$set(this.list[2],'val', [get.windSpeedMin, get.windSpeedMax])
      this.$set(this.list[3],'val', [get.luxMin, get.luxMax])
      this.$set(this.list[4],'val', [get.soilTemMin, get.soilTemMax])
      this.$set(this.list[5],'val', [get.soilHumMin, get.soilHumMax])
      this.$set(this.list[6],'val',[get.soilEcMin, get.soilEcMax])
      this.$set(this.list[7],'val',[ get.soilPhMin, get.soilPhMax])
    },
    submit() {
      let flag1=this.list.find(item=>{
        return JSON.parse(item['val'][1])<=JSON.parse(item['val'][0])
      })
      let flag2=this.list.find(item=>{
        return item['val'][0]===''||item['val'][1]===''
      })
      if(flag2){
        uni.showToast({
          title: "请完成最大值或者最小值",
          icon: "none",
          duration: 1000,
        });
        return
      }
      if(flag1){
        uni.showToast({
          title: "最大值必须大于最小值",
          icon: "none",
          duration: 1000,
        });
        console.log('flag',flag1)
        return
      }
      this.submitTo();
    },
    submitTo() {
      let dataSet={
          gardenName: this.teaName,
          id: this.teaId,
          airTemMin:this.list[0]['val'][0], 
          airTemMax:this.list[0]['val'][1], 
          airHumMin:this.list[1]['val'][0], 
          airHumMax:this.list[1]['val'][1], 
          windSpeedMin:this.list[2]['val'][0],  
          windSpeedMax:this.list[2]['val'][1], 
          luxMin:this.list[3]['val'][0], 
          luxMax:this.list[3]['val'][1], 
          soilTemMin:this.list[4]['val'][0], 
          soilTemMax:this.list[4]['val'][1], 
          soilHumMin:this.list[5]['val'][0], 
          soilHumMax:this.list[5]['val'][1], 
          soilEcMin:this.list[6]['val'][0], 
          soilEcMax:this.list[6]['val'][1], 
          soilPhMin:this.list[7]['val'][0], 
          soilPhMax:this.list[7]['val'][1], 
      }
      request({
        url: "/data/gardenthresholdday",
        method: this.handleType==1?'post':'put',
        isAuth: false,
        data: dataSet,
      }).then((res) => {
        uni.showToast({
          title: "设置成功",
          icon: "exception",
          duration: 850,
        })
        uni.setStorageSync("setParams", JSON.stringify(dataSet));
        uni.setStorageSync('updateSetFlag',true)
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      });
    },
    addTask() {
      uni.navigateTo({
        url: "/pages/wisdom/addWisdom/index",
      });
    },
    goBack() {
      uni.navigateBack({
        delta: 1, //返回层数，2则上上页
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
  .btntwo {
    padding-bottom: 40rpx;
  }
  .two1 {
    border: 1px solid#12A669;
  }
  .two3 {
    background: #12a669;
    color: #fff;
  }
  .two2 {
    color: #12a669;
  }
  .titleparam {
    font-size: 28rpx;
    color: #626466;
    margin-bottom: 34rpx;
  }
  .param {
    .c4 {
      background: #fafafa;
      border-radius: 4px 4px 4px 4px;
      opacity: 1;
      border: 1px solid #f5f5f5;
      padding: 10rpx;
      width: 272rpx;
      overflow: hidden;
    }
    .list {
      background: #fff;
      padding: 24rpx 24rpx 10rpx 24rpx;
      margin-bottom: 20rpx;
      border-radius: 16rpx;
      .c1 {
        font-size: 28rpx;
        font-weight: bold;
      }
      .c5 {
        font-size: 34rpx;
        margin: 0 20rpx;
      }
      .c3 {
        display: flex;
        align-items: center;
      }
      .c2 {
        display: flex;
        color: #939599;
        margin: 16rpx 0;
        align-items: center;
        justify-content: space-between;
      }
      font-size: 24rpx;
    }
  }
  .w1active {
    .slide {
      background: #29cc96 !important;
    }
    .w3 {
      color: #fff !important;
      background: #29cc96 !important;
    }
  }
  .datewrap {
    background: #fff;
    border-top: 1px solid#F1F1F1;
    padding: 20rpx 0;
    .w1 {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .w3 {
      margin: 10rpx 0;
      background: #f5f5f5;
      color: #939599;
      width: 48rpx;
      height: 48rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 50rpx;
    }
    .slide {
      width: 8rpx;
      height: 8rpx;
      background: #c4c7cc;
      border-radius: 100rpx;
    }
  }
  .looklist {
    border-radius: 16rpx;
    font-size: 28rpx;

    color: #626466;
    .listc {
      margin-bottom: 20rpx;
      background: #fff;
      padding: 20rpx;
      border-radius: 16rpx;
    }
    .listchild {
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
      border-radius: 16rpx;
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