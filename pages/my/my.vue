<template>
	<view class="tui-header">
		<view class="tui-userInfo">
			<view class="name">
				lvo123
			</view>
			<view class="desc">
				<view class="rellname">
					林*
				</view>
				<view class="tui-vip">
					<image src="/static/vip.png" mode=""></image>
					<view class="">
						普通用户
					</view>
				</view>
				<view class="tui-credit">
					<image src="/static/xinyong.png" mode=""></image>
					<view class="">
						信用分:100
					</view>
				</view>
				<view class="tui-credit" style="color: #4B7CFE;">
					<image src="/static/renzheng.png" mode=""></image>
					<view class="">
						已认证
					</view>
				</view>
			</view>
		</view>
		<view class="tui-money">
			<view class="normal">
				<view class="flex flex-column">
					<view class="text-xs">
						总资产(CNY)
					</view>
					<view class="pice">
						<text class="unit">￥</text>
						1010000.00
					</view>
					<view class="mt-sm">
						<text>≈</text>
						<view class="unit">
							138166.89USDT
						</view>
					</view>
				</view>
				<view class="flex-1"></view>
				<view class="flex flex-between flex-content" style="margin-top: 60rpx;">
					<view class="flex flex-column flex-item">
						<view class="all-size">
							账户盈亏
						</view>
						<view class="big-size">
							10000.00
						</view>
					</view>
					<view class="flex flex-column flex-item" style="margin-left: 84rpx;">
						<view class="all-size">
							今日盈亏
						</view>
						<view class="big-size">
							0.00
						</view>
					</view>
				</view>
				<view class="tui-position">
					<image src="../../static/cny.png" mode=""></image>
				</view>
			</view>
			<view class="tui-spendMoney">
				<view class="tui-spendMoneyItem">
					<view class="cny">
						可用余额(CNY)
					</view>
					<view class="pice">
						￥1008742.00
					</view>
				</view>
				<view class="tui-rightItem">
					<image src="/static/rujin.png" mode=""></image>
					<view class="text">
						入金
					</view>
				</view>
				<view class="tui-rightItem" @click="onClickMoney">
					<image src="/static/rujin.png" mode=""></image>
					<view class="text">
						出金
					</view>
				</view>
			</view>
		</view>
		<view class="tui-list">
			<view class="tui-listItem" v-for="(item,index) in Data" :key="index" @click="onClickPath(item,index)">
				<view class="flex-item flex">
					<image class="logo" src="/static/list-logo.png" mode=""></image>
					<view class="title">
						{{item}}
					</view>
				</view>
				<image class="tui-rightIcon" src="../../static/youjian.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Data: ['实名认证', '订单记录', '入金明细', '出金明细', '资金记录', '出款账户', '设置', '退出登录', ]
			};
		},
		methods: {
			onClickMoney() {
				uni.navigateTo({
					url:'/pages/withdraw-money/withdraw-money'
				})
			},
			onClickPath(item, index) {
				switch (item) {
					case '设置':
						uni.navigateTo({
							url: '/pages/set/set'
						})
						break;
					case '退出登录':
						uni.showModal({
							title: '退出登录',
							content: '您确定要退出登录吗?',
							confirmColor: '#222',
							cancelColor: '#222',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						break;
					case '出款账户':
						uni.navigateTo({
							url: '/pages/account/account'
						})
						break;
					case '资金记录':
						uni.navigateTo({
							url: '/pages/money-record/money-record'
						})
						break;
					case '订单记录':
						uni.navigateTo({
							url: '/pages/order/order'
						})
						break;
					case '出金明细':
						uni.navigateTo({
							url: '/pages/withdraw-list/withdraw-list'
						})
						break;
					case '入金明细':
						uni.navigateTo({
							url: '/pages/withdraw-list/withdraw-open'
						})
						break;
					case '实名认证':
						uni.navigateTo({
							url: '/pages/verify/verify'
						})
						break;
				}

			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f6f7fb;
	}



	.tui-list {
		padding-bottom: 160rpx;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		width: 100%;

		.tui-listItem {
			width: 100%;
			font-size: 30rpx;
			background-color: #fff;
			border-radius: 13px;
			padding: 20rpx;
			box-sizing: border-box;
			display: flex;
			margin-top: 20rpx;
			display: flex;

			align-items: center;
			justify-content: space-between;

			.tui-rightIcon {
				width: 6px;
				height: 11px;
			}

			.title {
				font-size: 30rpx;
				color: #222;
			}

			.logo {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}
	}

	.tui-spendMoney {
		font-size: 26rpx;
		display: flex;
		margin-top: 20rpx;

		.tui-rightItem {
			margin-left: 20rpx;
			padding: 28rpx;
			width: 180rpx;
			background-color: #fff;
			border-radius: 13px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.text {
				font-size: 32rpx;
				font-weight: 500;
				padding-top: 18rpx;
				color: #222;
			}

			image {
				width: 55rpx;
				height: 55rpx;
			}
		}

		.tui-spendMoneyItem {
			padding: 28rpx;
			width: 300rpx;
			align-items: flex-start;
			background-color: #fff;
			border-radius: 13px;
			display: flex;
			flex-direction: column;

			.cny {
				color: #a8a9ac;
				font-size: 20rpx;
			}

			.pice {
				font-size: 32rpx;
				font-weight: 500;
				padding-top: 20rpx;
			}
		}
	}

	.all-size {
		font-size: 20rpx;
		color: #a8a9ac;
	}

	.big-size {
		font-size: 26rpx;
		color: #222;
		padding-top: 10rpx;
	}

	.flex-1 {
		flex: 1;
	}

	.tui-money {
		margin-top: 44rpx;

		.normal {
			background: url(/static/money-bg.png) 0% 0% / cover no-repeat;
			border-radius: 13px;
			padding: 26rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;

			.tui-position {
				width: 100rpx;
				height: 60rpx;
				right: 26rpx;
				top: 26rpx;
				position: absolute;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.mt-sm {
				color: #a8a9ac;
				font-size: 20rpx;
				padding-top: 10rpx;
				display: flex;
				align-items: center;
			}

			.pice {
				font-size: 36rpx;
				font-weight: 500;
				padding-top: 20rpx;
			}

			.text-xs {
				font-size: 20rpx;
				color: #222;
			}
		}
	}

	.tui-header {
		padding: 0 32rpx;

		.tui-userInfo {
			display: flex;

			justify-content: space-between;
			flex-direction: column;
			padding-top: 64rpx;

			.desc {
				display: flex;
				align-items: center;

				.tui-credit {
					background-color: #fff;
					color: rgb(37, 188, 115);
					font-size: 21rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-radius: 12px;
					margin-left: 12rpx;
					height: 40rpx;
					padding: 0 10rpx;

					image {
						width: 26rpx;
						height: 26rpx;
						margin-right: 6rpx;
					}
				}

				.tui-vip {
					background-color: #e4e3ff;
					color: #3f427e;
					font-size: 21rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-radius: 12px;
					margin-left: 12rpx;
					height: 40rpx;
					padding: 0 10rpx;

					image {
						width: 26rpx;
						height: 26rpx;
						margin-right: 6rpx;
					}
				}

				.rellname {
					font-size: 32rpx;
					font-weight: 500;
					padding-top: 6rpx;
					color: #222;
				}
			}

			.name {
				font-size: 44rpx;
				font-weight: bold;
				color: #222;
			}
		}
	}
</style>