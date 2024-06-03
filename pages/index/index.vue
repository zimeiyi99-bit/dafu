<template>
	<view class="tui-header">
		<view class="tui-NavHeader">
			<view class="tui-img">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="tui-right">
				<image src="../../static/diqiu.png" mode=""></image>
				<text>简体中文</text>
			</view>
		</view>
		<view class="tui-banner">
			<uni-swiper-dot class="uni-swiper-dot-box" :info="info" :current="current" :mode="mode"
				:dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item, index) in info" :key="index">
						<view class="swiper-item" :class="'swiper-item' + index">
							<image :src="item" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="tui-decorate">
			<view class="tui-line"></view>
			<view class="tui-lucky">
				<view class="tui-luckImge"></view>
			</view>
			<view class="tui-luckyHand"></view>
			<view class="tui-dialog"></view>
			<view class="tui-popupDia">
				点击我~
			</view>
		</view>
		<!-- 内容 -->
		<view class="tui-card">
			<view class="tui-content animate__animated animate__fadeInTopRight">
				<view class="item" v-for="(item,index) in 7" :key="index">
					<template v-if="index != 6">
						<image src="../../static/hand.png" mode=""></image>
						<view class="title">
							快捷入金
						</view>
					</template>
					<template v-if="index == 6">
						<view class="tui-itemLeft">
							<view class="kefu">
								在线客服
							</view>
							<view class="fuwu">
								优质竭诚为您服务
							</view>
						</view>
						<view class="tui-itemRight">
							<image src="/static/kefu.png" mode=""></image>
						</view>
					</template>
				</view>
			</view>
			<!-- 公告 -->
			<view class="tui-notice">
				<image src="/static/laba.png" mode=""></image>
				<view class="tui-desc">
					<view class="title">
						Financial Conduct Authority | FCA
					</view>
					<view class="time">
						2023-11-03 02:55:24
					</view>
				</view>
			</view>
			<!-- 产品推荐 -->
			<view class="tui-recommend">
				<view class="title">
					产品推荐
				</view>
				<scroll-view class="prefer-scroll" scroll-x="true" @scroll="scroll">
					<block v-for="item in 5" :key="item">
						<view class="image-box">
							<view class="name">欧元/美元</view>
							<view class="desc">
								EURUSD
							</view>
							<image class="tui-shitu" src="/static/down_2.png" mode=""></image>
							<view class="proportion">
								1.08483
							</view>
							<view class="parities">
								<text>0.00212</text>
								<view class="tui-rightParities">
									<image class="down" src="../../static/red_up.png" mode=""></image>
									<view class="rise">
										+0.19%
									</view>
								</view>
							</view>
						</view>
					</block>

				</scroll-view>
			</view>
			<!-- 货币种类 -->
			<view class="tui-variety animate__animated animate__slideInRight">
				<view class="title">
					货币种类
				</view>
				<view class="tui-classify">
					<view class="" style="flex: 1;">
						名称
					</view>
					<view class="tui-rightVariety" style="flex: 1;">
						<text>最新价格</text>
						<text>24h涨幅</text>
					</view>
				</view>
				<view class="tui-varietyContent">
					<view class="tui-varietyContentItem" v-for="(item,index) in 10" :key="index">
						<view class="name">
							<text class="piceName">欧元/美元</text>
							<view class="flex-column" style="color: #a8a9ac;font-size: 20rpx;">
								<text>24H量</text>
								<text>961k</text>
							</view>
						</view>
						<view class="code">
							1.08484
						</view>
						<view style="justify-content: flex-end;" class="flex">
							<view class="tui-end">
								+0.165%
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				mode: 'dot',
				info: ['https://www.i7pauan.xyz//storage/banner/image/e2f2ec614550eb77a8fdc3b372bb0353.png',
					'https://www.i7pauan.xyz//storage/banner/image/e13da9f07ba8ef6558ba628210ed8280.png',
					'https://www.i7pauan.xyz//storage/banner/image/51a57145d748f696d280b352b8df7420.png'
				],
				dotsStyles: {
					selectedBackgroundColor: '#fff',
					selectedBorder: '#fff'
				}
			}
		},
		onLoad() {

		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		background-color: #f6f7fb;
	}

	.tui-variety {
		margin-top: 64rpx;
		position: relative;

		.tui-varietyContent {
			display: flex;
			flex-direction: column;

			.tui-varietyContentItem {
				width: 100%;
				background-color: #fff;
				border-radius: 13px;
				margin-top: 26rpx;
				padding: 30rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;

				.tui-end {
					padding: 10rpx;
					width: 80px;
					color: #fff;
					border-radius: 5px;
					background-color: #f33b50;
					font-size: 28rpx;
					box-sizing: border-box;

				}

				.code {
					flex: 1;
					max-width: 170rpx;
					overflow-wrap: break-word;
					font-size: 26rpx;

				}

				.name {
					display: flex;
					flex-direction: column;
					flex: 1;

					.piceName {
						font-size: 32rpx;
						color: #222;
						font-weight: 500;
						padding-bottom: 15rpx;
					}
				}
			}
		}

		.tui-classify {
			color: #a8a9ac;
			font-size: 24rpx;
			display: flex;
			align-items: center;
			padding: 30rpx;

			.tui-rightVariety {
				width: 300rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}

		.title {
			font-size: 32rpx;
			color: #222;
			padding-bottom: 20rpx;
		}
	}

	.tui-recommend {
		margin-top: 64rpx;
		margin-bottom: 60rpx;
		position: relative;

		.prefer-scroll {
			white-space: nowrap;
			/* 防止换行 */
			overflow-x: auto;
			/* 开启横向滚动 */
			overflow-y: hidden;
			/* 隐藏纵向滚动条 */
			-webkit-overflow-scrolling: touch;
			/* 针对移动端使滚动更流畅 */
			width: 100%;
			

		}

		.image-box {
			display: inline-block;
			width: 245upx;

			background-color: #fff;
			border-radius: 13px;
			margin-left: 20rpx;
			padding: 20rpx;
			box-sizing: border-box;

			.tui-shitu {
				width: 90%;
				height: 110rpx;
				left: 50%;
				transform: translateX(-50%);
				margin-top: 12rpx;
			}

			.parities {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 20rpx;
				color: #222;

				.tui-rightParities {
					display: flex;
					align-items: center;
					padding-top: 10rpx;

					.rise {
						padding-left: 10rpx;
						color: #f33b50;
					}

					.down {
						width: 18rpx;
						height: 18rpx;
					}
				}
			}

			.proportion {
				font-size: 24rpx;
				color: #222;
				margin-top: 12rpx;
			}

			.name {
				font-size: 32rpx;
				font-weight: 500;
				color: #222;
			}

			.desc {
				color: #a8a9ac;
				font-size: 20rpx;
				padding-top: 6rpx;
			}
		}

		.image-box:nth-of-type(1) {
			margin-left: 0;
		}

		.title {
			font-size: 32rpx;
			color: #222;
			padding-bottom: 20rpx;
		}
	}

	@keyframes wave {
		0% {
			transform: translateY(-5px);
		}

		50% {
			transform: translateY(-20px);
		}
	}

	@keyframes responsiveAnimation {
		0% {
			transform: scale(0.8);
			/* 动画开始时图片大小正常 */
		}

		50% {
			transform: scale(1);
			/* 动画中间时图片放大50% */
		}

		100% {
			transform: scale(0.8);
			/* 动画结束时图片恢复正常大小 */
		}
	}

	.tui-notice {
		margin-top: 44rpx;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 13px;
		font-size: 32rpx;
		display: flex;
		align-items: center;

		.tui-desc {
			display: flex;
			flex-direction: column;
			padding-left: 20rpx;

			.title {
				color: #222;
				font-size: 26rpx;
			}

			.time {
				color: #a8a9ac;
				font-size: 20rpx;
				padding-top: 10rpx;
			}
		}

		image {
			width: 80rpx;
			height: 80rpx;
			animation: responsiveAnimation 2s infinite;
			/* 应用动画 */
		}
	}

	.tui-card {
		z-index: 333;
		width: 100%;
		overflow: hidden;
		padding: 0 36rpx;
		padding-bottom: 110rpx;
		background-color: #f6f7fb;
		position: absolute;
		margin-top: 70rpx;

		.tui-content {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.item:nth-child(7) {
				width: 335rpx;
				padding: 30rpx;
				background: url(/static/kf-bg.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				align-items: center;
				justify-content: space-between !important;
				flex-direction: row;
			}

			.item {
				width: 160rpx;
				height: 160rpx;
				padding: 30rpx;
				border-radius: 26rpx;
				font-size: 32rpx;
				background-color: #fff;
				margin-top: 20rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				.tui-itemRight {
					width: 120rpx;
					height: 100rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.tui-itemLeft {
					display: flex;
					flex-direction: column;

					.kefu {
						font-size: 26rpx;
					}

					.fuwu {
						font-size: 20rpx;
						color: #a8a9ac;
						padding-top: 5rpx;
					}
				}

				.title {
					max-width: 55px;
					padding-top: 4rpx;
					font-size: 24rpx;
				}

				image {
					width: 70rpx;
					height: 70rpx;
				}
			}
		}
	}


	.tui-decorate {
		margin-top: 118rpx;
		position: relative;

		.tui-popupDia {
			height: 75rpx;
			width: 175rpx;
			z-index: 300;
			left: 50%;
			border-radius: 50%;
			transform: translateX(44%) translateY(-166%) rotateZ(-7deg);
			border: 1px solid #822151;
			color: #822151;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
		}

		.tui-dialog {
			height: 32rpx;
			width: 40rpx;
			z-index: 300;
			left: 50%;
			transform: translateX(100%) translateY(-100%);
			background: url(/static/dialog.png) no-repeat;
			background-size: 100% 100%;
			position: absolute;
		}



		.tui-luckyHand {
			width: 34rpx;
			height: 28rpx;
			left: 50%;
			margin-left: 5px;
			top: 26rpx;
			z-index: 300;
			position: absolute;
			background: url(/static/hand.png) no-repeat;
			background-size: 100% 100%;
			-webkit-animation: wave 1s infinite; // shaking为动画名称，1s 动画执行时间，infinite 无限循环
		}

		.tui-lucky {
			width: 140rpx;
			top: -36rpx;
			left: 50%;
			transform: translateX(-66%);
			position: relative;

			.tui-luckImge {
				background: url(/static/lucky.png) no-repeat;
				background-size: 100% 100%;
				position: absolute;
				top: 4rpx;
				left: 0px;
				height: 96rpx;
				width: 100%;
			}
		}

		.tui-line {
			height: 280rpx;
			z-index: 222;
			position: absolute;
			width: 100%;
			background: url(/static/line.png) no-repeat;
			background-size: 100% 100%;
		}
	}

	.tui-banner {
		padding: 20rpx 36rpx;

		.swiper-box {
			height: 320rpx;

			.swiper-item {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.tui-NavHeader {
		padding: 20rpx 36rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		height: 100rpx;

		.tui-img {

			width: 188rpx;
			height: 54rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.tui-right {
			background-color: rgba(235, 239, 241, .43);
			padding: 20rpx 20rpx;
			border-radius: 21px;
			display: flex;
			align-items: center;

			image {
				width: 40rpx;
				height: 40rpx;
			}

			text {
				padding-left: 20rpx;
				font-size: 32rpx;
				font-weight: bold;
				font-family: 'myfont';
			}
		}
	}

	.tui-header {
		height: 100%;
		background: url(/static/bg.png) no-repeat;
		background-size: 860rpx 1026rpx;
		background-position-y: -106rpx;
	}
</style>