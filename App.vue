<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
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
</style>