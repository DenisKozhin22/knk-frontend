import { HeadsetIcon, ListTodo, LucideIcon, Pencil } from 'lucide-react'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarHeader,
	SidebarFooter
} from '@/components/ui/sidebar'
import { Link, useMatchRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { AppRouteTo } from '@/types'
import { ModeToggle } from '@/components/mode-toggle'
import { UserInfo } from '../user-info'

// Menu items.
const items: { title: string; url: AppRouteTo; icon: LucideIcon }[] = [
	{
		title: 'Мои заявки',
		url: '/my-requests',
		icon: ListTodo
	},
	{
		title: 'Создать заявку',
		url: '/create-request',
		icon: Pencil
	},
	{
		title: 'Поддержка',
		url: '/support',
		icon: HeadsetIcon
	}
]

export function UserSidebar() {
	const matchRoute = useMatchRoute()

	return (
		<Sidebar>
			<SidebarHeader>
				<div className='flex items-center justify-between'>
					<SidebarGroupLabel>KnK</SidebarGroupLabel>

					<ModeToggle />
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											to={item.url}
											className={cn(matchRoute({ to: item.url }) && 'bg-sidebar-accent')}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<UserInfo />
			</SidebarFooter>
		</Sidebar>
	)
}
