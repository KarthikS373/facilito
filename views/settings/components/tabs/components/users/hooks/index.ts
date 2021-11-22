import { useEffect } from 'react'

// TIPOS
import { getUserRoles, UserRole } from '../tools'
import { getUser } from 'utils/user'

/**
 * Obtener lista de usuarios por correo
 * @param users
 * @param setUsersList
 */
const useUsers = (
	users: string[],
	setUsersList: SetState<User[]>,
	userRoles: React.MutableRefObject<UserRole[]>
): void => {
	useEffect(() => {
		// PROMESAS
		const userPromises = users.map(async (email: string) => getUser(email))

		// OBTENER
		Promise.all(userPromises).then((usersInfo: (User | null)[]) => {
			const usersFilter = usersInfo.filter(Boolean) as User[]
			userRoles.current = getUserRoles(usersFilter)
			setUsersList(usersFilter)
		})
	}, [users, setUsersList, userRoles])
}

export default useUsers
