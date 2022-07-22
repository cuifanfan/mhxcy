<template>
  <div class="wrap videowrapdiv">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="closeFull" v-if="closeIcon">
      <u-icon name="close-circle" color="#fff" size="28"></u-icon>
    </div>
    <div class="test5">
      <web-view @message="message" :src="videoUrl" id="webcon" />
    </div>
    <!-- <div class="handlebtn flexcenter">
      <div class="one1 flexcenter">
        <image mode="widthFix" class="one2" src="@/static/image/h2.png" />
        全屏
      </div>
      <div class="one1 flexcenter" @click="cutScreen">
        <image mode="widthFix" class="one2" src="@/static/image/h1.png" />
        截图
      </div>
    </div> -->
    <div class="cirwrap2 flexcenter">
      <image
        mode="widthFix"
        class="handlecir"
        src="@/static/image/handle.png"
      />
    </div>
  </div>
</template>
<script>
import headerDiy from "../../component/header/header.vue";
import request from "../../../common/utils/request";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      turnFlag:null,
      sendOptions:'',
      closeIcon: false,
      windowW: "",
      rate: 0.6666,
      videoUrl: "",
      value: "",
      showType: false,
      showType2: false,
      pageName: "",
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
  mounted() {
    uni
      .createSelectorQuery()
      .in(this)
      .select(".nav-box")
      .boundingClientRect((data) => {
        console.log(JSON.stringify(data));
        // {"id":"","dataset":{},"left":12,"right":308,"top":12,"bottom":315,"width":296,"height":303}
        //this.heightEle = data.height
        /* #ifdef APP-PLUS */
        //定义变量用于接收webview对象
        var GOOGLE_MAP_STYLE;
        //定义变量用于接收屏幕宽度
        //获取屏幕剩余宽度
        var leftwith = this.windowW - 335;
        //获取webview对象
        var currentWebview = this.$scope.$getAppWebview();
        setTimeout(function () {
          GOOGLE_MAP_STYLE = currentWebview.children()[0];
          GOOGLE_MAP_STYLE.setStyle({
            width: this.windowW,
            height: this.windowW * this.rate,
            top: data.height,
          });
        }, 500); //如果是页面初始化调用时，需要延时一下
        /* #endif */
      })
      .exec();
  },
  onLoad(options) {
    let that = this;
    this.sendOptions=options
    console.log('xxx',options)
    uni.getSystemInfo({
      success: function (res) {
        that.windowW = res.windowWidth;
        that.videoUrl =
          "/static/html/video.html?url=" +
          options.videourl +
          "&token=" +
          options.token +
          "&w=" +
          that.windowW +
          "&h=" +
          that.windowW * that.rate +
          "&windowH=" +
          res.windowHeight;
        that.pageName = options.name;
        console.log("xxxx", that.videoUrl);
      },
    });
  },
  methods: {
    typeSelect() {},
    message(arg) {
      console.log("unapppost-------------", arg);
      /* #ifdef APP-PLUS */
      if (arg.detail.data[0]["order"] == "fullScreen") {
        plus.screen.lockOrientation("landscape-primary");
      } else if (arg.detail.data[0]["order"] == "exitFullScreen") {
        plus.screen.lockOrientation("portrait-primary");
      }
      if(arg.detail.data[0]['msg']){
        console.log('控制方向指令',arg.detail.data[0]['val'])
        this.turnD(arg.detail.data[0]['val'])
      }

      /* #endif */
    },
    turnD(val){
       request({
        url: "/data-thirdpart/fluorite/deviceOperateStart/"+this.sendOptions.deviceSerial+"?direction="+val+'&speed=1',
        method: "get",
        isAuth: false,
        data: {
         
        },
      }).then((res) => {
        if(this.turnFlag){
          clearTimeout(this.turnFlag)
        }
        this.turnFlag=setTimeout(() => {
            this.stopTurn(val)
        }, 1000);
        
      })
    },
    stopTurn(val){
        request({
        url: "/data-thirdpart/fluorite/deviceOperateStop/"+this.sendOptions.deviceSerial+"?direction="+val,
        method: "get",
        isAuth: false,
        data: {
         
        },
      }).then((res) => {
        
      })
    },
    cutScreen() {
      // #ifdef APP-PLUS
      const _funName = "msgFromUniapp",
        _data = {
          handle: "cut",
        };
      const currentWebview = this.$scope.$getAppWebview().children()[0];
      currentWebview.evalJS(`${_funName}(${JSON.stringify(_data)})`);
      // #endif
    },
  },
};
</script>
<style lang="scss">
.closeFull {
  position: fixed;
  top: 105rpx;
  right: 40rpx;
}
.videowrapdiv .navtitle {
  font-size: 30rpx !important;
}
</style>
<style lang="scss" scoped>
.test5 {
}
.cirwrap2 {
  width: 100%;
  margin-top: 200rpx;
}
.handlecir {
  width: 360rpx;
}
.handlebtn {
  margin-top: 700rpx;
  font-size: 24rpx;
  color: #c4c7cc;
  padding: 0 30rpx;
  flex: 1;
  justify-content: space-between !important;
  .one1 {
    background: #fff;
    box-shadow: 0px 4rpx 8rpx 2rpx rgba(2, 51, 31, 0.08);
    border-radius: 16rpx;
    padding: 16rpx 48rpx;
  }
  .one2 {
    width: 48rpx;
    margin-right: 10rpx;
  }
}
</style>