<template>
  <div class="wrap">
    <header-diy
      :backHidden="1"
      class="topbar"
      :type="2"
      :titleName="pageName"
    ></header-diy>
    <div class="img">
      <image
        mode="widthFix"
        @click="goAnswer"
        class="pic"
        src="@/static/image/z2.png"
      />
      <image
        mode="widthFix"
        @click="goAsk"
        class="pic"
        src="@/static/image/z1.png"
      />
    </div>
    <div class="index2 img">
      <div class="title1">
        <span>最近问诊</span>
        <div class="border"></div>
      </div>
    </div>
    <div v-for="(item,index) in list" :key="index" class="img2">
      <div class="wzdiv" @click="goDetail(item)">
        <div class="header header7 flexcenter">
          <div class="header2">问诊内容</div>
          <div class="date">{{item.createTime}}</div>
        </div>
        <div class="ns1 ns1flex" v-if="item.picArr.length>0">
          <image mode="widthFix" v-for="(item2,index2) in item.picArr" :key="index2" class="zzpic" :src="baseUrl+item2" />
        </div>
        <div class="text">
          {{item.content}}
        </div>
        <div class="zt">
          状态: <span class="ztspan" v-if="item.reply">专家已回复</span>
          <span class="ztspan ztspan2" v-if="!item.reply">专家未回复</span>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import headerDiy from "../component/header/header.vue";
import request  from "../../common/utils/request";
import { BASE_URL } from "../../common/utils/config";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      baseUrl:BASE_URL,
      activeone: 4,
      active: false,
      showType: false,
      showType2: false,
      pageName: "专家问诊",
      numValue: "",
      nameValue: "",
      typeValue: "",
      current:1,
      listOver:false,
      list:[],
    };
  },
  // onReachBottom() {
  //   console.log("触底了");
  //   if(!this.listOver){
  //     this.current++;
  //     this.askList();
  //   }
  // },
  onLoad(){
    this.askList()
  },
  methods: {
    typeSelect() {},
    goDetail(item){
     
      uni.setStorageSync('articleContent',JSON.stringify(item))
      uni.navigateTo({
        url:'/pages/expert/knowledgeDetail/index'
      })
    },
    askList(){
       request({
        url: "/data/expertservice/page",
        method: 'get',
        isAuth: false,
        data:{
          current:this.current
        },
      }).then((res) => {
        res.data.records.reverse()
        res.data.records.forEach(item=>{
          if(item.imageUrls){
            this.$set(item,'picArr',item.imageUrls.split(','))
          }else{
            this.$set(item,'picArr',[])
          }
        })
        this.list=this.list.concat(res.data.records)
        if (res.data.records.length == 0) {
          uni.showToast({
            title: "暂无更多内容",
            icon: "none",
            duration: 850,
          });
          this.listOver=true
        }
      })
    },
    goAnswer() {
      uni.navigateTo({
        url: "/pages/expert/answer/index",
      });
    },
    goAsk() {
      uni.navigateTo({
        url: "/pages/expert/ask/index",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap{
 padding-top: 34rpx;
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
.header2 {
  border-left: 2px solid #29cc96;
  padding-left: 15rpx;
  font-size: 28rpx;
}

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
  border-bottom: 1px solid #f5f5f5;
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

.img2 {
  margin-top: 30rpx !important;
  .pic {
    width: 100%;
  }
  margin: 0 32rpx;
}
.index2 {
  display: flex;
  justify-content: space-between;
  font-size: 36rpx;
  font-weight: bold;
  align-items: center;
  margin: 30rpx 0 15rpx 0;
  .title2 {
    color: #12a669;
    font-size: 28rpx;
  }
  .title1 {
    span {
      position: relative;
      z-index: 2;
    }
  }
  .border {
    width: 144rpx;
    height: 8rpx;
    background: #29cc96;
    position: relative;
    top: -9rpx;
    z-index: 1;
  }
}
.img {
  display: flex;
  margin: 0 32rpx;
  justify-content: space-between;
  margin-top: 30rpx;
  .pic {
    width: 328rpx;
  }
}
.index1 {
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