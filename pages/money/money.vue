<template>
	<view>
		<view class="tui-content">
			<view class="tui-header">
				<view class="box" @click="onClickRight">
					<uni-icons type="help" size="30" style="color: #fff;"></uni-icons>
				</view>
			</view>
			<view class="">
				<l-circularProgress :fontShow="false" :percent="pageData.zb" type="halfCircular" :lineWidth="20"
					:boxWidth="360" progressColor="#822151" bgColor="#fff">
					<view class="tui-progress">
						<view class="title">余额宝总额</view>
						<view class="price">￥{{pageData.all_money}}</view>
					</view>
					<view class="tui-progressBottom">
						<view class="">
							确认份额
						</view>
						<view class="">
							总额
						</view>
					</view>
				</l-circularProgress>
			</view>
			<view class="tui-card">
				<view class="tui-cardItem" @click="onClickDeposit('存入金额')">
					<image src="../../static/cunru.png" mode=""></image>
					<text class="">
						存入
					</text>
				</view>
				<view class="tui-border"></view>
				<view class="tui-cardItem" @click="onClickDeposit('转出金额')">
					<image src="../../static/zhuanchu.png" mode=""></image>
					<text class="">
						转出
					</text>
				</view>
				<view class="tui-border"></view>
				<view class="tui-cardItem" @click="onClickParticulars">
					<image src="../../static/mingxi.png" mode=""></image>
					<text class="">
						明细
					</text>
				</view>
			</view>
			<view class="tui-grad">
				<view :class="['tui-gradItem',{'show':gradItem>0}]">
					<image src="../../static/yiqueren.png" mode=""></image>
					<view class="title">
						已确认份额
					</view>
					<view class="desc">
						{{pageData.yue_start_money}}
					</view>
				</view>
				<view :class="['tui-gradItem',{'show':gradItem>3}]">
					<image src="../../static/daiqueren.png" mode=""></image>
					<view class="title">
						待确认份额
					</view>
					<view class="desc">
						{{pageData.yue_stop_money}}
					</view>
				</view>
				<view :class="['tui-gradItem',{'show':gradItem>2}]">
					<image src="../../static/shouyi.png" mode=""></image>
					<view class="title">
						收益
					</view>
					<view class="desc">
						666
					</view>
				</view>
				<view :class="['tui-gradItem',{'show':gradItem>2}]">
					<image src="../../static/shouyilu.png" mode=""></image>
					<view class="title">
						收益率
					</view>
					<view class="desc">
						{{pageData.yield}}
					</view>
				</view>
				<view :class="['tui-gradItem',{'show':gradItem>4}]">
					<image src="../../static/jrrujin.png" mode=""></image>
					<view class="title">
						今日剩余入金次数
					</view>
					<view class="desc">
						{{pageData.ru_count}}
					</view>
				</view>
				<view :class="['tui-gradItem',{'show':gradItem>1}]">
					<image src="../../static/jrchujin.png" mode=""></image>
					<view class="title">
						今日剩余出金次数
					</view>
					<view class="desc">
						{{pageData.chu_count}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		balanceInfo
	} from "@/api/money.js"
	export default {
		data() {
			return {
				pageData: {},
				gradItem: 0
			};
		},
		mounted() {
			const timer = setInterval(_ => {
				if (this.gradItem >= 5) {
					clearInterval(timer)
				}
				this.gradItem++
			}, 500)
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			getDetail() {
				balanceInfo({
					hideLoading: true
				}).then(({
					data
				}) => {
					this.pageData = data
				})
			},
			onClickDeposit(title) {
				uni.navigateTo({
					url: '/pages/transfer/transfer?title=' + title
				})
			},
			onClickParticulars() {
				uni.navigateTo({
					url: '/pages/Particulars/Particulars'
				})
			},
			onClickRight() {
				uni.navigateTo({
					url: '/pages/money/detail'
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f6f7fb;
	}

	.tui-grad {
		border-radius: 0 0 13px 13px;
		padding-bottom: 68rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 20rpx;

		.tui-gradItem {
			width: 300rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 30rpx 0;
			box-sizing: border-box;
			background-color: #fff;
			border-radius: 13px;
			transition: all .5s ease;

			&:nth-child(odd) {
				transform: translateX(-200px);
			}

			&:nth-child(even) {
				transform: translateX(200px);
			}

			&.show {
				transform: translateX(0) !important;
			}

			.title {
				color: #a8a9ac;
				font-size: 26rpx;
				padding-top: 20rpx;
			}

			.desc {
				font-size: 32rpx;
				color: #222;
				padding-top: 6rpx;
			}

			image {
				width: 72rpx;
				height: 72rpx;
			}
		}
	}

	.tui-card {
		background-color: #fff;
		border-radius: 26rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 50rpx;

		.tui-border {
			width: 1px;
			height: 68rpx;
			background-color: #eee;
		}

		.tui-cardItem {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 30rpx;
			box-sizing: border-box;

			text {
				font-size: 26rpx;
				padding-top: 10rpx;
				color: #222;
			}

			image {
				width: 72rpx;
				height: 72rpx;
			}
		}
	}

	.tui-progressBottom {
		position: absolute;
		bottom: -30rpx;
		left: 0;
		right: 0;
		margin: auto;
		width: 350px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #a8a9ac;
		font-size: 20rpx;
	}

	.tui-progress {
		position: absolute;
		top: 160rpx;
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;

		.title {
			color: #a8a9ac;
			font-size: 26rpx;
		}

		.price {
			font-size: 70rpx;
			color: #222;
			padding-top: 20rpx;
		}
	}

	.tui-content {
		padding: 0 60rpx;

		.tui-header {
			display: flex;
			justify-content: flex-end;
			padding-top: 20rpx;

			.box {
				width: 86rpx;
				height: 86rpx;
				background-color: #cbcbcb;
				color: #fff;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>