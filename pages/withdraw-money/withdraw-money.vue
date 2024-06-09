<template>
	<view>
		<guo-headerTitle title="出金"></guo-headerTitle>
		<view class="tui-pd">
			<view class="tui-card">
				<uni-forms ref="baseForm" :modelValue="formData" label-position="top" label-width="200px">
					<uni-forms-item>
						<view class="tui-form">
							<view class="title">
								出金金额(CNY)
							</view>
							<view class="flex flex-column">
								<view class="tui-inputBox">
									<view class="font-bolder">
										￥
									</view>
									<input v-model="formData.money" @input="validateInput" type="text" class="input" />
								</view>
								<view class="bottom">
									可用余额: <text>￥{{userInfo.money}}</text>
								</view>
							</view>
						</view>
					</uni-forms-item>
					<uni-forms-item label="选择出金方式">
						<view class="tui-list">
							<view class="tui-listItem" @click="onClickOpen">
								<view class="flex-item flex">
									<view class="title">
										{{typeList[formData.pay_type]}}
									</view>
								</view>
								<view class="flex flex-item">
									<uni-icons :type="typeShow ? 'down' : 'up'" size="20"
										style="color: rgb(96, 98, 102)"></uni-icons>
								</view>
							</view>
							<view v-if="!binded" class="tui-listItem"
								style="background-color: #f4eadd;padding: 30rpx;margin-top: 40rpx;"
								@click="onClickDetail(formData.pay_type)">
								<view class="flex-item flex">
									<view class="title" style="color: #fc6d22;">
										您还未绑定{{typeList[formData.pay_type]}}
									</view>
								</view>
								<view class="flex flex-item">
									<uni-icons type="right" size="15" style="color: #fc6d22;"></uni-icons>

								</view>
							</view>

						</view>
					</uni-forms-item>
					<!-- 绑定过银行卡展示的-->
					<template v-if="formData.pay_type == 'bank_card'">
						<uni-forms-item label="姓名">
							<view class="tui-list">
								<view class="tui-listItem">
									<view class="flex-item flex">
										<view class="title">
											{{selectCashInfo.user_name}}
										</view>
									</view>
								</view>
							</view>
						</uni-forms-item>
						<uni-forms-item label="国籍">
							<view class="tui-list">
								<view class="tui-listItem">
									<view class="flex-item flex">
										<view class="title">
											{{selectCashInfo.gj}}
										</view>
									</view>
								</view>
							</view>
						</uni-forms-item>
						<uni-forms-item label="开户地址">
							<view class="tui-list">
								<view class="tui-listItem">
									<view class="flex-item flex">
										<view class="title">
											{{selectCashInfo.bank_branch}}
										</view>
									</view>
								</view>
							</view>
						</uni-forms-item>
						<uni-forms-item label="开户行">
							<view class="tui-list">
								<view class="tui-listItem">
									<view class="flex-item flex">
										<view class="title">
											{{selectCashInfo.bank_name}}
										</view>
									</view>
								</view>
							</view>
						</uni-forms-item>
						<uni-forms-item label="卡号">
							<view class="tui-list">
								<view class="tui-listItem">
									<view class="flex-item flex">
										<view class="title">
											{{selectCashInfo.account}}
										</view>
									</view>
								</view>
							</view>
						</uni-forms-item>
					</template>
					<!-- trc和erc的 -->
					<template v-else>
						<uni-forms-item label="地址">
							<view class="tui-list">
								<view class="tui-listItem">
									<view class="flex-item flex">
										<view class="title">
											{{selectCashInfo.usdt_url}}
										</view>
									</view>
								</view>
							</view>
						</uni-forms-item>
						<view class="tui-submit tui-cancle">
							确定出金
						</view>
					</template>
					<uni-forms-item label="交易密码">

						<uni-easyinput v-model="formData.mpwd" type="password" passwordIcon :inputBorder="true"
							:styles="styles" primaryColor="#822151" />
					</uni-forms-item>
					<view class="tui-submit" :class="[{'tui-cancle':btnDisabled}]" @click="onSubmit">
						确定出金
					</view>

				</uni-forms>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" @maskClick="maskClick">
			<view class="tui-popupContent">
				<view class="flex flex-between flex-item p-26">
					<view class="title">
						选择出金方式
					</view>
					<view class="cancle" @click="onClickCancle">
						取消
					</view>
				</view>
				<view class="tui-content">
					<view class="tui-contentItem" v-for="(value,key,index) in typeList" :key="index"
						@click="onClickCurrentIndex(key,index)" :class="[{'tui-activite':formData.pay_type==key}]">
						{{value}}
					</view>

				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		userInfo,
		userGetCash,
		userWithdraw
	} from "@/api/user.js"

	export default {
		data() {
			return {
				formData: {
					money: '',
					pay_type: 'bank_card',
					mpwd: ''
				},
				typeList: {
					'bank_card': '银行卡',
					'usdt-trc20': 'USDT-TRC20',
					'usdt-erc20': 'USDT-ERC20',
				},

				typeShow: true,
				styles: {
					'borderColor': '#fff'
				},
				userInfo: {},
				cashInfo: {}
			};
		},
		onShow() {
			this.getDetail()
		},
		computed: {
			btnDisabled() {
				const {
					formData
				} = this
				if (!this.binded) {
					return true
				}
				try {
					Object.entries(formData).forEach(([key, val]) => {
						if (!val && key !== 'usdt_url') {
							throw ('有空值')
						}
					})
				} catch (e) {
					return true
				}

				return false
			},
			binded() {
				const {
					cashInfo,
					formData: {
						pay_type
					}
				} = this
				if (cashInfo[pay_type]) {
					try {
						Object.entries(cashInfo[pay_type]).forEach(([key, val]) => {
							if (!val) {
								throw ('有空值')
							}
						})
					} catch (e) {
						return false
					}
					return true
				}
			},
			selectCashInfo() {
				const {
					cashInfo,
					formData: {
						pay_type
					}
				} = this
				if (cashInfo[pay_type])
					return cashInfo[pay_type]
				else {
					return {}
				}
			}
		},
		methods: {
			validateInput() {
				let value = this.$utils.validateAmount(this.formData.money, this.userInfo.money);
				this.$nextTick(_ => {
					// 更新 v-model
					this.formData.money = value;
				})
			},
			onSubmit() {
				if (this.btnDisabled) return
				userWithdraw({
					...this.formData,
				}).then(({
					data
				}) => {
					uni.showModal({
						title: '操作成功',
						content: "请耐心等待到账",
						showCancel: false,
					}).then(_ => {
						uni.navigateBack()
					})

				})
			},
			onClickDetail(type) {
				uni.navigateTo({
					url: '/pages/account/account-detail?pay_type=' + type
				})
			},
			getDetail() {
				userInfo().then(({
					data
				}) => {
					this.userInfo = data
				})
				userGetCash().then(({
					data
				}) => {
					this.cashInfo = data
				})
			},
			maskClick() {
				this.typeShow = true
			},
			onClickOpen() {
				this.$refs.popup.open()
				this.typeShow = false
			},
			onClickCancle() {
				this.$refs.popup.close()
				this.typeShow = true
			},
			onClickCurrentIndex(item, index) {
				this.formData.pay_type = item;
				this.$refs.popup.close()
				this.typeShow = true
			}
		}
	}
