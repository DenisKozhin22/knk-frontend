import { useGetProfile } from '@/hooks'
import { useAuthStore } from '@/providers/auth-store'
import { useEffect } from 'react'

export const GetUser = () => {
	const setUser = useAuthStore(state => state.setUser)
	const setIsLoading = useAuthStore(state => state.setIsLoading)
	const isAuth = useAuthStore(state => state.isAuth)

	const { data: userRes } = useGetProfile()

	useEffect(() => {
		if (!isAuth) setIsLoading(false)

		if (userRes?.id) {
			setUser(userRes)
		}
	}, [userRes])

	return null
}
