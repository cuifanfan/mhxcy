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
    getRandom(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值
    },
    getAll() {
      let userInfo = uni.getStorageSync("baseId");
      request({
        url:
          "/data/iotdevice/getEachDeviceLatLonByBase?baseId=" + userInfo,
        method: "get",
        isAuth: false,
        data: {},
      }).then((res) => {
        let only = [];
        let draw = [];
        let iconSet = "";
        let iconSet2=''
        let hadLat=[]
        //墒情设备从气象设备里面取的  这里给resdata里面还一个墒情设备
        let find=res.data.list.filter(item=>{
          return item.type=='气象设备'
        })
        find.forEach(item=>{
          res.data.list.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            type: "墒情设备",
          })
        })
        res.data.list.forEach((item, index) => {
          if (item.latitude) {
            if (item.type == "虫情设备") {
              iconSet = "icon3";
              iconSet2='kk3'
            } else if (item.type == "气象设备") {
              iconSet = "icon4";
              iconSet2='kk2'
            }else if (item.type == "墒情设备") {
              iconSet = "icon2";
              iconSet2='kk4'
            }else if (item.type == "摄像头") {
              iconSet = "icon1";
              iconSet2='kk1'
            }
            let flag1=hadLat.find(item3=>{
              return Math.abs(item3.latitude-item.latitude)<0.0005&&Math.abs(item3.latitude-item.latitude)<0.0005
            })
            if(flag1){
              let random=this.getRandom(-5,5)
              let random2=this.getRandom(-5,5)
              hadLat.push({
                latitude:item.latitude+0.0001*random,
                longitude:item.longitude+0.0001*random2
              })
              draw.push({
                lat: item.latitude+0.0001*random2,
                lng: item.longitude+0.0001*random,
                icon: iconSet,
                id:item.id,
                type:item.type,
                videoInfo:item.videodata?item.videodata:null
              });
            }else{
              hadLat.push({
                latitude:item.latitude,
                longitude:item.longitude
              })
              draw.push({
                lat: item.latitude,
                lng: item.longitude,
                icon: iconSet,
                id:item.id,
                type:item.type,
                videoInfo:item.videodata?item.videodata:null
              });
            }

            //如果两个点离得太近 做偏移
            
           
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
                total:1,
                icon:iconSet2
              });
            } else {
              flag.child.push({
                longitude: item.longitude,
                latitude: item.latitude,
              });
              flag.total+=1
            }
          }
        });
        console.log(only)
        let set = {
          center: [
            only[0]["child"][0]["longitude"],
            only[0]["child"][0]["latitude"]
          ],
          pointArr: draw,
        };
        uni.setStorageSync("mapParams", JSON.stringify(set));
        setTimeout(() => {
          // #ifdef APP-PLUS
          const _funName = "msgFromUniapp"
          console.log('beforessss',draw)
         
          let   sendObj = {
              center: set.center,
              pointArr: draw,
              //olygon: points,
              showInfo: true, 
              bottom:only,
              
            };
          const currentWebview = this.$scope.$getAppWebview().children()[0];
          currentWebview.evalJS(`${_funName}(${JSON.stringify(sendObj)})`);
          // #endif
        }, 1000);
      });
    },
    message(msg) {
      if (msg.detail.data[0]["msg"] == "goBack") {
        uni.navigateBack({
          delta: 1, //返回层数，2则上上页
        });
      }
      if (msg.detail.data[0]["msg"] == "clickIcon") {
        let type=''
        let getType=msg.detail.data[0]["type"] 
        let getVideoInfo=msg.detail.data[0]["videoInfo"] 
        console.log('摄像头传来的值',JSON.stringify(msg.detail.data))

        if(getType=='摄像头'){
          if(!getVideoInfo.url){
            uni.showToast({
              title: "当前设备离线",
              icon: "none",
              duration: 1000,
            });
          }else{
             uni.navigateTo({
                url:
                  "/pages/four2/camera/index?videourl=" +
                  getVideoInfo.url +
                  "&name=" +
                  getVideoInfo.deviceName +
                  "&token=" +
                  getVideoInfo.accessToken+"&deviceSerial="+getVideoInfo.deviceSerial,
                });
            } 
        }else{
          if(getType=='气象设备'){
            uni.navigateTo({
              url:'/pages/four2/detail/index?type=2&id='+msg.detail.data[0]["val"]
            })
          }
          if(getType=='墒情设备'){
            uni.navigateTo({
              url:'/pages/four2/detail/index?type=3&id='+msg.detail.data[0]["val"]
            })
          }
          if(getType=='虫情设备'){
            uni.navigateTo({
              url:'/pages/four2/site/index?id='+msg.detail.data[0]["val"]+'&type=1'
            })
          }
        }
        
      }
      


    },
  },
};
</script>