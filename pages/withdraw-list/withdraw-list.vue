<template>
	<view>
		<guo-headerTitle title="出金明细"></guo-headerTitle>
		<view class="tui-headerTitle">
			<view class="tui-card" v-for="(item,index) in List" :key="index">
				<view class="tui-left">
					<view class="title">
						{{item.money}}
					</view>
					<view class="time">
						订单编号 <text>WCDMRFWES{{item.id}}</text>
					</view>
				</view>
				<view class="tui-right">
					<view class="message">
						{{item.status == 1 ? '成功' : item.status == 2 ? '审核中' : '失败'}}
					</view>
					<view class="time">
						{{item.time}}
					</view>
				</view>
			</view>
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="red"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn" text="暂无出金记录">
			<image src="../../static/cj.png" class="tui-allImage" mode=""></image>
		</tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
	import {
		withdraw_record
	} from '@/api/money.js'
	export default {

		data() {
			return {
				List: [],
				PageIndex: 1,
				PageSize: 10,
				loadding: false,
				pullUpOn: true,
			};
		},
		onLoad() {
			this.withdraw_record()
		},
		methods: {
			withdraw_record() {
				withdraw_record({
					hideLoading: true,
					page: this.PageIndex
				}).then(({
					data
				}) => {
					console.log(data)

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