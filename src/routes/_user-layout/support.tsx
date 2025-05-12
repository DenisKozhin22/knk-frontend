import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone } from 'lucide-react'

export const Route = createFileRoute('/_user-layout/support')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4'>
			<Card className='w-full max-w-md shadow-lg'>
				<CardHeader>
					<CardTitle className='text-xl text-center'>Поддержка</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='flex items-center gap-2'>
						<Phone className='w-5 h-5 text-gray-500' />
						<a href='tel:+79991234567' className='text-lg font-medium'>
							+7 (999) 123-45-67
						</a>
					</div>
					<div className='flex items-center gap-2'>
						<Mail className='w-5 h-5 text-gray-500' />
						<a href='mailto:support@example.com' className='text-lg font-medium'>
							support@example.com
						</a>
					</div>
					<Button className='w-full'>Связаться</Button>
				</CardContent>
			</Card>
		</div>
	)
}
