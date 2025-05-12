import { REQUEST_QUERY_KEYS } from '@/constants/request-query-keys.constants'
import { RequestService } from '@/services/request.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAssignAnAdminRequest = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['assign request'],
		mutationFn: async (requestId: number) => RequestService.assignAnAdmin(requestId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [REQUEST_QUERY_KEYS.GET_ALL_REQUESTS_FOR_ADMIN],
				exact: false
			})

			queryClient.invalidateQueries({
				queryKey: [REQUEST_QUERY_KEYS.GET_ALL_REQUESTS_ASSIGNED_TO_ADMIN],
				exact: false
			})
		}
	})
}
