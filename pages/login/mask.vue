<template>
	<view class="mask">
		<image class="maskPic" src="../../static/image/mask.png"></image>
		<image class="logoPic" src="../../static/image/flag.png" mode=""></image>
		<view class="text">
			<h1 class="title1">HELLO!!!</h1>
			<h3 class="title2">欢迎使用，</h3>
			<h2 class="title3">茶园监测系统</h2>
		</view>
		<view class="lr">
			<button class="login">登录</button>
			<button class="register">注册</button>
		</view>
		<view class="content">	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.mask{
	position: relative;
	width: 100vw;
	height: 100vh;
}

.maskPic{
	width: 100vw;
	height: 100vh;
}

.logoPic{
	position: absolute;
	top: 588rpx;
	left: 310rpx;
	width: 130rpx;
	height: 130rpx;
}

.lr{
	position: absolute;
	top: 914rpx;
	height: 224rpx;
	margin: 0 32rpx;
	
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.login{
	width: 686rpx;
	height: 88rpx;
	border-radius: 212rpx;
	background: rgba(9,205,149,1);
	
	 color: rgba(255,255,255,1);
	 line-height: 88rpx;
	 font-size: 20px;
	 font-weight: 500;
	 font-family: "PingFang SC";
	 text-align: center;
}

.register{
	width: 686rpx;
	height: 88rpx;
	border-radius: 212px;
	background: rgba(255,255,255,1);
	
	color: rgba(9,205,149,1);
	line-height: 88rpx;
	font-size: 20px;
	font-weight: 500;
	font-family: "PingFang SC";
	text-align: center;
}

.text{
	position: absolute;
	top: 136rpx;
	width: 384rpx;
	height: 136rpx;
	margin-left: 48rpx;
}

.title1{
	color: rgba(255,255,255,1);
	font-size: 96rpx;
	font-weight: 700;
	font-family: "D-DIN";
	text-align: center;
}

.title2{
	font-size: 40rpx;
	color: #626466;
	font-weight: 500;
	font-family: "PingFang SC";
	text-align: left;
	margin-top: 16rpx;
	margin-bottom: 8rpx;
}
.title3{
	font-size: 48rpx;
	color: #313233;
	font-weight: 700;
	font-family: "PingFang SC";
	text-align: left;
}
</style>
