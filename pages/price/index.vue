<template>
  <div class="wrap">
    <header-diy
      :backHidden="1"
      :type="2"
      class="topbar"
      :titleName="pageName"
    ></header-diy>
    <div class="date" @click="showType=true">
      <div class="year">2022</div>
      <u-icon name="arrow-down" color="#000" size="14"></u-icon>
    </div>
    <div class="title">
       <div class="t1">
          地区
       </div>
       <div class="t1">
          品种
       </div>
        <div class="t1">
          价格(元/公斤)
       </div>
      
    </div>
    <div class="title title2" v-for="(item,index) in list" :key="index">
       <div class="t1">
          {{item.name}}
       </div>
       <div class="t1">
          {{item.type}}
       </div>
        <div class="t1">
          {{item.price}}
       </div>
      
    </div>
    <u-action-sheet
      :show="showType"
      :actions="typeList"
      title="请选择时间"
      @close="showType = false"
      
    ></u-action-sheet>

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
      typeList:[
        {
          name:2022
        }
      ],
      showType:false,
      pageName: "茶叶价格动态",
      list:[
        {
          name:'临沧茶区',
          type:'冰岛南迫古树茶',
          price:'4800-6000'
        },
        {
          name:'临沧茶区',
          type:'冰岛南迫大树茶',
          price:'2400-3500'
        },
        {
          name:'临沧茶区',
          type:'冰岛南迫小树茶',
          price:'1000-2000'
        },
        {
          name:'临沧茶区',
          type:'冰岛地界古树茶',
          price:'3200-6000'
        },
        {
          name:'临沧茶区',
          type:'冰岛地界大树茶',
          price:'1500-2500'
        },
        {
          name:'临沧茶区',
          type:'冰岛地界小树茶',
          price:'1000-1500'
        },
        {
          name:'临沧茶区',
          type:'大中山古树茶',
          price:'3000—4000'
        },
        {
          name:'临沧茶区',
          type:'坝糯古树茶',
          price:'900-1600'
        },
        {
          name:'临沧茶区',
          type:'坝糯中小树混采',
          price:'700-900'
        },
        {
          name:'临沧茶区',
          type:'那焦藤条古树茶',
          price:'900-1300'
        },
        {
          name:'临沧茶区',
          type:'那焦藤条中树茶',
          price:'500-800'
        },

         {
          name:'临沧茶区',
          type:'那赛藤条古树茶',
          price:'600-1000'
        },
         {
          name:'临沧茶区',
          type:'正气塘古树茶',
          price:'1300-1800'
        },
         {
          name:'临沧茶区',
          type:'坝卡古树茶',
          price:'500-700'
        },
         {
          name:'临沧茶区',
          type:'坝卡大中树茶',
          price:'300'
        },


        {
          name:'临沧茶区',
          type:'邦东古树茶',
          price:'900-1300'
        },
        {
          name:'临沧茶区',
          type:'邦东小树茶',
          price:'200-400'
        },
        {
          name:'临沧茶区',
          type:'邦东大雪山古树茶',
          price:'1300—1800'
        },
        {
          name:'临沧茶区',
          type:'邦旭古树茶',
          price:'800-1000'
        },

        {
          name:'临沧茶区',
          type:'邦旭小树茶',
          price:'200-250'
        },
        {
          name:'临沧茶区',
          type:'葫芦谷古树茶',
          price:'6000—9000'
        },
        {
          name:'临沧茶区',
          type:'曼岗古树茶',
          price:'800-1500'
        },
        {
          name:'临沧茶区',
          type:'那罕古树',
          price:'1500-2000'
        },
        {
          name:'临沧茶区',
          type:'那罕大树',
          price:'500-800'
        },
        {
          name:'临沧茶区',
          type:'那罕小树',
          price:'130-200'
        },
        {
          name:'临沧茶区',
          type:'忙肺古树茶',
          price:'900-1600'
        },


        {
          name:'临沧茶区',
          type:'马鞍山古树茶',
          price:'400-700'
        },
         {
          name:'临沧茶区',
          type:'大寨龙潭古树茶',
          price:'350-500'
        },
         {
          name:'临沧茶区',
          type:'锅底塘古树茶',
          price:'900-1700'
        },
         {
          name:'临沧茶区',
          type:'黄草林古树茶',
          price:'800-1300'
        },
         {
          name:'临沧茶区',
          type:'凤庆诗礼古墨古树茶',
          price:'900-1500'
        },

        {
          name:'普洱茶区',
          type:'芒景古树茶',
          price:'1200-1800'
        },
        {
          name:'普洱茶区',
          type:'混采毛茶',
          price:'600-800'
        },
        {
          name:'普洱茶区',
          type:'邦崴古树茶',
          price:'1500-2000'
        },
        {
          name:'普洱茶区',
          type:'千家寨古树茶',
          price:'800-2000'
        },
        {
          name:'普洱茶区',
          type:'白竹山古树茶',
          price:'400-800'
        },

        {
          name:'普洱茶区',
          type:'无量山古树茶',
          price:'400-600'
        },
        {
          name:'普洱茶区',
          type:'苦竹山古树茶',
          price:'1000-1300'
        },
        {
          name:'普洱茶区',
          type:'江城古树茶',
          price:'800-1200'
        },



        {
          name:'普洱茶区',
          type:'老乌山古树茶',
          price:'800-1000'
        },
        {
          name:'西双版纳勐海茶区',
          type:'广别老寨古树茶',
          price:'3500-6000'
        },
        {
          name:'西双版纳勐海茶区',
          type:'广别老寨大树茶',
          price:'1800-2800'
        },
        {
          name:'西双版纳勐海茶区',
          type:'广别老寨大树小树混采',
          price:'1200-1800'
        },
        {
          name:'西双版纳勐海茶区',
          type:'南糯山丫口老寨古树茶',
          price:'900-1800'
        },
        {
          name:'西双版纳勐海茶区',
          type:'石头寨古树茶',
          price:'1000-1800'
        },
        {
          name:'西双版纳勐海茶区',
          type:'半坡古树茶',
          price:'1000-2000'
        },


        {
          name:'西双版纳勐海茶区',
          type:'半坡中小树',
          price:'600-1000'
        },
        {
          name:'西双版纳勐海茶区',
          type:'帕真古树茶',
          price:'700-1000'
        },
        {
          name:'西双版纳勐海茶区',
          type:'帕真大树小树混采',
          price:'400-700'
        },
        {
          name:'西双版纳勐海茶区',
          type:'曼糯古树茶',
          price:'1500-2000'
        },
        {
          name:'西双版纳勐海茶区',
          type:'巴达贺松',
          price:'1000-1800'
        },
        {
          name:'西双版纳勐海茶区',
          type:'贺建古树茶',
          price:'600-1500'
        },
        {
          name:'西双版纳勐海茶区',
          type:'曼夕老寨古树茶',
          price:'1500-2000'
        },
        {
          name:'西双版纳勐海茶区',
          type:'布朗山曼囡',
          price:'1000-1500'
        },
        


        {
          name:'西双版纳勐腊茶区',
          type:'百花潭古树茶',
          price:'4500-6000'
        },
        {
          name:'西双版纳勐腊茶区',
          type:'百花潭小树茶',
          price:'1500-2000'
        },
        {
          name:'西双版纳勐腊茶区',
          type:'瓦龙古树茶',
          price:'800-1500'
        },
        {
          name:'西双版纳勐腊茶区',
          type:'莽枝古树茶',
          price:'1500-1800'
        },
        {
          name:'西双版纳勐腊茶区',
          type:'莽枝小树茶',
          price:'250-500'
        },
        
      ],
    };
  },
  methods: {
    
  },
};
</script>

