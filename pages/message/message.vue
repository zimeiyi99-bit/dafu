<template>
	<view>
		<guo-headerTitle title="系统消息"></guo-headerTitle>
		<view class="tui-header">
			<view class="tui-card">
				<view class="tui-leftIcon">
					<image src="../../static/js-yd.png" mode=""></image>
				</view>
				<view class="tui-right">
					<view class="desc">
						尊敬的用户您好，您的秒合约订单BOSTT8WRPWXA3TR已结算成功，结算金额5250.00，请查阅
					</view>
					<view class="time">
						2024-06-04 20:54:20
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
	.tui-header {
		padding: 0 36rpx;

		.tui-card {
			background-color: #fff;
			border-radius: 13px;
			margin-top: 20rpx;
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			.tui-right {
				display: flex;
				flex-direction: column;
				padding-left: 10rpx;
				.desc {
					color: #aeaeae !important;
					font-size: 28rpx;
				}

				.time {
					color: #aeaeae !important;
					font-size: 24rpx;
					padding-top: 16rpx;
				}
			}

			.tui-leftIcon {
				width: 44rpx;
				height: 44rpx;
				border-radius: 50%;
				display: flex;
				flex-shrink: 0;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>