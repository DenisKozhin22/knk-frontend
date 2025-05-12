import { AuthService } from '@/services/auth.service'
import { AuthResponseDto } from '@/types/dto'
import { LoginDto } from '@/types/dto/login.dto'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export const useLogin = (
	options?: UseMutationOptions<AuthResponseDto, Error, LoginDto, unknown>
) => {
	return useMutation({
		mutationKey: ['login'],
		mutationFn: async (dto: LoginDto) => AuthService.login(dto),
		...options
	})
}
