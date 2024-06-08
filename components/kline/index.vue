<template>
	<div class="chart">
		<div id="Kline" class="kline">
		</div>
	</div>
</template>
<script>
	import {
		quoteData
	} from './data'
	export default {
		data() {
			return {}
		},
		mounted() {

			this.$echarts.env.touchEventsSupported = true;
			this.$echarts.env.wxa = false;
			this.$echarts.env.canvasSupported = false;
			this.$echarts.env.svgSupported = true;
			this.$echarts.env.domSupported = true;
			this.init()
		},
		methods: {
			init() {
				var upColor = '#00da3c';
				var downColor = '#ec0000'

				function splitData(rawData) {
					var categoryData = [];
					var values = [];
					var volumes = [];
					for (var i = 0; i < rawData.length; i++) {
						categoryData.push(rawData[i].splice(0, 1)[0]);
						values.push(rawData[i]);
						volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
					}
					return {
						categoryData: categoryData,
						values: values,
						volumes: volumes
					};
				}

				function calculateMA(dayCount, data) {
					var result = [];
					for (var i = 0, len = data.values.length; i < len; i++) {
						if (i < dayCount) {
							result.push('-');
							continue;
						}
						var sum = 0;
						for (var j = 0; j < dayCount; j++) {
							sum += data.values[i - j][1];
						}
						result.push(+(sum / dayCount).toFixed(3));
					}
					return result;
				}
				var data = splitData(quoteData);

				var option = {
					animation: true,
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						backgroundColor: 'rgba(245, 245, 245, 0.8)',
						borderWidth: 1,
						borderColor: '#ccc',
						padding: 10,
						textStyle: {
							color: '#000'
						},
						position: function(pos, params, el, elRect, size) {
							var obj = {
								top: 10
							};
							obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
							return obj;
						},
						extraCssText: 'width: 170px'
					},
					axisPointer: {
						link: {
							xAxisIndex: 'all'
						},
						label: {
							backgroundColor: '#777'
						}
					},
					toolbox: {
						show: false

					},

					visualMap: {
						show: false,
						seriesIndex: 5,
						dimension: 2,
						pieces: [{
							value: 1,
							color: downColor
						}, {
							value: -1,
							color: upColor
						}]
					},
					grid: [{
							left: '0%',
							right: '12.5%',
							height: '50%',
							top: '8%'
						},
						{
							left: '0%',
							right: '12%',
							top: '68%',
							height: '10%'
						}
					],
					xAxis: [{
							type: 'category',
							data: data.categoryData,
							scale: true,
							boundaryGap: false,
							axisTick: {
								show: true
							},
							axisLine: {
								onZero: false
							},
							splitLine: {
								show: false
							},
							splitNumber: 20,
							min: 'dataMin',
							max: 'dataMax',
							axisPointer: {
								z: 100
							}
						},
						{
							type: 'category',
							gridIndex: 1,
							data: data.categoryData,
							scale: true,
							boundaryGap: false,
							axisLine: {
								onZero: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							},
							axisLabel: {
								show: false
							},
							splitNumber: 20,
							min: 'dataMin',
							max: 'dataMax',
							axisPointer: {
								type: 'shadow',
								label: {
									show: false
								},
								triggerTooltip: true,
								handle: {
									show: true,
									margin: 30,
									color: '#B80C00'
								}
							}

						}
					],
					yAxis: [{
							scale: true,
							position: 'right',
							// splitArea: {
							// 	show: true
							// }
							axisTick: {
								show: true
							}
						},
						{
							scale: true,
							gridIndex: 1,
							splitNumber: 2,
							axisLabel: {
								show: false
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false
							}
						}
					],
					dataZoom: [{
							type: 'slider',
							xAxisIndex: [0, 1],
							realtime: false,
							start: 40,
							end: 70,
							top: 10,
							height: 16,
							handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
							handleSize: '120%'
						},
						{
							type: 'inside',
							xAxisIndex: [0, 1],
							start: 40,
							end: 70,
							top: 30,
							height: 16
						}
					],
					series: [{
							name: 'kline',
							type: 'candlestick',
							data: data.values,
							itemStyle: {
								normal: {
									color: upColor,
									color0: downColor,
									borderColor: null,
									borderColor0: null
								}
							},
							tooltip: {
								formatter: function(param) {
									param = param[0];
									return [
										param.name + '<hr size=1 style="margin: 3px 0">',
										'Open: ' + param.data[0] + '<br/>',
										'Close: ' + param.data[1] + '<br/>',
										'Lowest: ' + param.data[2] + '<br/>',
										'Highest: ' + param.data[3] + '<br/>'
									].join('');
								}
							}
						},
						{
							name: 'MA5',
							type: 'line',
							data: calculateMA(5, data),
							smooth: true,
							lineStyle: {
								normal: {
									opacity: 0
								}
							},
							itemStyle: {
								normal: {
									opacity: 0
								}
							},
						},
						{
							name: 'MA10',
							type: 'line',
							data: calculateMA(10, data),
							smooth: true,
							lineStyle: {
								normal: {
									opacity: 0
								}
							},
							itemStyle: {
								normal: {
									opacity: 0
								}
							},
						},
						{
							name: 'MA20',
							type: 'line',
							data: calculateMA(20, data),
							smooth: true,
							lineStyle: {
								normal: {
									opacity: 0
								}
							},
							itemStyle: {
								normal: {
									opacity: 0
								}
							},
						},
						{
							name: 'MA30',
							type: 'line',
							data: calculateMA(30, data),
							smooth: true,
							lineStyle: {
								normal: {
									opacity: 0
								}
							},
							itemStyle: {
								normal: {
									opacity: 0
								}
							},
						},
						{
							name: 'Volume',
							type: 'bar',
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: data.volumes,
						}
					]
				};
				const kline = this.$echarts.init(document.getElementById("Kline"));
				kline.setOption(option);
			},
		},

	}
</script>
<style lang="scss" scoped>
	.kline {
		width: 100%;
		height: 468px;
	}
</style>