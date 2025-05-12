import { LoginForm } from '@/components/auth/login-form'
import { RegisterForm } from '@/components/auth/register-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		const { authentication } = context

		// Если есть refresh_token, перенаправляем на главную страницу
		if (authentication.isAuth) {
			throw redirect({
				to: '/about'
			})
		}
	}
})

function RouteComponent() {
	return (
		<div className='flex flex-col w-full min-h-dvh justify-center items-center'>
			<Tabs defaultValue='login' className='w-full max-w-sm mx-auto'>
				{/* Список вкладок */}
				<TabsList className='grid grid-cols-2 w-full '>
					<TabsTrigger value='login'>Вход</TabsTrigger>
					<TabsTrigger value='register'>Регистрация</TabsTrigger>
				</TabsList>

				{/* Контент вкладок */}
				<TabsContent value='login'>
					<LoginForm />
				</TabsContent>
				<TabsContent value='register'>
					<RegisterForm />
				</TabsContent>
			</Tabs>
		</div>
	)
}
