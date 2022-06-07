<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
   
    <div  class="content">
      <div class="test1">
       
        <div class="test3 flexcenter">
          <div class="inputdiy">
            {{dateInput}}
          </div>
          <div class="search">
            <image @click="dateShow=true" mode="widthFix" class="datepic" src="@/static/image/date.png" />
          </div>
        </div>
      </div>
      <div class="test5">
        <div class="test6" v-for="(item,index) in 5" :key="index">
          <image mode="widthFix" class="videopic" src="@/static/image/videopic.png" />
          <div class="text">2022.04.22 16:33</div>
        </div>
      </div>
    </div>
    <u-calendar
      :closeOnClickOverlay="true"
      @close="dateShow = false"
      :show="dateShow"
      :mode="mode"
      @confirm="confirm"
    ></u-calendar>
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
      dateInput:'请选择日期',
      mode: "single",
      dateShow:false,
      value: "",
      
      showType: false,
      showType2: false,
      pageName: "农情监测",
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
     confirm(e) {
      this.dateShow = false;
      this.dateInput = e[0];
      console.log(e);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
    .test5{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .inputdiy{
        background: #fff;
        font-size: 24rpx;
        color: #C4C7CC;
        height: 64rpx;
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 40rpx;
    }
  .datepic{
      width: 48rpx;
  }
  .test6{
    border-radius: 32rpx;
    overflow: hidden;
    width:330rpx;
    margin-top: 30rpx;
     background: #fff;
    .videopic{
      width: 100%;
    }
    .text{
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