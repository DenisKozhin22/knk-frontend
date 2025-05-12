import { useAuthStore, useUser } from '@/providers/auth-store'
import { Skeleton } from '../../ui/skeleton'
import { Avatar, AvatarFallback } from '../../ui/avatar'
import { UserCogIcon, UserIcon } from 'lucide-react'
import { Logout } from '../../auth/log-out'

export const UserInfo = () => {
	const user = useUser()
	const isLoadingUser = useAuthStore(state => state.isLoading)

	return (
		<div className='flex items-center justify-between gap-1 bg-background px-1 py-2 rounded'>
			{isLoadingUser ? (
				<div className='flex items-center gap-1 w-full'>
					<Skeleton className='h-10 w-10 rounded-full aspect-square' />

					<Skeleton className='h-5 w-full rounded-lg' />
				</div>
			) : (
				<>
					<div className='flex items-center gap-1'>
						<Avatar>
							{/* <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' /> */}
							<AvatarFallback>
								{user?.role === 'ADMIN' ? <UserCogIcon size={20} /> : <UserIcon size={20} />}
							</AvatarFallback>
						</Avatar>

						<div className='text-sm'>
							{user?.firstName} {user?.lastName}
						</div>
					</div>

					<Logout />
				</>
			)}
		</div>
	)
}
