<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="wrapcommon">
        <div class="titlewrap">
          <div class="title">溯源商品信息</div>
        </div>
        <div class="form">
          <div class="formchild">
            <div class="name">商品名称</div>
            <div class="input">
              <u--input
                placeholder="请输入内容"
                border="surround"
                v-model="nameValue"
              ></u--input>
            </div>
          </div>
          <div class="formchild">
            <div class="name">商品编号</div>
            <div class="input">
              <u--input
                placeholder="请输入内容"
                border="surround"
                v-model="numValue"
              ></u--input>
            </div>
          </div>
          <div class="formchild">
            <div class="name">商品品类</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="请选择商品种类"
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
          <div class="formchild">
            <div class="name">商品品种</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="请选择商品品种"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType2 = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
            </div>
          </div>
          <div class="tip">
              <div class="content2 content3">
                  商品名称为您的产品的推广名称，带有品牌性质，请一定哟啊精心设计哦！
              </div>
              <div class="content2">
                  商品编号是商品的字母编码，比如玉米的编号为ym-***。
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
          <u-action-sheet
            :show="showType2"
            :actions="typeList2"
            title="请选择商品种类"
            description="商品种类哦"
            @close="showType2 = false"
            @select="typeSelect"
          >
          </u-action-sheet>
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
      showType: false,
      showType2: false,
      pageName: "添加溯源商品档案",
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
.content {
  margin: 32rpx;
  .tip{
      font-size: 28rpx;
      color: #939599;
  }
  .content3{
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
  }
}
</style>