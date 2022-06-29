<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="index1">
        <div class="top">
          <div class="t1">
            <div class="btn1" @click="addpopup=true">
              <u-button iconColor="#626466" size="small" icon="plus"></u-button>
            </div>
            <div>
              <u-button color="#29CC96" size="small" text="编辑"></u-button>
            </div>
          </div>
        </div>
        <div class="listwrap">
          <div class="l1">
            <span>化肥</span>
            <div class="l3">
              <div class="l">硫酸钾</div>
              <div class="l">硫酸钾</div>
              <div class="l">硫酸钾</div>
            </div>
          </div>
          <div class="l1">
            <span>化肥</span>
            <div class="l3">
              <div class="l">硫酸钾</div>
              <div class="l">硫酸钾</div>
              <div class="l">硫酸钾</div>
            </div>
          </div>
        </div>
      </div>
      <div @click="submieSure" class="btnsumit btn3">确认提交</div>
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
        <div class="popup_title">新建</div>
        <div class="popup_textarea_item">
          <div class="itemadd itemadd3" @click="showType=true">
            <u--input
              v-model="addType"
              placeholder="请选择类型"
              border="bottom"
              clearable
              disabled
              disabledColor="#fff"
            ></u--input>
            <div class="icon">
               <u-icon
                color="#939599"
                size="20"
                name="arrow-down"
              ></u-icon>
              </div>
            
          </div>
          <div class="itemadd">
            <u--input
              placeholder="请输入名称"
              border="bottom"
              clearable
              v-model="addName"
              
            ></u--input>
          </div>
          

          <div @click="submitFeedback()" class="buttons">
            <text class="popup_button">确定</text>
          </div>
        </div>
      </div>
      <div class="popup_overlay" v-if="addpopup" @click="hideDiv()"></div>
    </div>
     <u-action-sheet
      :show="showType"
      :actions="typeList"
      title="请选择操作种类"
      @close="showType = false"
      @select="typeSelect"
    >
    </u-action-sheet>
  </div>
</template>
<script>
import headerDiy from "../../component/header/header.vue";
import request from "../../../common/utils/request";
import { duration } from 'moment';
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      addName:'',
      addType:'',
      showType:false,
      typeList:[
        {
          name:'化肥',
          val:1
        },
        {
          name:'农药',
          val:2
        },
        {
          name:'其他',
          val:3
        }
      ],
      pageName: "投入品管理",
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
    };
  },
  methods: {
    typeSelect(val){
      console.log(val)
      this.addType=val.name
    },
    hideDiv() {
      this.addpopup = false;
    },
    submitFeedback() {
       if (this.addType=='') {
        uni.showToast({
          title: "请选择类型",
          icon: "none",
          duration: 850,
        });
        return;
      }
     
      if (this.addName=='') {
        uni.showToast({
          title: "请输入名称",
          icon: "none",
          duration: 850,
        });
        return;
      }
      request({
        url: "/data/farminputs",
        method: 'post',
        isAuth: false,
        data:{
          "inputsName": this.addType,
          "inputsType": this.addName
        },
      }).then((res) => {
        uni.showToast({
          icon:'none',
          title:'添加成功',
          duration:850
        })
        this.addpopup=false  
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.btn3{
  margin-top: 40rpx;
}
.itemadd3{
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: 30rpx;
  .icon{
    position: absolute;
    right: 10rpx;
  }
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
.content {
  margin: 32rpx;
}

.popup_content {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 480rpx;
  height:450rpx;
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


.index1 {
  background: #ffffff;
  padding: 20rpx 32rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
}
.top {
  display: flex;
  justify-content: flex-end;
  .t1 {
    color: #626466;
    font-size: 24rpx;
    display: flex;
    align-items: center;
  }
  .t2 {
    width: 100rpx;
    height: 60rpx;
    border: 1px solid #626466;
    border-radius: 10rpx;
  }
  .btn1 {
    margin-right: 20rpx;
  }
}
.listwrap {
  margin-top: 40rpx;
  .l3{
    padding: 30rpx;
    .l{
      border: 1px solid #e7e3e3;
      border-radius: 10rpx;
      padding: 30rpx;
      margin: 10rpx;
    }
    
  }
}
</style>
