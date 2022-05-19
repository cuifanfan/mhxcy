<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="wrapcommon form">
        <div class="edit">
          <div class="formchild">
            <div class="name">选择地块:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="请选择商品种类"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
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
              <div class="disablewrap disablewrap3">
                <u--input
                  v-model="date"
                  disabled
                  disabledColor="#fafafa"
                  :placeholder="date"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="show = true"
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
              <div class="disablewrap">
                <u--input
                  v-model="typeValue"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="水肥一体"
                  border="none"
                ></u--input>
                <u-icon
                  slot="right"
                  @click="showType = true"
                  color="#C4C7CC"
                  size="20"
                  name="arrow-down"
                ></u-icon>
              </div>
            </div>
            <div class="tipedit wrapcommon wrapcommonbg">
              <div class="childedit">一胺：2.6kg</div>
              <div class="childedit">一胺：2.6kg</div>
              <div class="childedit">硫酸钾：2.4kg</div>
              <div style="margin-bottom: 0" class="childedit">水：41m³</div>
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name">添加照片:(最多三张)</div>
            <div class="editpic">
              <div class="picpic">
                <image
                  mode="widthFix"
                  class="handlepic"
                  src="@/static/image/i1.png"
                  alt=""
                />
                <div class="icon">
                  <u-icon color="#fff" size="14" name="close"></u-icon>
                </div>
              </div>
              <div class="picpic">
                <image
                  mode="widthFix"
                  class="handlepic"
                  src="@/static/image/i2.png"
                  alt=""
                />
                <div class="icon">
                  <u-icon color="#fff" size="14" name="close"></u-icon>
                </div>
              </div>
              <div class="picpic">
                <image
                  mode="widthFix"
                  class="handlepic"
                  src="@/static/image/i3.png"
                  alt=""
                />
                <div class="icon">
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
                <u--input
                  v-model="typeValue"
                  placeholder="请输入备注内容"
                  border="none"
                ></u--input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnsumit butsumbit">确认提交</div>
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
      title="请选择商品种类"
      description="商品种类哦"
      @close="showType = false"
      @select="typeSelect"
    >
    </u-action-sheet>
  </div>
</template>
<script>
import headerDiy from "../component/header/header.vue";
import {getNowDate} from '../../common/utils/utils'
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
      mode: "single",
      show:false,
      date:'',
      showType: false,
      active: true,
      showType: false,
      showType2: false,
      pageName: "记录/编辑农事",
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
  onLoad(){
    let now=getNowDate()
    this.date=(now.split(' '))[0]
  },
  methods: {
    confirm(e){
      this.show=false
      this.date=e[0]
    },
    onGetImgClick: function () {
      uni.chooseImage({
        sizeType: ["compressed"], //original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
        success: (res) => {
          this.imageList = res.tempFilePaths[0];
          console.log("res", res);
          console.log(this);
          uni.uploadFile({
            url: ``, //接口

            filePath: res.tempFilePaths[0],
            // formData: {
            //   name: 'token',
            //   token: window.uni.getStorageSync("accessToken")
            // },
            name: "multipartFile",
            header: {
              token: this.accessToken,
            },
            file: res.tempFiles[0],
            success: (res) => {
              this.objList = JSON.parse(res.data);
              if (this.objList.code == 200) {
                this.newtime = this.objList.time;
                this.resData = this.objList.data;
                console.log(this.objList, this.newtime, this.resData, "6666");
                console.log(this);
              }
            },
          });
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin: 32rpx;
  .butsumbit {
    margin-top: 80rpx;
  }
  .editpic {
    display: flex;
    justify-content: space-between;
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
  .wrapcommonbg {
    margin-top: 20rpx;
    color: #626466;
    font-size: 28rpx;
    font-weight: bold;
    background: #fafafa !important;
    .childedit {
      margin-bottom: 10rpx;
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