<template>
	<div class="wrap">
		<header-diy class="topbar" :titleName="pageName"></header-diy>
		<div class="content">
			<div class="index indexclear">
				<div class="index1 index">
					<div class="info">
						<image mode="widthFix" class="infopic" src="@/static/image/p1.png">151****1631
					</div>
					<div class="info info1">
						<image mode="widthFix" class="infopic" src="@/static/image/p2.png">宏野农业园大田智慧农业示范地块
					</div>
					<div class="info3">
						<div class="info4" v-for="(item,index) in indexMenu" :key="index">
							<div class="info5 flexcenter">
									<image mode="widthFix" class="infopic2" :src="item.pic">
							</div>
							<div class="info6">
								<div class="info6span">{{item.num}}</div>
                                {{item.name}}
							</div>
						</div>
					</div>
				</div>
                <div class="choose flexcenter">
                    <div class="child flexcenter" v-for="(item,index) in menu" :key="index">
                        <span>{{item.name}}</span>
                        <u-icon color="#939599" size="14" name="arrow-down"></u-icon>
                    </div>
                </div>
				<div class="index2 index">
					<div class="title1">
						<span>溯源产品档案</span>
						<div class="border"></div>
					</div>
					<div class='title2'>查看全部</div>
				</div>
				<div class="index3 index index1">
					<div class="table">
						<div class="tabtitle">
							<div class="t1 t4">
								商品名称
							</div>
							<div class="t1">
								商品编号
							</div>
							<div class="t1 t10">
								品类
							</div>
							<div class="t1">
								品种
							</div>
							<div class="t1">
								溯源次数
							</div>
						</div>
						<div class="tabcontent">
							<div class="child" v-for="(item,index) in 4" :key="index">
								<div class="t2 t3 t9">
									红敦敦
								</div>
								<div class="t2">
									fq22-05
								</div>
								<div class="t2">
									番茄
								</div>
								<div class="t2">
									甜番003
								</div>
								<div class="t2">
									20
								</div>
							</div>
						</div>
                        <div class="text">
                            *点击商品查看详细批次信息
                        </div>
					</div>
				</div>
                <div class="btnBig flexcenter">
                    <u-icon name="plus-circle" color="#fff" size="20"></u-icon>
                    <div class="text" @click="goAdd">
                         添加溯源商品档案
                    </div>
                   
                </div>
			</div>
		</div>
	</div>	
</template>
<script>
	import headerDiy from '../component/header/header.vue'
	export default{
		components:{
			headerDiy
		},
		data(){
			return{
				pageName:'溯源产品',
                menu:[
                    {
                        name:'品类'
                    },
                    {
                        name:'品种'
                    },
                    {
                        name:'排序'
                    },
                    {
                        name:'当前'
                    }
                ],
				indexMenu:[
					{
						name:'溯源品类',
						num:5,
						pic:require('@/static/image/p3.png')
					},
					{
						name:'溯源批次',
						num:52,
						pic:require('@/static/image/p4.png')
					}
				],
			}
		},
        methods:{
            goAdd(){
                uni.navigateTo({
					url:"/pages/addTrace/addTrace"
				})
            }
        }
	}
</script>

<style scoped lang="scss">
	.indexclear{
        margin:  auto!important;
    }
	.index{
		 margin: 0 32rpx ;
         .btnBig{
             border-radius: 32rpx;
             padding: 16rpx ;
             background:  #29CC96;
             margin: 0 64rpx;
             color: #fff;
             font-size: 28rpx;
             margin-top: 70rpx;
             .text{
                 margin-left: 30rpx;
             }
         }
         .choose{
             background: #fff;
             margin-top: 30rpx;
             padding: 20rpx 0;
            .child{
                flex: 1;
                color: #939599;
                font-size: 24rpx;
                span{
                    margin-right: 30rpx;
                }
                
            }
         }
         .info6span{
             color: #313233;
             font-size: 40rpx;
             font-weight: bold;
         }
		 .btnwrap{
			 margin: 70rpx 0  0 0;
			 color: #fff;
			 padding-bottom: 50rpx;
			 .btn{
				 flex: 1;
				 background: linear-gradient(135deg, #F5ABB1 0%, #FF5533 100%);
				 border-radius: 8px 8px 8px 8px;
				 padding: 16rpx 16rpx;
				 .btnpic{
					 width: 64rpx;
				 }
			 }
			 .left{
				 margin-right: 20rpx;
			 }
			 .btn2{
				 margin-right: 34rpx;
				
				 background: linear-gradient(134deg, #62B0F5 0%, #317FF5 100%)!important;
			 }
		 }
		.index3{
            .text{
                color: #939599;
                font-size: 24rpx;
                margin-top: 25rpx;
            }
			.tabtitle{
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #F5F5F5;
				font-size: 24rpx;
				color: #626466;
			}
			.tabcontent{
				font-size: 24rpx;
			}
			.t7{
				flex: auto!important;
				width: 100rpx;
				margin-left: 25rpx;
			}
			
			.t8{
				flex: auto!important;
			}
			.t5{
				justify-content: flex-start!important;
			}
			.t6{
				justify-content: flex-end!important;
			}
			.t10{
			
			}
			.t9{
				text-align: center;
			}
			.t3{
				font-size: 20rpx;
				
			}
			.t4{
				
			}
			.t1{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				padding-bottom: 20rpx;
			}
			.child{
				display: flex;
				background: #FAFAFA;
				padding: 14rpx 10rpx;
				margin: 12rpx 0;
				border-radius: 8rpx;
				.t2{
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
		.index2{
			 display: flex;
			 justify-content: space-between;
			 font-size: 36rpx;
			 font-weight: bold;
			 align-items: center;
			 margin: 30rpx 16rpx 15rpx 16rpx;
			 .title2{
				 color: #12A669;
				 font-size: 28rpx;
			 }
			 .title1{
				 span{
					 position: relative;
					 z-index: 2;
				 };
			 }
			 .border{
				 width: 144rpx;
				 height: 8rpx;
				 background: #29CC96;
				 position: relative;
				 top: -9rpx;
				 z-index: 1;
			 }
		 }
		.index1{
			background: #FFFFFF;
			padding: 36rpx 32rpx;
			border-radius: 16rpx 16rpx 16rpx 16rpx;
		}
		.info{
			font-size: 28rpx;
			display: flex;
			align-items: center;
		}
		.info1{
			margin-top: 20rpx;
			margin-bottom: 40rpx;
		}
		.info3{
			display: flex;
			justify-content: space-between;
			padding: 0 20rpx;
		}
		.infopic2{
			width: 64rpx;
			margin-right: 30rpx;
		}
        .info4:first-child{
            margin-right: 50rpx;
        }
		.info4{
			font-size: 24rpx;
            background: #FAFAFA;
            flex: 1;
            border-radius: 16rpx;
            display: flex;
            padding: 8rpx ;
            display: flex;
            align-items: center;
            padding-left: 20rpx;
		}
		.info6{
			color: #939599;
		}
		.info5{
			
			span{
				font-weight: bold;
			}
		}
		.infopic{
			width: 32rpx;
			margin-right: 10rpx;
		}
	}
</style>
