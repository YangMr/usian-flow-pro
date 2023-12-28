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

### 2.3 实现toast提示

`utils/utils.ts`

```typescript
import { utilsType, icon } from './types/utilsType'

const utils: utilsType = {
	/**
	 * 用户反馈（轻提示）
	 * @param {string} title 提示文字内容
	 * @param {string} icon 提示图标类型
	 */
	toast(title: string = '数据加载失败', icon: icon = 'none', mask: boolean = true) {
		uni.showToast({
			title,
			icon,
			mask
		})
	}
}
uni.utils = utils


```

`utils/types/utilsType.ts`

```typescript
// 定义icon类型
export type icon = 'none' | 'success' | 'error' | 'fail' | 'exception' | 'loading'

export type utilsType = {
	toast: (title: string, icon: icon, mask: boolean) => void
}

```

## 三、pinia的使用

### 3.1 安装pinia

```
npm install pinia --save
```

### 3.2 引入pinia

1. 在mian.js引入pinia
2. 初始化pinia
3. 将pinia注册到vue

`main.js`

```javascript
//1. 引入 Pinia
import { createPinia } from 'pinia'

// 2. 实例化Pinia
const pinia = createPinia()
	
// 3. 传递给项目应用
app.use(pinia)
```

## 四、实现表单校验

1. 引入uni-ui的form表单

2. 实现表单布局
3. 实现表单校验

`account.vue`

```vue
<template>
	<uni-forms ref="form" :rules="accountRules" :modelValue="formData">
		<uni-forms-item name="account">
			<input type="text" v-model.trim="formData.account" placeholder="请输入账号" />
		</uni-forms-item>
		<uni-forms-item name="password">
			<input type="password" v-model.trim="formData.password" placeholder="请输入密码" />
		</uni-forms-item>
		<button @click="submitLogin" class="submit-button">登录</button>
	</uni-forms>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

// 表单标识
const form = ref()

// 表示数据类型
type formDataType = {
	account: string
	password: string
}

// 表单数据
const formData = ref<formDataType>({
	account: '',
	password: ''
})

// 表单校验规则
const accountRules = reactive({
	account: {
		rules: [
			{ required: true, errorMessage: '请输入登录账号' },
			{ pattern: '^[a-zA-Z0-9]{6,8}$', errorMessage: '登录账号格式不正确' }
		]
	},
	password: {
		rules: [
			{ required: true, errorMessage: '请输入登录密码' },
			{ pattern: '^\\d{6}', errorMessage: '登录密码格式不正确' }
		]
	}
})

// 账号登录方法
const submitLogin = async () => {
	try {
		await form.value.validate()
	} catch (e) {
		console.log('error')
	}
}
</script>

<style lang="scss">
.submit-button {
	height: 100rpx;
	line-height: 100rpx;
	/* #ifdef APP */
	padding-top: 4rpx;
	/* #endif */
	margin-top: 80rpx;
	border: none;
	color: #fff;
	background-color: $uni-primary;
	border-radius: 100rpx;
	font-size: $uni-font-size-big;
}

button[disabled] {
	background-color: #fadcd9;
	color: #fff;
}
</style>

```

