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
            <div class="name">人力:</div>
            <div class="input2">
              <div class="disablewrap disablewrap3">
                <u--input
                  v-model="humanUse"
                  disabledColor="#fafafa"
                  placeholder="请输入人力投入"
                  border="none"
                  type="number"
                  @blur="inputHuman"
                ></u--input>
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
              <div class="childedit">{{ contentAddText }}</div>
              <div class="iconpic newhandleicon">
                <u-icon
                  @click="addOne"
                  slot="right"
                  color="#C4C7CC"
                  size="24"
                  name="plus-circle"
                ></u-icon>
              </div>
            </div>
          </div>
          <div class="editmore">
            <div
              class="morechild"
              v-for="(item, index) in contentAdd"
              :key="index"
            >
              <div @click="openChoose(index)" style="width: 250rpx">
                <u--input
                  v-model="item.name"
                  placeholder="请选择投入品"
                  :disabled="true"
                  border="surround"
                ></u--input>
              </div>

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
                @click="contentAdd.splice(index, 1)"
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
              <div class="handle" v-if="resultPic.length < 3">
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
                  confirmType="done"
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
      monthNum="13"
      :minDate="minDate"
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
    <u-action-sheet
      :show="openChooseFlag"
      :actions="chooseList"
      title="请选择投入品"
      @close="openChooseFlag = false"
      @select="typeSelectChoose"
    >
    </u-action-sheet>
    <u-cell-group>
      <u-picker
        :show="show3"
        :columns="columns3"
        ref="uPicker3"
        @cancel="cancelMore"
        @confirm="confirmMore"
        @close="show3=false"
        :closeOnClickOverlay="true"
        @change="changeHandler1"
      ></u-picker>
    </u-cell-group>
  </div>
