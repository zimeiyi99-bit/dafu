
import request from '@/utils/request.js';

//公共配置
export const appIndex = function(data = {}) {
	return request.post('/index/index', data)
}