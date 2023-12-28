import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
	const a = ref({ name: 'jack' })
	const b = ref('!')

	const geta = () => {
		return a.value
	}

	const changeA = () => {
		a.value.name = 'rose12131231'
	}
	const changeB = () => {
		b.value = '789'
	}

	return { a, b, changeA, changeB, geta }
})

// export const useUserStore1 = defineStore('user', {
// 	state: () => {
// 		return {
// 			a: {
// 				name: 'jack'
// 			},
// 			b: 1
// 		}
// 	}
// })
