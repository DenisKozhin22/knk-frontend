import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthState, useAuthStore } from '@/providers/auth-store'
import { LoaderIcon } from 'lucide-react'

type RouterContext = {
	authentication: AuthState
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent
})

function RootComponent() {
	const authentication = useAuthStore()

	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<SidebarProvider>
				{authentication.isLoading && authentication.isAuth ? (
					<div className='flex h-[100dvh] w-full justify-center items-center'>
						<LoaderIcon size={32} className='animate-spin' />
					</div>
				) : (
					<Outlet />
				)}
				<Toaster />
			</SidebarProvider>
		</ThemeProvider>
	)
}
