// 导入createUniFetch请求方法
import { createUniFetch } from 'uni-app-fetch';
// 导入请求数据返回的数据类型
import { responseData } from './types/responseType';

// #ifdef VUE3
declare module 'vue' {
	interface ComponentCustomProperties {
		fetch: typeof uniFetch;
	}
}
// #endif

// 使用自定义选项创建实例
const uniFetch = createUniFetch<responseData>({
	loading: { title: 'loading...' },
	baseURL: 'https://slwl-api.itheima.net',
	intercept: {
		// 请求拦截器
		request(options) {
			// TODO 通过请求头发送token
			return options;
		},
		// 响应拦截器
		response(result) {
			// TODO token过期处理

			// TODO 无感知登录
			return result;
		}
	}
});

export default uniFetch;
