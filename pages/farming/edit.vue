<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="wrapcommon form">
        <div class="edit">
          <div class="formchild">
            <div class="name">选择茶园:</div>
            <div class="input input2">
              <div class="disablewrap" @click="showTypeTea = true">
                <u--input
                  v-model="teaName"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="请选择茶园"
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
            <div class="name">操作时间:</div>
            <div class="input2">
              <div class="disablewrap disablewrap3" @click="show = true">
                <u--input
                  v-model="date"
                  disabled
                  disabledColor="#fafafa"
                  :placeholder="date"
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
            <div class="name">操作内容:</div>
            <div class="input input2">
              <div class="disablewrap" @click="showType = true">
                <u--input
                  v-model="handleContent"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="请选择操作种类"
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
            <div v-if="handleContent" class="tipedit wrapcommon wrapcommonbg">
                <div class="addone"></div>
                <div class="childedit">{{contentAddText}}</div>
                 <image
                  mode="widthFix"
                  class="iconpic newhandleicon"
                  src="@/static/image/edit.png"
                  @click="addOne"
                />
            </div>
            
          </div>
          <div class="editmore">
              <div class="morechild" v-for="(item,index) in contentAdd" :key="index">
                  <u--input
                  v-model="item.name"
                  placeholder="请输入操作项"
                  :disabled="onlyLeafFlag"
                  border="surround"
                ></u--input>
                <span class="one">-</span>
                <u--input
                  v-model="item.val"
                  placeholder="请输入操作量"
                  type="number"
                  border="surround"
                ></u--input>
                <span class="two">KG</span>
                 <u-icon
                  slot="right"
                  color="#C4C7CC"
                  size="20"
                  name="close-circle"
                  @click="contentAdd.splice(index,1)"
                ></u-icon>
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
              <div class="handle">
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
            <div class="name">备注:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--textarea
                  border="none"
                  v-model="remark"
                  placeholder="请输入备注内容"
                ></u--textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div @click="submieSure" class="btnsumit">确认提交</div>
    </div>
    <u-calendar
      :closeOnClickOverlay="true"
      @close="show = false"
      :show="show"
      :mode="mode"
      @confirm="confirm"
    ></u-calendar>
    <u-action-sheet
      :show="showType"
      :actions="typeList"
      title="请选择操作种类"
      @close="showType = false"
      @select="typeSelect"
    >
    </u-action-sheet>
    <u-action-sheet
      :show="showTypeTea"
      :actions="teaList"
      title="请选择茶园"
      @close="showTypeTea = false"
      @select="typeSelectTea"
    >
    </u-action-sheet>
  </div>
