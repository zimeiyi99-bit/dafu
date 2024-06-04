<template>
	<view>
		<guo-headerTitle title="余额宝明细" backgroundColor="#fff"></guo-headerTitle>
		<view class="tui-tabs">
			<v-tabs v-model="activeTab" :scroll="false" :tabs="['全部', '存入', '转出', '收益']" color="rgb(168, 169, 172)"
				activeColor="#222" bold lineColor="#822151" :lineScale="0.1"></v-tabs>
		</view>
		<view class="tui-headerTitle">
			<view class="tui-card">
				<view class="tui-left">
					<view class="title">
						存入
					</view>
					<view class="time">
						2024-06-04 16:37:31
					</view>
				</view>
				<view class="tui-right">
					-1258.00
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 0
			};
		}
	}
</script>

<style lang="less">
	.tui-headerTitle {
		padding: 0 36rpx;
		margin-top: 40rpx;
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
				color: #f33b50;
				font-size: 28rpx;
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
				}
			}
		}
	}
</style>