import { RequestStatus } from '@/types'

export const REQUEST_STATUS_OPTIONS: { value: RequestStatus; label: string }[] = [
	{ value: 'PENDING', label: 'Ожидает' },
	{ value: 'IN_PROGRESS', label: 'Принята в работу' },
	{ value: 'COMPLETED', label: 'Завершена' },
	{ value: 'REJECTED', label: 'Отклонена' }
] as const

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
	PENDING: 'Ожидает',
	IN_PROGRESS: 'Принята в работу',
	COMPLETED: 'Завершена',
	REJECTED: 'Отклонена'
}
