import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import dayjs from 'dayjs'
import { PropsWithChildren, useState } from 'react'
import { Request } from '@/types/models'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { REQUEST_STATUS_OPTIONS } from '@/constants/request-status.contants'
import { useCompleteByAdminRequest } from '@/hooks'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

const completeSchema = z.object({
	assignedComment: z.string().min(1, 'Комментарий обязателен'),
	status: z.enum(['COMPLETED', 'REJECTED'])
})

type CompleteRequestFormData = z.infer<typeof completeSchema>

interface CompleteRequestByAdminProps extends PropsWithChildren {
	request: Request
	onComplete: (request: Request) => void
}

export const CompleteRequestByAdmin = ({
	request,
	onComplete,
	children
}: CompleteRequestByAdminProps) => {
	const [open, setOpen] = useState(false)
	const { mutateAsync: completeRequest, isPending } = useCompleteByAdminRequest()

	const form = useForm<CompleteRequestFormData>({
		mode: 'onBlur',
		resolver: zodResolver(completeSchema),
		defaultValues: {
			assignedComment: '',
			status: 'COMPLETED'
		}
	})

	const handleSubmit = async (data: CompleteRequestFormData) => {
		const res = await completeRequest({
			dto: data,
			requestId: request.id
		})

		toast({
			title: 'Заявка закрыта',
			variant: 'default'
		})

		form.reset({
			assignedComment: '',
			status: 'COMPLETED'
		})

		onComplete(res)

		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Заявка от {dayjs(request.createdAt).format('DD.MM.YYYY HH:mm')}</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form className='space-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
						<FormField
							control={form.control}
							name='assignedComment'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Комментарий</FormLabel>
									<FormControl>
										<Textarea
											id='assignedComment'
											placeholder='Комментарий к заявке'
											{...field}
											className='w-full min-h-[300px]'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='status'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Статус</FormLabel>
									<FormControl>
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger id='status' className='w-full'>
												<SelectValue placeholder='Выберите статус' />
											</SelectTrigger>
											<SelectContent>
												{REQUEST_STATUS_OPTIONS.filter(
													option => option.value === 'COMPLETED' || option.value === 'REJECTED'
												).map(option => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit' className='w-full' disabled={isPending}>
							Завершить
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
