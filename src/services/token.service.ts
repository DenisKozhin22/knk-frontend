import { Token } from '@/types/token.enum'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'

export const TokenService = {
	getTokens() {
		const accessToken = Cookies.get(Token.ACCESS_TOKEN)
		const refreshToken = Cookies.get(Token.REFRESH_TOKEN)

		return {
			accessToken,
			refreshToken
		}
	},

	setTokens(tokens: { accessToken: string; refreshToken: string }) {
		const { accessToken, refreshToken } = tokens

		// Устанавливаем срок действия токена на 29 минут
		const accessTokenExpires = dayjs().add(29, 'minute').toDate()

		Cookies.set(Token.ACCESS_TOKEN, accessToken, {
			expires: accessTokenExpires
		})

		// Устанавливаем срок действия refresh токена на 7 дней
		const refreshTokenExpires = dayjs().add(7, 'day').toDate()

		Cookies.set(Token.REFRESH_TOKEN, refreshToken, {
			expires: refreshTokenExpires
		})
	},

	removeTokens() {
		Cookies.remove(Token.ACCESS_TOKEN)
		Cookies.remove(Token.REFRESH_TOKEN)
	}
}
