<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="topwrap">
      <div class="top">
        <u--input
          v-model="keyword"
          placeholder="请输入搜索关键字"
          border="none"
        ></u--input>
        <u-icon
          slot="right"
          @click="farminformation(true)"
          color="#C4C7CC"
          size="26"
          name="search"
        ></u-icon>
      </div>
      <div class="search">
        热门搜索:
        <div class="s1">
          <div
            class="s2"
            @click="hotGo(item)"
            v-for="(item, index) in hot"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="tab flexcenter">
        <div
          :class="[activeTabIndex == 0 ? 'tab2' : '', 'tab1']"
          @click="changeTab(0)"
        >
          最近更新
        </div>
        <div
          :class="[activeTabIndex == 1 ? 'tab2' : '', 'tab1']"
          @click="changeTab(1)"
        >
          推荐
        </div>
        <div class="tab1">
          <div class="knowicon" @click="activeTab = !activeTab">
            知识分类
            <div class="tab1icon">
              <u-icon
                v-if="!activeTab"
                slot="right"
                @click="showType = true"
                color="#C4C7CC"
                size="15"
                name="arrow-down-fill"
              ></u-icon>
              <u-icon
                v-else
                slot="right"
                @click="showType = true"
                color="#C4C7CC"
                size="15"
                name="arrow-up-fill"
              ></u-icon>
            </div>
            <div class="select" v-if="activeTab">
              <div
                @click="chooseOne(item)"
                class="selectchild"
                v-for="(item, index) in select"
                :key="index"
              >
                {{ item.categoryName }}
              </div>
            </div>
          </div>
        </div>
        <div
          :class="[activeTabIndex == 3 ? 'tab2' : '', 'tab1']"
          @click="changeTab(3)"
        >
          我的收藏
        </div>
      </div>
    </div>
    <div class="index1 index1clear">
      <div v-for="(item, index) in list" :key="index" class="img2">
        <div class="wzdiv">
          <div class="header header7 flexcenter" @click="goDetail(item)">
            <image
              mode="widthFix"
              class="zzpic2"
              src="@/static/image/Frame.png"
            />
            <div class="header2">{{ item.title }}</div>
          </div>
          <div
            @click="goDetail(item)"
            class="ns1 ns1flex"
            v-if="item.cover && item.cover.length > 0"
          >
            <image
              v-for="(item2, index2) in item.cover"
              :key="index2"
              mode="widthFix"
              class="zzpic"
              :src="baseUrl + item2"
            />
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <div class="zt">
            <div class="ztt1">
              <image mode="widthFix" class="tx" src="@/static/image/man.png" />
              <span class="name">
                {{ item.author }}
              </span>
              <div class="ztt2 flexcenter">
                <image
                  mode="widthFix"
                  @click="addCollect(item)"
                  v-if="!item.isCollectionByMe"
                  class="tx2"
                  src="@/static/image/sc.png"
                />
                <image
                  mode="widthFix"
                  @click="removeCollect(item)"
                  v-else
                  class="tx2"
                  src="@/static/image/sca.png"
                />
                <image
                  mode="widthFix"
                  @click="shareHandle(item)"
                  class="tx1"
                  src="@/static/image/zf.png"
                />
              </div>
            </div>
            <div class="ztt1">
              {{ item.createTime }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <u-popup :show="pshow" mode="bottom" @close="close">
      <div class="share">
        <div class="share1" @click="appShare('WXSceneSession')">
          <div>
            <image mode="widthFix" class="tx22" src="@/static/image/wx.png" />
          </div>
          微信好友
        </div>
        <div class="share1" @click="appShare('WXSenceTimeline')">
          <div>
            <image mode="widthFix" class="tx22" src="@/static/image/pyq.png" />
          </div>
          微信朋友圈
        </div>
      </div>
    </u-popup>
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
      shareInfo: null,
      pshow: false,
      hot: ["普洱", "台树茶", "茶叶保存"],
      keyword: "",
      baseUrl: BASE_URL,
      userInfo: null,
      list: [],
      listOver: false,
      activeTab: false,
      current: 1,
      select: [],
      pageName: "农业知识库",
      numValue: "",
      nameValue: "",
      typeValue: "",
      category: "",
      recommend: false,
      activeTabIndex: 0,
      collectionByMeFlag: false,
    };
  },
  onLoad() {
    this.userInfo = uni.getStorageSync("userInfo");
    this.farminformation();
    this.getSort();
  },
  onReachBottom() {
    console.log("触底了");
    if (!this.listOver) {
      this.current++;
      this.farminformation();
    }
  },
  methods: {
    getSort() {
      request({
        url: "/data/informationcategory/getInformationCategoryOptions",
        method: "get",
        isAuth: false,
        data: {},
      }).then((res) => {
        let one = [
          {
            categoryName: "全部",
          },
        ];
        this.select = one.concat(res.data);
      });
    },
    shareHandle(item) {
      this.pshow = true;
      this.shareInfo = item;
    },
    appShare(scene) {
      console.log(this.shareInfo);
      //return
      let that = this;
      let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
      let curRoute = routes[routes.length - 1].$page.fullPath; // 获取当前页面路由，也就是最后一个打开的页面路由
      uni.share({
        provider: "weixin", //分享服务提供商（即weixin|qq|sinaweibo）
        scene: scene, //场景，可取值参考下面说明。
        type: 0, //分享形式
        href: `${BASE_URL}${curRoute}&spread=${that.uid}`, //跳转链接
        title: that.shareInfo.title, //分享内容的标题
        summary: that.shareInfo.content, //分享内容的摘要
        imageUrl: that.baseUrl + that.shareInfo.cover[0], //图片地址
        success: function (res) {
          that.pshow = false; //成功后关闭底部弹框
        },
        fail: function (err) {
          uni.showToast({
            title: "分享失败",
            icon: "none",
            duration: 2000,
          });
          that.pshow = false;
        },
      });
    },

    hotGo(item) {
      this.keyword = item;
      this.farminformation(true);
    },
    goDetail(item) {
      uni.setStorageSync("articleContent", JSON.stringify(item));
      uni.navigateTo({
        url: "/pages/expert/article/index",
      });
    },
    addCollect(item) {
      request({
        url: "/data/usercollection",
        method: "post",
        isAuth: false,
        data: {
          informationId: item.id,
          userId: this.userInfo.userId,
        },
      }).then((res) => {
        item.isCollectionByMe = true;
        uni.showToast({
          title: "收藏成功",
          icon: "none",
          duration: 850,
        });
      });
    },
    changeTab(val) {
      this.activeTabIndex = val;
      this.recommend = val == 1 ? true : false;
      this.collectionByMeFlag = val == 3 ? true : false;
      this.farminformation(true);
    },
    removeCollect(item) {
      request({
        url:
          "/data/usercollection/removeByUserAndInformation?informationId=" +
          item.id +
          "&userId=" +
          this.userInfo.userId,
        method: "delete",
        isAuth: false,
        data: {},
      }).then((res) => {
        uni.showToast({
          title: "取消收藏成功",
          icon: "none",
          duration: 850,
        });
        item.isCollectionByMe = false;
      });
    },
    farminformation(init) {
      if (init) {
        // if(this.keyword==''){
        //   return
        // }
        this.current = 1;
        this.list = [];
      }
      request({
        url: "/data/farminformation/pageFront",
        method: "get",
        isAuth: false,
        data: {
          current: this.current,
          userId: this.userInfo.userId,
          category: this.category,
          keyword: this.keyword,
          recommend: this.recommend,
          collectionByMe: this.collectionByMeFlag,
        },
      }).then((res) => {
        this.list = this.list.concat(res.data.records);
        this.list.forEach((item, index) => {
          let get = item.coverImage.split(",");
          this.$set(item, "cover", get);
        });
        console.log(this.list);
        if (res.data.records.length == 0) {
          uni.showToast({
            title: "暂无更多文章",
            icon: "none",
            duration: 850,
          });
          this.listOver = true;
        }
      });
    },

    chooseOne(item) {
      this.activeTab = false;
      this.category = item.categoryName=='全部'?'':item.categoryName;
      this.farminformation(true);
    },
  },
};
</script>
<style lang="scss" scoped>
.share1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.share {
  display: flex;
  justify-content: space-around;
  padding: 25rpx;
}
.zt {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.name {
  margin: 0 40rpx 0 15rpx;
}
.ztt1 {
  display: flex;
  align-items: center;
}
.tx {
  width: 40rpx;
}
.tx1 {
  width: 32rpx;
  margin-right: 10rpx;
}
.tx22 {
  width: 80rpx;
}
.tx2 {
  width: 38rpx;
  margin-right: 10rpx;
}
.img2 {
  margin-top: 30rpx !important;
  .pic {
    width: 100%;
  }
}
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
  }
  .text {
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
  .zzpic2 {
    width: 36rpx;
    margin-right: 10rpx;
  }
  .ns1flex {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
    margin-bottom: 30rpx;
  }
}
.knowicon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.select {
  position: absolute;
  top: 62rpx;
  background: #fff;
  padding: 0 10rpx 10rpx 10rpx;
  z-index: 11;
  width: 136rpx;
  border-radius: 10rpx;
  .topicon {
    position: absolute;
    top: -30rpx;
    right: 30rpx;
  }
  .selectchild {
    color: #939599;
    margin: 15rpx;
  }
}
.tab1icon {
  margin-left: 10rpx;
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
  width: 33.33%;
  display: flex;
  align-items: center;
  position: relative;
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
    padding: 4rpx 16rpx;
    margin: 0 16rpx;
    background: #fafafa;
    font-size: 20rpx;
    border-radius: 100px;
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
  padding: 16rpx 32rpx;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    overflow: hidden;
    font-size: 28rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    color: #626466;
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
  border-top: 1px solid #f1f1f1;
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