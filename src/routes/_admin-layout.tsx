import { SidebarTrigger } from '@/components/ui/sidebar'
import { AdminSidebar } from '@/components/user/admin-sidebar'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin-layout')({
	component: RouteComponent,

	beforeLoad: async ({ context }) => {
		const { authentication } = context

		if (!authentication.isAuth) {
			throw redirect({
				to: '/login'
			})
		} else {
			if (authentication.user?.role === 'USER') {
				throw redirect({
					to: '/my-requests'
				})
			}
		}
	}
})

function RouteComponent() {
	return (
		<>
			<AdminSidebar />

			<main className='p-2 w-full flex flex-col h-[100dvh]'>
				<SidebarTrigger />

				<div className='flex flex-1 flex-col h-full overflow-y-auto'>
					<Outlet />
				</div>
			</main>
		</>
	)
}
