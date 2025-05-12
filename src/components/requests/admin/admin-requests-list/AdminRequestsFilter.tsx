import { RequestStatus, Urgency } from '@/types'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { REQUEST_STATUS_OPTIONS } from '@/constants/request-status.contants'
import { URGENCY_OPTIONS } from '@/constants/urgency.constants'
import { FilterIcon } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

const routeApi = getRouteApi('/_admin-layout/requests')

export const AdminRequestsFilter = () => {
	const navigate = useNavigate()

	const { limit = 10, status, urgency } = routeApi.useSearch()

	const onChangeStatus = (newStatus: RequestStatus | 'all' | undefined) => {
		const newStatusValue = newStatus === 'all' ? undefined : newStatus
		navigate({ to: '/requests', search: { page: 1, limit, status: newStatusValue, urgency } })
	}

	const onChangeUrgency = (newUrgency: Urgency | 'all' | undefined) => {
		const newUrgencyValue = newUrgency === 'all' ? undefined : newUrgency
		navigate({ to: '/requests', search: { page: 1, limit, status, urgency: newUrgencyValue } })
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' size='sm'>
					<FilterIcon size={16} />
					Фильтры
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Фильтр заявок</DialogTitle>
				</DialogHeader>

				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2 min-w-[150px]'>
						<Label>Статус</Label>
						<Select
							value={status ?? 'all'}
							onValueChange={value => onChangeStatus(value as RequestStatus | 'all')}>
							<SelectTrigger>
								<SelectValue placeholder='Выберите статус' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Все</SelectItem>
								{REQUEST_STATUS_OPTIONS.map(option => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='flex flex-col gap-2 min-w-[150px]'>
						<Label>Срочность</Label>
						<Select
							value={urgency ?? 'all'}
							onValueChange={value => onChangeUrgency(value as Urgency | 'all')}>
							<SelectTrigger>
								<SelectValue placeholder='Выберите срочность' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>Все</SelectItem>
								{URGENCY_OPTIONS.map(option => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
