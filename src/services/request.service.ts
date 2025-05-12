import { api } from '@/api/api.instance'
import { CreateRequestDto, GetAllRequestsQueryDto, PaginationResultDto } from '@/types/dto'
import { CompleteRequestDto } from '@/types/dto/compete-request.dto'
import { Request } from '@/types/models'

export const RequestService = {
	async createRequest(data: CreateRequestDto) {
		return (await api.post<Request>('/request', data)).data
	},
	async getAllForUser(dto?: GetAllRequestsQueryDto) {
		return (
			await api.get<PaginationResultDto<Request>>('/request/user', {
				params: dto
			})
		).data
	},
	async getAllForAdmin(dto?: GetAllRequestsQueryDto) {
		return (
			await api.get<PaginationResultDto<Request>>('/request/admin', {
				params: dto
			})
		).data
	},
	async getAllAssignedToAdmin(dto?: GetAllRequestsQueryDto) {
		return (
			await api.get<PaginationResultDto<Request>>('/request/assigned-to-admin', {
				params: dto
			})
		).data
	},

	async assignAnAdmin(requestId: number) {
		return (await api.post<Request>(`/request/${requestId}/assign-an-admin`)).data
	},

	async completeByAdmin(requestId: number, dto: CompleteRequestDto) {
		return (await api.patch<Request>(`/request/${requestId}/complete-by-admin`, dto)).data
	}
}
