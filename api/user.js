import request from '@/utils/request.js';

//注册校验
export const userCheckRegister = function(data = {}) {
	return request.post('/login/checkRegister', {...data})
}
//注册
export const userRegister = function(data = {}) {
	return request.post('/login/register', data)
}
//登录
export const userLogin = function(data = {}) {
	return request.post('/login/login', data)
}
//登录
export const userInfo = function(data = {}) {
	return request.get('/user/getUserInfo', data)
}