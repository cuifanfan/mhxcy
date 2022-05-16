<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="farmtab">
      <div @click="active = !active" :class="[active ? 'c1active' : '', 'c1']">
        农事建议
      </div>
      <div @click="active = !active" :class="[!active ? 'c1active' : '', 'c1']">
        已完成农事
      </div>
    </div>
    <div class="content">
      <div class="wrapcommon wrapcommonfarm" v-for="(item,index) in 12" :key="index">
        <div class="titlewrap">
          <div class="title"><span>{{index+1}}号茶园</span> ：古树茶</div>
          <div class="date">
              2022.02.10 10:00
          </div>
        </div>
        <div class="farmtitle">病虫防治</div>
        <div class="farmcontent">
          5月季节性病虫增加,可增加黄板,提高物理防御措施。
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
      active: true,
      showType: false,
      showType2: false,
      pageName: "农事管理",
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
.wrapcommonfarm{
    margin: 45rpx 0;
}
.farmtab {
  background: #fff;
  display: flex;
  .c1 {
    color: #939599;
    font-size: 32rpx;
    border-bottom: 2px solid #fff;
    width: 50%;
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
  .farmtitle{
        font-weight: bold;
        margin-bottom: 10rpx;
    }
    .farmcontent{
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
    .date{
        color: #626466;
        font-size: 24rpx;
    }
    span{
        color: #626466;
    }
  }
}
</style>