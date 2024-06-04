<template>
	<view>
		<guo-headerTitle :title="title"></guo-headerTitle>
		<view class="tui-header">
			<view class="tui-form">
				<view class="title">
					{{title}}
				</view>
				<view class="flex flex-column">
					<view class="tui-inputBox">
						<view class="font-bolder">
							￥
						</view>
						<input type="text" class="input" disabled />
					</view>
					<view class="bottom">
						可{{title}}1007992.00CNY, <text>{{title ==  '存入' ? '全部存入' : '全部转出'}}</text>
					</view>
				</view>
			</view>
			<view class="keyboard">
				<view class="capsule">
					<view class="jq_key">
						<button class="tui-keyboard" hover-class="hover-click">
							1
						</button>
						<button class="tui-keyboard" hover-class="hover-click">
							2
						</button>
						<button class="tui-keyboard" hover-class="hover-click">
							3
						</button>
					</view>
					<view class="jq_key">
						<button class="tui-keyboard" hover-class="hover-click">
							4
						</button>
						<button class="tui-keyboard" hover-class="hover-click">
							5
						</button>
						<button class="tui-keyboard" hover-class="hover-click">
							6
						</button>
					</view>
					<view class="jq_key">
						<button class="tui-keyboard" hover-class="hover-click">
							7
						</button>
						<button class="tui-keyboard" hover-class="hover-click">
							8
						</button>
						<button class="tui-keyboard" hover-class="hover-click">
							9
						</button>
					</view>
					<view class="jq_key">
						<button class="tui-keyboard end" hover-class="hover-click">
							.
						</button>
						<button class="tui-keyboard end" hover-class="hover-click">
							0
						</button>
						<button class="tui-keyboard end" hover-class="hover-click">
							<image src="../../static/clear.png" mode=""></image>
						</button>
					</view>
				</view>
				<view class="tui-submit tui-cancle">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ''
			};
		},
		onLoad(e) {
			this.title = e.title
		}
	}
</script>

<style lang="less">
	.end {
		margin-bottom: 0;
	}

	.hover-click {
		background-color: #fff !important;
	}

	.tui-cancle {
		background-color: rgb(241, 243, 246) !important;
		color: #a8a9ac !important;
	}

	.tui-submit {
		background: #822151;
		color: #fff;
		width: 320rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		padding: 30rpx 0;
		font-size: 32rpx;
		margin: 0 auto;
		margin-top: 44rpx;
	}

	.tui-header {
		padding: 0 36rpx;

		.keyboard {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			border-radius: 48rpx 48rpx 0 0;
			padding: 48rpx 40rpx 100rpx;
			background-color: #fff;
			box-sizing: border-box;

			.capsule {
				height: 100%;
				position: relative;
				background-color: #fff;

				.jq_key {
					display: flex;
					justify-content: space-between;
					height: 25%;

					.tui-keyboard {
						background-color: #f5f7fb;
						box-sizing: border-box;
						margin-bottom: 40rpx;
						width: 200rpx;
						height: 90rpx;
						line-height: 90rpx;
						border-radius: 22px;
						font-size: 40rpx;
						font-weight: 600;
						display: flex;
						justify-content: center;
						align-items: Center;
						border: 1px solid #f5f7fb;

						image {
							width: 32px;
							height: 32px;
						}
					}
				}
			}
		}

		.tui-form {
			margin-top: 60rpx;

			display: flex;
			flex-direction: column;
			font-size: 28rpx;
			color: #303133;
			border-radius: 13px;

			.bottom {
				font-size: 24rpx;
				padding-top: 15rpx;
				color: #a8a9ac;

				text {
					color: #822151;
					padding-left: 10rpx;
				}
			}

			.tui-inputBox {
				height: 160rpx;
				border-bottom: 1px solid rgba(0, 0, 0, .18);
				display: flex;
				align-items: center;


				.font-bolder {
					font-weight: 800;
					font-size: 62rpx;
				}

				.input {
					flex: 1;
					height: 100rpx;
					font-size: 62rpx;
				}
			}

			.title {
				font-size: 24rpx;
			}
		}
	}
</style>