</template>
<script>
import headerDiy from "../component/header/header.vue";
import { getNowDate } from "../../common/utils/utils";
import request from "../../common/utils/request";
import moment from "moment";
import { BASE_URL } from "../../common/utils/config";
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      show3:false,
      columns3: [
       
      
      ],
      columnData: [
        
       
      ],
      
      chooseActiveIndex: null,
      chooseList: [],
      openChooseFlag: false,
      minDate: moment().add(-1, "y").format("YYYY-MM-DD"),
      contentAddTextSend: "",
      contentAdd: [],
      remark: "",
      humanUse: "",
      teaName: "",
      teaId: "",
      handleContent: "",
      teaList: [],
      showTypeTea: false,
      resultPic: [],
      baseUrl: BASE_URL,
      mode: "single",
      show: false,
      date: "",
      showType: false,
      active: true,
      showType: false,
      showType2: false,
      pageName: "",
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
      teaType: "",
      nameValue: "",
      typeValue: "",
      onlyLeafFlag: false,
      editFlag: false,
      agoFarm: null,
      chooseListGet: [],
    };
  },
  onLoad(option) {
    this.editFlag = option.edit ? true : false;
    if (this.editFlag) {
      this.agoFarm = JSON.parse(uni.getStorageSync("editFarm"));
      console.log(this.agoFarm);
      this.teaName = this.agoFarm.gardenName;
      this.date = this.agoFarm.time.split(" ")[0];
      this.handleContent = this.agoFarm.content;
      this.humanUse = this.agoFarm.humanUse;
      if (this.agoFarm.fertilizerDose) {
        let get = this.agoFarm.fertilizerDose.split(",");
        get.forEach((item) => {
          this.contentAdd.push({
            name: item.split(":")[0],
            val: item.split(":")[1],
          });
        });
      }
      if (this.agoFarm.imageUrls) {
        this.resultPic = this.agoFarm.imageUrls.split(",");
      }
      this.remark = this.agoFarm.comment;
    } else {
      let now = getNowDate();
      this.date = now.split(" ")[0];
    }
    this.askTea();
    this.farminputs();
    this.pageName = option.edit ? "编辑农事" : "记录农事";
  },
  computed: {
    contentAddText() {
      let returnVal = "";
      this.contentAdd.forEach((item, index) => {
        if (item.name && item.val) {
          returnVal += item.name + ":" + item.val + " KG" + "  ";
        }
      });
      return returnVal;
    },
  },
  methods: {
    confirmMore(val){
      this.show3=false
      this.contentAdd[this.chooseActiveIndex]["name"] = val.value[1]
    },
    cancelMore(){
      this.show3=false
    },
    changeHandler1(e) {
      const {
        columnIndex,
        value,
        values,
        index,
        indexs,
        picker = this.$refs.uPicker3,
      } = e;
      if (columnIndex === 0) {
        console.log(indexs[0]);
        picker.setColumnValues(1, this.columnData[indexs[0]]);
      }
    },
    typeSelectChoose(val) {
      console.log(val);
      this.contentAdd[this.chooseActiveIndex]["name"] = val.inputsType;
    },
    farminputs() {
      request({
        url: "/data/farminputs/page",
        method: "get",
        isAuth: false,
        data: {},
      }).then((res) => {
        let only = [];
        res.data.records.forEach((item) => {
          let flag = only.find((item2) => {
            return item2.name == item.inputsName;
          });
          if (!flag) {
            only.push({
              name: item.inputsName,
              child: [item],
            });
          } else {
            flag.child.push(item);
          }
        });
        this.chooseListGet = only;
      let add=[]
      let add2=[]
      only.forEach((item,index)=>{
        add.push(item.name)
        let add3=[]
        item.child.forEach(item2=>{
          add3.push(item2.inputsType)
          if(index==0){
            
            add2.push(item2.inputsType)
            
          }
        })
        this.$set(this.columnData,index,add3)
        
      })
      this.$set(this.columns3,1,add2)
      this.$set(this.columns3,0,add)
      console.log(this.columns3)
      console.log(this.columnData)
      console.log(only);
      });
    },
    openChoose(index) {
      this.chooseActiveIndex = index;
      if (this.handleContent == "灌溉"||this.handleContent=='采摘') {
        return;
      }
      if (this.handleContent == "施肥") {
        let find = this.chooseListGet.find((item) => {
          return item.name == "化肥";
        });
        if (find) {
          find.child.forEach((item) => {
            this.$set(item, "name", item.inputsType);
          });
          this.chooseList = find.child;
        } else {
          uni.showToast({
            icon: "none",
            title: "暂无化肥投入品 请先去新增",
          });
          return;
        }
      }else{
        this.show3=true
        return 
      }
      this.openChooseFlag = true;
    },
    inputHuman() {
      if (this.humanUse % 0.5 != 0) {
        uni.showToast({
          title: "请输入0.5的倍数",
          icon: "none",
          duration: 850,
        });
        this.humanUse = "";
      }
    },
    addOne() {
      console.log(this.handleContent);
      let name = "";
      if (this.handleContent == "采摘") {
        name = "鲜叶";
      } else if (this.handleContent == "灌溉") {
        name = "水";
      } else {
        name = "";
      }
      this.contentAdd.push({
        name: name,
        val: "",
      });
    },
    submieSure() {
      this.contentAdd.forEach((item, index) => {
        if (item.name && item.val) {
          if (index == this.contentAdd.length - 1) {
            this.contentAddTextSend += item.name + ":" + item.val;
          } else {
            this.contentAddTextSend += item.name + ":" + item.val + ",";
          }
        }
      });
      if (this.teaName == "") {
        uni.showToast({
          title: "请选择茶园",
          icon: "none",
          duration: 850,
        });
        return;
      }
      if (this.humanUse == "") {
        uni.showToast({
          title: "请输入人力",
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
      if (this.contentAddTextSend == "") {
        uni.showToast({
          title: "请输入操作内容",
          icon: "none",
          duration: 850,
        });
        return;
      }
      let picUrl = this.resultPic.join(",");
      let requestType = this.editFlag ? "put" : "post";
      let sendData = {
        comment: this.remark,
        content: this.handleContent,
        fertilizerDose: this.contentAddTextSend,
        gardenId: this.teaId,
        imageUrls: this.resultPic.join(","),
        time: this.date + " 12:20:00",
        gardenName: this.teaName,
        species: this.teaType,
        humanUse: this.humanUse,
      };
      if (this.editFlag) {
        sendData.id = this.agoFarm.id;
      }
      request({
        url: "/data/farmrecords",
        method: requestType,
        isAuth: false,
        data: sendData,
      }).then((res) => {
        if (res.code == 200) {
          let tiptext = this.editFlag ? "编辑" : "新增";
          uni.showToast({
            title: tiptext + "农事成功",
            icon: "none",
            duration: 850,
          });
          setTimeout(() => {
            uni.navigateTo({
              url: "/pages/farming/index",
            });
          }, 1000);
          uni.setStorageSync("farmingTabindex", 1);
          this.remark = "";
          this.handleContent = "";
          this.date = moment().format("YYYY-MM-DD");
          this.teaId = "";
          this.resultPic = [];
          this.teaType = "";
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
        url:
          "/data/teagarden/getGardenOptionsByBase?" +
          "baseId=" +
          uni.getStorageSync("baseId"),
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
      if (val.name == "采摘" || val.name == "灌溉") {
        let nameSet = val.name == "采摘" ? "鲜叶" : "水";
        this.onlyLeafFlag = true;
        this.contentAdd.forEach((item) => {
          item.name = nameSet;
        });
      } else {
        this.onlyLeafFlag = false;
        this.contentAdd.forEach((item) => {
          item.name ='';
        });
      }
      this.handleContent = val.name;
    },
    typeSelectTea(val) {
      console.log(val);
      this.teaName = val.name;
      this.teaId = val.id;
      this.teaType = val.species;
    },
    confirm(e) {
      this.show = false;
      this.date = e[0];
    },
    deleteOne(index) {
      this.resultPic.splice(index, 1);
    },
    toJSON() {
      return this;
    },
    onGetImgClick: function () {
      let that = this;
      uni.chooseImage({
        count: 3,
        sizeType: ["compressed"], //original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
        success: (res) => {
          //this.imageList = res.tempFilePaths[0];
          console.log("res", res);
          // console.log(this);
          res.tempFilePaths.forEach((item, index) => {
            console.log("itemfile", item);
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
<style lang="scss">
.morechild {
  display: flex;
  margin: 10rpx 0;
  align-items: center;
  .one {
    margin: 0 20rpx;
  }
  .two {
    margin-left: 20rpx;
    margin-right: 30rpx;
  }
  .u-input {
    background: #fafafa !important;
  }
}
</style>
<style lang="scss" scoped>
.u-textarea {
  background: #fafafa !important;
}

.newhandleicon {
  position: absolute;
  top: 10rpx;
  right: 20rpx;
  display: flex;
  align-items: center;
}
.tipedit {
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