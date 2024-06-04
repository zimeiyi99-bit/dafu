<template>
	<view>
		<guo-headerTitle title="入金明细"></guo-headerTitle>
		<view class="tui-headerTitle">
			<view class="tui-card">
				<view class="tui-left">
					<view class="title">
						2000.00
					</view>
					<view class="time">
						订单编号 <text>WCDMR64HH3F</text>
					</view>
				</view>
				<view class="tui-right">
					<view class="message">
						失败：
					</view>
					<view class="time">
						2024-06-04 20:51:02
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
		}
	}
</script>

<style lang="less">
	.tui-headerTitle {
		padding: 0 36rpx;

		.tui-card {
			background-color: #fff;
			border-radius: 13px;
			padding: 26rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;

			.tui-right {
				display: flex;
				flex-direction: column;

				.message {
					font-size: 20rpx;
					color: #f33b50;
					text-align: right;
				}

				.time {
					color: #a8a9ac;
					font-size: 20rpx;
				}
			}

			.tui-left {
				display: flex;
				flex-direction: column;

				.title {
					font-size: 28rpx;
					color: #222;
				}

				.time {
					color: #a8a9ac;
					font-size: 20rpx;
					padding-top: 6rpx;

					text {
						padding-left: 10rpx;
					}
				}
			}
		}
	}
</style>