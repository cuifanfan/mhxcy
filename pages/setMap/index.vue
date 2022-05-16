<template>
  <div class="wrap">
    <header-diy
      :backHidden="1"
      :type="2"
      class="topbar"
      :titleName="pageName"
    ></header-diy>
    <div class="map contact">
      <map
        name=""
        class="map"
        :latitude="latitude"
        :longitude="longitude"
        scale="16"
        :markers="markers"
      ></map>
      <!-- :markers="marks" -->
      <!-- :longitude="jingdu"
        :latitude="weidu" -->
    </div>
    <!-- #ifdef H5-->
    <div class="handle">
      <div class="c1">
        <div class="c2 c21">
          <image mode="widthFix" class="pic" src="@/static/image/kk1.png" />
          3
        </div>
        长势监测
      </div>
      <div class="c1">
        <div class="c2 c22">
          <image mode="widthFix" class="pic" src="@/static/image/kk2.png" />
          3
        </div>
        气象监测
      </div>
      <div class="c1">
        <div class="c2 c23">
          <image mode="widthFix" class="pic" src="@/static/image/kk3.png" />
          3
        </div>
        虫情监测
      </div>
      <div class="c1">
        <div class="c2 c24">
          <image mode="widthFix" class="pic" src="@/static/image/kk4.png" />
          3
        </div>
        墒情监测
      </div>
    </div>
    <!-- #endif -->
  </div>
</template>

<script>
import headerDiy from "../component/header/header.vue";
export default {
  components: {
    headerDiy,
  },
  created(){
    let status = navigator.userAgent.toLowerCase();
    if(status==''){
       this.subNvue = uni.getSubNVueById('comment'); //获取
		  this.subNvue.show() // 显示
    }
  },
  data() {
    return {
      jingdu: 0,
      weidu: 0, 
      latitude: 21.995374,  
	    longitude:100.438676,
      markers: [
        {
        id: 1, // Number
        title: '1111555', // String-标注点名
        rotate: 180, // Number - 顺时针旋转的角度，范围 0 ~ 360，默认为 0
        alpha: 1, // 默认1，无透明，范围 0 ~ 1
        latitude: 21.995374,
        longitude: 100.438676,
        width: 24,
        height: 24,
        zIndex:1000,
        iconPath: '/static/image/icon.png', // 显示的图标
      }, 
      {
        id: 2, // Number
        title: '1111555', // String-标注点名
        rotate: 180, // Number - 顺时针旋转的角度，范围 0 ~ 360，默认为 0
        alpha: 1, // 默认1，无透明，范围 0 ~ 1
        latitude: 21.996815, 
        longitude: 100.434292,
        width: 24,
        height: 24,
        zIndex:1000,
        iconPath: '/static/image/icon1.png', // 显示的图标
      }, 
      {
        id: 3, // Number
        title: '1111555', // String-标注点名
        rotate: 180, // Number - 顺时针旋转的角度，范围 0 ~ 360，默认为 0
        alpha: 1, // 默认1，无透明，范围 0 ~ 1
        latitude: 21.994394,
        longitude: 100.438156,
        width: 24,
        height: 24,
        zIndex:1000,
        iconPath: '/static/image/icon2.png', // 显示的图标
      }, 
      {
        id: 4, // Number
        title: '1111555', // String-标注点名
        rotate: 180, // Number - 顺时针旋转的角度，范围 0 ~ 360，默认为 0
        alpha: 1, // 默认1，无透明，范围 0 ~ 1
        latitude: 21.991079,
        longitude: 100.438971,
        width: 24,
        height: 24,
        zIndex:1000,
        iconPath: '/static/image/icon3.png', // 显示的图标
      }, 
     
     ],
      pageName: "设备地图",
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.handle {
  box-sizing: border-box;
  padding: 15rpx 22rpx;
  position: fixed;
  display: flex;
  justify-content: space-between;
  z-index: 999;
  width: 92%;
  left: 4%;
  bottom: 30rpx;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 4px 8px 1px rgba(0, 0, 0, 0.25);
  border-radius: 16px 16px 16px 16px;

  font-size: 24rpx;
  .c21 {
    color: #08cca5 !important;
  }
  .c22 {
    color: #3199f5 !important;
  }
  .c23 {
    color: #f56262 !important;
  }
  .c24 {
    color: #ffb900 !important;
  }
  .pic {
    width: 60rpx;
    margin-right: 12rpx;
    height: 62rpx;
  }
  .c2 {
    font-size: 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }
}
.contact {
  .img {
    width: 750rpx;
    height: 320rpx;
  }
  .info {
    padding: 10rpx 20rpx;
    font-size: 30rpx;
    view {
      line-height: 60rpx;
      border-bottom: solid 1px #eee;
    }
  }
  .map {
    //height: calc( 100vh- 200rpx )!important;
    height: calc(100vh - 200rpx);
    width: 100vw;
  }
}
</style>