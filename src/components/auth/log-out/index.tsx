import { LogOutIcon } from 'lucide-react'
import { useLogout } from '@/hooks'
import { Button } from '@/components/ui/button'

export const Logout = () => {
	const onLogout = useLogout()

	return (
		<Button size='icon' variant='ghost' onClick={onLogout}>
			<LogOutIcon size={24} className='cursor-pointer' />
		</Button>
	)
}
