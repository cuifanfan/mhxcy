<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="index1">
        <div class="edit">
          <div class="formchild"  @click="showType = true">
            <div class="name name2">选择专家:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="请选择要咨询的专家"
                  placeholder-class="palceholderclass"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
            </div>
           
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name">添加照片:(最多三张)</div>
            <div class="editpic">
              <div
                class="picpic"
                v-for="(item, index) in resultPic"
                :key="index"
              >
                <image class="handlepic" :src="baseUrl + item" alt="" />
                <div class="icon" @click="deleteOne(index)">
                  <u-icon color="#fff" size="14" name="close"></u-icon>
                </div>
              </div>
              <div class="handle" v-if="resultPic.length<3">
                <image
                  mode="widthFix"
                  class="iconpic"
                  src="@/static/image/edit.png"
                  @click="onGetImgClick"
                />
              </div>
            </div>
          </div>
        </div>
         <div class="edit">
          <div class="formchild">
            <div class="name name2">问题描述:</div>
            <div class="input input2">
               <textarea v-model="question" placeholder="请输入想咨询的相关问题" placeholder-class="palceholderclass" class="textarea"></textarea>
            </div>
           
          </div>
        </div>
      </div>
    </div>
    <div class="btnask" @click="submit">
      确认提交
    </div>
    <u-action-sheet
      :show="showType"
      :actions="typeList"
      title="请选择专家"
      @close="showType = false"
      @select="typeSelect"
    >
    </u-action-sheet>
  </div>
</template>
<script>
import headerDiy from "../../component/header/header.vue";
import { BASE_URL } from "../../../common/utils/config";
import request from "../../../common/utils/request";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      question:'',
      resultPic: [],
      baseUrl:BASE_URL,
      pageName: "拍照问诊",
      numValue: "",
      nameValue: "",
      typeValue: "",
      typeList: [
       
      ],
      showType:false,
      sendExport:'',
    };
  },
  onLoad(){
    this.getUserOptions()
  },
  methods: {
    typeSelect(e) {
      console.log(e)
      this.typeValue=e.name
      this.sendExport=e.value
    },
    getUserOptions(){
      request({
        url: "/admin/user/getUserOptions?deptId=2",
        method: 'get',
        isAuth: false,
        data:{}
      }).then((res) => {
        res.data.forEach(item=>{
          this.typeList.push({
            name:item.label,
            value:item.value
          })
        })
      })
    },
    submit(){
      if(this.typeValue==''){
        uni.showToast({
            title: "请选择专家",
            icon: "none",
            duration: 850,
          });
          return;
      }
      if(this.question==''){
        uni.showToast({
            title: "请输入问题描述",
            icon: "none",
            duration: 850,
          });
          return;
      }
      let userInfo=uni.getStorageSync('userInfo')
      let data={
        "content": this.question,
        "userId":userInfo.userId,
        "userName": userInfo.userName
      }
      if(this.resultPic.length>0){
        data.imageUrls=this.resultPic.join(',') 
      }
      request({
        url: "/data/expertservice",
        method: 'post',
        isAuth: false,
        data:data
      }).then((res) => {
          uni.showToast({
            title:'提交成功',
            icon:'none',
            duration:850
			    });
          setTimeout(() => {
            uni.navigateTo({
              url: "/pages/expert/index",
            });  
          }, 1000);
      })
      
    },
    deleteOne(index) {
      this.resultPic.splice(index, 1);
    },
    toJSON(){
      return this
    },
    onGetImgClick: function () {
      let that=this
      uni.chooseImage({
        count:3,
        sizeType: ["compressed"], //original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
        success: (res) => {
          //this.imageList = res.tempFilePaths[0];
          console.log("res", res);
         // console.log(this);
          res.tempFilePaths.forEach((item, index) => {
            console.log('itemfile',item)
            uni.uploadFile({
              url: `http://121.36.247.77:9999/admin/sys-file/upload`, 
              name: "file",
              header: {
                Authorization: "Bearer " + uni.getStorageSync("token"),
              },
              filePath: item,
              success: (res) => {
                let dataget = JSON.parse(res.data);
                console.log("上传！！", dataget);
                that.resultPic.push(dataget.data.url);
                
              },
              
            });
          });
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.handle {
      background: #fafafa;
      border-radius: 16rpx;
      border-radius: 16rpx;
      padding: 0 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 132rpx;
}
.handlepic {
      width: 160rpx;
      height: 132rpx;
      margin-right: 20rpx;
}
.palceholderclass{
  color: rgba(147,149,153,0.3)!important;
  font-size: 28rpx;
}
.btnask{
  position: fixed;
  color: #fff;
  background: #29CC96;
  border-radius: 100px;
  bottom: 30rpx;
  width: 90%;
  left: 5%;
  font-size: 32rpx;
  text-align: center;
  padding: 12rpx;
  box-sizing: border-box;
}
.name2{
  color: #939599!important;
  font-weight: normal!important;
}
.disablewrap {
    display: flex;
    padding: 12rpx 18rpx;
    justify-content: space-between;
    width: 100%;
    border-radius: 12rpx;
    background: #FAFAFA;
  }
.input2 {
    display: flex;
  }
.edit {
  font-size: 28rpx;
  color: #939599;
  .textarea{
    background: #fafafa!important;
    border-radius: 16rpx;
    height: 200rpx;
    width: 100%;
    margin-top: 20rpx;
    color: #000;
    padding: 16rpx;
  }
  .name{
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
  margin-top: 30rpx;
  display: flex;
  justify-content: space-between;
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
    border-left: 2px solid #29cc96;
    padding-left: 15rpx;
    font-size: 28rpx;
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
    padding-bottom: 20rpx;
    border-bottom: 1px solid#F5F5F5;
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
  border-top: 1px solid#F1F1F1;
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