<template>
	<view class="">
		<guo-headerTitle title="设置"></guo-headerTitle>
		<view class="tui-header">
			<view class="tui-list">
				<view class="tui-listItem">
					<view class="flex-item flex">
						<view class="title">
							语言设置
						</view>
					</view>
					<view class="flex flex-item">
						<view class="language">
							简体中文
						</view>
						<image class="tui-rightIcon" src="/static/youjian.png" mode=""></image>
					</view>
				</view>
				<view class="tui-listItem">
					<view class="flex-item flex">
						<view class="title">
							清除缓存
						</view>
					</view>

				</view>
				<view class="tui-listItem" style="background-color: #f4eadd;padding: 30rpx;margin-top: 40rpx;">
					<view class="flex-item flex">
						<view class="title" style="color: #fc6d22;">
							如需更改密码，请联系客服
						</view>
					</view>
					<view class="flex flex-item">
						<uni-icons type="right" size="15" style="color: #fc6d22;"></uni-icons>

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
			onClickLeft() {
				uni.navigateBack(-1)
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f6f7fb;
	}

	.tui-header {
		padding: 0 36rpx;
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

			.language {
				color: #a8a9ac;
				font-size: 30rpx;
				padding-right: 20rpx;
			}

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

	.tui-set {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		color: #222;
		font-weight: bold;
	}

	.tui-leftIcon {
		width: 80rpx;
		height: 80rpx;
		color: #fff !important;
		background-color: #cbcbcb;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;

	}
</style>