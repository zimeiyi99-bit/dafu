<template>
	<view class="chart">
		<!-- Native rendering -->
		<view v-if="!useWebViewFallback">
			<!-- #ifdef H5 -->
			<view :id="chartId" class="kline">
			</view>
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<canvas :id="chartId" :canvas-id="chartId" class="kline" type="2d"></canvas>
			<!-- #endif -->
		</view>
		
		<!-- WebView fallback for APP when native rendering fails -->
		<!-- #ifdef APP-PLUS -->
		<web-view v-if="useWebViewFallback" ref="webview" :src="webViewUrl" class="kline" @message="onWebViewMessage" @onPostMessage="onWebViewMessage"></web-view>
		<!-- #endif -->
		
		<!-- Error state -->
		<view v-if="initError && !useWebViewFallback" class="error-state">
			<text class="error-icon">📈</text>
			<text class="error-text">图表加载失败</text>
			<text class="error-subtitle">请检查网络连接或稍后重试</text>
			<!-- #ifdef APP-PLUS -->
			<view class="retry-btn" @click="tryWebViewFallback">使用备用显示</view>
			<!-- #endif -->
		</view>
		
		<!-- 价格变化指示器 -->
		<view v-if="priceChange.show" :class="['price-change', priceChange.direction, priceChange.show ? 'show' : '']">
			{{ priceChange.direction === 'up' ? '+' : '-' }}{{ priceChange.value }}
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		props: ['data'],
		data() {
			return {
				chartInstance: null,
				chartId: 'Kline_' + Math.random().toString(36).substr(2, 9), // 唯一ID
				realKlineData: [], // 真实K线数据
				displayKlineData: [], // 显示用的K线数据
				updateTimer: null, // 5秒更新定时器
				lastUpdateTime: 0, // 上次更新时间
				priceChange: {
					show: false,
					direction: 'up',
					value: '0.0000'
				},
				// 新增错误处理和回退相关
				initError: false, // 初始化错误标记
				retryCount: 0, // 重试次数
				maxRetries: 3, // 最大重试次数
				useWebViewFallback: false // 是否使用WebView回退
			}
		},
		computed: {
			// #ifdef APP-PLUS
			webViewUrl() {
				// 构建WebView加载的URL，包含数据
				const baseUrl = '/static/kline-h5.html';
				return baseUrl;
			},
			// #endif
			// 占位符确保对象结构正确
			placeholder() {
				return true;
			}
		},
		watch: {
			data: {
				handler(newData) {
					if (newData && newData.length > 0) {
						this.realKlineData = [...newData];
						this.displayKlineData = [...newData];
						this.startDisplayUpdate();
						// 确保图表实例已创建后再更新
						if (this.chartInstance) {
							this.updateChart();
						}
					}
				},
				immediate: true,
				deep: true
			}
		},
		mounted() {
			// 根据平台设置ECharts环境
			// #ifdef H5
			this.$echarts.env.touchEventsSupported = true;
			this.$echarts.env.wxa = false;
			this.$echarts.env.canvasSupported = true;
			this.$echarts.env.svgSupported = true;
			this.$echarts.env.domSupported = true;
			// #endif
			
			// #ifdef APP-PLUS
			// 设置APP-PLUS环境的ECharts配置
			this.$echarts.env.touchEventsSupported = true;
			this.$echarts.env.wxa = false;
			this.$echarts.env.canvasSupported = true;
			this.$echarts.env.svgSupported = false;
			this.$echarts.env.domSupported = false;
			// #endif
			
			// 延迟初始化，确保DOM/Canvas已渲染
			this.$nextTick(() => {
				setTimeout(() => {
					this.init();
				}, 300); // APP环境需要更长延迟确保canvas完全渲染
			});
		},
		methods: {
			init() {
				// 检查是否已经初始化过或使用WebView回退
				if (this.chartInstance || this.useWebViewFallback) {
					return;
				}
				
				try {
					// #ifdef H5
					const element = document.getElementById(this.chartId);
					if (element) {
						this.chartInstance = this.$echarts.init(element);
						this.initError = false;
						// 如果有数据，立即渲染
						if (this.displayKlineData && this.displayKlineData.length > 0) {
							this.renderChart();
						}
					} else {
						throw new Error('H5 element not found');
					}
					// #endif
					
					// #ifdef APP-PLUS
					// APP环境下需要获取canvas节点和上下文
					const query = uni.createSelectorQuery().in(this);
					
					// 尝试使用 fields 方法（兼容uni-app 2.x）
					const queryMethod = query.select('#' + this.chartId);
					if (queryMethod.fields) {
						queryMethod.fields({ 
							node: true, 
							rect: true 
						}, (res) => {
							if (res && res.node && !this.chartInstance) {
								try {
									const canvas = res.node;
									const ctx = canvas.getContext('2d');
									
									// 设置canvas尺寸，确保有合理的默认值
									const dpr = uni.getSystemInfoSync().pixelRatio || 1;
									const width = res.width || 400;
									const height = res.height || 400;
									
									canvas.width = width * dpr;
									canvas.height = height * dpr;
									ctx.scale(dpr, dpr);
									
									// 初始化ECharts，传入canvas和context
									this.chartInstance = this.$echarts.init(canvas, null, {
										width: width,
										height: height
									});
									
									this.initError = false;
									
									// 如果有数据，立即渲染
									if (this.displayKlineData && this.displayKlineData.length > 0) {
										this.renderChart();
									}
								} catch (error) {
									console.error('APP ECharts初始化失败:', error);
									this.handleInitError(error);
								}
							} else if (!res || !res.node) {
								console.error('Canvas节点未找到，尝试WebView回退');
								this.handleInitError(new Error('Canvas节点未找到'));
							}
						}).exec();
					} else {
						// 如果 fields 方法不存在，直接触发WebView回退
						console.error('uni-app版本不支持canvas fields方法，使用WebView回退');
						this.handleInitError(new Error('uni-app版本不支持canvas fields方法'));
					}
					// #endif
					
				} catch (error) {
					console.error('ECharts初始化失败:', error);
					this.handleInitError(error);
				}
			},
			
			// 处理初始化错误
			handleInitError(error) {
				this.retryCount++;
				console.error(`ECharts初始化失败 (第${this.retryCount}次):`, error);
				
				if (this.retryCount < this.maxRetries) {
					// 延迟重试
					setTimeout(() => {
						this.init();
					}, 1000 * this.retryCount);
				} else {
					// 最大重试次数后，标记为错误状态
					this.initError = true;
					console.log('ECharts初始化达到最大重试次数，建议使用WebView回退');
					// #ifdef APP-PLUS
					// APP环境下可以提供WebView回退选项
					// #endif
				}
			},
			
			// #ifdef APP-PLUS
			// 尝试WebView回退
			tryWebViewFallback() {
				this.useWebViewFallback = true;
				this.initError = false;
				// 向WebView传递数据
				this.$nextTick(() => {
					this.sendDataToWebView();
				});
			},
			
			// 向WebView发送数据
			sendDataToWebView() {
				if (this.displayKlineData && this.displayKlineData.length > 0) {
					// 通过WebView的evaluateJavaScript方法发送数据
					const webViewComponent = this.$refs.webview;
					if (webViewComponent) {
						const dataString = JSON.stringify(this.displayKlineData);
						const jsCode = `
							if (window.updateKlineData) {
								window.updateKlineData(${dataString});
							}
						`;
						// uni.webView.postMessage 发送消息
						try {
							uni.webView.evaluateJavaScript({
								data: jsCode
							});
						} catch (error) {
							console.log('WebView数据发送失败:', error);
						}
					}
				}
			},
			
			// WebView消息处理
			onWebViewMessage(event) {
				console.log('WebView消息:', event);
			},
			// #endif
			
			// 开始5秒显示更新
			startDisplayUpdate() {
				if (this.updateTimer) {
					clearInterval(this.updateTimer);
				}
				
				this.updateTimer = setInterval(() => {
					this.updateDisplayData();
				}, 5000); // 5秒更新一次
			},
			
			// 更新显示数据
			updateDisplayData() {
				if (this.displayKlineData.length === 0) return;
				
				// 获取最新一根K线
				const latestKline = this.displayKlineData[this.displayKlineData.length - 1];
				const previousClose = this.displayKlineData[this.displayKlineData.length - 2]?.close || latestKline.close;
				
				// 生成小幅波动 (-0.1% 到 +0.1%)
				const volatility = (Math.random() - 0.5) * 0.002; // ±0.1%
				const priceChange = latestKline.close * volatility;
				
				// 更新最新K线数据
				const newClose = latestKline.close + priceChange;
				const newHigh = Math.max(latestKline.high, newClose);
				const newLow = Math.min(latestKline.low, newClose);
				
				// 更新显示数据
				this.displayKlineData[this.displayKlineData.length - 1] = {
					...latestKline,
					close: newClose,
					high: newHigh,
					low: newLow
				};
				
				// 显示价格变化效果
				const change = newClose - previousClose;
				if (Math.abs(change) > 0.0001) {
					this.showPriceChange(change > 0 ? 'up' : 'down', Math.abs(change));
				}
				
				// 重新渲染图表
				this.updateChart();
			},
			
			// 显示价格变化效果
			showPriceChange(direction, change) {
				this.priceChange = {
					show: true,
					direction: direction,
					value: change.toFixed(4)
				};
				
				// 3秒后隐藏
				setTimeout(() => {
					this.priceChange.show = false;
				}, 3000);
			},
			
			renderChart() {
				if (!this.chartInstance) return;
				
				const upColor = '#00da3c';
				const downColor = '#ec0000'
				let data = this.formatData(this.displayKlineData);

				if (this.displayKlineData && this.displayKlineData.length) {
					let option = this.createChartOption(data, upColor, downColor);
					this.chartInstance.setOption(option);
				}
			},
			
			// 更新图表显示
			updateChart() {
				if (this.chartInstance) {
					this.renderChart();
				}
				// #ifdef APP-PLUS
				else if (this.useWebViewFallback) {
					// 如果使用WebView回退，向WebView发送更新数据
					this.sendDataToWebView();
				}
				// #endif
			},
			
			formatData(rawData) {
				if (!rawData || !Array.isArray(rawData)) return { categoryData: [], values: [], volumes: [] };
				
				let categoryData = [];
				let values = [];
				let volumes = [];
				rawData.forEach((item, index) => {
					categoryData.push(item.time);
					values.push([item.open, item.close, item.low, item.high])
					volumes.push([index, item.volume, item.open > item.close ? 1 : -1]);
				})
				return {
					categoryData: categoryData,
					values: values,
					volumes: volumes
				}
			},
			
			calculateMA(dayCount, data) {
				let result = [];
				for (let i = 0, len = data.values.length; i < len; i++) {
					if (i < dayCount) {
						result.push('-');
						continue;
					}
					let sum = 0;
					for (let j = 0; j < dayCount; j++) {
						sum += data.values[i - j][1];
					}
					result.push(+(sum / dayCount).toFixed(3));
				}
				return result;
			},
			
			createChartOption(data, upColor, downColor) {
				return {
					animation: true,
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						textStyle: {
							color: '#333'
						},
						className: 'klineTooltip',
						position: function(pos, params, el, elRect, size) {
							var obj = {
								top: 10
							};
							obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
							return obj;
						},
						formatter: function(params) {
							const themeColor = params[5].value[3] > 0 ? upColor : downColor
							const param = params[0];
							return `
						<ul style="border-color:${themeColor}">
							<li> 
								<div class="dot" style="background-color:${themeColor}"></div>
								 <span>${param.name}</span> 
							</li>
							<li>
								 <div class="dot" style="background-color:${themeColor}"></div> 
								 <span>open <span>${param.data[0]}</span></span>
							</li>
							<li> 
								<div class="dot" style="background-color:${themeColor}"></div>
								 <span>close <span>${param.data[1]}</span></span> 
							</li>
							<li> 
								<div class="dot" style="background-color:${themeColor}"></div>
								 <span>low <span>${param.data[2]}</span></span> 
							</li>
							<li> 
								<div class="dot" style="background-color:${themeColor}"></div>
								 <span>high <span>${param.data[3]}</span></span> 
							</li>
							<li> 
								<div class="dot" style="background-color:${themeColor}"></div>
								 <span>volume <span>${params[5].data[1]}</span></span> 
							</li>
						</ul>
					`
						}
					},
					legend: {
						data: ['K线', 'MA5', 'MA10', 'MA20', 'MA30'],
						selected: {
							'MA5': true,
							'MA10': true,
							'MA20': true,
							'MA30': true
						}
					},
					grid: [{
						left: '10%',
						right: '10%',
						height: '50%'
					}, {
						left: '10%',
						right: '10%',
						top: '63%',
						height: '16%'
					}],
					xAxis: [{
						type: 'category',
						data: data.categoryData,
						scale: true,
						boundaryGap: false,
						axisLine: { onZero: false },
						splitLine: { show: false },
						min: 'dataMin',
						max: 'dataMax'
					}, {
						type: 'category',
						gridIndex: 1,
						data: data.categoryData,
						scale: true,
						boundaryGap: false,
						axisLine: { onZero: false },
						axisTick: { show: false },
						splitLine: { show: false },
						axisLabel: { show: false },
						min: 'dataMin',
						max: 'dataMax'
					}],
					yAxis: [{
						scale: true,
						splitArea: {
							show: true
						}
					}, {
						scale: true,
						gridIndex: 1,
						splitNumber: 2,
						axisLabel: { show: false },
						axisLine: { show: false },
						axisTick: { show: false },
						splitLine: { show: false }
					}],
					dataZoom: [{
						type: 'inside',
						xAxisIndex: [0, 1],
						start: 50,
						end: 100
					}, {
						show: true,
						xAxisIndex: [0, 1],
						type: 'slider',
						bottom: '0%',
						start: 50,
						end: 100
					}],
					series: [{
						name: 'K线',
						type: 'candlestick',
						data: data.values,
						itemStyle: {
							color: upColor,
							color0: downColor,
							borderColor: upColor,
							borderColor0: downColor
						}
					}, {
						name: 'MA5',
						type: 'line',
						data: this.calculateMA(5, data),
						smooth: true,
						lineStyle: {
							opacity: 0.5
						}
					}, {
						name: 'MA10',
						type: 'line',
						data: this.calculateMA(10, data),
						smooth: true,
						lineStyle: {
							opacity: 0.5
						}
					}, {
						name: 'MA20',
						type: 'line',
						data: this.calculateMA(20, data),
						smooth: true,
						lineStyle: {
							opacity: 0.5
						}
					}, {
						name: 'MA30',
						type: 'line',
						data: this.calculateMA(30, data),
						smooth: true,
						lineStyle: {
							opacity: 0.5
						}
					}, {
						name: 'Volume',
						type: 'bar',
						xAxisIndex: 1,
						yAxisIndex: 1,
						data: data.volumes
					}]
				};
			}
		},
		
		beforeDestroy() {
			// 清理定时器
			if (this.updateTimer) {
				clearInterval(this.updateTimer);
				this.updateTimer = null;
			}
			
			// 清理图表实例
			if (this.chartInstance) {
				this.chartInstance.dispose();
				this.chartInstance = null;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chart {
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.kline {
		width: 100%;
		height: 400px;
	}
	
	/* 错误状态样式 */
	.error-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 400px;
		background: #f9f9f9;
		border: 1px solid #e5e5e5;
		border-radius: 8px;
	}
	
	.error-icon {
		font-size: 48px;
		margin-bottom: 16px;
		opacity: 0.5;
	}
	
	.error-text {
		font-size: 16px;
		color: #666;
		margin-bottom: 8px;
		font-weight: 500;
	}
	
	.error-subtitle {
		font-size: 12px;
		color: #999;
		margin-bottom: 20px;
		text-align: center;
		line-height: 1.4;
	}
	
	.retry-btn {
		padding: 8px 16px;
		background: #1150c2;
		color: white;
		border-radius: 4px;
		font-size: 14px;
		cursor: pointer;
		transition: background 0.3s;
	}
	
	.retry-btn:active {
		background: #0a3d91;
	}
	
	/* 价格变化指示器 */
	.price-change {
		position: absolute;
		top: 20px;
		right: 20px;
		padding: 8px 16px;
		border-radius: 20px;
		font-weight: bold;
		font-size: 14px;
		z-index: 1000;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.3s ease;
	}
	
	.price-change.up {
		background: rgba(76, 175, 80, 0.9);
		color: white;
	}
	
	.price-change.down {
		background: rgba(244, 67, 54, 0.9);
		color: white;
	}
	
	.price-change.show {
		opacity: 1;
		transform: translateY(0);
		animation: priceChange 3s ease-out;
	}
	
	@keyframes priceChange {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		20% {
			opacity: 1;
			transform: translateY(0);
		}
		80% {
			opacity: 1;
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateY(-20px);
		}
	}
</style>