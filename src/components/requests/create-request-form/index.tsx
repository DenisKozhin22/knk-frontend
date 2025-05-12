import { ComponentProps } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { URGENCY_OPTIONS } from '@/constants/urgency.constants'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { useCreateRequest } from '@/hooks'

const requestSchema = z.object({
	description: z.string().min(1, 'Описание обязательно'),
	urgency: z.enum(['NORMAL', 'MEDIUM', 'HIGH'])
})

type RequestFormData = z.infer<typeof requestSchema>

export function CreateRequestForm({ className }: ComponentProps<'div'>) {
	const { toast } = useToast()
	const { mutateAsync: createRequest, isPending: isCreatePending } = useCreateRequest()

	const form = useForm<RequestFormData>({
		mode: 'onBlur',
		resolver: zodResolver(requestSchema),
		defaultValues: {
			description: '',
			urgency: 'NORMAL'
		}
	})

	const handleSubmit = async (data: RequestFormData) => {
		await createRequest(data)
		// Успешное сохранение
		toast({
			title: 'Заявка создана',
			variant: 'default'
		})

		form.reset({
			description: '',
			urgency: 'NORMAL'
		})
	}

	return (
		<Form {...form}>
			<form
				className={cn(
					'p-4 w-full max-w-2xl border rounded-md shadow flex flex-col gap-2',
					className
				)}
				onSubmit={form.handleSubmit(handleSubmit)}>
				<h2 className='text-lg font-semibold'>Создание новой заявки</h2>

				<FormField
					control={form.control}
					name='urgency'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Срочность</FormLabel>
							<FormControl>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger id='urgency' className='w-full'>
										<SelectValue placeholder='Выберите срочнсть' />
									</SelectTrigger>
									<SelectContent>
										{URGENCY_OPTIONS.map(option => (
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

				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Описание заявки</FormLabel>
							<FormControl>
								<Textarea
									id='description'
									placeholder='Опишите вашу заявку'
									{...field}
									className='w-full min-h-[300px]'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Кнопка сохранить */}
				<Button type='submit' className='w-full' disabled={isCreatePending}>
					Сохранить
				</Button>
			</form>
		</Form>
	)
}
