<template>
  <div class="wrap">
    <header-diy
      class="topbar"
      :addIcon="2"
      :type="2"
      :titleName="pageName"
    ></header-diy>
    <div class="content">
      <div>
        <div class="manger">
          <div class="child" v-if="item.deptId==1" v-for="(item,index) in list" :key="index">
            <div class="childwrap flexcenter childwrap4">
              
              <div class="childwrap flexcenter">
                <div class="big">
                {{(item.name).substring(0,1)}}
                </div>
                
                <div class="c1">
                  <div class="c2">{{item.name}}</div>
                  <div class="c3">电话：{{item.phone}}</div>
                  <div class="c3">角色：{{item.roleList[0]['roleName']}}</div>
                </div>
              </div>
              

              <div @click="deleteOne(index)">
                <u-icon name="trash" color="#626466" size="18"></u-icon>
              </div>
            </div>

            <!-- <u-icon
              @click="goNews"
              color="#939599"
              size="20"
              name="arrow-right"
            ></u-icon> -->
          </div>
         
        </div>
      </div>
    </div>
    <div>
      <div v-if="addpopup" class="popup_content">
        <div class="closeadd" @click="addpopup=false">
          <u-icon
              color="#939599"
              size="20"
              name="close"
            ></u-icon>
        </div>
        <div class="popup_title">添加用户</div>
        <div class="popup_textarea_item">
          <div class="itemadd">
            <div class="label">姓名:</div>
            <u--input
              v-model="userName"
              placeholder="请输入姓名"
              border="bottom"
              clearable
            ></u--input>
          </div>
          <div class="itemadd">
            <div class="label">电话:</div>
            <u--input
              placeholder="请输入电话"
              border="bottom"
              clearable
              v-model="phone"
              type="number"
            ></u--input>
          </div>
          <div class="itemadd">
            <div class="label">角色:</div>
            <u-radio-group
              v-model="radiovalue1"
              placement="row"
              iconPlacement="left"
            >
              <u-radio
                :customStyle="{ marginBottom: '8px' }"
                v-for="(item, index) in radiolist1"
                :key="index"
                :label="item.name"
                :name="item.name"
                @change="radioChange"
              >
              </u-radio>
            </u-radio-group>
          </div>

          <div @click="submitFeedback()" class="buttons">
            <text class="popup_button">确定</text>
          </div>
        </div>
      </div>
      <div class="popup_overlay" v-if="addpopup" @click="hideDiv()"></div>
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
      userName:'',
      phone:'',
      radiolist1: [
        {
          name: "普通用户",
          disabled: false,
        },
        {
          name: "管理员",
          disabled: false,
        },
      ],

      radiovalue1: "普通用户",
      addpopup: false,
      tab: [
        "茶园天气",
        "长势监测",
        "农事记录",
        "物联设备",
        "投入产出",
        "其他信息",
      ],
      activeTab: 0,
      list: [
        
       
      ],
      activeone: 4,
      active: false,
      showType: false,
      showType2: false,
      pageName: "人员管理",
      numValue: "",
      nameValue: "",
      typeValue: "",
    };
  },
  onLoad() {
    uni.$on("addOneFriend", (e) => {
      this.addpopup=true
    });
    this.askList()
   
  },
  onBackPress() {
    uni.$off("addOneFriend");
  },
  onUnload() {
    uni.$off("addOneFriend");
  },
  methods: {
    typeSelect() {},
    
    askList(){
       request({
        url: "/admin/user/page",
        method: 'get',
        isAuth: false,
        data:{
          
        },
      }).then((res) => {
        this.list=res.data.records
      })
    },
    radioChange(){

    },
    hideDiv() {
      this.addpopup = false;
    },
    submitFeedback() {
      console.log(this.radiovalue1)
      var regExp = new RegExp("^1[3578]\\d{9}$");
      if (this.userName=='') {
        uni.showToast({
          title: "请输入用户名",
          icon: "none",
          duration: 850,
        });
        return;
      }
      if (this.phone=='') {
        uni.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 850,
        });
        return;
      }
      if (!regExp.test(this.phone)) {
        uni.showToast({
          title: "请输入正确的手机号",
          icon: "none",
          duration: 850,
        });
        return;
      }
      let role=this.radiovalue1=='普通用户'?1539868238363492354:1536166867701334017
       request({
        url: "/admin/user",
        method: 'post',
        isAuth: false,
        data:{
          createTime: "",
          deptId: "1",
          email: "",
          lockFlag: "0",
          name: this.userName,
          nickname: this.userName,
          password: "123456",
          phone: this.phone,
          role: ["1539868238363492354"],
         
          username: this.userName,
        },
      }).then((res) => {
        this.phone=''
        this.userName=''
        this.addpopup = false;
        this.setUserBind(res.data.userId)
        this.askList()
      })
      
    },
    deleteOne(index){
      let that=this
      uni.showModal({
        title: '提示',
        content: '确认删除此人员吗？',
        cancelText: "取消", // 取消按钮的文字  
        confirmText: "确认", // 确认按钮文字 
        confirmColor:'#F54E40',//确认字体的颜色
        cancelColor:'#000',//取消字体的颜色
        success: function (res) {
          if (res.confirm) {
            that.deleteSure(index)
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    deleteSure(index){
      request({
        url: "/admin/user/"+this.list[index]['userId'],
        method: 'delete',
        isAuth: false,
        data:{
          
        },
      }).then((res) => {
        this.list.splice(index,1)
        uni.showToast({
          title:'删除成功',
          icon:'none'
        })
      })
    },
    setUserBind(userId){
       request({
        url: "/data/userbase",
        method: 'post',
        isAuth: false,
        data:{
          "baseId": uni.getStorageSync('baseId'),
          "userId": userId
        },
      }).then((res) => {

      })
    }
  },
};
</script>
<style lang="scss" scoped>
.childwrap4{
  display: flex;
  justify-content: space-between;
  flex: 1;
}
.big{
  font-size: 40rpx;
  font-weight: bold;
  color: #29CC96;
  width: 100rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 300px;
  background: rgba(216, 213, 213, 0.972);
  margin-right: 20rpx;
}
.u-radio-label--left{
  margin-bottom: 0!important;
  margin-left: 20rpx;
}
.popup_overlay {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=88);
}
.itemadd {
  display: flex;
  align-items: center;
  height: 100rpx;

  .label {
    color: #626466;
    margin-right: 10rpx;
  }
}
.popup_content {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 480rpx;
  height: 540rpx;
  margin-left: -270rpx;
  margin-top: -270rpx;
  border: 10px solid white;
  background-color: white;
  z-index: 1002;
  overflow: auto;
  .closeadd{
    position: absolute;
    right: 0rpx;
    top: 0rpx;
  }
}

.popup_title {
  width: 480rpx;
  text-align: center;
  font-size: 32rpx;
  margin-top: 20rpx;
}

.popup_textarea_item {
  padding-top: 5rpx;
  height: 50rpx;
  width: 440rpx;
  margin-top: 20rpx;
  margin-left: 20rpx;
  padding-top: 25rpx;
}

.popup_textarea {
  width: 410rpx;
  font-size: 26rpx;
  margin-left: 20rpx;
}

.popup_button {
  color: #fff;
  margin: 20rpx;
}
.buttons {
  text-align: center;
  font-size: 32rpx;
  padding: 15rpx 0;
  margin-top: 40rpx;
  background-color: #29cc96;
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