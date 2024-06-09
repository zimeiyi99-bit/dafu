<template>
	<view class="tui-header">
		<view class="tui-userInfo">
			<view class="name">
				{{userInfo.username}}
			</view>
			<view class="desc">
				<view class="rellname">
					{{userInfo.real_name.substr(0,1)+new Array(userInfo.real_name.length).join('*')}}
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
						信用分:{{userInfo.credit_score}}
					</view>
				</view>
				<view class="tui-credit" style="color: #4B7CFE;" v-if="userInfo.is_auth==2">
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
						{{userInfo.money}}
					</view>
					<view class="mt-sm">
						<text>≈</text>
						<view class="unit">
							{{userInfo.usdt_money}}USDT
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
							{{userInfo.yk}}
						</view>
					</view>
					<view class="flex flex-column flex-item" style="margin-left: 84rpx;">
						<view class="all-size">
							今日盈亏
						</view>
						<view class="big-size">
							{{userInfo.yk_today}}
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
						￥{{userInfo.money}}
					</view>
				</view>
				<view class="tui-rightItem">
					<image src="/static/rujin.png" mode=""></image>
					<view class="text">
						入金
					</view>
				</view>
				<view class="tui-rightItem" @click="onClickMoney">
					<image src="/static/chujin.png" mode=""></image>
					<view class="text">
						出金
					</view>
				</view>
			</view>
		</view>
		<view class="tui-list">
			<view class="tui-listItem" v-for="(item,index) in settingList" :key="index"
				@click="onClickPath(item,index)">
				<view class="flex-item flex">
					<image class="logo" :src="item.icon" mode=""></image>
					<view class="title">
						{{item.title}}
					</view>
				</view>
				<image class="tui-rightIcon" src="../../static/youjian.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userInfo
	} from "@/api/user.js"
	export default {
		data() {
			return {
				userInfo: {
					real_name:'',
				},
				settingList: [{
					title: '实名认证',
					icon: require("@/static/smrz.png")
				}, {
					title: '订单记录',
					icon: require("@/static/wddd.png")
				}, {
					title: '入金明细',
					icon: require("@/static/kjrj.png")
				}, {
					title: '出金明细',
					icon: require("@/static/chujin.png")
				}, {
					title: '资金记录',
					icon: require("@/static/cwjl.png")
				}, {
					title: '出款账户',
					icon: require("@/static/ck.png")
				}, {
					title: '设置',
					icon: require("@/static/sz.png")
				}, {
					title: '退出登录',
					icon: require("@/static/tcdl.png")
				}, ]
			};
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			getDetail() {
				userInfo({
					hideLoading: true
				}).then(({
					data
				}) => {
					this.userInfo = data
				})
			},
			onClickMoney() {
				uni.navigateTo({
					url: '/pages/withdraw-money/withdraw-money'
				})
			},
			onClickPath(item, index) {
				switch (item.title) {
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
									uni.reLaunch({
										url: '/pages/login/login'
									})
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