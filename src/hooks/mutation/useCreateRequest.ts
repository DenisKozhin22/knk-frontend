import { REQUEST_QUERY_KEYS } from '@/constants/request-query-keys.constants'
import { RequestService } from '@/services/request.service'
import { CreateRequestDto } from '@/types/dto'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateRequest = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['create-request'],
		mutationFn: async (data: CreateRequestDto) => {
			return await RequestService.createRequest(data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [REQUEST_QUERY_KEYS.GET_ALL_REQUESTS_FOR_USER],
				exact: false
			})
		}
	})
}
