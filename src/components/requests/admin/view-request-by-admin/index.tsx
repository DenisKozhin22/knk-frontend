import { Request } from '@/types/models'
import { PropsWithChildren } from 'react'
import { Label } from '../../../ui/label'
import { URGENCY_LABELS } from '@/constants/urgency.constants'
import { REQUEST_STATUS_LABELS } from '@/constants/request-status.contants'
import dayjs from 'dayjs'
import { Separator } from '../../../ui/separator'
import { Button } from '@/components/ui/button'
import { useUser } from '@/providers/auth-store'
import { AssignAnAdminRequest } from '../assign-an-admin-request'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { CompleteRequestByAdmin } from '../сomplete-request-by-admin'
import { Badge } from '@/components/ui/badge'

interface ViewRequestByAdminProps extends PropsWithChildren {
	request: Request
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
	<div className='flex items-center'>
		<Label className='min-w-[30%]'>{label}</Label>
		<p>{value}</p>
	</div>
)

export const ViewRequestByAdmin = ({ request, children }: ViewRequestByAdminProps) => {
	const user = useUser()

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Заявка от {dayjs(request.createdAt).format('DD.MM.YYYY HH:mm')}</DialogTitle>
				</DialogHeader>

				<Separator />

				<div className='space-y-4'>
					{/* Описание */}
					<DetailRow label='Описание:' value={request.description} />
					<Separator />

					{/* Уровень срочности */}
					<div className='flex items-center'>
						<Label className='min-w-[30%]'>Уровень срочности:</Label>
						<Badge>{URGENCY_LABELS[request.urgency]}</Badge>
					</div>
					<Separator />

					{/* Статус */}
					<div className='flex items-center'>
						<Label className='min-w-[30%]'>Статус:</Label>

						{request.status === 'REJECTED' ? (
							<Badge variant='destructive'>{REQUEST_STATUS_LABELS[request.status]}</Badge>
						) : (
							<Badge>{REQUEST_STATUS_LABELS[request.status]}</Badge>
						)}
					</div>
					<Separator />

					{/* Дата создания */}
					<DetailRow
						label='Дата создания:'
						value={dayjs(request.createdAt).format('DD.MM.YYYY HH:mm')}
					/>
					<Separator />

					{/* Пользователь */}
					<DetailRow
						label='Пользователь:'
						value={`${request.user.firstName} ${request.user.lastName}`}
					/>
					<Separator />

					{/* Назначено */}
					{request.assignedTo && (
						<>
							<DetailRow
								label='Назначено:'
								value={`${request.assignedTo.firstName} ${request.assignedTo.lastName}`}
							/>
							<Separator />
						</>
					)}

					{/* Комментарий */}
					{request.assignedComment && (
						<>
							<DetailRow label='Комментарий:' value={request.assignedComment} />
							<Separator />
						</>
					)}

					<div>
						{request.status === 'PENDING' && (
							<AssignAnAdminRequest requestId={request.id} onSuccess={() => {}} />
						)}

						{request.status === 'IN_PROGRESS' && request.assignedTo?.id === user?.id && (
							<CompleteRequestByAdmin request={request} onComplete={() => {}}>
								<Button
									variant='default'
									size='sm'
									className='w-full'
									onClick={e => {
										e.stopPropagation()
									}}>
									Завершить
								</Button>
							</CompleteRequestByAdmin>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