</template>
<script>
import headerDiy from "../component/header/header.vue";
import { getNowDate } from "../../common/utils/utils";
import request from "../../common/utils/request";
import moment from "moment";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      contentAddTextSend:'',
      contentAdd:[],
      remark: "",
      teaName: "",
      teaId: "",
      handleContent: "",
      teaList: [],
      showTypeTea: false,
      resultPic: [],
      baseUrl: "http://121.36.247.77:9999",
      mode: "single",
      show: false,
      date: "",
      showType: false,
      active: true,
      showType: false,
      showType2: false,
      pageName: "记录/编辑农事",
      numValue: "",
      typeList: [
        {
          name: "除草",
        },
        {
          name: "深耕",
        },
        {
          name: "病虫防治",
        },
        {
          name: "施肥",
        },
        {
          name: "灌溉",
        },
        {
          name: "修枝",
        },
        {
          name: "采摘",
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
      teaType:'',
      nameValue: "",
      typeValue: "",
      onlyLeafFlag:false,
    };
  },
  onLoad() {
    let now = getNowDate();
    this.date = now.split(" ")[0];
    this.askTea();
  },
  computed:{
    contentAddText(){
      let returnVal=''
      this.contentAdd.forEach((item,index)=>{
        if(item.name&&item.val){
          returnVal+= item.name+':'+item.val+' KG'+'  '
        }
      })
      return returnVal
    }
  },
  onShow(){
    this.contentAdd=[]
    this.contentAddTextSend=''
    this.teaId=''
    this.teaName=''
    this.remark=''
    this.handleContent=''
    this.teaType=''
    this.resultPic=[]
  },
  methods: {
    addOne(){
      console.log(this.handleContent)
      let name=this.handleContent=='采摘'?'鲜叶':''
      this.contentAdd.push({
        name:name,
        val:''
      })
    },
    submieSure() {
      this.contentAdd.forEach((item,index)=>{
        if(item.name&&item.val){
          if(index==this.contentAdd.length-1){
            this.contentAddTextSend+=item.name+':'+item.val
          }else{
            this.contentAddTextSend+=item.name+':'+item.val+','
          }
        }
      })
      if (this.teaId == "") {
        uni.showToast({
          title: "请选择茶园",
          icon: "none",
          duration: 850,
        });
        return;
      }
      if (this.handleContent == "") {
        uni.showToast({
          title: "请选择操作内容",
          icon: "none",
          duration: 850,
        });
        return;
      }
      if (this.contentAddTextSend=='') {
        uni.showToast({
          title: "请输入操作内容",
          icon: "none",
          duration: 850,
        });
        return;
      }
      let picUrl = this.resultPic.join(",");
      request({
        url: "/data/farmrecords",
        method: "post",
        isAuth: false,
        data: {
          comment: this.remark,
          content: this.handleContent,
          fertilizerDose: this.contentAddTextSend,
          gardenId: this.teaId,
          imageUrls: this.resultPic.join(","),
          time: this.date + " 12:20:00",
          gardenName: this.teaName,
          species:this.teaType
        },
      }).then((res) => {
        if (res.code == 200) {
          uni.navigateTo({
            url: "/pages/farming/index",
          });
          uni.setStorageSync("farmingTabindex", 1);
          this.remark = "";
          this.handleContent = "";
          this.date = moment().format("YYYY-MM-DD");
          this.teaId = "";
          this.resultPic = [];
          this.teaType=''
          this.teaName = "";
        }
      });
    },
    askTea() {
      let userInfo = uni.getStorageSync("userInfo");
      if (!userInfo) {
        return;
      }
      request({
        url: "/data/teagarden/getGardenOptionsByUser?userId=" + userInfo.userId,
        method: "get",
        isAuth: false,
        data: {},
      }).then((res) => {
        console.log("xxxx", res);
        res.data.forEach((item, index) => {
          this.teaList.push({
            name: item.label,
            id: item.value,
          });
        });
      });
    },
    typeSelect(val) {
      console.log(val);
      if(val.name=='采摘'){
        this.onlyLeafFlag=true
        this.contentAdd.forEach(item=>{
          item.name='鲜叶'
        })
      }else{
        this.onlyLeafFlag=false
      }
      this.handleContent = val.name;
    },
    typeSelectTea(val) {
      console.log(val);
      this.teaName = val.name;
      this.teaId = val.id;
      this.teaType=val.species
    },
    confirm(e) {
      this.show = false;
      this.date = e[0];
    },
    deleteOne(index) {
      this.resultPic.splice(index, 1);
    },
    onGetImgClick: function () {
      uni.chooseImage({
        sizeType: ["compressed"], //original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
        success: (res) => {
          //this.imageList = res.tempFilePaths[0];
          console.log("res", res);
          console.log(this);
          res.tempFiles.forEach((item, index) => {
            uni.uploadFile({
              url: `http://121.36.247.77:9999/admin/sys-file/upload`, //接口

              //filePath: res.tempFilePaths[0],

              // formData: {
              //   name: 'token',
              //   token: window.uni.getStorageSync("accessToken")
              // },
              name: "file",
              header: {
                Authorization: "Bearer " + uni.getStorageSync("token"),
              },
              file: item,
              success: (res) => {
                let dataget = JSON.parse(res.data);
                console.log("上传！！", dataget);
                this.resultPic.push(dataget.data.url);
                console.log(this.resultPic);
                // this.objList = JSON.parse(res.data);
                // if (this.objList.code == 200) {
                //   this.newtime = this.objList.time;
                //   this.resData = this.objList.data;
                //   console.log(this.objList, this.newtime, this.resData, "6666");
                //   console.log(this);
                // }
              },
            });
          });
        },
      });
    },
  },
};
</script>
<style lang="scss">
.morechild{
  display: flex;
  margin: 10rpx 0;
  align-items: center;
  .one{
    margin: 0 20rpx;
  }
  .two{
    margin-left: 20rpx;
    margin-right: 30rpx;
  }
  .u-input{
    background: #fafafa !important;
  }
}
</style>
<style lang="scss" scoped>
.u-textarea {
  background: #fafafa !important;
}

.newhandleicon{
  width:50rpx;
  position: absolute;
  top: 10rpx;
  right: 20rpx;
 
}
.tipedit{
  position: relative;
}
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
.content {
  margin: 32rpx;
  .btnsumit {
    margin-top: 40rpx;
  }
  .butsumbit {
    margin-top: 80rpx;
  }
  .editpic {
    display: flex;
    flex-wrap: wrap;
   
    .iconpic {
      width: 48rpx;
    }
    .picpic {
      position: relative;
      .icon {
        position: absolute;
        top: 0rpx;
        right: 24rpx;
        background: #c4c4c4;
        border-radius: 100rpx;
        overflow: hidden;
        padding: 5rpx;
      }
    }
    
  }
  .wrapcommonbg {
    margin-top: 20rpx;
    color: #626466;
    font-size: 28rpx;
    font-weight: bold;
    background: #fafafa !important;
    .childedit {
      margin-bottom: 10rpx;
      padding-right: 50rpx;
    }
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
  .disablewrap2 {
    margin: 0 20rpx;
  }
  .disablewrap3 {
    background: #fafafa !important;
    border: none;
    border-radius: 8px;
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
  }
}
.edit {
  .form {
    display: flex;
    justify-content: space-between;
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