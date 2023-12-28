import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
	'user',
	() => {
		// 登录的token
		const token = ref<string>('')

		return {
			token
		}
	},
	{
		// persist: true
		persist: {
			paths: ['token']
		}
	}
)
