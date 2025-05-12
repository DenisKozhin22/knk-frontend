import { AuthService } from '@/services/auth.service'
import { RegisterDto } from '@/types/dto'
import { useMutation } from '@tanstack/react-query'

export const useRegister = () => {
	return useMutation({
		mutationKey: ['register'],
		mutationFn: async (dto: RegisterDto) => AuthService.register(dto)
	})
}
