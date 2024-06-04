<template>
	<view>
		<!-- 导航栏 -->
		<uni-nav-bar :border="false" statusBar leftWidth="230rpx" rightWidth="230rpx" backgroundColor="#f6f7fb"
			height="120rpx">
			<template v-slot:left>
				<view class="tui-leftIcon">
					<uni-icons type="arrow-left" size="25" style="color: #fff;"></uni-icons>
				</view>
			</template>
		</uni-nav-bar>
		<!-- 注册 -->
		<view class="tui-register">
			<view class="tui-title">
				账号注册
			</view>
			<view class="tui-form">
				<uni-forms ref="baseForm" :modelValue="formData" label-position="top">
					<uni-forms-item label="账号">
						<uni-easyinput v-model="formData.name" placeholder="请输入账号" :inputBorder="true" :styles="styles"
							primaryColor="#822151" />
					</uni-forms-item>
					<uni-forms-item label="手机号">
						<uni-easyinput v-model="formData.age" placeholder="请输入手机号" :inputBorder="true" :styles="styles"
							primaryColor="#822151" />
					</uni-forms-item>
					<uni-forms-item label="姓名">
						<uni-easyinput v-model="formData.age" placeholder="请输入姓名" :inputBorder="true" :styles="styles"
							primaryColor="#822151" />
					</uni-forms-item>
					<uni-forms-item label="开户码">
						<uni-easyinput v-model="formData.age" placeholder="请输入开户码" :inputBorder="true" :styles="styles"
							primaryColor="#822151" />
					</uni-forms-item>
					<view class="tui-submit tui-cancle">
						下一步
					</view>
				</uni-forms>
			</view>
		</view>
		<!-- 底部 -->
		<view class="bottom">
			<view class="tui-Two">
				<view class="">
					登录即表示同意APP
				</view>
				<view class="policy">
					隐私政策
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {},
				styles: {
					'borderColor': '#fff'
				}
			};
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f6f7fb;
	}

	.bottom {
		position: fixed;
		bottom: 114rpx;
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.tui-bottom {
		margin: 114rpx auto 0 !important;
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.tui-Two {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #a8a9ac;
		padding-top: 20rpx;

		.policy {
			color: #822151;
			padding-left: 10rpx;
		}
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

	.tui-register {
		width: 100%;
		padding: 0 60rpx;
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

	.tui-leftIcon {
		width: 80rpx;
		height: 80rpx;
		color: #fff !important;
		background-color: #cbcbcb;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 40rpx;
	}
</style>