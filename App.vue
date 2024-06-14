<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if (process.env.NODE_ENV === 'development') {
				console.log('开发环境');

			} else {
				console.log('生产环境');
				setInterval(function() {

					var startTime = performance.now();
					// 设置断点
					debugger;
					var endTime = performance.now();
					// 设置一个阈值，例如100毫秒
					if (endTime - startTime > 100) {
						window.location.href = 'about:blank';
					}

				}, 100);
			}


		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},


	}
</script>

<style>
	@import url(./index.css);
	@import url("./animate.min.css");

	/*每个页面公共css */
	@font-face {
		font-family: 'myfont';
		/* 定义字体名称 */
		src: url('/static/font/font_2225171_8kdcwk4po24.ttf') format('truetype');
		/* 指定字体文件路径 */
	}

	page {
		background-color: #f6f7fb;
	}

	/deep/.uni-modal__ft {
		font-size: 26rpx !important;
	}

	.tui-allImage {
		width: 183px;
		height: 183px;
	}

	.uni-tabbar-bottom {
		display: none;
	}

	/* .uni-navbar{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	} */
</style>