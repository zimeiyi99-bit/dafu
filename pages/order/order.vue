<template>
	<view>
		<guo-headerTitle title="订单记录" :backgroundColor="backgroundColor"></guo-headerTitle>
		<view class="tui-tabs">
			<v-tabs v-model="activeTab" :scroll="false" :tabs="['持仓列表', '平仓记录']" color="rgb(168, 169, 172)"
				activeColor="#222" bold lineColor="#822151" :lineScale="0.1"></v-tabs>
		</view>
		<view class="tui-card">
			<view class="tui-box">
				<view class="tui-title">
					<view class="flex flex-item">
						<text class="name">欧元/美元</text>
						<text class="desc">360S</text>
					</view>
					<view class="right tui-red">
						收购
					</view>
				</view>
				<view class="tui-orderTitle">
					<view class="">
						订单编号
					</view>
					<view class="code">
						BOSTT8WRPWXA3TR
					</view>
				</view>
				<view class="flex flex-wrap">
					<view class="tui-wrapItem">
						<view class="">
							金额
						</view>
						<view class="pice">
							5000.00
						</view>
					</view>
					<view class="tui-wrapItem" style="width: 46%;">
						<view class="">
							盈亏
						</view>
						<view class="pice tui-green">
							250.00
						</view>
					</view>
					<view class="tui-wrapItem text-des-color">
						<view class="">
							购买价
						</view>
						<view class="pice">
							1.08
						</view>
					</view>
					<view class="tui-wrapItem text-des-color" style="width: 46%;">
						<view class="">
							成交价
						</view>
						<view class="pice">
							1.140000
						</view>
					</view>
					<view class="flex flex-item flex-between w-100 text-des-color p-2">
						<view class="left">
							<view class="">
								持仓时间
							</view>
							<view class="pice">
								2024-05-25 17:41:28
							</view>
						</view>
						<view class="right" style="width: 46%;">
							<view class="">
								平仓时间
							</view>
							<view class="pice">
								2024-05-25 17:44:28
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
				backgroundColor: '#fff',
				activeTab: 0
			};
		}
	}
</script>

<style lang="less">
	.flex-wrap {
		flex-wrap: wrap;
	}

	.w-100 {
		width: 100%;
	}

	.text-des-color {
		color: #a8a9ac !important;
		font-size: 20rpx !important;
	}

	.tui-red {
		color: #f33b50 !important;
	}

	.tui-green {
		color: #0bb563 !important;
	}

	.p-2 {
		padding-top: 10rpx;
	}

	.tui-card {
		padding: 0 36rpx;

		.tui-box {
			margin: 0 0 20rpx;
			background-color: #fff;
			border-radius: 13px;
			font-size: 24rpx;
			color: #a8a9ac;
			padding: 20rpx;
			box-sizing: border-box;
			margin-top: 20rpx;

			.left,
			.right {
				display: flex;
				flex-direction: column;

			}

			.tui-wrapItem {
				padding-top: 12rpx;
				color: #222;
				display: flex;
				align-items: center;
				width: 54%;

				.pice {
					font-weight: 700;
					padding-left: 20rpx;
				}
			}

			.tui-orderTitle {
				padding-top: 20rpx;
				display: flex;
				align-items: center;
				color: #222;

				.code {
					padding-left: 20rpx;
				}
			}

			.tui-title {
				padding-bottom: 20rpx;
				border-bottom: 1px solid #eee;
				font-size: 28rpx;
				font-weight: 700;
				color: #222;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.right {
					color: #f33b50;
				}

				.desc {
					color: #fc6d22;
					font-size: 24rpx;
					padding-left: 10rpx;
				}
			}
		}
	}
</style>