import { useUserStore } from '@/store/user'
export const navTo = (path: string, type: string = 'navigateTo') => {
	const store = useUserStore()

	if (store.token) {
		uni[type]({
			url: path
		})
	} else {
		uni.navigateTo({
			url: '/login'
		})
	}
}
