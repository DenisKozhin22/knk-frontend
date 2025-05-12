import { useAuthStore } from '@/providers/auth-store'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

export const useLogout = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const logout = useAuthStore(state => state.logout)

	const onLogout = useCallback(() => {
		logout()

		queryClient.clear()

		navigate({
			to: '/login',
			replace: true
		})
	}, [logout, navigate, queryClient])

	return onLogout
}
