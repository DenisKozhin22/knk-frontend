import { UserRequestsList } from '@/components/requests/user/user-requests-list'
import { Alert } from '@/components/ui/alert'
import { REQUEST_STATUS_OPTIONS } from '@/constants/request-status.contants'
import { URGENCY_OPTIONS } from '@/constants/urgency.constants'
import { RequestStatus, Urgency } from '@/types'
import { GetAllRequestsQueryDto } from '@/types/dto'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user-layout/my-requests')({
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
			<UserRequestsList />

			<Alert variant='default' className='mx-auto w-full max-w-4xl my-4'>
				Уважаемые пользователи, заявки, созданные посредством телефонного звонка , необходимо{' '}
				дублировать в систему падачи заявок!
			</Alert>
		</>
	)
}
