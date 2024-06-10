<template>
	<view>
		<guo-headerTitle :title="title" :isTitleImg="true" :isRight="true"
			@onClickTitle="onClickTitle"></guo-headerTitle>
		<view class="tui-header">
			<view class="tui-Content">
				<view class="tui-left">
					<view class="bar"></view>
					<view class="static">
						<view class="title">
							{{goodsItem.price}}
						</view>
						<view class="flex flex-between flex-item">
							<text class="tui-size">{{goodsItem.open_price}}</text>
							<view class="flex flex-item p-l">
								<image src="../../static/green_down.png" mode=""></image>
								<text class="tui-size" style="color: #0bb563;">{{goodsItem.zf}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="tui-bg">
					<image src="../../static/border-img.png" mode=""></image>
				</view>
				<view class="tui-right">
					<view class="flex flex-column">
						<view class="item flex flex-column flex-between">
							<view class="right-size">
								24H最高
							</view>
							<view class="right-max">
								{{goodsItem.price_high}}
							</view>
						</view>
						<view style="flex: 1;"></view>
						<view class="item flex flex-column flex-between">
							<view class="right-size">
								24H最低
							</view>
							<view class="right-max">
								{{goodsItem.price_low}}
							</view>
						</view>
					</view>
					<view style="flex: 1;"></view>
					<view class="flex flex-column">
						<view class="item flex flex-column flex-between">
							<view class="right-size">
								24H量(MX)
							</view>
							<view class="right-max">
								1.50987
							</view>
						</view>
						<view style="flex: 1;"></view>
						<view class="item flex flex-column flex-between">
							<view class="right-size">
								24H额
							</view>
							<view class="right-max">
								1.50987
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="tui-tabs">
				<v-tabs :isTime="true" v-model="activeTab" :scroll="false" :tabs="tabs" color="rgb(168, 169, 172)"
					activeColor="#222" bold lineColor="#822151" :lineScale="0.2" bgColor="#f6f7fb" :zIndex="1"></v-tabs>
			</view>
			<kline></kline>
		</view>
		<uni-drawer ref="showLeft" mode="left" :width="300">
			<scroll-view style="height: 100%;" scroll-y="true">
				<view class="tui-draw">
					<view class="title">
						产品交易
					</view>
					<view class="tui-search">
						<uni-easyinput class="uni-mt-5" suffixIcon="search" placeholder="请输入产品名称" :inputBorder="true"
							:styles="styles" primaryColor="#822151"
							placeholderStyle="color:#c9c9c9;font-size:28rpx"></uni-easyinput>
					</view>
					<view class="">
						<v-tabs v-model="currentIndex" :tabs="['货币种类']" color="#a8a9ac" activeColor="#222"
							lineColor="#822151" bold bgColor=""></v-tabs>
					</view>
					<!-- 货币种类 -->
					<view class="tui-variety">

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
							<view class="tui-varietyContentItem" v-for="(item,index) in 9" :key="index">
								<view class="name">
									<text class="piceName">欧元/美元</text>
									<view class="flex-column" style="color: #a8a9ac;font-size: 20rpx;">
										<text>24H量</text>
										<text>961k</text>
									</view>
								</view>
								<view class="tui-rightVariety" style="flex: 1;">

									<view class="code">
										1.08484
									</view>
									<view style="justify-content: flex-end;" class="flex">
										<view class="tui-end">
											+0.16%
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	import {
		goods_dec
	} from '@/api/money.js'
	export default {
		components: {
			kline: () => import("@/components/kline/index.vue"),
		},

		data() {
			return {
				title: '',
				tabs: ['1m', '5m', '30m', '1h', '4h', '1d', '1w'],
				activeTab: 0,
				currentIndex: 0,
				styles: {
					'borderColor': '#f6f8fa'
				},
				goodsId: 0,
				goodsItem: {}
			};
		},
		onLoad(e) {
			this.title = e.title
			this.goodsId = e.Id
			this.goods_dec()
		},
		methods: {
			goods_dec() {
				goods_dec({
					id: this.goodsId,
					hideLoading: true,
				}).then(({
					data
				}) => {
					this.goodsItem = data
				})
			},
			onClickTitle() {
				console.log(1)
				this.$refs.showLeft.open();
			}
		}
	}
</script>

<style lang="less">
	.tui-draw {
		padding: 46px 0px 27px;

		.tui-rightVariety {
			width: 300rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.tui-variety {

			position: relative;

			padding-bottom: 60rpx;

			.tui-varietyContent {
				display: flex;
				flex-direction: column;

				.tui-varietyContentItem {
					width: 100%;
					background-color: #fff;
					border-radius: 13px;

					padding: 20rpx 30rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;

					.tui-end {


						color: #f33b50;


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
							font-size: 30rpx;
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


			}

			.title {
				font-size: 32rpx;
				color: #222;
				padding-bottom: 20rpx;
			}
		}

		.tui-search {
			padding: 30rpx;
			box-sizing: border-box;
		}

		.title {
			padding-left: 40rpx;
			font-size: 60rpx;
			font-weight: 800;

		}
	}

	/deep/.uni-easyinput__content {
		border-radius: 30px;
	}

	/deep/.uni-easyinput__content-input {
		height: 90rpx;
		border-radius: 30px;
	}

	/deep/.uni-easyinput {
		background-color: #f6f8fa;
		border-radius: 30px;
	}

	/deep/.uni-forms-item__label {
		color: #a8a9ac !important;
	}

	.p-l {
		padding-left: 10rpx;
	}

	.tui-tabs {
		margin: 30rpx 0;
	}

	.right-size {
		font-size: 20rpx;
		color: #a8a9ac;
	}

	.right-max {
		font-size: 24rpx;
		padding-top: 4rpx;
		color: #222;
	}

	.tui-header {
		padding: 0 36rpx;

		.tui-Content {
			border-radius: 13px;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			margin-top: 40rpx;

			.tui-right {
				padding: 24rpx 40rpx 24rpx 0;
				flex: 28;
				display: flex;
			}

			.tui-bg {
				width: 14rpx;
				height: 208rpx;
				margin: 0 40rpx 0 26rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.tui-left {
				display: flex;
				align-items: center;
				font-weight: 500;
				padding: 42rpx 0;
				flex: 18;
				font-size: 62rpx;

				.static {
					height: 100rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					color: #f33b50;

					image {
						width: 16rpx;
						height: 16rpx;
					}

					.tui-size {
						color: #a8a9ac;
						font-size: 20rpx;
					}

					.title {
						font-size: 40rpx;
						overflow-wrap: break-word;
						max-width: 132px;
						font-weight: bold;
					}
				}

				.bar {
					width: 8rpx;
					height: 90rpx;
					margin-right: 32rpx;
					background-color: #f33b50;
				}
			}
		}
	}
</style>