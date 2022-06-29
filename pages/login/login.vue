<template>
  <div class="login">
<!--    <header-diy
      :backHidden="2"
      :type="2"
      class="topbar"
      :titleName="pageName"
    ></header-diy> -->
	<view class="header">
		<image class="loginbg" src="../../static/image/loginbg.png" mode="widthFix"></image>
		<image class="flag" src="../../static/image/flag.png" mode=""></image>
		<text class="title">茶园种植管理系统</text>
	</view>
	<view class="content">
		<view class="tab-title">
			<!-- 头部选项卡 -->
			<view 
			class="tab-item" 
			v-for="(item, index) in list"
			:class="currentIndex==index? 'activiate': ''"
			@click="tabClick(index)"
			:key="index"
			>{{item.name}}</view>
		</view>
		<view class="tab-content">
			<!-- 登录界面 -->
			<view class="loginRes form" v-show="currentIndex == 0">
				<view class="loginItem" @click="changeHandler($refs,'loginItem0')" ref='loginItem0'> 
					<image class="userPic" src="../../static/image/login/user.png" mode=""></image>
					<input class="username" type="text" v-model="loginData.name" placeholder="请输入账号或用户名" placeholder-class="phfontsize"/>
				</view>
				<view class="loginItem" @click="changeHandler($refs,'loginItem1')" ref='loginItem1'>
					<image class="userPic" src="../../static/image/login/pas.png" mode=""></image>
					<input class="username" type="password" v-model="loginData.pwd" placeholder="请输入账号密码" placeholder-class="phfontsize"/>
					<image class="userPic" src="../../static/image/login/eye.png" mode=""></image>				
				</view>
				<!-- <view class="loginItem checkItem" @click="changeHandler($refs,'loginItem2')" ref='loginItem2'>
					<image class="userPic" src="../../static/image/login/check.png" mode=""></image>
					<input class="username" type="text" v-model="loginData.checkm" placeholder="请输入验证码" placeholder-class="phfontsize"/>
				</view> -->
				<button class="loginBtn" @click="goLogin" ref="loginBtn">
					<span>登录</span>
				</button>
				<view class="pasLogic">
					<!-- <label>
						<checkbox class="cs" ref="checkRef" @click="loginCheckHandler"/><text class="remPas">记住密码</text>
					</label> -->
					<a href="http://" class="forgetPas">忘记密码</a>
				</view>
				<!-- 底部 -->
				<view class="info">
					<span class="infoSpan">Copyright © 北京霖智科技有限公司  202111070626</span>
				</view>
			</view>
			<!-- 注册界面 -->
			<view class="registerRes form" v-show="currentIndex == 1">
				<view class="registerItem" @click="changeHandler($refs,'loginItem3')" ref='loginItem3'>
					<image class="userPic" src="../../static/image/login/user.png" mode=""></image>
					<input class="username" type="text" v-model="registerData.name" placeholder="请输入账号或用户名" placeholder-class="phfontsize"/>
				</view>
				<view class="registerItem" @click="changeHandler($refs,'loginItem4')" ref='loginItem4'>
					<image class="emailPic" src="../../static/image/login/email.png" mode=""></image>
					<input class="emailname" type="text" v-model="registerData.email" placeholder="请输入邮箱账号" placeholder-class="phfontsize"/>
				</view>
				<view class="registerItem" @click="changeHandler($refs,'loginItem5')" ref='loginItem5'>
					<image class="userPic" src="../../static/image/login/pas.png" mode=""></image>
					<input class="username" type="text" v-model="registerData.pwd" placeholder="请输入账号密码" placeholder-class="phfontsize"/>
					<image class="userPic" src="../../static/image/login/eye.png" mode=""></image>
				</view>
				<view class="registerItem" @click="changeHandler($refs,'loginItem6')" ref='loginItem6'>
					<image class="userPic" src="../../static/image/login/pas.png" mode=""></image>
					<input class="username" type="text" v-model="registerData.checkPwd" placeholder="请再次输入账号密码" placeholder-class="phfontsize"/>
				</view>
				<view class="agreeLogic">
					<label>
						<checkbox class="cs" ref="checkRef2" @click="registerCheckHandler" /><text class="agreeP">已阅读并同意相关协议。</text>
					</label>
				</view>
				<button class="registerBtn" ref="registerBtn" :disabled="isFormReady2(registerData)">
					<span>注册</span>
				</button>
			</view>
		</view>
	</view>
  </div>
