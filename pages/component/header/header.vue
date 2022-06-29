<template>
  <div>
    <view
      :class="[
        type == 2 ? 'nav-small-box' : '',
        tabFlag == 2 ? 'clearFixed' : '',
        'nav-box',
      ]"
     
    >
     <!-- :style="phoneHeight" -->
      <u-popup
        :show="showNews"
        mode="top"
        round="10"
        :safeAreaInsetTop="true"
        :overlay="false"
      >
        <view class="newsdiv">
          <text>人生若只如初见，何事秋风悲画扇</text>
        </view>
      </u-popup>
      <image
        mode="widthFix"
        v-if="type == 1"
        src="@/static/image/headerbg.png"
        class="navbg"
      />
      <image
        mode="widthFix"
        v-if="type == 2 || type == 3"
        src="@/static/image/header2.png"
        class="navbg navbg2"
      />
      <view class="navtitle" :style="{ top: type == 2 ? '32rpx' : '' }">
        <div class="iconwrap">
          <u-icon
            @click="goBack"
            name="arrow-left"
            color="#fff"
            size="20"
            v-if="type == 2 && backHidden == 1"
          ></u-icon>
        </div>
        {{ titleName }}
        <div class="iconwrap2" v-if="addIcon == 2">
          <u-icon @click="addOne" name="plus" color="#fff" size="20"></u-icon>
        </div>
      </view>
      <!-- <socket/> -->
      
    </view>
    <div class="headerHidden"></div>
  </div>
</template>
<script>
//import app from "../App.vue";
// import socket from '../../../pages/socket'
export default {
  name: "header-diy",
  props: {
    titleName: {
      type: String,
    },
    backHidden: {
      type: Number,
      default: 1,
    },
    type: {
      type: Number,
      default: 1,
    },
    addIcon: {
      type: Number,
      default: 1,
    },
    tabFlag: {
      type: Number,
      default: 1,
    },
  },
  // components: {
  //   socket
  // },
  data() {
    return {
      clear: null,
      showNews: false,
      phoneHeight: "", //这里在进行调用
    };
  },
  onReady() {
    this.getPhoneHeight();
    // console.log(this.phoneHeight);
  },
  onShow() {},
  mounted() {
    console.log("header go!!!");
    // uni.$off("newCome");
    // uni.$on("newCome", (data)=>{
    //     this.showNews=true
    //     if(this.clear==null){
    //       this.clear=setTimeout(()=>{
    //         this.showNews=false
    //         this.clear=null
    //       },3000)
    //     }else{
    //       clearTimeout(this.clear)
    //       this.clear=setTimeout(()=>{
    //         this.showNews=false
    //         this.clear=null
    //       },3000)
    //     }
    // });
  },

  methods: {
    addOne() {
      uni.$emit("addOneFriend", "");
    },
    goBack() {
      let currentRoutes = getCurrentPages();
      let currentRoute = currentRoutes[currentRoutes.length - 1].route;
      console.log("currentRoute", currentRoute);
      // if(currentRoute=='pages/farming/index'||currentRoute=='pages/farming/edit'||currentRoute=='pages/four2/index'){
      //   uni.switchTab({
      //     url: "/pages/index/index",
      //   });
      // }else{
      uni.navigateBack({
        delta: 1,
      });
      //}
    },
    getPhoneHeight() {
      //获取高度
      let that = this;
      uni.getSystemInfo({
        success: function (res) {
          console.log(res);
          that.phoneHeight = `margin-top:${res.statusBarHeight}px`;
        },
      });
    },
    backpage() {
      //点击小房子调用的时间，也可以写返回按钮调用的事件，根据实际情况修改
      // 关闭当前页面
      uni.switchTab({
        url: "/pages/index",
      });
    },
    BackHome() {
      // 关闭当前页面
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
  },
};
</script>
<style scoped lang="scss">
.headerHidden {
  width: 100%;
  background: red;
  margin-top: 200rpx;
}
.newsdiv {
  border-radius: 10rpx;
  padding: 20rpx;
}
.iconwrap2 {
  position: absolute;
  right: 20rpx;
}
.nav-small-box {
  height: 200rpx !important;
}
.clearFixed {
  position: relative !important;
  z-index: 0 !important;
}
.nav-box {
  position: fixed;
  width: 100%;
  height: 235rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 88;
  top: 0;
}
.navbg {
  width: 100%;
  height: 400rpx;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.navbg2 {
  height: 200rpx !important;
}
.navtitle {
  font-size: 48rpx;
  color: #fff;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 32rpx;
  .iconwrap {
    position: absolute;
    left: 20rpx;
  }
}
</style>
