<template>
	<view>
		<view class="tui-content">
			<view class="tui-header">
				<view class="box" @click="onClickRight">
					<uni-icons type="help" size="30" style="color: #fff;"></uni-icons>
				</view>
			</view>
			<view class="">
				<l-circularProgress :fontShow="false" :percent="66" type="halfCircular" :lineWidth="20" :boxWidth="360"
					progressColor="#822151" bgColor="#fff">
					<view class="tui-progress">
						<view class="title">余额宝总额</view>
						<view class="price">￥1258.00</view>
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
					<image src="../../static/xiazai.png" mode=""></image>
					<text class="">
						存入
					</text>
				</view>
				<view class="tui-border"></view>
				<view class="tui-cardItem" @click="onClickDeposit('转出金额')">
					<image src="../../static/xiazai.png" mode=""></image>
					<text class="">
						转出
					</text>
				</view>
				<view class="tui-border"></view>
				<view class="tui-cardItem" @click="onClickParticulars">
					<image src="../../static/xiazai.png" mode=""></image>
					<text class="">
						明细
					</text>
				</view>
			</view>
			<view class="tui-grad">
				<view class="tui-gradItem " v-for="(item,index) in 6" :key="index" :class="value">
					<image src="../../static/cunru.png" mode=""></image>
					<view class="title">
						已确认份额
					</view>
					<view class="desc">
						5
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

			};
		},
		methods: {
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