<style scoped lang="scss">
.date{
  background: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  padding: 20rpx 0;
  .year{
    margin-right: 20rpx;
  }
}
.title2{
  background: transparent!important;
}
.title{
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 15rpx 0;
  .t1{
    display: flex;
    justify-content: center;
    flex: 1;
    font-size: 20rpx;
  }
}
.index22{
    margin-top: 30rpx!important;
}
.index11 {
  background: transparent !important;
}
.title1 {
  position: relative;
  width: 290rpx;
  span {
    position: relative;
    z-index: 2;
  }
  .border {
    width: 290rpx;
    height: 8rpx;
    background: #29cc96;
    position: relative;
    top: -9rpx;
    z-index: 1;
  }
}
.fullpic {
  width: 100%;
  margin-top: 20rpx;
}
.index1 {
  background: #ffffff;
  padding: 20rpx 32rpx;
  margin-bottom: 30rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  margin: 26rpx 0;
}
.header {
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  padding-bottom: 20rpx;
  border-bottom: 1px solid#F5F5F5;
  align-items: center;
  .header3 {
    color: #29cc96;
  }
  .header2 {
    border-left: 2px solid #29cc96;
    padding-left: 15rpx;
    font-size: 28rpx;
    font-weight: bold;
  }
}
.fullw {
  width: 100%;
}
.scrolldiv {
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;
}
.scrollchild {
  padding: 24rpx;
  border-radius: 24rpx;
  background: #fff;
  width: 560rpx;
  flex-shrink: 0;
  margin-right: 30rpx;
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
.content {
  margin: 0 32rpx;
}
.panlewrap {
  background: #fff;
  border-radius: 24rpx;
  margin-top: 30rpx;
  padding: 15rpx;

  .text {
    color: #626466;
    font-size: 28rpx;
  }
  .panle:nth-child(1) {
    color: #29cc96;
  }
  .panle:nth-child(2) {
    color: #3199f5;
  }

  .panle:nth-child(3) {
    color: #17cae5;
  }
  .panle:nth-child(4) {
    color: #f5a631;
  }
  .panle {
    width: 25%;
    font-size: 64rpx;
    font-weight: bold;
  }
  .c1 {
  }
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
.index {
  margin: 0 32rpx;
  .index7 {
    margin-top: 40rpx;
    .index90 {
      background: #fafafa !important;
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
    .index81 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #626466;
      .index83 {
        display: flex;
        align-items: center;
      }
      .index85 {
        position: relative;
        top: 8rpx;
      }
      .index82 {
        color: #3199f5;
        font-weight: bold;
        font-size: 48rpx;
      }
      .index84 {
        width: 40rpx;
        margin-left: 10rpx;
      }
    }
    .text {
      margin: 0 20rpx;
      color: #828282;
      font-size: 24rpx;
    }
    .pic72 {
      width: 32rpx;
    }
    .index72 {
      display: flex;
      align-items: center;
    }
    .index71 {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .index74 {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
    }
    .index73 {
      font-size: 24rpx;
      padding-bottom: 20rpx;
      border-bottom: 1px solid#F5F5F5;
      .index75 {
        color: #29cc96;
        font-size: 40rpx;
        font-weight: bold;
        padding: 20rpx 0 5rpx 0;
      }
      .index80 {
        font-size: 32rpx !important;
      }
      .index79 {
        color: #3199f5 !important;
      }
    }
  }
  .graytip {
    font-size: 28rpx;
    color: #313233;
    margin-top: 30rpx;
    .left {
      font-weight: bold;
    }
    .right {
      background-color: #29cc96;
      color: #fff;
      border-radius: 16rpx;
      font-size: 20rpx;
      margin-left: 20rpx;
      text-align: center;
      padding: 10rpx;
    }
  }
  .tabchange {
    color: #12a669;
    font-size: 24rpx;
    border-radius: 50rpx;
    border: 1px solid #29cc96;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0 30rpx;
    .one {
      text-align: center;
      flex: 1;
      height: 48rpx;
      line-height: 48rpx;
    }
    .two {
      background: #29cc96 !important;
      color: #fff !important;
    }
  }
  .graycontent {
    .infotitle {
      width: 85rpx;
    }
    .infowrap {
      display: flex;
      flex-wrap: wrap;
      margin-left: 10rpx;
    }
    .grayinfo {
      font-size: 28rpx;
      color: #626466;
    }
    .clearmagin {
      margin-left: 0 !important;
    }
    .numoften {
      font-size: 24rpx !important;
    }
    .grayinfo2 {
      display: flex;
      color: #000;

      align-items: baseline;
      margin-right: 10rpx;
    }
    .grayinfo4 {
      display: flex;
      align-items: center;
      color: #626466;
    }
    .numbold {
      font-weight: bold;
      font-size: 40rpx;
      margin: 0 10rpx;
    }
    .grayinfo1 {
      display: flex;
      padding: 15rpx 0;
      align-items: center;
      align-items: baseline;
    }
    .graycontent1 {
      background: #fafafa;
      padding: 16rpx 32rpx;
      .gray1 {
        font-size: 24rpx;
        font-weight: bold;
        border-bottom: 1px solid #f5f5f5;
        padding-bottom: 20rpx;
      }
      .gray5 {
        flex: 1;
        display: flex;
      }
      .gray2 {
        border-bottom: 2px solid#FAFAFA;
        color: #d8d8d8;
        padding: 10rpx 0;
        margin-right: 20rpx;
      }
      .gray4 {
        border-bottom: 2px solid#29CC96 !important;
        color: #000 !important;
      }
      .gray3 {
        width: 32rpx;
      }
    }
  }
  .addchild {
    font-size: 28rpx;
    margin-top: 20rpx;
    .picchild {
      width: 96rpx;
      margin-left: 30rpx;
    }
    .addchild2 {
      display: flex;
      flex-direction: column;
      width: 500rpx;

      .bottom {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #939599;
        margin-top: 30rpx;
      }
    }
  }
  .indexinfor {
    font-size: 28rpx;
    margin-top: 35rpx;
    padding: 10rpx 32rpx !important;
    .pic {
      width: 32rpx;
      margin-right: 10rpx;
    }
    .slh {
      text-overflow: ellipsis;
      overflow: hidden;
      color: #626466;
      white-space: nowrap;
      margin-right: 70rpx;
    }
  }
  .btnwrap {
    margin: 70rpx 0 0 0;
    color: #fff;
    padding-bottom: 50rpx;
    .btn {
      flex: 1;
      background: linear-gradient(135deg, #f5abb1 0%, #ff5533 100%);
      border-radius: 8px 8px 8px 8px;
      padding: 16rpx 16rpx;
      .btnpic {
        width: 64rpx;
      }
    }
    .left {
      margin-right: 20rpx;
    }
    .btn2 {
      margin-right: 34rpx;

      background: linear-gradient(134deg, #62b0f5 0%, #317ff5 100%) !important;
    }
  }
  
  .index3 {
    .tabtitle {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      font-size: 24rpx;
      color: #626466;
      padding-bottom: 20rpx;
      .tabadd1 {
      }
      .tabadd3 {
        color: #29cc96;
        background: rgba(41, 204, 150, 0.16);
        padding: 8rpx;
        font-size: 24rpx;
        border-radius: 8rpx;
        margin-right: 10rpx;
      }
    }
    .tabcontent {
      font-size: 24rpx;
    }
    .t7 {
      flex: auto !important;
      width: 100rpx;
      margin-left: 25rpx;
    }

    .t8 {
      flex: auto !important;
    }
    .t5 {
      justify-content: flex-start !important;
    }
    .t6 {
      justify-content: flex-end !important;
    }
    .t10 {
      margin-left: 10rpx;
    }
    .t9 {
      text-align: center;
    }
    .t3 {
      font-size: 20rpx;
      flex: 1.3 !important;
    }
    .t4 {
      flex: 1.3 !important;
    }
    .t1 {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 20rpx;
    }
    .child {
      display: flex;
      border-radius: 8rpx;
      .t2 {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
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
  .index1 {
    background: #ffffff;
    padding: 20rpx 32rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
  }
  .info {
    font-size: 28rpx;
    display: flex;
    align-items: center;
  }
  .info1 {
    margin-top: 20rpx;
    margin-bottom: 40rpx;
  }
  .info3 {
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
  }
  .infopic2 {
    width: 64rpx;
    margin-right: 16rpx;
  }
  .info4 {
    font-size: 24rpx;
  }
  .info6 {
    color: #fff;
  }
  .info5 {
    margin-bottom: 10rpx;
    span {
      font-weight: bold;
    }
  }
  .infopic {
    width: 32rpx;
    margin-right: 10rpx;
  }
}
</style>
