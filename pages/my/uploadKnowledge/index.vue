<template>
  <div class="wrap">
    <header-diy class="topbar" :type="2" :titleName="pageName"></header-diy>
    <div class="content">
      <div class="index1">
        <div class="edit">
          <div class="formchild">
            <div class="name">添加封面</div>
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
              <div class="handle" v-if="resultPic.length == 0">
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
            <div class="name name2">标题:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="form.title"
                  placeholder="请输入标题"
                  border="none"
                ></u--input>
              </div>
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name name2">副标题:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="form.title2"
                  placeholder="请输入副标题"
                  border="none"
                ></u--input>
              </div>
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name name2">分类:</div>
            <div class="input input2">
              <div class="disablewrap" @click="showTypeTea=true">
                <u--input
                  v-model="form.sort"
                  disabled
                  disabledColor="#fafafa"
                  placeholder="请选择文章分类"
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
            <div class="name name2">标签:</div>
            <div class="tag flextag">
                <div class="tagchild " @click="deleteChild(index)" v-for="(item,index) in tagArr" :key="index">
                    {{item}} 
                    <div class="tagicon">
                        <u-icon name="close" color="#409eff" size="14"></u-icon>
                    </div>
                    
                </div>
            </div>
            <div class="input input2 flexcenter">
              <div class="disablewrap">
                <u--input
                  v-model="tagAdd"
                  placeholder="请输入标签"
                  border="none"
                ></u--input>
                
              </div>
              <div class="btnadd" @click="addTag">
                <u-button type="primary" color="#29CC96" size="small" text="确认"></u-button>
              </div>
              
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name name2">作者:</div>
            <div class="input input2">
              <div class="disablewrap">
                <u--input
                  v-model="form.author"
                  placeholder="请输入作者"
                  border="none"
                ></u--input>
              </div>
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name name2">是否推荐:</div>
            <div class="input input2">
              <div class="disablewrap disablewrapclear">
                
                <div class="recommed">
                    <u-switch v-model="recommend" ></u-switch>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name name2">内容:</div>
            <div class="input input2">
               <jinEdit ref="edit" placeholder="请输入内容" @editOk="editOk" uploadFileUrl="http://121.36.247.77:9999/admin/sys-file/upload"></jinEdit> 
            </div>
          </div>
        </div>
        <div class="edit">
          <div class="formchild">
            <div class="name name2">附件:</div>
            {{showData}}
            <div class="otherdiv" >
                <u-button type="primary"  color="#939599" @click="openFile" size="small" text="打开文件目录并上传"></u-button>
                <tki-file-manager ref="filemanager" @result="resultPath"></tki-file-manager>
                <div class="yet">
                    <div class="yetchild" v-for="(item,index) in otherFileList" :key="index">
                        <div class="oneyet">
                            <u-icon name="file-text" color="#626466" size="20"></u-icon>
                            <span>{{item.name}}</span>
                        </div>
                        <div @click="deleteoneOther(index)">
                            <u-icon name="close" color="#626466" size="20"></u-icon>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div @click="submieSure" :header="headerParam" class="btnsumit btn3">确认提交</div>
    </div>
    <u-action-sheet
      :show="showTypeTea"
      :actions="teaList"
      title="请选择文章分类"
      @close="showTypeTea = false"
      @select="typeSelectTea"
    >
    </u-action-sheet>
  </div>
