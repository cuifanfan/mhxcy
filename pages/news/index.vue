<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="farmtab">
      <div @click="active = !active" :class="[active ? 'c1active' : '', 'c1']">
        推送消息
      </div>
      <div @click="changeTab" :class="[!active ? 'c1active' : '', 'c1']">
        告警消息
      </div>
    </div>
    <div class="content" v-if="active">
      <div
        class="wrapcommon wrapcommonfarm"
        v-for="(item, index) in tsList"
        :key="index"
      >
        <div class="titlewrap">
          <div class="title">
            {{ item.title }}
          </div>
          
        </div>
        <div class="datetitle">{{ item.createTime }}</div>
        <div class="farmcontent">
          {{ item.newsInfo }}
        </div>
      </div>
    </div>
    <div class="content contentclear3" v-else>
      <div class="scrolldivwrap">
        <div class="scrolldiv" ref="scrollRef">
        <div class="datewrap flexcenter">
          <div
            :class="[activeone == index ? 'w1active' : '', 'w1']"
            v-for="(item, index) in date"
            :key="index"
          >
            <div class="w2">
              {{ weekBig[item.weeks]}}
            </div>
            <div class="w3" @click="changeGj(item,index)">
              {{ item.dates.split('-')[2] }}
            </div>
            <div class="slide" v-if="parseInt(item.counts)>0 "></div>
            
          </div>
          
        </div>
        
      </div>
      </div>
      

      <div class="panel flexcenter index1">
        <!-- <div class="p1">
          <span>12</span>
          <div class="text">异常告警</div>
        </div> -->
        <div class="p1">
          <span>{{outLineNum}}</span>
          <div class="text">离线告警</div>
        </div>
        <div class="p1">
          <span>{{enNum}}</span>
          <div class="text">气象告警</div>
        </div>
      </div>
      <div class="content newscontent">
        <div
          class="wrapcommon wrapcommonfarm"
          v-for="(item, index) in gjList"
          :key="index"
        >
          <div
            :class="[
              item.status == '气象告警' ? 'type3' : '',
              item.status == '3' ? 'type4' : '',
              item.status == '2' ? 'type1' : '',
              'titlewrap',
            ]"
          >
            <div class="title">
              <span v-if="item.status == '气象告警'">气象告警</span>
              <span v-if="item.status == '离线告警'">离线告警</span>
            </div>
            <div class="date">{{ item.createTime }}</div>
          </div>
          <div class="farmtitle">
            <div class="t2">
              <image
                mode="widthFix"
                v-if="item.status == '异常告警'"
                class="btnpic"
                src="@/static/image/g1.png"
                alt=""
              />
              <image
                mode="widthFix"
                v-if="item.status == '离线告警'"
                class="btnpic"
                src="@/static/image/g2.png"
                alt=""
              />
              <image
                mode="widthFix"
                v-if="item.status == '气象告警'"
                class="btnpic"
                src="@/static/image/g3.png"
                alt=""
              />
              <span v-if="item.status == '气象告警'">
                {{item.newsInfo.split("::")[0]}}({{ item.newsInfo.split("::")[1] }}):{{item.newsInfo.split("::")[2]}} {{item.newsInfo.split("::")[4]}}
              </span>
              <span v-if="item.status == '离线告警'">
                {{item.newsInfo}}
              </span>
            </div>
            <!-- <u-icon color="#939599" size="14" name="arrow-right"></u-icon> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerDiy from "../component/header/header.vue";
