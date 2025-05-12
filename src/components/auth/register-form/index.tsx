import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from '@tanstack/react-router'
import { useRegister } from '@/hooks'
import { useAuthStore } from '@/providers/auth-store'
import { TokenService } from '@/services/token.service'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { toast } from '@/hooks/use-toast'

const registerSchema = z.object({
	login: z
		.string()
		.min(4, { message: 'Логин должен содержать минимум 4 символа' })
		.max(20, { message: 'Логин должен содержать максимум 20 символов' })
		.regex(/^[a-zA-Z0-9]+$/, { message: 'Логин может содержать только английские буквы и цифры' }),
	password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
	confirmPassword: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
	firstName: z
		.string()
		.min(1, { message: 'Имя должно быть хотя бы 1 символ' })
		.max(20, { message: 'Имя не может быть длиннее 20 символов' }),
	lastName: z
		.string()
		.min(1, { message: 'Фамилия должна быть хотя бы 1 символ' })
		.max(20, { message: 'Фамилия не может быть длиннее 20 символов' })
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const RegisterForm = () => {
	const form = useForm<RegisterSchema>({
		mode: 'onBlur',
		resolver: zodResolver(registerSchema),
		defaultValues: {
			login: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: ''
		}
	})

	const setUser = useAuthStore(state => state.setUser)

	const { mutateAsync: register, isPending: isRegisterPending } = useRegister()
	const navigate = useNavigate()

	const handleSubmit = async ({ confirmPassword, ...data }: RegisterSchema) => {
		if (data.password !== confirmPassword) {
			form.setError('confirmPassword', {
				message: 'Пароли не совпадают'
			})
			return
		}

		try {
			const res = await register(data)

			setUser(res.user)

			TokenService.setTokens({
				accessToken: res.accessToken,
				refreshToken: res.refreshToken
			})

			navigate({
				to: '/my-requests',
				replace: true,
				viewTransition: true
			})
		} catch (error) {
			toast({
				title: 'Ошибка регистрации',
				description: 'Что-то пошло не так'
			})
			console.error('Ошибка регистрации:', error)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='max-w-sm w-full mx-auto border rounded-md shadow p-4 flex flex-col gap-2'>
				<FormField
					control={form.control}
					name='login'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Логин</FormLabel>
							<FormControl>
								<Input placeholder='Введите логин' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input type='password' placeholder='Введите пароль' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Подтвердите пароль</FormLabel>
							<FormControl>
								<Input type='password' placeholder='Введите пароль повторно' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='firstName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Имя</FormLabel>
							<FormControl>
								<Input placeholder='Введите имя' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='lastName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Фамилия</FormLabel>
							<FormControl>
								<Input placeholder='Введите фамилию' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='w-full' disabled={isRegisterPending}>
					Зарегистрироваться
				</Button>
			</form>
		</Form>
	)
}
