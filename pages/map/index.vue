<template>
  <div>
    <web-view @message="message" src="/static/html/index.html"></web-view>
  </div>
</template>
<script>
import { getCenter } from "../../common/utils/utils";
export default {
  data() {
    return {};
  },
  onLoad() {
    //生成init 中心点 和 点数组
    let get = uni.getStorageSync("mapParams");
    if (get) {
      let get2=JSON.parse(get)
      console.log('拿到地图参数',get2)
      setTimeout(() => {
        // #ifdef APP-PLUS
        const _funName = "msgFromUniapp",
          _data = {
            center: get2.center,
            pointArr: get2.pointArr,
            //polygon: points,
          };
        const currentWebview = this.$scope.$getAppWebview().children()[0];
        currentWebview.evalJS(`${_funName}(${JSON.stringify(_data)})`);
        
        // #endif
      }, 1000);
    }
  },
  methods: {
    message(msg) {
      console.log("msg", msg);
      if (msg.detail.data[0]["msg"] == "goBack") {
        uni.navigateBack({
          delta: 1, //返回层数，2则上上页
        });
      }
    },
  },
};
</script>