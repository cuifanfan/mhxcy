<template>
  <div class="wrap">
    <header-diy
      :backHidden="1"
      class="topbar"
      :type="2"
      :titleName="pageName"
    ></header-diy>
    <div class="content">
      <div class="test3">
        <div class="searchdiv flexcenter">
          <u--input
            placeholder="请输入关键字"
            border="surround"
            v-model="searchInput"
           
          ></u--input>
          <div class="search" @click="askList(true)">
            <u-icon color="#C4C7CC" size="25" name="search"></u-icon>
          </div>
        </div>
        <div class="choosediv">
          <div class="choosediv2" @click="activeTab = !activeTab">
            <div class="text">{{tabText}}</div>
            <u-icon
              v-if="!activeTab"
              color="#C4C7CC"
              size="18"
              name="arrow-down"
            ></u-icon>
            <u-icon v-else color="#C4C7CC" size="18" name="arrow-up"></u-icon>
          </div>
          <div class="select" v-if="activeTab">
            <!-- <div class="topicon">
              <u-icon color="#fff" size="18" name="arrow-up-fill"></u-icon>
            </div> -->
            <div
              @click="chooseOne(item)"
              class="selectchild"
              v-for="(item, index) in select"
              :key="index"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-for="(item, index) in list" :key="index" class="img2">
      <div class="wzdiv" @click="goDetail(item)">
        <div class="header header7 flexcenter">
          <div class="header2">问诊内容</div>
          <div class="date">{{ item.updateTime }}</div>
        </div>
        <div class="ns1 ns1flex" v-if="item.picArr.length > 0">
          <image
            mode="widthFix"
            v-for="(item2, index2) in item.picArr"
            :key="index2"
            class="zzpic"
            :src="baseUrl + item2"
          />
        </div>
        <div class="text">
          {{ item.content }}
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
import headerDiy from "../../component/header/header.vue";
import request from "../../../common/utils/request";
import { BASE_URL } from "../../../common/utils/config";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      status:'',
      tabText:'全部',
      select:[
        {
          name:'全部',
          val:'',
        },
        {
          name:'已回复',
          val:1
        },
        {
          name:'未回复',
          val:0,
        },
      ],
      activeTab:false,
      searchInput:'',
      baseUrl: BASE_URL,
      activeone: 4,
      active: false,
      showType: false,
      showType2: false,
      pageName: "专家问诊",
      numValue: "",
      nameValue: "",
      typeValue: "",
      current: 1,
      listOver: false,
      list: [],
    };
  },
  onReachBottom() {
    console.log("触底了");
    if(!this.listOver){
      this.current++;
      this.askList();
    }
  },
  onLoad() {
    this.askList();
  },
  methods: {
    typeSelect() {},
    chooseOne(item){
      console.log('item===', item)
      this.activeTab=false
      this.tabText=item.name
      this.status=item.val
      this.askList(true)
    },
    goDetail(item) {
      uni.setStorageSync("articleContent", JSON.stringify(item));
      uni.navigateTo({
        url: "/pages/expert/knowledgeDetail/index",
      });
    },
    askList(init) {
      request({
        url: "/data/expertservice/page",
        method: "get",
        isAuth: false,
        data: {
          current: this.current,
          status:this.status
        },
      }).then((res) => {
        if(init){
          this.list=[]
        }
        res.data.records.forEach((item) => {
          if (item.imageUrls) {
            this.$set(item, "picArr", item.imageUrls.split(","));
          } else {
            this.$set(item, "picArr", []);
          }
        });
        this.list = this.list.concat(res.data.records);
        if (res.data.records.length == 0) {
          uni.showToast({
            title: "暂无更多内容",
            icon: "none",
            duration: 850,
          });
          this.listOver = true;
        }
      });
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
.ztbtn{
  background: #3199F5;
  color: #fff;
  border-radius: 10rpx;
  padding: 5rpx 15rpx;
}
.wzdiv {
  background: #fff;
  padding: 32rpx;
  border-radius: 32rpx;
  font-size: 28rpx;
  .zt{
    color:#626466 ;
    margin-top: 20rpx;
    display: flex;
    align-items: center;
    .ztspan{
      color:#3199F5;
      font-weight: bold;
      margin-left: 10rpx;
    }
  }
  .text{
    font-size: 28rpx;
    color: #626466;
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
    justify-content: space-between;
    margin-top: 20rpx;
    margin-bottom: 30rpx;
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
}
.test3{
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.u-border{
  border: none;
}
.choosediv2{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150rpx;
}
.choosediv{
  border: 1px solid #29CC96;
  border-radius: 100px;
  font-size: 24rpx;
  height: 64rpx;
  padding: 0rpx 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  margin-left: 20rpx;
  position: relative;
  .select{
    position: absolute;
    bottom: -180rpx;
    background: #fff;
    padding:0 10rpx 10rpx 10rpx;
    z-index:11;
    width: 75%;
    border-radius: 10rpx;
    .topicon{
      position: absolute;
      top: -30rpx;
      right: 30rpx;
    }
    .selectchild{
      color: #C4C7CC;
      margin: 15rpx;
    }
  }
  .text{
    margin-right: 30rpx;
    color: #C4C7CC;
  }
}
.searchdiv{
  background: #fff;
  border-radius: 100px;
  padding: 0 20rpx;
  flex: 1;
  
}
.name2{
  color: #939599!important;
  font-weight: normal!important;
}
.disablewrap {
    display: flex;
    padding: 12rpx 18rpx;
    justify-content: space-between;
    width: 100%;
    border-radius: 12rpx;
    background: #FAFAFA;
  }
.input2 {
    display: flex;
  }
.edit {
  font-size: 28rpx;
  color: #939599;
  .textarea{
    background: #fafafa!important;
    border-radius: 16rpx;
    height: 200rpx;
    width: 100%;
    margin-top: 20rpx;
  }
  .name{
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
<style lang="scss" scoped>
.wzdiv {
  background: #fff;
  padding: 32rpx;
  border-radius: 32rpx;
  font-size: 28rpx;
  .zt {
    color: #626466;
    margin-top: 20rpx;
    .ztspan {
      color: #3199f5;
      font-weight: bold;
      margin-left: 10rpx;
    }
    .ztspan2 {
      color: #626466 !important;
    }
  }
  .text {
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
    .zzpic {
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