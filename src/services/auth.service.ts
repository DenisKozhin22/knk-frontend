import { api } from '@/api/api.instance'
import { AuthResponseDto, RegisterDto } from '@/types/dto'
import { LoginDto } from '@/types/dto/login.dto'

export const AuthService = {
	async register(dto: RegisterDto) {
		return (await api.post<AuthResponseDto>('/auth/register', dto)).data
	},
	async login(dto: LoginDto) {
		return (await api.post<AuthResponseDto>('/auth/login', dto)).data
	},
	async refreshTokens() {
		return (await api.post<AuthResponseDto>('/auth/refresh-tokens')).data
	}
}
