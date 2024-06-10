import Vue from 'vue';
import VueI18n from 'vue-i18n';

import zhCN from './zh-CN';
import zhTW from './zh-TW';

// 组合语言包
const messages = {
	'zh-CN': zhCN,
	'zh-TW': zhTW,
};
const locale = uni.getStorageSync('i18nLang');
let i18nConfig = {
	locale: locale ? locale : "zh-CN", // 获取已设置的语言
	messages
}

Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)

// 导出
export default i18n;