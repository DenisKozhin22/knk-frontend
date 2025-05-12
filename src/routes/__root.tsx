import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthState } from '@/providers/auth-store'

type RouterContext = {
	authentication: AuthState
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent
})

function RootComponent() {
	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<SidebarProvider>
				{/* {authentication.isLoading && authentication.isAuth ? (
					<div className='flex h-[100dvh] w-full justify-center items-center'>
						<LoaderIcon size={32} className='animate-spin' />
					</div>
				) : (
				)} */}
				<Outlet />
				<Toaster />
			</SidebarProvider>
		</ThemeProvider>
	)
}
