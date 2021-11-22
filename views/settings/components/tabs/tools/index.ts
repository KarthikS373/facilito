import { UserRole } from '../components/users/tools'

export interface GeneralProps {
	show: boolean
	businessRef: React.MutableRefObject<Business | null>
	userRoles: React.MutableRefObject<UserRole[]>
}
