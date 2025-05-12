import { RequestStatus, Urgency } from '..'
import { PaginationQueryDto } from './pagination-query.dto'

export interface GetAllRequestsQueryDto extends PaginationQueryDto {
	status?: RequestStatus

	urgency?: Urgency
}
