# 积云物流司机端项目开发文档

## 一、创建项目并进行版本控制

### 1.1 创建项目

1. 使用HbuilderX创建基于vue3语法的项目

![image-20231227092023956](./assets/image-20231227092023956.png)

![image-20231227092055588](./assets/image-20231227092055588.png)

### 1.2 使用Git对项目进行版本控制

1. 创建远程仓库
2. 初始化本地仓库
3. 将本地仓库与远程仓库建立连接
4. 将本地仓库推送到远程仓库



## 二、实现网络请求的封装

### 2.1 http请求的封装

1. 安装uni-fetch插件

```shell
npm install uni-app-fetch --save
```

2. 封装请求

`utils/uni-fetch.ts`

```typescript
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

```

3. 抽离返回的数据类型

`utils/types/responseType.ts`

```typescript
// 定义返回的数据类型
export interface responseData<T = any> {
	code: number
	msg: string
	data: T
}
```

### 2.2 api接口的封装

1.封装登录模块接口

`api/login.ts`

```typescript
/* 登录模块相关接口 */
import uniFetch from '../utils/uni-fetch'

// 导入登录模块所有接口参数类型
import { loginParamsType } from './types/loginType'

// 账号登录接口
export const login = (data: loginParamsType) => {
	return uniFetch({ url: '/driver/login/account', method: 'POST', data })
}

// 获取验证码接口
export const captcha = (data: string) => {
	return uniFetch({ url: '/driver/register/captcha', method: 'GET', data })
}

```

2. 定义登录模块所有参数类型

`api/types/loginType.ts`

```typescript
// 定义登录参数类型
export type loginParamsType = {
	/**
	 * 登录账号
	 */
	account: string;
	/**
	 * 登录密码
	 */
	password: string;
};

```

