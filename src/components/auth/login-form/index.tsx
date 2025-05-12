import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '@/hooks'
import { useAuthStore } from '@/providers/auth-store'
import { TokenService } from '@/services/token.service'
import { toast } from '@/hooks/use-toast'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'

export const loginSchema = z.object({
	login: z
		.string()
		.min(4, { message: 'Логин должен содержать минимум 4 символа' })
		.max(20, { message: 'Логин должен содержать максимум 20 символов' })
		.regex(/^[a-zA-Z0-9]+$/, { message: 'Логин может содержать только английские буквы и цифры' }),
	password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' })
})

export type LoginSchema = z.infer<typeof loginSchema>

export const LoginForm = () => {
	const form = useForm<LoginSchema>({
		mode: 'onBlur',
		resolver: zodResolver(loginSchema),
		defaultValues: {
			login: '',
			password: ''
		}
	})

	const navigate = useNavigate()
	const setUser = useAuthStore(state => state.setUser)

	const { mutateAsync: login, isPending: isLoginPending } = useLogin()

	const handleSubmit = async (data: LoginSchema) => {
		try {
			const res = await login(data)

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
				title: 'Ошибка авторизации',
				description: 'Неверный логин или пароль'
			})
			console.error('Ошибка авторизации:', error)
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
				<Button type='submit' className='w-full' disabled={isLoginPending}>
					Войти
				</Button>
			</form>
		</Form>
	)
}
