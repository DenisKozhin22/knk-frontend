import { AdminAssigmendRequestsList } from '@/components/requests/admin/admin-assigned-requests-list'
import { REQUEST_STATUS_OPTIONS } from '@/constants/request-status.contants'
import { URGENCY_OPTIONS } from '@/constants/urgency.constants'
import { RequestStatus, Urgency } from '@/types'
import { GetAllRequestsQueryDto } from '@/types/dto'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin-layout/assigned-requests')({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>): GetAllRequestsQueryDto => {
		const page = Number(search?.page ?? 1)
		const limit = Number(search?.limit ?? 10)

		const status =
			search?.status && REQUEST_STATUS_OPTIONS.some(option => option.value === search.status)
				? (search.status as RequestStatus)
				: undefined

		const urgency =
			search?.urgency && URGENCY_OPTIONS.some(option => option.value === search.urgency)
				? (search.urgency as Urgency)
				: undefined

		return {
			page,
			limit,
			status,
			urgency
		}
	}
})

function RouteComponent() {
	return (
		<>
			<AdminAssigmendRequestsList />
		</>
	)
}
