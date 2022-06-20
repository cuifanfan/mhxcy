<template>
  <div class="wrap">
    <header-diy :backHidden="2" class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="index1" @click="goDetail(item)"  v-for="(item,index) in list" :key="index">
        <div class="header flexcenter">
          <div class="header2 flexcenter">
            <!-- <div class="h1">示范田</div> -->
            <div class="t2">
              {{item.name}}
              <span class="t3"> ({{item.address}}) </span>
            </div>
          </div>

          <u-icon name="arrow-right" color="#C4C7CC" size="16"></u-icon>
        </div>
        <div class="con">
          <div class="c1">
            茶园面积：<span>{{item.area}}</span>亩
          </div>
          <div class="c1 c2">
            种植品类：<span>{{item.species}}</span>
          </div>
          <!-- <div class="c1 clearb">
            播种日期：<span>2021.12.15</span>
          </div>
          <div class="c1 clearb">
            收货日期：<span>2021.12.15</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerDiy from "../component/header/header.vue";
import request from "../../common/utils/request";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      list:[],
      activeone: 4,
      active: false,
      showType: false,
      showType2: false,
      pageName: "茶园管理",
      numValue: "",
      nameValue: "",
      typeValue: "",
    };
  },
  onLoad(){
    this.askList()
  },
  methods: {
    typeSelect() {},
    goDetail(item){
       uni.navigateTo({
          url: "/pages/manger/detail/index?id="+item.id,
        });
    },
    askList(type){
      request({
        url: "/data/teagarden/page",
        method: "get",
        isAuth: false,
        data: {
         baseId:uni.getStorageSync('baseId')
        },
      }).then((res) => {
        this.list=res.data.records
      })
    },
  },
};
</script>
<style lang="scss" scoped>

.index1 {
  background: #ffffff;
  padding: 20rpx 32rpx;
  margin-bottom: 30rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
 
.con{
    flex-wrap: wrap;
    font-size: 28rpx;
    color: #626466;
    margin-top: 20rpx;
    span{
      font-weight: bold;
      color: #000;
      font-size: 28rpx;
    }
    .clearb{
      margin-bottom: 0!important;
    }
    display: flex;
    .c1{
      
       margin-bottom: 20rpx;
       margin-right: 20rpx;
       span{
        margin-right: 10rpx;
       }
    }
  }
  .header {
    font-size: 24rpx;
    padding-bottom: 20rpx;
    border-bottom: 1px solid#F5F5F5;
  }
  .header2{
    flex: 1;
    justify-content: left!important;
  }
  .h1 {
    background: #29cc96;
    color: #fff;
    border-radius: 10rpx;
    padding: 5rpx 10rpx;
    margin-right: 10rpx;
  }
}
.newscontent {
  .type4 {
    .title {
      border-left: 2px solid #f56262 !important;
    }
    span {
      color: #f56262 !important;
    }
  }
  .type3 {
    .title {
      border-left: 2px solid #3199f5 !important;
    }
    span {
      color: #3199f5 !important;
    }
  }
  .type2 {
    .title {
      border-left: 2px solid #626466 !important;
    }
    span {
      color: #626466 !important;
    }
  }
  .type1 {
    .title {
      border-left: 2px solid #939599 !important;
    }
    span {
      color: #939599 !important;
    }
  }
}
.panel {
  background: #fff;
  padding: 40rpx;
  margin: 25rpx;
  border-radius: 16rpx;
  .text {
    color: #626466;
  }
  .p1:nth-child(1) {
    color: #f56262;
  }
  .p1:nth-child(2) {
    color: #626466;
  }
  .p1:nth-child(3) {
    color: #3199f5;
  }
  .p1 {
    display: flex;
    flex: 1;
    flex-direction: column;
    font-size: 28rpx;
    align-items: center;
    justify-content: center;
    span {
      margin-bottom: 12rpx;
      font-size: 64rpx;
      font-weight: bold;
    }
  }
}
.contentclear3 {
  margin: 0 !important;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btnpic {
      width: 32rpx;
      margin-right: 16rpx;
      position: relative;
      top: 5rpx;
    }
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