import request from "../../common/utils/request";
import moment from "moment";
export default {
  components: {
    headerDiy,
  },

  data() {
    return {
      moment,
      outLineNum:'-',
      enNum:'-',
      weekBig: ["一", "二", "三", "四", "五", "六", "日"],
      tsList: [],
      gjList: [],
      tsCurrent: 1,
      gjCurrent: 1,
      list: [
        {
          type: 4,
        },
        {
          type: 3,
        },
        {
          type: 2,
        },
        {
          type: 1,
        },
        {
          type: 1,
        },
        {
          type: 1,
        },
        {
          type: 1,
        },
        {
          type: 1,
        },
      ],
      activeone: 0,
      active:true,
      showType: false,
      showType2: false,
      pageName: "消息通知",
      numValue: "",
      date: [],
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
      listOver2: false,
      listOver: false,
    };
  },
  onLoad() {
    this.askTs("推送");
    this.askTs("告警");
    this.getTotal()
    this.getRl()
  },
  onShow(){
    uni.setStorageSync('newsList','')
    uni.$off("newCome");
    uni.$on("newCome", (data)=>{
      console.log('来消息了！',data)
      let get =JSON.parse(data)
      if(get.newsKind=='告警'){
        if(get.status=='气象告警'){
          this.enNum+=1
        }else if(get.status=='离线告警'){
          this.outLineNum+=1
        }
        if(this.activeone==0){
          this.gjList.unshift({
            createTime: moment(get.pushTime).format('YYYY-MM-DD HH:mm:ss') ,
            id: get.id,
            newsInfo: get.newsInfo,
            newsKind: get.newsKind,
            pushTime: moment(get.pushTime).format('YYYY-MM-DD HH:mm:ss'),
            recipientId:get.recipientId,
            status: get.status,
            title: get.title,
          })
        }
        
      }
      if(get.newsKind=='推送'){
        this.tsList.unshift({
          createTime: moment(get.pushTime).format('YYYY-MM-DD HH:mm:ss'),
          id: "1539894116800360449",
          newsInfo: get.newsInfo,
          newsKind: "推送",
          pushTime: moment(get.pushTime).format('YYYY-MM-DD HH:mm:ss'),
          recipientId: get.recipientId,
          status: "农事建议",
          title: get.title
        })
        
      }
    });
  
  },
  onReachBottom() {
    console.log("触底了");
    if (!this.listOver && this.active) {
      this.tsCurrent++;
      this.askTs("推送");
    }
    if (!this.listOver2 && !this.active) {
      this.gjCurrent++;
      this.askTs("告警");
    }
    
  },
  methods: {
    changeTab(){
      this.active=!this.active
      this.$nextTick(()=>{
        this.$refs.scrollRef.scrollTo(999999,0)
      })
    },
    changeGj(item,index){
      this.activeone = index
      console.log(item)
      if(item.counts=='0'){
        uni.showToast({
          icon: 'none',
          title: '当日无告警信息',
          duration:850
        })
        return 
      }
      this.gjCurrent=1
      this.gjList=[]
      this.askTs("告警",item.dates);
    },
    getTotal(){
      let userInfo=uni.getStorageSync('userInfo')
      request({
        url:"/data/forwardnews/getEachWarnType?userId="+userInfo.userId ,
        method: "get",
        isAuth: false,
        data: {
         
        },
      }).then((res) => {
        this.outLineNum=parseInt(res.data.offLineWarn)
        this.enNum=parseInt(res.data.weatherWarn)
      })
    },
    getRl(){
      let now = moment().format("YYYY-MM-DD");
      let userInfo=uni.getStorageSync('userInfo')
       request({
        url:
          "/data/forwardnews/getEveryDayNewsCountInMonth?today="+now+"&userId="+userInfo.userId ,
        method: "get",
        isAuth: false,
        data: {
         
        },
      }).then((res) => {
        // res.data.reverse()
        this.date=res.data
        this.activeone=res.data.length-1
      })
    },
   
    askTs(val,year) {
       let askDate=moment().format("YYYY-MM-DD ");
       if(year&&val=='告警'){
        askDate=year
       }
       if(val=='推送'){
        askDate=''
       }
      request({
        url:
          "/data/forwardnews/page?recipientId=" +
          uni.getStorageSync("tenantId"),
        method: "get",
        isAuth: false,
        data: {
          newsKind: val,
          current: val == "推送" ? this.tsCurrent : this.gjCurrent,
          descs:'create_time',
          date:askDate
        },
      }).then((res) => {
        if (val == "推送") {
          this.tsList = this.tsList.concat(res.data.records);
          if (res.data.records.length == 0) {
            uni.showToast({
              title: "暂无更多数据",
              icon: "none",
              duration: 850,
            });
            this.listOver = true;
          }
        } else {
          this.gjList = this.gjList.concat(res.data.records);
          if (res.data.records.length == 0) {
            uni.showToast({
              title: "暂无更多数据",
              icon: "none",
              duration: 850,
            });
            this.listOver2 = true;
          }
        }
      });
    },
    typeSelect() {},
  },
};
</script>
<style lang="scss" scoped>

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
      font-size: 44rpx;
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
    font-size: 20rpx;
  }
}
.scrolldivwrap{
  background: #fff;
}
.scrolldiv{
   overflow-x: scroll;
   background: #fff;
   margin:0 15rpx;
}
.datewrap {
  background: #fff;
  border-top: 1px solid #f1f1f1;
  padding: 20rpx 0;
  width: 100%;
  justify-content: left !important;
 
  .w1 {
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-bottom: 20rpx;
    margin: 0 20rpx;
    width: 5%;
    flex-shrink: 0;
  }
  .w1:first-child{
    margin-left: 10rpx!important;
  }
  .w3 {
    font-size: 20rpx;
    margin: 10rpx 0;
    background: #f5f5f5;
    color: #939599;
    width: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48rpx;
    overflow: hidden;
    border-radius: 50rpx;
  }
  .slide {
    width: 8rpx;
    height: 8rpx;
    background: #c4c7cc;
    border-radius: 100rpx;
    position: absolute;
    bottom: 5px;
  }
}
.wrapcommonfarm {
  margin: 32rpx 0;
  padding: 32rpx;
  border-radius: 32rpx;
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
  padding-top: 0!important;
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
  .datetitle{
    color: #626466;
      font-size: 24rpx;
      margin-bottom: 20rpx;
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