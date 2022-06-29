<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="test1">
        <div class="test3 flexcenter" @click="dateShow = true">
          <div class="inputdiy">
            {{ dateInput }}
          </div>
          <div class="search">
            <image
              mode="widthFix"
              class="datepic"
              src="@/static/image/date.png"
            />
          </div>
        </div>
      </div>
      <div class="test5">
        <div class="test6" v-for="(item, index) in list" :key="index">
          <image
            @click="preview(index)"
            mode="widthFix"
            class="videopic"
            :src="baseUrl + item.url"
            v-if="!type"
          />
          
          <image
            @click="preview(index)"
            mode="widthFix"
            class="videopic"
            :src="item.imagesUrl"
            v-else
          />
          <div class="text">{{ item.createTime }}</div>
        </div>
      </div>
    </div>
    <u-calendar
      :closeOnClickOverlay="true"
      @close="dateShow = false"
      :show="dateShow"
      :mode="mode"
       monthNum="13"
       :minDate="minDate"
      @confirm="confirm"
    ></u-calendar>
    
  </div>
</template>
<script>
import headerDiy from "../../component/header/header.vue";
import request from "../../../common/utils/request";
import { BASE_URL } from "../../../common/utils/config";
import moment from "moment";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      type:null,
      listOver:false,
      current:1,
      moment,
      minDate:moment().add(-1, 'y').format("YYYY-MM-DD"),
      baseUrl: BASE_URL,
      list: [],
      dateInput: "请选择日期",
      mode: "range",
      dateShow: false,
      value: "",
      showType: false,
      showType2: false,
      pageName: "农情监测",
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
      startTime:'',
      endTime:'',
      getId:'',
    };
  },
  onLoad(option) {
    this.getId=option.id
    this.type=option.type
    this.fluoritescreenshot();
  },
  onReachBottom() {
    console.log("触底了");
    if(!this.listOver){
      this.current++;
      this.fluoritescreenshot();
    }
  },
  methods: {
    typeSelect() {},
    preview(i) {

      uni.previewImage({
        // 预览时，默认显示图片的索引
        current: i,
        // 所有图片 url 路径的数组  //这里直接把图片列表的数组放入即可
        urls:this.type?this.list.map((item) => item.imagesUrl): this.list.map((item) => this.baseUrl+item.url),
      });
    },
    confirm(e) {
      this.dateShow = false;
      this.startTime=e[0]
      this.endTime=e[e.length-1]
      this.dateInput=this.startTime+'-'+this.endTime
      this.fluoritescreenshot(true)
    },
    fluoritescreenshot(flag) {
      let url=this.type?'/data/wormdistinguishdata/page?deviceAddr=':'/data-thirdpart/fluoritescreenshot/page?deviceSerial='
      let data={
        current:this.current
      }
      if(this.endTime){
        data.startTime=this.startTime
        data.endTime=this.endTime
      }
      request({
        url:url + this.getId,
        method: "get",
        isAuth: false,
        data: data,
      }).then((res) => {
        if(flag){
          this.list=[]
        }
        if(!this.type){
          res.data.records.reverse()
        }
        this.list =this.list.concat(res.data.records)
        if (res.data.records.length == 0) {
          uni.showToast({
            title: "暂无更多数据",
            icon: "none",
            duration: 850,
          });
          this.listOver=true
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  .test5 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .inputdiy {
    background: #fff;
    font-size: 24rpx;
    color: #c4c7cc;
    height: 64rpx;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 40rpx;
  }
  .datepic {
    width: 48rpx;
  }
  .test6 {
    border-radius: 32rpx;
    overflow: hidden;
    width: 330rpx;
    margin-top: 30rpx;
    background: #fff;
    height: 264rpx;
    .videopic {
      width: 100%;
      height: 210rpx!important;
    }
    .text {
        font-size: 28rpx;
        color: #626466;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        top: -8rpx;
    }
  }
  .test1 {
    color: #626466;
    font-size: 28rpx;
  }
  .test3 {
    position: relative;
    background: #fff;
    border-radius: 200rpx;
    overflow: hidden;
    .u-border {
      border: none !important;
    }
    .search {
      position: absolute;
      right: 20rpx;
      top: 10rpx;
    }
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
    width: 33.333%;
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