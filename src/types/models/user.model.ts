import { Role } from '..'

export interface User {
	id: number
	createdAt: string
	updatedAt: string
	login: string
	firstName: string
	lastName: string
	role: Role
}
