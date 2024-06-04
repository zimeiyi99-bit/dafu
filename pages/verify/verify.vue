<template>
	<view>
		<guo-headerTitle title="实名认证"></guo-headerTitle>
		<view class="tui-register">
			<view class="tui-form">
				<uni-forms ref="baseForm" :modelValue="formData" label-position="top" label-width="200px">
					<uni-forms-item label="姓名">
						<uni-easyinput v-model="formData.name" placeholder="请输入姓名" :inputBorder="true" :styles="styles"
							primaryColor="#822151" />
					</uni-forms-item>
					<uni-forms-item label="证件号">
						<uni-easyinput v-model="formData.age" placeholder="请输入证件号" :inputBorder="true" :styles="styles"
							primaryColor="#822151" />
					</uni-forms-item>
					<uni-forms-item label="国籍">
						<uni-easyinput v-model="formData.age" placeholder="请输入国籍" :inputBorder="true" :styles="styles"
							primaryColor="#822151" />
					</uni-forms-item>
					<uni-forms-item label="请上传证件照片">
						<view class="tui-certificate">
							<view class="item">
								<image src="../../static/front.png" mode=""></image>
								<view class="first">
									证件正面
								</view>
								<view class="two">
									点击上传证件人面像
								</view>
							</view>
							<view class="item">
								<image src="../../static/back.png" mode=""></image>
								<view class="first">
									证件反面
								</view>
								<view class="two">
									点击上传证件反面
								</view>
							</view>
						</view>
					</uni-forms-item>
					<view class="tui-submit tui-cancle">
						提交
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
				formData: {},
				styles: {
					'borderColor': '#fff'
				}
			};
		}
	}
</script>

<style lang="less">
	.tui-certificate{
		display: flex;
		justify-content: space-between;
		.item:nth-child(2) {
			margin-right: 0;
		}
		.item {
			flex: 1;
			background-color: #fff;
			border-radius: 13px;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 20rpx;
			box-sizing: border-box;
			margin-right: 20rpx;
			.first{
				font-size: 28rpx;
				padding-top: 20rpx;
				color: #222;
			}
			.two {
				color: #a8a9ac;
				font-size: 20rpx;
				padding-top: 6rpx;
			}
			image {
				width: 294rpx;
				height: 182rpx;
			}
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
		padding: 0 36rpx;
		margin-top: 30rpx;

		.tui-form {
			margin-top: 30rpx;
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