<template>
	<view>
		<guo-headerTitle :title="typeList[formData.pay_type]"></guo-headerTitle>
		<!-- 注册 -->
		<view class="tui-register">
			<view class="tui-form">
				<uni-forms ref="baseForm" :modelValue="formData" label-position="top">
					<template v-if="formData.pay_type == 'bank_card'">
						<uni-forms-item label="开户姓名">
							<uni-easyinput :disabled="binded" v-model="formData.user_name" placeholder="请输入开户姓名"
								:inputBorder="true" :styles="styles" primaryColor="#822151" />
						</uni-forms-item>
						<uni-forms-item label="国籍">
							<uni-easyinput :disabled="binded" v-model="formData.gj" placeholder="请输入国籍"
								:inputBorder="true" :styles="styles" primaryColor="#822151" />
						</uni-forms-item>
						<uni-forms-item label="开户银行">
							<uni-easyinput :disabled="binded" v-model="formData.bank_name" placeholder="请输入开户银行"
								:inputBorder="true" :styles="styles" primaryColor="#822151" />
						</uni-forms-item>
						<uni-forms-item label="银行卡账号">
							<uni-easyinput :disabled="binded" v-model="formData.account" placeholder="请输入银行卡账号"
								:inputBorder="true" :styles="styles" primaryColor="#822151" />
						</uni-forms-item>
						<uni-forms-item label="开户地址">
							<uni-easyinput :disabled="binded" v-model="formData.bank_branch" placeholder="请输入开户地址"
								:inputBorder="true" :styles="styles" primaryColor="#822151" />
						</uni-forms-item>
					</template>
					<uni-forms-item label="币种地址" v-else>
						<uni-easyinput :disabled="binded" v-model="formData.usdt_url" placeholder="请输入币种地址"
							:inputBorder="true" :styles="styles" primaryColor="#822151" />
					</uni-forms-item>
					<view class="tui-submit" :class="[{'tui-cancle':btnDisabled}]" @click="onSubmit" v-if="!binded">
						保存
					</view>
				</uni-forms>
				<view class="bindTip">
					如需更改，请联系客服
					<uni-icons type="right" size="12"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userGetCash,
		userBindWithdraw
	} from "@/api/user.js"
	export default {
		data() {
			return {
				binded: false,
				typeList: {
					'bank_card': '银行卡',
					'usdt-trc20': 'USDT-TRC20',
					'usdt-erc20': 'USDT-ERC20',
				},
				formData: {
					user_name: '',
					gj: '',
					bank_name: '',
					account: '',
					bank_branch: '',
					usdt_url: '',
					pay_type: '',
				},
				styles: {
					'borderColor': '#fff'
				}
			};
		},
		computed: {
			btnDisabled() {
				const {
					formData
				} = this
				if (formData.pay_type == 'bank_card') {
					try {
						Object.entries(formData).forEach(([key, val]) => {
							if (!val && key !== 'usdt_url') {
								throw ('有空值')
							}
						})
					} catch (e) {
						return true
					}
				} else {
					if (!formData.usdt_url) {
						return true
					}
				}
				return false
			}
		},
		onLoad(e) {
			this.formData.pay_type = e.pay_type
			this.getDetail()
		},
		methods: {
			getDetail() {
				userGetCash().then(({
					data
				}) => {
					const {
						pay_type
					} = this.formData
					if (data[pay_type]) {
						try {
							Object.entries(data[pay_type]).forEach(([key, val]) => {
								if (!val) {
									throw ('有空值')
								}
							})
						} catch (e) {
							return false
						}
						this.binded = true
						Object.assign(this.formData, data[pay_type])
					}
				})
			},
			onSubmit() {
				if (this.btnDisabled) return
				userBindWithdraw({
					...this.formData,
				}).then(({
					data
				}) => {
					uni.showToast({
						title: '设置成功',
						icon: 'none',
						success() {
							setTimeout(_ => {
								uni.navigateBack()
							}, 1500)
						}
					})
				})
			}
		}
	}
</script>

<style lang="less">
	.tui-cancle {
		background-color: rgb(241, 243, 246) !important;
		color: #a8a9ac !important;
		opacity: .5;
	}

	.tui-submit {
		width: calc(100% - 66rpx);
		position: fixed;
		bottom: 57px;
		left: 0;
		right: 0;
		background: #822151;
		color: #fff;

		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		padding: 30rpx 0;
		font-size: 32rpx;
		margin: 0 auto;
	}

	.tui-register {
		width: 100%;
		padding: 0 36rpx;
		margin-top: 60rpx;

		.tui-form {
			margin-top: 60rpx;
		}

		.tui-title {
			font-size: 44rpx;
			font-weight: 800;
		}
	}

	/deep/.uni-easyinput__content {
		border-radius: 30rpx;

		&.is-disabled {
			color: #333;
			background-color: #ffffff;
		}
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

	.bindTip {
		background-color: #f4eadd;
		color: #fc6d22;
		border-radius: 12px;
		margin-top: 20px;
		padding: 15px;
		font-size: 14px;
		display: flex;
		align-items: center;

		text {
			margin-left: auto;
			color: #fc6d22 !important;
		}
	}
</style>