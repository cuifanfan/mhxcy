<template>
  <div class="wrap">
    <header-diy class="topbar" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="index">
        <div class="my index1">
          <image mode="widthFix" class="tx" src="@/static/image/tx.png" />
          <div class="name">
            老班章茶叶种植基地
            <image mode="widthFix" class="pic" src="@/static/image/edit3.png" />
          </div>
          <div class="myinfo flexcenter">
            <div class="c1 c12">
              <image mode="widthFix" class="pic" src="@/static/image/n1.png" />
              <div class="c2">
                茶园地址：
                <div class="c3">勐海镇勐海沱茶厂附近</div>
              </div>
            </div>
            <div class="c1">
              <image mode="widthFix" class="pic" src="@/static/image/n2.png" />
              <div class="c2">
                负责人：
                <div class="c3">张三</div>
              </div>
            </div>
            <div class="c1 c12">
              <image mode="widthFix" class="pic" src="@/static/image/n3.png" />
              <div class="c2">
                联系电话：
                <div class="c3">131 2345 6789</div>
              </div>
            </div>
            <div class="c1">
              <image mode="widthFix" class="pic" src="@/static/image/n4.png" />
              <div class="c2">
                茶园面积:：
                <div class="c3">1300亩</div>
              </div>
            </div>
            <div class="c1 c12">
              <image mode="widthFix" class="pic" src="@/static/image/n5.png" />
              <div class="c2">
                种植品类：
                <div class="c3">老班章/台树茶/老树茶</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div @click="goManger" class="child child3">
            <div class="c1">
              <image mode="widthFix" class="pic" src="@/static/image/u1.png" />
              人员管理
            </div>
            <u-icon
              @click="goNews"
              color="#939599"
              size="14"
              name="arrow-right"
            ></u-icon>
          </div>
          <div class="child child11" @click="goNews">
            <div class="c1">
              <image mode="widthFix" class="pic" src="@/static/image/u2.png" />
              消息中心
              <div class="cir">
                2
              </div>
            </div>
            <u-icon
            
              color="#939599"
              size="14"
              name="arrow-right"
            ></u-icon>
          </div>
          <div class="child child12" @click="goCollect">
            <div class="c1" >
              <image mode="widthFix" class="pic" src="@/static/image/u3.png" />
              我的收藏
            </div>
            <u-icon
              color="#939599"
              size="14"
              name="arrow-right"
            ></u-icon>
          </div>
          <div @click="goFeedback" class="child child2">
            <div class="c1">
              <image mode="widthFix" class="pic" src="@/static/image/u4.png" />
              问题反馈
            </div>
            <u-icon
              
              color="#939599"
              size="14"
              name="arrow-right"
            ></u-icon>
          </div>
           <div @click="loginOut" class="child child2 chilid8">
            <div class="c1">
              退出登录
            </div>
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
      lookType: true,
      active2: true,
      active1: true,
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
      pageName: "我的",
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
  methods: {
    goCollect(){
      
      uni.navigateTo({
        url:"/pages/my/collect/index"
      })
    },
    loginOut(){
      uni.showModal({
        title: '提示',
        content: '确认退出登录?',
        success: function (res) {
          if (res.confirm) {
            uni.setStorageSync('token','')
            uni.navigateTo({
              url:'/pages/login/login'
            })
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });

    },
    goNews(){
      uni.navigateTo({
          url: "/pages/news/index",
        });
      
    },
    goManger(){
       uni.navigateTo({
          url: "/pages/my/manger/index",
        });
    },
    goFeedback(){
      uni.navigateTo({
          url: "/pages/my/feedback/index",
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
.chilid8{
  background: #ee6666f0 !important;
  color: #fff!important;
  justify-content: center!important;
  margin-top: 60rpx!important;
}
.child11{
  border-bottom-left-radius: 0!important;
   border-bottom-right-radius: 0!important;
}
.child12{
  border-top-left-radius: 0!important;
   border-top-right-radius: 0!important;
}
.row{
  .child3{
    margin-bottom: 30rpx;
  }
  .cir{
    background: #29CC96;
    border-radius: 100px;
    color: #fff;
    width: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32rpx;
    padding: 4rpx;
    font-size: 20rpx;
    margin-left: 20rpx;
  }
  .child2{
    margin-top: 30rpx;
  }
  .child{
    display: flex;
    font-size: 32rpx;
    justify-content: space-between;
    background: #fff;
    border-radius: 16rpx;
    align-items: center;
    padding: 32rpx;
    .c1{
      display: flex;
      align-items: center;
    }
    .pic{
      width: 48rpx;
      margin-right: 24rpx;
    }
  }
}
.my {
  font-size: 28rpx;
  flex-wrap: wrap;
  padding: 20rpx 24rpx !important;
  position: relative;
  margin-bottom: 50rpx;
  .tx {
    position: absolute;
    left: 20rpx;
    top: -64rpx;
    width: 128rpx;
  }
  .name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 152rpx;
    font-size: 36rpx;
    font-weight: bold;
    .pic {
      width: 32rpx;
    }
  }
  .myinfo {
    flex-wrap: wrap;
    display: flex;
    justify-content: left;
    margin-top: 20rpx;
    
  }
  .c12 {
    width: 55% !important;
  }
  .c1 {
    width: 45%;
    display: flex;
    align-items: center;
    margin: 10rpx 0;
    .pic {
      width: 48rpx;
      height: 48rpx;
      margin-right: 20rpx;
    }
  }
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
      width: 165rpx;
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
