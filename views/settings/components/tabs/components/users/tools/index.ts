import { SelectChangeEvent } from '@mui/material'

export interface UserRole {
	user: string
	role: string
}

/**
 * Cambiar rol de usuario
 * @param {SelectChangeEvent} ev
 * @param {string} email
 * @param {React.MutableRefObject<UserRole[]>} userRles
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
 * @param {User[]} users
 * @returns {UserRole[]}
 */
export const getUserRoles = (users: User[]): UserRole[] =>
	users.map((user: User) => ({ user: user.email, role: user.role ?? 'admin' }))

export default changeUserRole
