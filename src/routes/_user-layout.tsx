import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserSidebar } from '@/components/user/user-sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_user-layout')({
	component: RouteComponent,

	beforeLoad: async ({ context }) => {
		const { authentication } = context

		console.log(authentication.user)

		if (!authentication.isAuth) {
			throw redirect({
				to: '/login'
			})
		} else {
			if (authentication.user?.role === 'ADMIN') {
				throw redirect({
					to: '/requests'
				})
			}
		}
	}
})

function RouteComponent() {
	return (
		<>
			<UserSidebar />

			<main className='p-2 w-full flex flex-col h-[100dvh]'>
				<SidebarTrigger />

				<div className='flex flex-1 flex-col h-full overflow-y-auto'>
					<Outlet />
				</div>
			</main>
		</>
	)
}
