import { api } from '@/api/api.instance'
import { User } from '@/types/models/user.model'

export const UserService = {
	async getProfile() {
		return (await api.get<User>('/user/profile')).data
	}
}
