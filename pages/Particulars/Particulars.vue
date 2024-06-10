<template>
	<view>
		<guo-headerTitle title="余额宝明细" backgroundColor="#fff"></guo-headerTitle>
		<view class="tui-tabs">
			<v-tabs v-model="activeTab" :scroll="false" :tabs="['全部', '存入', '转出', '收益']" color="rgb(168, 169, 172)"
				activeColor="#222" bold lineColor="#822151" :lineScale="0.1" @change="onChangeTab"></v-tabs>
		</view>
		<view class="tui-headerTitle" v-if="!isData">
			<view class="tui-card" v-for="(item,index) in List" :key="index">
				<view class="tui-left">
					<view class="title">
						{{item.type == 1 ? '已确定' : item.type == 2 ? '待确定' : item.type == 3 ? '收益' : '转出'}}
					</view>
					<view class="time">
						{{item.create_time}}
					</view>
				</view>
				<view class="tui-right">
					{{item.amount}}
				</view>
			</view>
			<!--加载loadding-->
			<tui-loadmore :visible="loadding" :index="3" type="red"></tui-loadmore>
			<tui-nomore :visible="!pullUpOn" text="没有更多了~"></tui-nomore>
			<!--加载loadding-->
		</view>
		<template v-if="isData">
			<tui-noData title="暂无数据">
				<image src="../../static/xjb.png" class="tui-allImage" mode=""></image>
			</tui-noData>
		</template>
	</view>
</template>

<script>
	import {
		getMoneyLog
	} from '@/api/money.js'
	export default {
		data() {
			return {
				activeTab: 0,
				List: [],
				PageIndex: 1,
				PageSize: 10,
				loadding: false,
				pullUpOn: true,
				isData: true,
				pageCount: 0
			};
		},
		onLoad() {
			this.getMoneyLog()
		},
		// 上拉加载
		async onReachBottom() {
			if (!this.pullUpOn) return;
			this.PageIndex = this.PageIndex + 1;
			this.loadding = true;
			if (this.PageIndex <= this.pageCount) {
				await this.getMoneyLog()
			} else {
				this.loadding = false;
				this.pullUpOn = false
			}

			console.log(this.FileInfoList.length)
		},
		methods: {
			onChangeTab() {
				this.getMoneyLog()
			},
			getMoneyLog() {
				getMoneyLog({
					type: this.activeTab
				}).then(({
					data
				}) => {
					console.log(data)
					if (data.lists.length !== 0) {
						this.isData = false
					} else {
						this.isData = true
					}
					if (!data.lists || data.lists.length < this.PageSize) {
						this.pullUpOn = false;
					}
					this.loadding = false;
					if (this.PageIndex == 1) {
						this.List = data.lists
					} else {
						this.List = this.List.concat(data.lists)
					}
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