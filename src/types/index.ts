import { FileRouteTypes } from '@tanstack/react-router'

export type AppRouteTo = FileRouteTypes['to']

export type RequestStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED'

export type Urgency = 'NORMAL' | 'MEDIUM' | 'HIGH'

export type Role = 'ADMIN' | 'USER'
