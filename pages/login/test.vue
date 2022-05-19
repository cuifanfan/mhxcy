<template>
	<view class="test">
		<view class="header">
			<image class="loginbg" src="../../static/image/loginbg.png" mode="widthFix"></image>
			<image class="flag" src="../../static/image/flag.png" mode=""></image>
			<text class="title">茶园监测管理系统</text>
		</view>
		<view class="content">
			<view class="tabs">
				<view class="loginTab">登录</view>
				<view class="registerTab">注册</view>
			</view>
			<view class="form">
				<view class="loginItem">
					<image class="userPic" src="../../static/image/login/user.png" mode=""></image>
					<input class="username" type="text" placeholder="请输入账号或用户名" placeholder-class="phfontsize"/>
				</view>
				<view class="loginItem">
					<image class="userPic" src="../../static/image/login/user.png" mode=""></image>
					<input class="username" type="text" placeholder="请输入账号或用户名" placeholder-class="phfontsize"/>
				</view>
				<view class="loginItem">
					<image class="userPic" src="../../static/image/login/user.png" mode=""></image>
					<input class="username" type="text" placeholder="请输入账号或用户名" placeholder-class="phfontsize"/>
				</view>
			</view>
			<view class="loginBtn">
				<button>登录</button>
			</view>
			<view class="forgetPwd">
			</view>
			<view class="info">
				<text class="infoText">Copyright © 北京霖智科技有限公司  202111070626</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.test{
		width: 100vw;
		height: 100vh;
		
		position: relative;
		overflow: hidden;
	}
	/* 头部 */
	.header{
		width: 100vw;
		height:40%;
		
		position: absolute;
		top: 0;
	}
	.loginbg{
		width: 100%;
	}
	.flag{
		width: 130rpx;
		height: 130rpx;
		
		position: absolute;
		top: 136rpx;
		left: 48rpx;
	}
	.title{
		font-size: 48rpx;
		font-weight: 700;
		color: #ffffff;
		
		position: absolute;
		top: 288rpx;
		left: 48rpx;
	}
	
	/* 内容部分 */
	.content{
		width: 100vw;
		height: 1048rpx;
		background-color: #ffffff;
		border-radius: 64rpx 64rpx 0 0; 
		
		position: absolute;
		top: 35%;
		
		display: flex;
		flex-direction: column;
	}
	.tabs{
		width: 100%;
		height: 104rpx;
		display: flex;
	}
	.loginTab, .registerTab{
		width: 50%;
		height: 100%;
		flex: 1;
		text-align: center;
		vertical-align: middle;
		border-bottom: #09CD95 solid 4rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		color: rgba(9,205,149,1);
		font-size: 40rpx;
		font-weight: 500;
	}
	/* 表单 */
	.form{
		width: 100%;
		/* height: 25vh; */
		background-color: pink;
		display: flex;
		flex-direction: column;
	}
	.loginItem{
		flex: 1;
		background-color: yellow;
		margin-bottom: 48rpx;
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

	.loginBtn{
		width: 100%;
		height: 88rpx;
		background-color: green;
	}
	.info{
		width: 100%;
		flex: 1;
		text-align: center;
		display: flex;
		justify-content: center;
	}
	.infoText{
		display: inline-block;
		color: rgba(147,149,153,1);
		font-size: 24rpx;
		font-weight: 400;
		font-family: "PingFang SC";
		margin: auto;
	}
	
</style>