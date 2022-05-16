<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="test5">
        <image mode="widthFix" class="videopic" src="@/static/image/videopic.png" />
    </div>
    <div class="handlebtn flexcenter">
      <div class="one1 flexcenter">
        <image mode="widthFix" class="one2" src="@/static/image/h2.png" />
        全屏
      </div>
      <div class="one1 flexcenter">
        <image mode="widthFix" class="one2" src="@/static/image/h1.png" />
        截图
      </div>
    </div>
    <div class="cirwrap2 flexcenter">
      <image mode="widthFix" class="handlecir" src="@/static/image/handle.png" />
    </div>
    
  </div>
</template>
<script>
import headerDiy from "../../component/header/header.vue";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      value: "",

      showType: false,
      showType2: false,
      pageName: "一号视频摄像头",
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
  },
};
</script>
<style lang="scss" scoped>
.test5 {
    width: 100%;
    .videopic {
      width: 100%;
    }
  
}
.cirwrap2{
  width: 100%;
  margin-top: 200rpx;
}
.handlecir{
  width: 360rpx;
}
.handlebtn{
  margin-top: 50rpx;
   font-size: 24rpx;
   color: #C4C7CC;
    padding: 0 30rpx;
    flex: 1;
    justify-content: space-between!important;
    .one1{
      background: #fff;
      box-shadow: 0px 4rpx 8rpx 2rpx rgba(2, 51, 31, 0.08);
    border-radius: 16rpx;
    padding: 16rpx 48rpx;
    }
    .one2{
      width: 48rpx;
      margin-right: 10rpx;
    }
  }
</style>