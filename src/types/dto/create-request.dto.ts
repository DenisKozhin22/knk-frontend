import { Urgency } from '..'

export interface CreateRequestDto {
	description: string
	urgency: Urgency
}
