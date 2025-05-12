import { create } from 'zustand'
import Cookies from 'js-cookie'
import { User } from '@/types/models/user.model'
import { TokenService } from '@/services/token.service'
import { Token } from '@/types/token.enum'

export interface AuthState {
	user: User | null
	isAuth: boolean
	isLoading: boolean
	setUser: (user: User) => void
	logout: () => void
	hasRefreshToken: () => boolean
	setIsLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthState>(set => ({
	user: null,
	isLoading: true,
	isAuth: !!Cookies.get(Token.REFRESH_TOKEN),

	hasRefreshToken: () => !!Cookies.get(Token.REFRESH_TOKEN),

	setUser: user => set({ user, isAuth: true, isLoading: false }),

	logout: () => {
		TokenService.removeTokens()

		set({ user: null, isAuth: false })
	},

	setIsLoading: (isLoading: boolean) => set({ isLoading })
}))

export const useUser = () => useAuthStore(state => state.user)
export const useIsLoadingUser = () => useAuthStore(state => state.isLoading)
export const useSetIsLoadingUser = () => useAuthStore(state => state.setIsLoading)
