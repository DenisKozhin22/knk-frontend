import { TokenService } from '@/services/token.service'
import { AuthResponseDto } from '@/types/dto'
import { Token } from '@/types/token.enum'
import { redirect } from '@tanstack/react-router'
import axios from 'axios'
import Cookies from 'js-cookie'

const APP_API_URL = import.meta.env.VITE_APP_API_URL

export const api = axios.create({
	baseURL: APP_API_URL,
	headers: {
		...(!!Cookies.get(Token.ACCESS_TOKEN)?.length && {
			Authorization: `Bearer ${Cookies.get(Token.ACCESS_TOKEN)}`
		})
	},
	withCredentials: true
})

api.interceptors.request.use(
	config => {
		const token = Cookies.get(Token.ACCESS_TOKEN)
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// Перехватчик для обработки ошибок
api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		// Проверка, что ошибка из-за истекшего токена (401 Unauthorized)
		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				// Попытка обновления токена

				const res = await axios.post<AuthResponseDto>(`${APP_API_URL}/auth/refresh`, null, {
					headers: {
						Authorization: `Bearer ${Cookies.get(Token.REFRESH_TOKEN)}`
					}
				})
				// const newAccessToken = await refreshAccessToken()

				TokenService.setTokens({
					accessToken: res.data.accessToken,
					refreshToken: res.data.refreshToken
				})

				// Обновляем токен в заголовках
				api.defaults.headers['Authorization'] = `Bearer ${res.data.refreshToken}`

				// Повторяем исходный запрос с новым токеном
				originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`

				return api(originalRequest) // Повторяем запрос с обновленным токеном
			} catch (refreshError) {
				console.error('Ошибка при обновлении токена:', refreshError)
				// window.location.href = '/login' // Редирект на страницу логина

				TokenService.removeTokens()

				throw redirect({
					to: '/login',
					replace: true
				})
			}
		}

		return Promise.reject(error) // Если ошибка не связана с токеном, отклоняем
	}
)
