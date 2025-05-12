import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { useGetAllRequestsForUser } from '@/hooks'
import { URGENCY_LABELS } from '@/constants/urgency.constants'
import { REQUEST_STATUS_LABELS } from '@/constants/request-status.contants'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { UserRequestsFilter } from './UserRequestsFilter'
import dayjs from 'dayjs'
import { ViewRequestByUser } from '../view-request-by-user'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Paginator } from '@/components/ui/paginator'
import { Badge } from '@/components/ui/badge'

const routeApi = getRouteApi('/_user-layout/my-requests')

export function UserRequestsList() {
	const navigate = useNavigate()

	const { page = 1, limit = 10, status, urgency } = routeApi.useSearch()

	const { data: requests, isLoading } = useGetAllRequestsForUser({
		limit,
		page,
		status,
		urgency
	})

	const onPageChange = (page: number) => {
		navigate({ to: '/my-requests', search: { page, limit, status, urgency } })
	}

	return (
		<>
			<div className='flex items-center justify-between mb-4'>
				<Label>Список заявок</Label>
				<UserRequestsFilter />
			</div>

			<div className='grid mb-4'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>№ Заявки</TableHead>
							<TableHead className='text-left'>Описание</TableHead>
							<TableHead className='text-left'>Срочность</TableHead>
							<TableHead className='text-left'>Дата создания</TableHead>
							<TableHead className='text-left'>Ответственный</TableHead>
							<TableHead className='text-left'>Комментарий</TableHead>
							<TableHead className='text-left'>Статус</TableHead>
							<TableHead className='text-right'>Действия</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{isLoading
							? Array.from({ length: 10 }).map((_, index) => (
									<TableRow key={index}>
										<TableCell className='font-medium'>{index + 1}</TableCell>
										{Array.from({ length: 6 }).map((_, i) => (
											<TableCell key={i}>
												<Skeleton className='w-full h-5' />
											</TableCell>
										))}
									</TableRow>
								))
							: requests?.data?.map((request, index) => (
									<ViewRequestByUser request={request} key={request.id}>
										<TableRow key={request.id}>
											<TableCell className='cursor-pointer font-medium'>
												{(page - 1) * limit + index + 1}
											</TableCell>
											<TableCell className='cursor-pointer text-left'>
												{request.description}
											</TableCell>
											<TableCell className='cursor-pointer text-left'>
												<Badge>{URGENCY_LABELS[request.urgency]}</Badge>
											</TableCell>
											<TableCell className='cursor-pointer text-left'>
												{dayjs(request.createdAt).format('DD.MM.YYYY HH:mm')}
											</TableCell>
											<TableCell className='cursor-pointer text-left'>
												{request.assignedTo
													? `${request.assignedTo.firstName} ${request.assignedTo.lastName}`
													: '-'}
											</TableCell>
											<TableCell className='cursor-pointer text-left'>
												{request.assignedComment || '-'}
											</TableCell>
											<TableCell className='cursor-pointer text-left'>
												{request.status === 'REJECTED' ? (
													<Badge variant='destructive'>
														{REQUEST_STATUS_LABELS[request.status]}
													</Badge>
												) : (
													<Badge>{REQUEST_STATUS_LABELS[request.status]}</Badge>
												)}
											</TableCell>
											<TableCell className='text-end'>
												{request.status === 'PENDING' && (
													<Button
														variant='default'
														size='sm'
														onClick={e => {
															e.stopPropagation()
														}}>
														Отменить
													</Button>
												)}
											</TableCell>
										</TableRow>
									</ViewRequestByUser>
								))}
					</TableBody>

					<TableFooter>
						<TableRow>
							<TableCell colSpan={8}>Всего заявок: {requests?.meta.total}</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>

			{!!requests?.meta.total && (
				<Paginator
					currentPage={requests.meta.currentPage}
					lastPage={requests.meta.lastPage}
					total={requests.meta.total}
					totalPerPage={requests.meta.totalPerPage}
					prevPage={requests.meta.prevPage}
					nextPage={requests.meta.nextPage}
					onPageChange={onPageChange}
				/>
			)}
		</>
	)
}
