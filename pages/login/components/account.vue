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

// 表单书记
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
