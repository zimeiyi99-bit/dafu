<template>
	<view>
		<guo-headerTitle :title="title"></guo-headerTitle>
		<!-- 注册 -->
		<view class="tui-register">
			<view class="tui-form">
				<uni-forms ref="baseForm" :modelValue="formData" label-position="top">
					<template v-if="title == '银行卡账户'">
						<uni-forms-item label="开户姓名">
							<uni-easyinput v-model="formData.name" placeholder="请输入开户姓名" :inputBorder="true"
								:styles="styles" primaryColor="#822151" />
						</uni-forms-item>
						<uni-forms-item label="国籍">
							<uni-easyinput v-model="formData.age" placeholder="请输入国籍" :inputBorder="true"
								:styles="styles" primaryColor="#822151" />
						</uni-forms-item>
						<uni-forms-item label="开户银行">
							<uni-easyinput v-model="formData.age" placeholder="请输入开户银行" :inputBorder="true"
								:styles="styles" primaryColor="#822151" />
						</uni-forms-item>
						<uni-forms-item label="银行卡账号">
							<uni-easyinput v-model="formData.age" placeholder="请输入银行卡账号" :inputBorder="true"
								:styles="styles" primaryColor="#822151" />
						</uni-forms-item>
						<uni-forms-item label="开户地址">
							<uni-easyinput v-model="formData.age" placeholder="请输入开户地址" :inputBorder="true"
								:styles="styles" primaryColor="#822151" />
						</uni-forms-item>
					</template>
					<uni-forms-item label="币种地址" v-if="title != '银行卡账户'">
						<uni-easyinput v-model="formData.age" placeholder="请输入币种地址" :inputBorder="true" :styles="styles"
							primaryColor="#822151" />
					</uni-forms-item>
					<view class="tui-submit tui-cancle">
						保存
					</view>
				</uni-forms>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				formData: {},
				styles: {
					'borderColor': '#fff'
				}
			};
		},
		onLoad(e) {
			this.title = e.Type
		}
	}
</script>

<style lang="less">
	.tui-cancle {
		background-color: rgb(241, 243, 246) !important;
		color: #a8a9ac !important;
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