<template>
	<view>
		<view class="tui-search">
			<uni-easyinput class="uni-mt-5" suffixIcon="search" placeholder="请输入产品名称" :inputBorder="true"
				:styles="styles" primaryColor="#822151"
				placeholderStyle="color:#c9c9c9;font-size:28rpx"></uni-easyinput>
		</view>
		<view class="tui-tabs">
			<v-tabs v-model="current" :tabs="tabs" @change="changeTab" color="#a8a9ac" activeColor="#222"
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
				<view class="tui-varietyContentItem" v-for="(item,index) in 10" :key="index">
					<view class="name">
						<text class="piceName">欧元/美元</text>
						<view class="flex-column" style="color: #a8a9ac;font-size: 20rpx;">
							<text>24H量</text>
							<text>961k</text>
						</view>
					</view>
					<view class="code">
						1.08484
					</view>
					<view style="justify-content: flex-end;" class="flex">
						<view class="tui-end">
							+0.165%
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

</view>
</template>

<script>
	export default {
		data() {
			return {
				styles: {
					'borderColor': '#fff'
				},
				current: 0,
				tabs: ['货币种类']
			};
		},
		methods: {
			changeTab(index) {
				console.log('当前选中的项：' + index)
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f6f7fb;
	}

	.tui-variety {
		
		position: relative;
		padding: 0 30rpx;
		padding-bottom: 60rpx;
		.tui-varietyContent {
			display: flex;
			flex-direction: column;

			.tui-varietyContentItem {
				width: 100%;
				background-color: #fff;
				border-radius: 13px;
				margin-top: 26rpx;
				padding: 30rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;

				.tui-end {
					padding: 10rpx;
					width: 80px;
					color: #fff;
					border-radius: 5px;
					background-color: #f33b50;
					font-size: 28rpx;
					box-sizing: border-box;
					text-align: center;
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
						font-size: 32rpx;
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

			.tui-rightVariety {
				width: 300rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
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

	.tui-tabs {
		padding: 0 15rpx;
		box-sizing: border-box;
	}

	/deep/.uni-easyinput__content {
		border-radius: 30px;
	}

	/deep/.uni-easyinput__content-input {
		height: 90rpx;
		border-radius: 30px;
	}

	/deep/.uni-easyinput {
		background-color: #fff;
		border-radius: 30px;
	}

	/deep/.uni-forms-item__label {
		color: #a8a9ac !important;
	}
</style>