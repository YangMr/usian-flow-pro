<template>
	<view class="user-login">
		<!-- 登录类型 -->
		<view class="login-type">
			<view class="title">{{ tabMeta.title }}</view>
			<view class="type">
				<text @click="handleChangeType">{{ tabMeta.subTitle }}</text>
				<text class="iconfont icon-caret"></text>
			</view>
		</view>
		<!-- 登录表单 -->
		<IMobile v-if="tabIndex === 0"></IMobile>
		<IAccount v-else></IAccount>

		<!-- {{ store.count }} -->

		{{ a }}

		<!-- {{ b }} -->

		<button type="default" @click="store.increment">increment</button>
		<button type="default" @click="store.decrement">decrement</button>

		<button type="default" @click="handleRequest">index</button>
		<button type="default" @click="change">change</button>
		<button type="default" @click="reset">reset</button>
	</view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import IAccount from './components/account.vue'
import IMobile from './components/mobile.vue'
import { metaType } from './types/type'
import { storeToRefs } from 'pinia'

import { useCounterStore } from '../../store/counter'
import { useUserStore } from '../../store/user'

const handleRequest = () => {
	uni.navigateTo({
		url: '/pages/index/index'
	})
}

const store = useCounterStore()
const userStore = useUserStore()
// const { a, b } = storeToRefs(userStore)

const a = userStore.geta()

// const a = ref(userStore.a)
// const b = ref(userStore.b)
// const { a, b } = userStore

// console.log('a', a.value)
// console.log('b', b.value)

const change = () => {
	userStore.changeA()
	userStore.changeB()

	// a.value.name = 'rose'
	// b.value = 11223
	// userStore.a.value.name = 'rose'
	// userStore.b.value = '456'
}

const reset = () => {
	console.log('userStore', userStore)
	userStore.$reset()
}

// 控制默认选中的状态 0手机号登录 1账号登录
const tabIndex = ref<number>(0)

// 定义的元数据
const tabMetas = ref<metaType[]>([
	{
		title: '手机号登录',
		subTitle: '账号登录'
	},
	{
		title: '账号登录',
		subTitle: '手机号登录'
	}
])

// 获取默认的数据
const tabMeta = computed(() => {
	return tabMetas.value[tabIndex.value]
})

// 切换类型
const handleChangeType = () => {
	tabIndex.value = Math.abs(tabIndex.value - 1)
}
</script>

<style lang="scss">
@import './login.scss';
</style>
