import request from '@/utils/request.js';

//余额宝首页
export const  balanceInfo= function(data = {}) {
	return request.get('yuebao/getUserYuEBaoData', data)
}