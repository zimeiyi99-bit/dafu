import request from '@/utils/request.js';

//余额宝首页
export const balanceInfo = function(data = {}) {
	return request.get('yuebao/getUserYuEBaoData', data)
}

//出金记录
export const withdraw_record = function(data = {}) {
	return request.get('user/withdraw_record', data)
}
// 出金
export const downmark = function(data = {}) {
	return request.post('user/downmark', {...data})
}
// 实名认证
export const doAuth = function(data = {}) {
	return request.post('user/doAuth', {...data})
}