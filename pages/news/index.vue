<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="farmtab">
      <div @click="active = !active" :class="[active ? 'c1active' : '', 'c1']">
        推送消息
      </div>
      <div @click="active = !active" :class="[!active ? 'c1active' : '', 'c1']">
        预警消息
      </div>
    </div>
    <div class="content" v-if="active">
      <div
        class="wrapcommon wrapcommonfarm"
        v-for="(item, index) in 12"
        :key="index"
      >
        <div class="titlewrap">
          <div class="title">
            <span>{{ index + 1 }}号茶园</span> ：古树茶
          </div>
          <div class="date">2022.02.10 10:00</div>
        </div>
        <div class="farmtitle">病虫防治</div>
        <div class="farmcontent">
          5月季节性病虫增加,可增加黄板,提高物理防御措施。
        </div>
      </div>
    </div>
    <div class="content contentclear3" v-else>
      <div class="datewrap flexcenter">
        <div :class="[activeone==index?'w1active':'','w1']" v-for="(item, index) in date" :key="index">
          <div class="w2">
           {{ item.week }}
          </div>
          <div class="w3" @click="activeone=index">
             {{ item.day }}
          </div>
          <div class="slide" v-if="item.slide"></div>
        </div>
      </div>
      <div class="panel flexcenter index1">
          <div class="p1">
              <span>12</span>
              <div class="text">异常预警</div> 
          </div>
           <div class="p1">
              <span>2</span>
              <div class="text">离线预警</div>
              
          </div>
           <div class="p1">
              <span>1</span>
               <div class="text">气象预警</div>
              
          </div>
      </div>
      <div class="content newscontent">
        <div
          class="wrapcommon wrapcommonfarm"
          v-for="(item, index) in list"
          :key="index"
        >
          <div :class="['type'+item.type,'titlewrap']">
            <div class="title">
              <span v-if="item.type==4" >异常预警</span> 
              <span v-if="item.type==3">气象预警</span> 
              <span v-if="item.type==2" >离线预警</span> 
              <span v-if="item.type==1" >异常预警</span> 
            </div>
            <div class="date">2022.02.10 10:00</div>
          </div>
          <div class="farmtitle">
              <div class="t2">
                <image mode="widthFix" v-if="item.type==4" class="btnpic" src="@/static/image/g1.png" alt="" />
                <image mode="widthFix" v-if="item.type==3" class="btnpic" src="@/static/image/g2.png" alt="" />
                <image mode="widthFix" v-if="item.type==2" class="btnpic" src="@/static/image/g3.png" alt="" />
                1号虫情仪异常，请尽快检查！
              </div>
              <u-icon color="#939599" size="14" name="arrow-right"></u-icon>
          </div>
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
        list:[
            {
                type:4,   
            },
            {
                type:3,   
            },
            {
                type:2,   
            },
            {
                type:1,   
            },
            {
                type:1,   
            },
            {
                type:1,   
            },
            {
                type:1,   
            },
            {
                type:1,   
            }
        ],
        activeone:4,
      active: true,
      showType: false,
      showType2: false,
      pageName: "消息通知",
      numValue: "",
      date: [
        {
          day: 22,
          week: "六",
          slide: false,
        },
        {
          day: 23,
          week: "日",
          slide: false,
        },
        {
          day: 24,
          week: "一",
          slide: true,
        },
        {
          day: 25,
          week: "二",
          slide: true,
        },
        {
          day: 26,
          week: "三",
          slide: true,
        },
        {
          day: 27,
          week: "四",
          slide: false,
        },
        {
          day: 28,
          week: "五",
          slide: false,
        },
      ],
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
// <span v-if="index==0" style="color:#F56262">异常预警</span> 
//               <span v-if="index==1" style="color:#3199F5">气象预警</span> 
//               <span v-if="index==2" style="color:#626466">离线预警</span> 
//               <span v-if="index>2" style="color:#939599">异常预警</span> 
.newscontent{
    .type4{
        .title{
             border-left: 2px solid #F56262!important;
        }
        span{
            color:#F56262!important;
        }
    }
    .type3{
        .title{
             border-left: 2px solid #3199F5!important;
        }
        span{
            color:#3199F5!important;
        }
    }
    .type2{
        .title{
             border-left: 2px solid #626466!important;
        }
        span{
            color:#626466!important;
        }
    }
    .type1{
        .title{
             border-left: 2px solid #939599!important;
        }
        span{
            color:#939599!important;
        }
    }
}
.panel {
    background: #fff;
    padding: 40rpx;
    margin: 25rpx;
    border-radius: 16rpx;
    .text{
        color: #626466;
    }
    .p1:nth-child(1){
        color: #F56262;
    }
     .p1:nth-child(2){
        color: #626466;
    }
    .p1:nth-child(3){
        color: #3199F5;
    }
    .p1{
        display: flex;
        flex: 1;
        flex-direction: column;
        font-size: 28rpx;
        align-items: center;
        justify-content: center;
        span{
            margin-bottom: 12rpx;
            font-size: 64rpx;
        font-weight: bold;
        }
        
    }
}
.contentclear3 {
  margin: 0 !important;
}
.w1active{
    .slide{
        background: #29CC96!important;
    }
    .w3{
        color: #fff!important;
        background: #29CC96!important;
    }
}
.datewrap {
  background: #fff;
  border-top: 1px solid #F1F1F1;
  padding:20rpx 0;
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
  .farmtitle {
    font-weight: bold;
    margin-bottom: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btnpic{
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