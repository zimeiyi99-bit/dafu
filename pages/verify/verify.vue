<template>
	<view>
		<guo-headerTitle title="实名认证"></guo-headerTitle>
		<view class="tui-register" v-if="userInfo.is_auth == 0">
			<view class="tui-form">
				<uni-forms ref="form" :modelValue="formData" label-position="top" label-width="200px" :rules="rules">
					<uni-forms-item label="姓名" name="real_name" required>
						<uni-easyinput v-model="formData.real_name" placeholder="请输入姓名" :inputBorder="true"
							:styles="styles" primaryColor="#822151" @blur="SetValue('real_name')" />
					</uni-forms-item>
					<uni-forms-item label="证件号" name="id_card" required>
						<uni-easyinput type="number" v-model="formData.id_card" placeholder="请输入证件号" :inputBorder="true"
							:styles="styles" primaryColor="#822151" @blur="SetValue('id_card')" />
					</uni-forms-item>
					<uni-forms-item label="国籍" name="gj" required>
						<uni-easyinput v-model="formData.gj" placeholder="请输入国籍" :inputBorder="true" :styles="styles"
							primaryColor="#822151" @blur="SetValue('gj')" />
					</uni-forms-item>
					<uni-forms-item label="请上传证件照片">
						<view class="tui-certificate">
							<view class="item" @click="onUploadImg">
								<image :src="formData.id_img_1 == '' ?  require('@/static/front.png') : formData.id_img_1" mode=""></image>
								<view class="first">
									证件正面
								</view>
								<view class="two">
									点击上传证件人面像
								</view>
							</view>
							<view class="item" @click="onUploadImgReverse">
								
								<image :src="formData.id_img_2 == '' ? require('@/static/back.png') : formData.id_img_1" mode=""></image>
								<view class="first">
									证件反面
								</view>
								<view class="two">
									点击上传证件反面
								</view>
							</view>
						</view>
					</uni-forms-item>
					<view class="tui-submit" :class="isBtn ? 'tui-ok' : 'tui-cancle'" @click="onClickBtn">
						提交
					</view>
				</uni-forms>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		doAuth
	} from '@/api/money.js'
	import {
		mapState
	} from 'vuex';
	import updateFile from "@/utils/upload.js"

	export default {
		data() {
			return {
				formData: {
					real_name: '',
					id_card: '',
					gj: '',
					id_img_1: '',
					id_img_2: '',
				},
				styles: {
					'borderColor': '#fff'
				},
				isBtn: false,
				rules: {
					real_name: {
						rules: [{
							required: true,
							errorMessage: '请输入姓名',
						}, ],
					},
					id_card: {
						rules: [{
							required: true,
							errorMessage: '请输入证件号',
						}, ],
					},
					gj: {
						rules: [{
							required: true,
							errorMessage: '请输入国籍',
						}, ],
					}
				}
			};
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			onUploadImgReverse() {
				uni.chooseImage({
					count: 1, //上传图片的数量，默认是9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有

					success: async (res) => {
						const tempFilePaths = res.tempFilePaths; //拿到选择的图片，是一个数组\
						uni.showLoading({
							title: '上传中'
						})

						let xhr = await updateFile(tempFilePaths[0])
						console.log(xhr)
						this.formData.id_img_2 = xhr.data.content
						uni.hideLoading()
					}
				});
			},
			onUploadImg() {
				uni.chooseImage({
					count: 1, //上传图片的数量，默认是9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有

					success: async (res) => {
						const tempFilePaths = res.tempFilePaths; //拿到选择的图片，是一个数组\
						uni.showLoading({
							title: '上传中'
						})

						let xhr = await updateFile(tempFilePaths[0])
						console.log(xhr)
						this.formData.id_img_1 = xhr.data.content
						uni.hideLoading()
					}
				});
			},
			SetValue(value) {
				this.$refs.form.validate([value], (err, formData) => {
					if (!err) {
						console.log('success', formData)
					}
				})
			},

			onClickBtn() {
				this.$refs.form.validate().then((res) => {

				}).catch((err) => {})
			}
		}
	}
</script>

<style lang="less">
	.tui-certificate {
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

			.first {
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

	.tui-ok {
		background-color: rgb(241, 243, 246) !important;
		color: #fff !important;
	}

	.tui-submit {
		margin-top: 44rpx;
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