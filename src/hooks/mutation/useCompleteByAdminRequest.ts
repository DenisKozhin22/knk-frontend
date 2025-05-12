import { REQUEST_QUERY_KEYS } from '@/constants/request-query-keys.constants'
import { RequestService } from '@/services/request.service'
import { CompleteRequestDto } from '@/types/dto/compete-request.dto'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCompleteByAdminRequest = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['complete by admin request'],
		mutationFn: async ({ requestId, dto }: { requestId: number; dto: CompleteRequestDto }) =>
			RequestService.completeByAdmin(requestId, dto),
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