</template>
<script>
import headerDiy from "../../component/header/header.vue";
import { BASE_URL } from "../../../common/utils/config";
import request from "../../../common/utils/request";
import jinEdit from '../../component/edit/jin-edit.vue';
import tkiFileManager from "../../component/tki-file-manager/tki-file-manager.vue"
export default {
  components: {
    headerDiy,
    jinEdit,
    tkiFileManager
  },
  data() {
    return {
        showData:'',
        otherFileList:[
            // {
            //      url:'/jiadedizhi.pdf',
            //         type:555,
            //         name:'dsa好好的发生发送待回复.hsdadadafjasdjfs'
            // }
        ],
        form:{
            title:'',
            title2:'',
            sort:'',
            author:'',
        },
        headerParam:{
            Authorization: "Bearer " + uni.getStorageSync("token"),
        },
        recommend:false,
        tagAdd:'',
        tagArr:[],
        teaList:[],
      showTypeTea:false,
      resultPic: [],
      resultPic: [],
      baseUrl: BASE_URL,
      pageName: "上传农业知识",
      numValue: "",
      nameValue: "",
      typeValue: "",
      questionContent: "",
      phone: "",
      editHtml:null,
    };
  },
  onLoad(){
    this.getSort()
  },
  methods: {
    deleteoneOther(index){
        this.otherFileList.splice(index,1)
    },
    openFile(){
        this.$refs.filemanager._openFile()
            
    },
    resultPath(e){
            let that=this
            let getFileType= e.substring(e.lastIndexOf(".")+1);
            let allow=['doc','docx','ppt','pptx','pdf','AVI','MP4','3GP','WMV','avi','mp4','3gp','wmv','xls','xlsx']
            if(getFileType=='pdf'){
                console.log('goiaoo!')
            }
            if(!allow.includes(getFileType)){
                uni.showToast({
                    title:'不允许上传此类型的文件',
                    icon:"none"
                })
                return 
            }
            uni.showLoading({
                mask: true,
                title: "上传中...",
            });
            uni.uploadFile({
              url: `http://121.36.247.77:9999/admin/sys-file/upload`,
              name: "file",
              header: {
                Authorization: "Bearer " + uni.getStorageSync("token"),
              },
              filePath: e,
              success: (res) => {
                console.log(JSON.stringify(res))
                let dataget = JSON.parse(res.data);
                let type=(dataget.data.url.split('.'))[1]
                let name = e.substring(e.lastIndexOf("/")+1);
                let slh=''
                let onlyName=(name.split('.'))[0]
                if(onlyName.length>15){
                    slh='…'
                    onlyName=onlyName.substring(0,15)
                }
                that.otherFileList.push({
                    url:dataget.data.url,
                    type:type,
                    name:onlyName+slh+'.'+type
                })
                uni.hideLoading()
              },
            });
    },
    typeSelectTea(e){
        this.form.sort=e.name
    },
    editOk(e){
        this.editHtml=e.html
        console.log('ok',e)
    },
    deleteChild(index){
        this.tagArr.splice(index,1)
    },
    addTag(){
        if(this.tagAdd==''){
            return
        }
        console.log(this.tagAdd)
        this.tagArr.push(this.tagAdd)
        this.tagAdd=''
    },
    getSort(){
        request({
        url: "/data/informationcategory/getInformationCategoryOptions",
        method: "get",
        isAuth: false,
        data: {
          
        },
      }).then((res) => {
        res.data.forEach(item=>{
            this.teaList.push({
                name:item.categoryName,
                val:item.id
            })
        })
       
      })
        
    },
    submieSure() {
        this.$refs.edit.release()
       
      if (this.resultPic.length==0) {
        uni.showToast({
          title: "请上传封面",
          icon: "none",
          duration: 850,
        });
        return;
      }
      if (this.form.title=='') {
        uni.showToast({
          title: "请输入标题",
          icon: "none",
          duration: 850,
        });
        return;
      }
      if (this.form.title2=='') {
        uni.showToast({
          title: "请输入副标题",
          icon: "none",
          duration: 850,
        });
        return;
      }
      if (this.form.sort=='') {
        uni.showToast({
          title: "请选择分类",
          icon: "none",
          duration: 850,
        });
        return;
      }
      if (this.tagArr.length==0) {
        uni.showToast({
          title: "请选择标签",
          icon: "none",
          duration: 850,
        });
        return;
      }
      if (this.form.author=='') {
        uni.showToast({
          title: "请输入作者",
          icon: "none",
          duration: 850,
        });
        return;
      }
      if (this.editHtml=='<p><br></p>') {
        uni.showToast({
          title: "请输入内容",
          icon: "none",
          duration: 850,
        });
        return;
      }
      let sendDataValue={
            author: this.form.author,
            category: this.form.sort,
            content: this.editHtml,
            coverImage: this.resultPic[0],
            recommend: this.recommend?1:0,
            status: "1",
            summary: this.form.title2,
           // tag: "",
            tags:this.tagArr.join(','),
            title: this.form.title,
        }
      if(this.otherFileList.length>0){
        let joinValue=[]
        this.otherFileList.forEach(item=>{
            joinValue.push(item.url)
        })
        sendDataValue.attachment=joinValue.join(',')
      }

      request({
        url: "/data/farminformation",
        method: "POST",
        isAuth: false,
        data: sendDataValue,
      }).then((res) => {
        uni.showToast({
          title: "提交成功",
          icon: "none",
          duration: 850,
        });
        setTimeout(() => {
          uni.navigateBack({
            delta: 1, //返回层数，2则上上页
          });
        }, 1000);
      });
    },
    typeSelect() {},
    deleteOne(index) {
      this.resultPic.splice(index, 1);
    },
    toJSON() {
      return this;
    },
    onGetImgClick: function () {
      let that = this;
      uni.chooseImage({
        count: 1,
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
<style lang="scss" scoped>
.oneyet{
    display: flex;
    align-items: center;
    width: 100%;
    margin: 20rpx 0;
}
.yet{
    width: 100%;
}
.yetchild{
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #626466;
    align-items: center;
}
.otherdiv{
    
}
.disablewrapclear{
    background: transparent!important;
}
.flextag{
    display: flex;
    align-items: center;
    .tagchild{
            margin-right: 12rpx;
            margin-bottom: 20rpx;
            background-color: #ecf5ff;
            border-color: #d9ecff;
           
            
            padding: 6rpx 20rpx;
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #409eff;
            border-width: 1px;
            border-style: solid;
            border-radius: 4px;
          
            box-sizing: border-box;
            white-space: nowrap;
            .tagicon{
                margin-left: 20rpx;
            }
    }
}
.btnadd{
    margin-left: 20rpx;
}
.btnsumit{
    z-index: 8999;
}
.btn3 {
  position: fixed;
  bottom: 40rpx;
  width: calc(100% - 70rpx);
  box-sizing: border-box;
  left: 35rpx;
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
.palceholderclass {
  color: rgba(147, 149, 153, 0.3) !important;
  font-size: 28rpx;
}
.btnask {
  position: fixed;
  color: #fff;
  background: #29cc96;
  border-radius: 100px;
  bottom: 30rpx;
  width: 90%;
  left: 5%;
  font-size: 32rpx;
  text-align: center;
  padding: 12rpx;
  box-sizing: border-box;
}
.name2 {
  color: #939599 !important;
  font-weight: normal !important;
}
.disablewrap {
  display: flex;
  padding: 12rpx 18rpx;
  justify-content: space-between;
  width: 100%;
  border-radius: 12rpx;
  background: #fafafa;
}
.input2 {
  display: flex;
}
.edit {
  font-size: 28rpx;
  color: #939599;
  .textarea {
    background: #fafafa !important;
    border-radius: 16rpx;
    height: 200rpx;
    width: 100%;
    margin-top: 20rpx;
    color: #000;
    padding: 16rpx;
  }
  .name {
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
      top: -10rpx!important;
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
<style lang="scss" scoped>
.name2 {
  color: #939599 !important;
  font-weight: normal !important;
}
.disablewrap {
  display: flex;
  padding: 12rpx 18rpx;
  justify-content: space-between;
  width: 100%;
  border-radius: 12rpx;
  background: #fafafa;
}
.input2 {
  display: flex;
}
.edit {
  font-size: 28rpx;
  color: #939599;
  .textarea {
    background: #fafafa !important;
    border-radius: 16rpx;
    height: 200rpx;
    width: 100%;
    margin-top: 20rpx;
  }
  .name {
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
.wrap{
    padding-bottom: 120rpx;
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