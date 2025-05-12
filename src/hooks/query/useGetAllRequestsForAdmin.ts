import { RequestService } from '@/services/request.service'
import { GetAllRequestsQueryDto, PaginationResultDto } from '@/types/dto'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Request } from '@/types/models'
import { REQUEST_QUERY_KEYS } from '@/constants/request-query-keys.constants'

export const useGetAllRequestsForAdmin = (
	dto?: GetAllRequestsQueryDto,
	options?: Partial<UseQueryOptions<PaginationResultDto<Request>, unknown>>
) => {
	return useQuery({
		queryKey: [REQUEST_QUERY_KEYS.GET_ALL_REQUESTS_FOR_ADMIN, dto],
		queryFn: () => RequestService.getAllForAdmin(dto),
		...options
	})
}
