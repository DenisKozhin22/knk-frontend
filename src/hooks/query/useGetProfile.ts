import { useAuthStore } from '@/providers/auth-store'
import { UserService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export const useGetProfile = () => {
	const hasRefreshToken = useAuthStore(state => state.hasRefreshToken)

	return useQuery({
		queryKey: ['profile'],
		queryFn: async () => UserService.getProfile(),
		enabled: hasRefreshToken()
	})
}
