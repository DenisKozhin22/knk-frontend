import { RequestStatus, Urgency } from '..'
import { User } from './user.model'

export interface Request {
	id: number
	description: string
	urgency: Urgency
	status: RequestStatus
	createdAt: string
	updatedAt: string
	user: User
	assignedTo?: User
	assignedComment?: string
}
