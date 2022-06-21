<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="article index1 index1clear" v-if="detail">
      <div  class="img2">
        <div class="wzdiv" >
          <div class="header header7 flexcenter">
            <div class="header2">问诊内容</div>
            <div class="date">{{detail.createTime}}</div>
          </div>
          <div class="ns1 ns1flex" v-if="detail.picArr.length > 0">
            <image
              mode="widthFix"
              v-for="(item2, index2) in detail.picArr"
              :key="index2"
              class="zzpic"
              :src="baseUrl + item2"
            />
          </div>
          <div class="text">
            {{detail.content}}
          </div>
          <div class="zt">
            状态: <span class="ztspan" v-if="detail.reply">专家已回复</span>
            <span class="ztspan ztspan2" v-if="!detail.reply">专家未回复</span>
          </div>
        </div>
        <div class="wzdiv wzdiv2" v-if="detail.reply">
          <div class="header header7 flexcenter">
            <div class="header2">专家回复</div>
            <!-- <div class="date">{{detail.createTime}}</div> -->
          </div>
          <div class="ns1 ns1flex" v-if="detail.picArr.length > 0">
            <image
              mode="widthFix"
              v-for="(item2, index2) in detail.picArr"
              :key="index2"
              class="zzpic"
              :src="baseUrl + item2"
            />
          </div>
          <div class="text">
            {{detail.reply}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerDiy from "../../component/header/header.vue";
import request from "../../../common/utils/request";
import { BASE_URL } from "../../../common/utils/config";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      baseUrl:BASE_URL,
      detail: null,
      pageName: "知识详情",
      numValue: "",
      nameValue: "",
      typeValue: "",
    };
  },
  onLoad() {
    if (uni.getStorageSync("articleContent")) {
      this.detail = JSON.parse(uni.getStorageSync("articleContent"));
      if(this.detail.imageUrls){
            this.$set(this.detail,'picArr',this.detail.imageUrls.split(','))
          }else{
            this.$set(this.detail,'picArr',[])
      }
      console.log(this.detail);
    }
  },
  methods: {
    goDetail() {
      uni.navigateTo({
        url: "/pages/expert/knowledgeDetail/index",
      });
    },
    askList() {},
  },
};
</script>
<style lang="scss" scoped>
.wzdiv2{
  margin-top: 20rpx;
}
.wzdiv {
  background: #fff;
  padding: 32rpx;
  border-radius: 32rpx;
  font-size: 28rpx;
  .zt{
    color:#626466 ;
    margin-top: 20rpx;
    .ztspan{
      color:#3199F5;
      font-weight: bold;
      margin-left: 10rpx;
    }
    .ztspan2{
      color: #626466!important;
    }
  }
  .text{
    color: #626466;
    margin-top: 20rpx;
    font-size: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    word-break: break-all;
    line-height: 46rpx;
  }
  .date {
    font-size: 28rpx;
    color: #626466;
  }
  .ns1 {
    margin-top: 14rpx;
  }
  .zzpic {
    width: 186rpx;
    height: 104rpx !important;
  }
  .ns1flex {
    display: flex;
    margin-top: 20rpx;
    margin-bottom: 30rpx;
    .zzpic{
      margin-right: 20rpx;
    }
  }
}
.p {
  text-indent: 60rpx;
  margin-bottom: 20rpx;
  line-height: 50rpx;
}
.content3 {
  margin-top: 20rpx;
}
.fullpic {
  width: 100%;
  margin: 20rpx 0;
}
.fb5 {
  margin: 20rpx 0;
}
.article {
  .title {
    color: #313233;
    font-size: 40rpx;
    font-weight: bold;
  }
  .fb {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    color: #313233;
    span {
      font-weight: bold;
    }
  }
}
.index1clear {
  background: transparent !important;
}
.tab {
  margin-top: 30rpx;
  font-size: 24rpx;
  color: #939599;
}
.tab2 {
  font-size: 28rpx !important;
  color: #11a66a !important;
  font-weight: bold;
}
.tab1 {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search {
  margin-top: 20rpx;
  display: flex;
  align-items: center;
  .s1 {
    display: flex;
    align-items: center;
  }
  .s2 {
    color: #626466;
    padding: 5rpx;
    margin: 0 16rpx;
    background: #fafafa;
    font-size: 20rpx;
  }
}
.topwrap {
  background: #fff;

  padding: 20rpx 32rpx;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  padding: 12rpx;
  border-radius: 100px;
}
.btnask {
  position: fixed;
  color: #fff;
  background: #29cc96;
  border-radius: 100px;
  bottom: 30rpx;
  width: 90%;
  left: 5%;
  font-size: 32rpx;
  text-align: center;
  padding: 12rpx;
  box-sizing: border-box;
}
.name2 {
  color: #939599 !important;
  font-weight: normal !important;
}
.disablewrap {
  display: flex;
  padding: 12rpx 18rpx;
  justify-content: space-between;
  width: 100%;
  border-radius: 12rpx;
  background: #fafafa;
}
.input2 {
  display: flex;
}
.edit {
  font-size: 28rpx;
  color: #939599;
  .textarea {
    background: #fafafa !important;
    border-radius: 16rpx;
    height: 200rpx;
    width: 100%;
    margin-top: 20rpx;
  }
  .name {
    color: #626466;
    font-size: 28rpx;
    font-weight: bold;
    margin: 15rpx 0;
  }
  .form {
    display: flex;
    justify-content: space-between;
  }
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
.clearindex1 {
  background: transparent !important;
}
.manger {
  .child {
    display: flex;
    align-items: center;
    padding: 16rpx 32rpx;
    border-radius: 20rpx;
    font-size: 24rpx;
    color: #626466;
    justify-content: space-between;
    margin-bottom: 40rpx;
    background: #fff;
    .c2 {
      font-weight: bold;
      font-size: 32rpx;
      margin-bottom: 6rpx;
    }
    .pic {
      width: 96rpx;
      height: 96rpx;
      margin-right: 40rpx;
    }
  }
}
.detailwrap {
  font-size: 24rpx;
  color: #626466;
  margin-top: 20rpx;
  .set {
    width: 32rpx;
    margin-right: 8rpx;
  }
  .d1 {
    font-weight: bold;
    font-size: 32rpx;
    color: #000;
  }
  .d4 {
    display: flex;
    align-items: center;
  }
  .d2 {
    background: #ddf7ee;
    color: #29cc96;
    width: 64rpx;
    padding: 5rpx;
    font-weight: normal !important;
    font-size: 24rpx;
  }
  .d3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .btnd {
    font-size: 28rpx;
    border-radius: 12rpx;
    color: #fff;
    background: #29cc96;
    width: 145rpx;
    height: 48rpx;
    padding: 5rpx;
  }
  .d1wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
  }
  .detailc1 {
    display: flex;
    justify-content: space-between;
  }
}
.fullw {
  width: 100%;
}
.zs1 {
  margin-top: 20rpx;
}
.zs {
  position: relative;
  border-radius: 32rpx;
  overflow: hidden;
  .ab {
    position: absolute;
    bottom: 0;
    color: #fff;
    font-size: 24rpx;
    background: rgba(0, 0, 0, 0.3);

    left: 0;
    padding: 10rpx;
    width: 100%;
  }
  .set {
    width: 100%;
  }
}
.false {
  width: 100%;
  margin-top: 10rpx;
}
.header7 {
  margin-top: 30rpx;
  display: flex;
  justify-content: space-between;
  span {
    color: #939599;
    margin-left: 10rpx;
  }
}
.tabchange {
  display: flex;
  font-size: 28rpx;
  color: #939599;
  border-bottom: 2px solid #fff;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow: scroll;
  .c1 {
    padding-bottom: 15rpx;
    width: 20%;
    flex-shrink: 0;
  }
  .activec {
    font-size: 32rpx !important;
    color: #000 !important;
    border-bottom: 2px solid #12a669 !important;
  }
}
.index90 {
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
.header3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .set {
    width: 48rpx;
  }
}
.pic {
  width: 100%;
}
.picdiv {
  position: relative;
}
.play {
  position: absolute;
}
.info2 {
  font-size: 28rpx;
  .info3 {
    margin-bottom: 10rpx;
    color: #939599;
  }
  .info7 {
    display: flex;
    justify-content: space-between;
  }
  span {
    font-weight: bold;
    color: #626466;
    margin-left: 5rpx;
  }
}
.index1 {
  .header2 {
    border-left: 2px solid #29cc96;
    padding-left: 15rpx;
    font-size: 28rpx;
  }
  background: #ffffff;
  padding: 20rpx 32rpx;
  margin-bottom: 30rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  .con {
    flex-wrap: wrap;
    font-size: 28rpx;
    color: #626466;
    span {
      font-weight: bold;
      color: #000;
      font-size: 28rpx;
    }
    .clearb {
      margin-bottom: 0 !important;
    }
    display: flex;
    .c1 {
      width: 50%;
      margin-bottom: 20rpx;
    }
  }
  .header {
    font-size: 24rpx;
    padding-bottom: 20rpx;
    border-bottom: 1px solid#F5F5F5;
  }
  .header2 {
    flex: 1;
    justify-content: left !important;
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