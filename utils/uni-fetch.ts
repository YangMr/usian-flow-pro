// 导入createUniFetch请求方法
import { createUniFetch } from 'uni-app-fetch'

// 导入请求数据返回的数据类型
import { responseData } from './types/responseType'

import { useUserStore } from '@/store/user'

// #ifdef VUE3
declare module 'vue' {
	interface ComponentCustomProperties {
		fetch: typeof uniFetch
	}
}
// #endif

// 使用自定义选项创建实例
const uniFetch = createUniFetch<responseData>({
	loading: { title: 'loading...' },
	baseURL: 'https://slwl-api.itheima.net',
	intercept: {
		// 请求拦截器
		request(config) {
			// 初始化store
			const store = useUserStore()
			console.log('store', store)

			// 发送token
			if (store.token) {
				const defaultHeaders = {
					Authorization: store.token
				}
				config.header = Object.assign({}, defaultHeaders, config.header)
			}

			// 如果token存在,则将token发送给后台
			// if (store.token) {
			// 	config.header.Authorization = store.token
			// }
			// console.log('options', config)

			return config
		},
		// 响应拦截器
		response(result) {
			// TODO token过期处理

			// TODO 无感知登录
			return result.data
		}
	}
})

export default uniFetch
