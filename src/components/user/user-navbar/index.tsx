import { ModeToggle } from '../../mode-toggle'
import { Avatar, AvatarFallback } from '../../ui/avatar'
import { Logo } from '../../ui/logo'
import { Navbar, NavbarItem } from '../../ui/navbar'
import { Link } from 'react-router-dom'
import { Separator } from '../../ui/separator'
import { useUser } from '@/providers/auth-store'
import { Logout } from '@/components/auth/log-out'

const LIST = [
	{
		id: 1,
		label: 'Мои заявки',
		href: '/my-requests'
	},
	{
		id: 2,
		label: 'Создать заявку',
		href: '/create-request'
	},
	{
		id: 3,
		label: 'Архив',
		href: '/archive'
	},
	{
		id: 4,
		label: 'Поддержка',
		href: '/support'
	}
]

export const UserNavbar = () => {
	const user = useUser()
	// const location = useLocation() // Получаем текущий путь

	return (
		<>
			<Navbar>
				<Link to={'/'}>
					<Logo />
				</Link>

				<div className='flex items-center gap-5 mr-auto'>
					{LIST.map(item => (
						<Link key={item.id} to={item.href}>
							<NavbarItem
							// className={location.pathname === item.href ? 'text-blue-400 ' : ''}
							>
								{item.label}
							</NavbarItem>
						</Link>
					))}
				</div>

				<div className='flex items-center gap-2'>
					<ModeToggle />
					<Avatar>
						{/* <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' /> */}
						<AvatarFallback>
							{user?.lastName}
							{user?.firstName}
						</AvatarFallback>
					</Avatar>

					<Logout />
				</div>
			</Navbar>

			<Separator className='mb-4' />
		</>
	)
}
