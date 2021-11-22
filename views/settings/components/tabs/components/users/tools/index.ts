import { SelectChangeEvent } from '@mui/material'

export interface UserRole {
	user: string
	role: string
}

/**
 * Cambiar rol de usuario
 * @param ev
 * @param email
 */
const changeUserRole = (
	ev: SelectChangeEvent,
	email: string,
	userRoles: React.MutableRefObject<UserRole[]>
): void => {
	const { value } = ev.target
	const userIndex = userRoles.current.findIndex((user) => user.user === email)
	if (userIndex >= 0) {
		userRoles.current[userIndex].role = value
	}
}

/**
 * Obtener usuarios con roles
 * @param users
 * @returns
 */
export const getUserRoles = (users: User[]): UserRole[] =>
	users.map((user: User) => ({ user: user.email, role: user.role ?? 'admin' }))

export default changeUserRole
