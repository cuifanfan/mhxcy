<template>
  <div>
    <web-view @message="message" src="/static/html/index.html"></web-view>
  </div>
</template>
<script>
import { getCenter } from "../../common/utils/utils";
import request from "../../common/utils/request";
export default {
  data() {
    return {};
  },
  onLoad() {
    this.getAll();
  },
  methods: {
    getAll() {
      let userInfo = uni.getStorageSync("userInfo");
      request({
        url:
          "/data/iotdevice/getEachDeviceLatLonByUser?userId=" + userInfo.userId,
        method: "get",
        isAuth: false,
        data: {},
      }).then((res) => {
        let only = [];
        let draw = [];
        let iconSet = "";
        res.data.list.forEach((item, index) => {
          if (item.latitude) {
            if (item.type == "虫情设备") {
              iconSet = "icon3";
            } else if (item.type == "气象设备") {
              iconSet = "icon4";
            } else if (item.type == "摄像头") {
              iconSet = "icon2";
            }
            draw.push({
              lat: item.latitude,
              lng: item.longitude,
              icon: iconSet,
            });
            let flag = only.find((item2) => {
              return item2.type == item.type;
            });
            if (!flag) {
              only.push({
                type: item.type,
                child: [
                  {
                    longitude: item.longitude,
                    latitude: item.latitude,
                  },
                ],
              });
            } else {
              flag.child.push({
                longitude: item.longitude,
                latitude: item.latitude,
              });
            }
          }
        });
        let set = {
          center: [
            only[0]["child"][0]["latitude"],
            only[0]["child"][0]["longitude"],
          ],
          pointArr: draw,
        };
        console.log("set===", set);
        uni.setStorageSync("mapParams", JSON.stringify(set));
        setTimeout(() => {
          // #ifdef APP-PLUS
          const _funName = "msgFromUniapp",
            _data = {
              center: set.center,
              pointArr: draw,
              //olygon: points,
              showInfo: true, 
            };
          const currentWebview = this.$scope.$getAppWebview().children()[0];
          currentWebview.evalJS(`${_funName}(${JSON.stringify(_data)})`);
          // #endif
        }, 1000);
      });
    },
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