</template>
<script>
import headerDiy from "../component/header/header.vue";
import request from '../../common/utils/request'
import {encryption} from '../../common/utils/utils'
export default {
  components: {
    headerDiy,
  },
  data() {
    return {
        username:'admin',
        password:'JFat0Zdc',
        pageName: "登录",
		currentIndex:0,
		list:[
			{name:"登录"},
			{name:"注册"}
		],
		loginData:{
			name:'admin',
			pwd:'123456',
			//checkm:'', // 验证码
			//checkb:false // 复选框
		},
		registerData:{
			name:'',
			email:'',
			pwd:'',
			checkPwd:'',
			checkb:false 
		}
    };
  },
  methods:{
	  goLogin(){
		let that=this
		let params={
			data:{
				username:that.loginData.name,
				password:that.loginData.pwd
			},
			type:'',
			key:'pigxpigxpigxpigx',
			param:['password']
		}
		let get=encryption(params)
		request({
			url:'/auth/oauth/token?grant_type=password&scope=server',
			method:'post',
			isAuth:false,
    		data:{
				username:get.username,
				password:get.password
			},	
		}).then(res=>{
			uni.setStorageSync('token',res.access_token)
			let info={
				userId:res.user_id,
				userName:res.username

			}
			uni.setStorageSync('userInfo',info)
			uni.setStorageSync('relogin',true)
			this.getUserInfo()
			this.getBaseInfo(res.user_id)
		}).catch(err=>{
			console.log('err',err)
		})
	  },
	  getBaseInfo(id){
		request({
			url: "/data/teabase/getBaseInfo?userId=" + id,
			method:'get',
			isAuth:false,
    		data:{
				
			},	
		}).then(res=>{
			uni.setStorageSync('userBaseInfos',res.data)
			//如果选过茶园 取上一次的茶园
			let getAgoChoose=uni.getStorageSync('nowUserBaseInfo')
			if(!getAgoChoose){
				uni.setStorageSync('nowUserBaseInfo',res.data[0])
				uni.setStorageSync('baseId',res.data[0]['baseId'])
      			uni.setStorageSync("deviceList", res.data[0]['deviceList'])
			}else{
				let getNow=uni.getStorageSync('nowUserBaseInfo')
				let flag=res.data.find(item=>{
					return getNow.baseId==item.baseId
				})
				if(!flag){
					uni.setStorageSync('nowUserBaseInfo',res.data[0])
					uni.setStorageSync('baseId',res.data[0]['baseId'])
      				uni.setStorageSync("deviceList", res.data[0]['deviceList'])
				}else{
					uni.setStorageSync('nowUserBaseInfo',flag)
					uni.setStorageSync('baseId',flag['baseId'])
					uni.setStorageSync("deviceList", flag['deviceList'])
				}
			}
			

			uni.switchTab({
				url:'/pages/index/index'
			})
		})
	  },
	  getUserInfo(){
		request({
			url:'/admin/user/info',
			method:'get',
			isAuth:false,
    		data:{
				
			},	
		}).then(res=>{
			uni.setStorageSync('tenantId',res.data.sysUser.tenantId)
		})
	  },
	  // 选项卡
		tabClick(index){
			if(this.currentIndex !== index){
				this.currentIndex = index
			}
	  },
		changeHandler(test, name){
			// console.log(test[name]);
			// test[name].$el.style.backgroundColor = "#F5FAF9"
			// test[name].$el.style.borderColor = "#09CD95"
			// test[name].$el.style.borderStyle = "solid"
			// test[name].$el.style.borderWidth = 2 + 'rpx'
		},
		// 登录表单验证
		loginCheckHandler(){
			console.log("haha");
			this.loginData.checkb = this.$refs.checkRef.checkboxChecked
		},
		isFormReady(formData){
			for(let i in formData){
				if(!formData[i]) return true
			}
			this.$nextTick(() => {
				//this.$refs.loginBtn.$el.style.backgroundColor="#09CD95"
			})
			return false
		},
		
		// 注册表单验证
		registerCheckHandler(){
			console.log("haha");
			this.registerData.checkb = this.$refs.checkRef2.checkboxChecked
		},
		isFormReady2(formData){
			for(let i in formData){
				if(!formData[i]) return true
			}
			//this.$refs.registerBtn.$el.style.backgroundColor="#09CD95"
			return false
		},
  }
};
</script>
<style lang="scss" scoped>
.inputStyleChange{
	background-color: #F5FAF9;
	border:2rpx solid #09CD95 ;
}
.login{
	width: 100vw;
	height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background-color: #ffffff;
}
// 背景部分
.header{
	width: 100%;
	height: 40%;
}
.bg{
	width: 100%;
	position: relative;
}
.loginbg{
	width: 100%;
}
.flag{
	position: absolute;
	left: 48rpx;
	top: 126rpx;
	width: 130rpx;
	height: 130rpx;
}
.title{
	font-size: 48rpx;
	font-weight: 700;
	color: #ffffff;
	
	position: absolute;
	font-family: "PingFang SC";
	text-align: left;
	width: 384rpx;
	height: 168rpx;
	top: 284rpx;
	left: 48rpx;
}

