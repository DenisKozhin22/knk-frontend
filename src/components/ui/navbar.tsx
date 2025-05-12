import { cn } from '@/lib/utils'
import { ComponentProps, PropsWithChildren } from 'react'

export const NavbarItem = ({ className, ...props }: PropsWithChildren<ComponentProps<'div'>>) => {
	return (
		<div
			className={cn('flex items-center justify-between hover:underline', className)}
			{...props}></div>
	)
}

export const Navbar = ({ className, ...props }: PropsWithChildren<ComponentProps<'nav'>>) => {
	return (
		<nav
			className={cn('flex gap-4 items-center justify-between my-4 py-2 px-4', className)}
			{...props}></nav>
	)
}
