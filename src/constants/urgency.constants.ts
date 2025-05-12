import { Urgency } from '@/types'

export const URGENCY_OPTIONS: { value: Urgency; label: string }[] = [
	{ value: 'NORMAL', label: 'Низкая' },
	{ value: 'MEDIUM', label: 'Средняя' },
	{ value: 'HIGH', label: 'Высокая' }
] as const

export const URGENCY_LABELS: Record<Urgency, string> = {
	NORMAL: 'Низкая',
	MEDIUM: 'Средняя',
	HIGH: 'Высокая'
}