</script>

<style lang="less">
	.tui-activite {
		background-color: #f3f5f6 !important;
		color: #822151 !important;
	}

	.tui-cancle {
		background-color: rgb(241, 243, 246) !important;
		color: #a8a9ac !important;
	}

	.tui-submit {
		margin-top: 44rpx;
		background: #822151;
		color: #fff;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		padding: 30rpx 0;
		font-size: 32rpx;
	}

	.tui-popupContent {
		border-radius: 24px 24px 0 0;
		padding: 48rpx 0 0;
		background-color: #fff;

		.p-26 {
			padding: 0 32rpx;
		}

		.tui-content {
			margin-top: 40rpx;
			padding-bottom: 100rpx;

			.tui-contentItem {
				height: 100rpx;
				font-size: 28rpx;
				color: #222;
				display: flex;
				align-items: center;
				padding: 0 32rpx;
			}
		}

		.title {
			font-size: 32rpx;
			font-weight: 800;
			color: #222;
		}

		.cancle {
			color: #a8a9ac;
			font-size: 28rpx;
		}
	}

	.tui-list {
		display: flex;
		flex-direction: column;
		width: 100%;

		.tui-listItem {
			width: 100%;
			font-size: 30rpx;
			background-color: #fff;
			border-radius: 13px;
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;

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

	.tui-pd {
		padding: 0 36rpx;

		.tui-card {

			padding-bottom: 40rpx;

			.tui-form {
				background: linear-gradient(125deg, #fff, #fff);
				padding: 24rpx 40rpx;
				display: flex;
				flex-direction: column;
				font-size: 28rpx;
				color: #303133;
				border-radius: 13px;

				.bottom {
					font-size: 24rpx;
					padding-top: 8rpx;

					text {
						color: #fc6d22;
					}
				}

				.tui-inputBox {
					height: 100rpx;
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
	}

	/deep/.uni-easyinput__content {
		border-radius: 30rpx;
		border-color: #fff !important;
	}

	/deep/.uni-easyinput__content-input {
		height: 95rpx;
		border-radius: 30rpx;

	}

	/deep/.uni-easyinput {
		background-color: #fff;
		border-radius: 30rpx;

	}

	/deep/.uni-forms-item__label {
		color: #a8a9ac !important;
	}
</style>