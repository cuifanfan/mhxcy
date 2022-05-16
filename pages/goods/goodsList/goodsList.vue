<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="goodtop flexcenter">
      <span>
          红敦敦
      </span>
      <div class="icon">
          <u-icon color="#C4C7CC" size="25" name="edit-pen"></u-icon>
      </div>
      
    </div>
    <div class="content"></div>
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
      showType2: false,
      pageName: "商品批次列表",
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
.goodtop {
  background: #fff;
  position: relative;
  padding: 20rpx;
  span{
      margin-right: 20rpx;
  }
  .icon{
      position: relative;
      top: 6rpx;
  }
}
.content {
  margin: 32rpx;
}
</style>