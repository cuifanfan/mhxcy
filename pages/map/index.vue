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
    let points= [
          {
            lng: 100.789761,
            lat: 22.022137,
          },
          {
            lng: 100.789833,
            lat: 22.022136,
          },
          {
            lng: 100.790838,
            lat: 22.019582,
          },
          {
            lng: 100.794509,
            lat: 22.020163,
          },
          {
            lng: 100.792928,
            lat: 22.022182,
          },
          {
            lng: 100.789761,
            lat: 22.022137,
          },
        ]
    let center = getCenter(points);
    let pointArr=[
        {
            lat: 22.0209, lng: 100.7921,icon:'icon'
        }
    ]
    setTimeout(() => {
      // #ifdef APP-PLUS
      const _funName = "msgFromUniapp",
        _data = {
          center:center,
          pointArr:pointArr,
          polygon:points
        };
      const currentWebview = this.$scope.$getAppWebview().children()[0];
      currentWebview.evalJS(`${_funName}(${JSON.stringify(_data)})`);
      console.log(88999,JSON.stringify(pointArr));
      // #endif
    }, 1000);
  },
  methods:{
      message(msg){
          console.log('msg',msg)
          if(msg.detail.data[0]['msg']=='goBack'){
              uni.navigateBack({
		            delta:1,//返回层数，2则上上页
	            })
          }
      }
  }
};
</script>