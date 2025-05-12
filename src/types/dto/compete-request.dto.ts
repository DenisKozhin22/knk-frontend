import { RequestStatus } from '..'

export interface CompleteRequestDto {
	status: Exclude<RequestStatus, 'IN_PROGRESS' | 'PENDING'>
	assignedComment?: string
}
