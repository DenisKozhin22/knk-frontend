import { CreateRequestForm } from '@/components/requests/create-request-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user-layout/create-request')({
	component: RouteComponent
})

function RouteComponent() {
	return <CreateRequestForm className='m-auto' />
}
