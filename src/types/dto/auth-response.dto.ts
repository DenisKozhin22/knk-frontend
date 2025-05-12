import { User } from '../models/user.model'

export interface AuthResponseDto {
	accessToken: string
	refreshToken: string
	user: User
}