// 内容
.content{
	width: 100vw;
	height: 60%;
	position: absolute;
	flex: 1;
	display: flex;
	flex-direction: column;
	// height: 1048rpx;
	// height: 100%;
	background-color: #ffffff;
	border-radius: 64rpx 64rpx 0 0;
	top: 576rpx;
}
// 选项卡
.tab-title{
	display: flex;
	height: 104rpx;
	padding: 16rpx 32rpx;
	justify-content: center;
	align-items: center;
}
.tab-item{
	flex: 1;
	width: 50vw;
	padding-bottom: 16rpx;
	// height: 88rpx;
	text-align: center;
	color: #939599;
	font-weight: 700;
	font-size: 40rpx;
}
.activiate{
	border-bottom: 4rpx solid #09CD95;
	color: #09CD95;
	font-weight: 700;
}

.tab-content{
	flex: 1;
	width: 100%;
	// height: 100%;
	
	position: relative;
	top: 0;
	font-size: 24rpx;
}

// 登录注册界面
.loginRes, .registerRes{
	// position: absolute;
	// top: 64rpx;
	flex: 1;
	width: 100%;
	// height: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 16rpx;
	justify-content: center;
}

// 用户表单
.loginItem, .registerItem{
	flex: 1;
	height: 6vh;
	margin: 0 32rpx;
	margin-bottom: 32rpx;
	background: #F5F5F5;
	border: 1px solid #F5F5F5;
	border-radius: 100px;
	
	display: flex;
	align-items: center;
	justify-content: center;
}

.hoverLoginItem{
	border: 1px solid rgba(0.03529411926865578, 0.8039215803146362, 0.5843137502670288, 1);
	background: rgba(245,250,249,1);
}

.userPic, .emailPic{
	width: 32rpx;
	height: 32rpx;
	margin: 0 32rpx;
}

.username, .emailname{
	padding: 16rpx 0;
	width: 100%;
	height: 100%;
}

// placeholder的字体大小
.phfontsize{
    /* placeholder字体大小 */
    font-size: 24rpx;
}

.checkItem{
	width: 414rpx;
	margin-left: 32rpx;
}
.loginBtn{
	background: #09CD95;
}
.loginBtn, .registerBtn{
	width: 686rpx;
	height: 88rpx;
	border-radius: 48rpx;
	margin: 0 32rpx 48rpx 32rpx;
	
	span{
		height: 100%;
		line-height: 88rpx;
		font-size: 40rpx;
		font-weight: 500;
		color: #ffffff;
	}
}
// button禁用时的样式
.loginBtn[disabled], .registerBtn[disabled]{
	background-color: #C4CCCA;
	span{
		height: 100%;
		line-height: 88rpx;
		font-size: 40rpx;
		font-weight: 500;
		color: #ffffff;
	}
}

.agreeLogic{
	width: 686rpx;
	margin: 0 auto;
	// margin-bottom: 64rpx;
}

.pasLogic{
	width: 686rpx;
	margin: 0 auto;
	padding: 0 32rpx;
}

// 复选框样式
.cs{
	margin-right: 16rpx;
	transform: scale(0.7);
}
.remPas, .agreeP{
	color: rgba(147,149,153,1);
	font-size: 28rpx;
	font-weight: 500;
	font-family: "PingFang SC";
	text-align: left;
}

.forgetPas{
	float: right;
	text-decoration: none;
	font-size: 28rpx;
	color:#09CD95;
	font-weight: 500;
	font-family: "PingFang SC";
	text-align: left;
	margin-right: 32rpx;
}

.info{
	flex: 1;
	height: 100%;
	width: 100%;
	height: 32rpx;
	text-align: center;
	line-height: 32rpx;
	margin: auto;
	
	bottom: 10px;
	position: fixed;
}

.infoSpan{
	 color: rgba(147,149,153,1);
	 font-size: 24rpx;
	 font-weight: 400;
	 font-family: "PingFang SC";
}
// 登录注册界面结束



</style>