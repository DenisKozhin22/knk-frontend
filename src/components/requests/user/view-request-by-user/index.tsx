import { Request } from '@/types/models'
import { PropsWithChildren } from 'react'
import { URGENCY_LABELS } from '@/constants/urgency.constants'
import { REQUEST_STATUS_LABELS } from '@/constants/request-status.contants'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'

interface ViewRequestByUserProps extends PropsWithChildren {
	request: Request
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
	<div className='flex items-center'>
		<Label className='min-w-[30%]'>{label}</Label>
		<p>{value}</p>
	</div>
)

export const ViewRequestByUser = ({ request, children }: ViewRequestByUserProps) => {
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
					<DetailRow label='Уровень срочности:' value={URGENCY_LABELS[request.urgency]} />
					<Separator />

					{/* Статус */}
					<DetailRow label='Статус:' value={REQUEST_STATUS_LABELS[request.status]} />
					<Separator />

					{/* Дата создания */}
					<DetailRow
						label='Дата создания:'
						value={dayjs(request.createdAt).format('DD.MM.YYYY HH:mm')}
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

					{request.status === 'PENDING' && (
						<Button
							variant='default'
							size='sm'
							className='w-full'
							onClick={e => {
								e.stopPropagation()
							}}>
							Отменить
						</Button>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
