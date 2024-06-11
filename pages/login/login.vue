<template>
	<view>
		<!-- 导航栏 -->
		<uni-nav-bar :border="false" statusBar leftWidth="230rpx" rightWidth="230rpx" backgroundColor="#f6f7fb">
			<template v-slot:left>
				<view class="tui-img">
					<image src="../../static/logo.png" mode=""></image>
				</view>
			</template>
			<template v-slot:right>
				<view class="tui-right" @click="$refs['langChange'].open()">
					<image src="../../static/diqiu.png" mode=""></image>
					<text>{{$t('app.yymc')}}</text>
				</view>
			</template>
		</uni-nav-bar>
		<!-- 登录 -->
		<view class="tui-login">
			<view class="tui-title">
				账号登录
			</view>
			<view class="tui-form">
				<uni-forms ref="baseForm" :modelValue="formData" label-position="top">
					<uni-forms-item label="账号">
						<uni-easyinput v-model="formData.account" placeholder="请输入账号" :inputBorder="true"
							:styles="styles" primaryColor="#822151" />
					</uni-forms-item>
					<uni-forms-item label="密码">
						<uni-easyinput type="password" v-model="formData.passwd" placeholder="请输入密码" :inputBorder="true"
							:styles="styles" primaryColor="#822151" />
					</uni-forms-item>
					<view class="tui-submit" :class="[{'tui-cancle':btnDisabled}]" @click="onClickLogin">
						登录
					</view>
				</uni-forms>
			</view>
		</view>
		<!-- 底部 -->
		<view class="bottom">
			<view class="tui-first">
				<view class="register" @click="onClickRegister">
					立即注册
				</view>
				<view class="symbol">
				</view>
				<view class="" @click="onClickMessage">
					在线客服
				</view>
			</view>
			<view class="tui-Two">
				<view class="">
					登录即表示同意APP
				</view>
				<view class="policy" @click="onClickYinsi">
					隐私政策
				</view>
			</view>
		</view>
		<langChange ref="langChange"></langChange>
	</view>
</template>

<script>
	import {
		userLogin,
		userInfo,
		getUserIndex
	} from "@/api/user.js"
	export default {
		components: {
			langChange: () => import("@/components/langChange.vue"),
		},
		data() {
			return {
				formData: {
					// account: 'user66',
					// passwd: '666666',
					account: '',
					passwd: ''
				},
				styles: {
					'borderColor': '#fff'
				}
			};
		},
		computed: {
			btnDisabled() {
				try {
					Object.values(this.formData).forEach(item => {
						if (!item) {
							throw ('有空值')
						}
					})
				} catch (e) {
					//TODO handle the exception
					return true
				}
				return false
			}
		},
		methods: {
			onClickMessage() {
				getUserIndex({
					hideLoading: true,
				}).then(({
					data
				}) => {

					window.open(data.kefu_url, '_blank')
				});
			},
			onClickYinsi() {
				uni.navigateTo({
					url: '/pages/yinsi/yinsi'
				})
			},
			onClickLogin() {
				if (this.btnDisabled) return
				userLogin({
					...this.formData,
					checkFree: true
				}).then(({
					data: {
						token
					}
				}) => {
					this.$store.commit('setToken', token)
					userInfo().then(({
						data
					}) => {
						this.$store.commit('setUser', data)
						uni.switchTab({
							url: '/pages/index/index'
						})
					})
				})
			},
			onClickRegister() {
				uni.navigateTo({
					url: '/pages/login/registerCheck'
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f6f7fb !important;
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

	.tui-first {
		display: flex;
		align-items: center;
		color: #822151;
		font-size: 29rpx;

		.symbol {
			background-color: #a8a9ac;
			width: 1px;
			height: 11px;
			margin: 0 9px;
		}
	}

	.tui-cancle {
		background-color: rgb(241, 243, 246) !important;
		color: #a8a9ac !important;
		opacity: .5;
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

	.tui-login {
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

	.tui-img {

		width: 188rpx;
		height: 54rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.tui-right {

		display: flex;
		align-items: center;

		image {
			width: 40rpx;
			height: 40rpx;
		}

		text {
			padding-left: 20rpx;
			font-size: 32rpx;
			font-weight: bold;
			font-family: 'myfont';
		}
	}
</style>