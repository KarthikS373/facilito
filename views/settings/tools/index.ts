import { UserRole } from '../components/tabs/components/users/tools'
import { changeUserRole } from 'utils/user'

/**
 * Guardar datos nuevos en db
 * @param setBusiness
 * @param businessRef
 * @param userRoles
 */
const saveBusiness = (
	setBusiness: (business: Partial<Business>) => void,
	businessRef: React.MutableRefObject<Business>,
	userRoles: React.MutableRefObject<UserRole[]>
): void => {
	// GUARDAR ROLES
	window.Snack('Espera un momento...')

	// COMPARAR ROLES
	if (userRoles.current?.length) {
		const req = userRoles.current.map(async (user) => changeUserRole(user.user, user.role))

		Promise.all(req).then(() => {
			// CAMBIAR NEGOCIO
			if (businessRef.current.id?.length) setBusiness(businessRef.current)
		})
	}
}

export default saveBusiness
