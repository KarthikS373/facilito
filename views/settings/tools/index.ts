import { UserRole } from '../components/tabs/components/users/tools'
import { changeUserRole } from 'utils/user'
import { saveFile } from 'utils/storage'
import { getBackgroundColors, getVibrant } from 'utils/tools'

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
					const vibrantColors = await getVibrant(backUrl)
					businessRef.current.theme = {
						primary: vibrantColors[0],
						secondary: vibrantColors[1],
						muted: vibrantColors[3],
						deg: '042',
					}
				} else {
					if (backgroundRef.current.startsWith('transparent linear-gradient')) {
						businessRef.current.background = backgroundRef.current
						businessRef.current.backgroundImage = ''

						// COLORES
						const colors = getBackgroundColors(backgroundRef.current)
						businessRef.current.theme = {
							primary: colors[0],
							secondary: colors[1],
							muted: colors[1],
							deg: colors[2],
						}
					} else {
						businessRef.current.backgroundImage = backgroundRef.current
						businessRef.current.background = ''

						const vibrantColors = await getVibrant(backgroundRef.current)
						businessRef.current.theme = {
							primary: vibrantColors[0],
							secondary: vibrantColors[1],
							muted: vibrantColors[3],
							deg: '042',
						}
					}
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
			if (businessRef.current.id?.length) setBusiness(businessRef.current)
		})
	}
}

export default saveBusiness
