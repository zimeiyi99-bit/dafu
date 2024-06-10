<template>
	<view>
		<guo-headerTitle title="余额宝明细" backgroundColor="#fff"></guo-headerTitle>
		<view class="tui-tabs">
			<v-tabs v-model="activeTab" :scroll="false" :tabs="tabs" color="rgb(168, 169, 172)" activeColor="#222" bold
				lineColor="#822151" :lineScale="0.1" @change="getList"></v-tabs>
		</view>
		<view class="tui-headerTitle">
			<view class="tui-card" v-for="(item,index) in pageList" :key="index">
				<view class="tui-left">
					<view class="title">
						{{tabs[item.type]}}
					</view>
					<view class="time">
						{{item.create_time}}
					</view>
				</view>
				<view class="tui-right">
					{{item.amount}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		balanceLog
	} from "@/api/money.js"
	export default {
		data() {
			return {
				tabs: ['全部', '已确定', '待确定', '收益', '转出'],
				activeTab: 0,
				pageList: [],
			};
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				balanceLog({
					type: this.activeTab
				}).then(({
					data
				}) => {
					this.pageList = data.lists
				})
			}
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