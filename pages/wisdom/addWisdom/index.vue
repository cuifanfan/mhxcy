<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="wrapcommon form">
        <div class="edit">
          <div class="formchild">
            <div class="name">任务区域:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="一号茶园"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name">轮廓组:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="组一"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name">任务类型:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="定时任务"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
            </div>
            <div class="input2" style="margin-top:20rpx">
              <div class="disablewrap disablewrap3">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="一次"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
              <div class="disablewrap disablewrap2 disablewrap3">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="7:00"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
              
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name">灌溉类型:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="水"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name">配方选择:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="配方一"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name">灌溉方式:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="灌溉时长"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name">灌溉时长:</div>
            <div class="input2">
              <div class="disablewrap disablewrap3">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="0"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
              <div class="disablewrap disablewrap2 disablewrap3">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="00"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      <div class="btntwo">
        <div class="two1 two3">
          确定
        </div>
        <div @click="goBack" class="two1 two2">
          取消
        </div>
      </div>
    </div>
    <u-action-sheet
      :show="showType"
      :actions="typeList"
      title="请选择商品种类"
      description="商品种类哦"
      @close="showType = false"
      @select="typeSelect"
    >
    </u-action-sheet>
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
      showType: false,
      active: true,
      showType: false,
      showType2: false,
      pageName: "新建水肥任务",
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
    goBack(){
      uni.navigateBack({
		    delta:1,//返回层数，2则上上页
    	})
    }
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin: 32rpx;
  .two1{
    border: 1px solid#12A669;
  }
  .two3{
    background: #12A669;
    color: #fff;
  }
  .two2{
    color: #12A669;
  }
  .butsumbit{
    margin-top: 80rpx;
  }
  .editpic {
    display: flex;
    justify-content: space-between;
    .handlepic {
      width: 160rpx;
      height: 120rpx;
    }
    .iconpic {
      width: 48rpx;
    }
    .picpic {
      position: relative;
      .icon {
        position: absolute;
        top: 10rpx;
        right: 10rpx;
        background: #c4c4c4;
        border-radius: 100rpx;
        overflow: hidden;
        padding: 5rpx;
      }
    }
    .handle {
      background: #fafafa;
      border-radius: 16rpx;
      border-radius: 16rpx;
      padding: 0 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .wrapcommonbg {
    margin-top: 20rpx;
    color: #626466;
    font-size: 28rpx;
    font-weight: bold;
    background: #fafafa !important;
    .childedit {
      margin-bottom: 10rpx;
    }
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
  .disablewrap2 {
    margin: 0 20rpx;
  }
  .disablewrap3 {
    background: #fafafa !important;
    border: none;
    border-radius: 8px;
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
  }
}
.edit {
  .form {
    display: flex;
    justify-content: space-between;
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