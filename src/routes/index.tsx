import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: Index,
	beforeLoad: async ({ context }) => {
		const { authentication } = context

		// Если нет refresh_token, перенаправляем на страницу входа
		if (!authentication.hasRefreshToken()) {
			throw redirect({
				to: '/login'
			})
		} else {
			if (authentication.user?.role === 'ADMIN') {
				throw redirect({
					to: '/requests'
				})
			} else {
				throw redirect({
					to: '/my-requests'
				})
			}
		}
	}
})

function Index() {
	return null
}
