import { UserRole } from '../components/tabs/components/users/tools'
import { changeUserRole } from 'utils/user'
import { saveFile } from 'utils/storage'

/**
 * Guardar datos nuevos en db
 * @param setBusiness
 * @param businessRef
 * @param userRoles
 */
const saveBusiness = (
	setBusiness: (business: Partial<Business>) => void,
	businessRef: React.MutableRefObject<Business>,
	userRoles: React.MutableRefObject<UserRole[]>,
	backgroundRef: React.MutableRefObject<File | string>,
	bannerRef: React.MutableRefObject<File | string>,
	companyId?: string
): void => {
	// GUARDAR ROLES
	window.Snack('Espera un momento...')

	// COMPARAR ROLES
	if (userRoles.current?.length) {
		const req = userRoles.current.map(async (user) => changeUserRole(user.user, user.role))

		Promise.all(req).then(async () => {
			// GUARDAR FONDO
			if (backgroundRef.current) {
				if (typeof backgroundRef.current === 'object') {
					const backUrl = await saveFile(
						`/${companyId}/gallery/${backgroundRef.current.name}`,
						backgroundRef.current
					)
					businessRef.current.backgroundImage = backUrl
					businessRef.current.background = ''

					let defGallery = businessRef.current.gallery ?? []
					defGallery.push(backUrl)
					defGallery = [...new Set(defGallery)]

					// ASIGNAR GALERIA
					businessRef.current.gallery = defGallery
				} else {
					businessRef.current.background = backgroundRef.current
					businessRef.current.backgroundImage = ''
				}
			}

			// GUARDAR FORO DE PERFIL
			if (bannerRef.current) {
				let picUrl = bannerRef.current
				if (typeof bannerRef.current === 'object')
					picUrl = await saveFile(
						`/${companyId}/pictures/${bannerRef.current.name}`,
						bannerRef.current
					)

				businessRef.current.picture = picUrl as string
			}

			// CAMBIAR NEGOCIO
			console.log(backgroundRef.current)
			if (businessRef.current.id?.length) setBusiness(businessRef.current)
		})
	}
}

export default saveBusiness
