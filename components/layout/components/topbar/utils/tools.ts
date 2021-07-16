/**
 * Evaluá ruta
 * @description Retorna una lista boolean [buscador, appbar]
 * @param  {string} path
 */
export const evaluatePath: (path: string) => [boolean, boolean] = (path: string) => {
	// MOSTRAR
	if (/\/f\/.+\/respuestas/.test(path)) return [true, false]
	else if (/\/f\/.+\/.+$/.test(path)) return [false, false]
	else if (path === '/formularios') return [true, false]
	else if (path === '/template') return [true, false]
	else if (/\/f\/(.+)$/.test(path)) return [true, false]
	else if (path === '/livetracking') return [true, false]
	else if (/\/l\/(.+)\/setting/.test(path)) return [true, false]
	else if (/\/l\/(.+)$/.test(path)) return [false, false]
	else if (path === '/productos') return [true, false]
	else if (/\/p\/(.+)$/.test(path)) return [true, false]
	else if (/\/e\/editar/.test(path)) return [true, false]
	else if (/\/calendario$/.test(path)) return [true, false]
	else if (/\/productos$/.test(path)) return [true, false]
	// OCULTAR
	else return [false, true]
}

/**
 * Reiniciar notificaciones
 * @description Limpia la lista de notificaciones
 * @param  {React.Dispatch<React.SetStateAction<FormNotification[]>>} setNotificationList
 * @param  {React.Dispatch<React.SetStateAction<HTMLElement|null>>} setNotificationsMenu
 */
export const resetNotificationsMenu = (
	setNotificationList: React.Dispatch<React.SetStateAction<FormNotification[]>>,
	setNotificationsMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>
) => {
	setNotificationList([])
	setNotificationsMenu(null)
}

/**
 * Cerrar snack
 * @description Cierra el snack con eventos outside click
 * @param  {React.Dispatch<React.SetStateAction<boolean>>} setOpenSnack
 */
export const closeSnack =
	(setOpenSnack: React.Dispatch<React.SetStateAction<boolean>>) =>
	(_event: React.SyntheticEvent | MouseEvent, reason?: string) => {
		if (reason === 'clickaway') return
		setOpenSnack(false)
	}

// GUARDAR NOTIFICACIONES
/**
 * @description Actualiza la lista actual de notificaciones
 * @param  {React.Dispatch<React.SetStateAction<FormNotification[]>>} setNotificationList
 * @param  {React.Dispatch<React.SetStateAction<boolean>>} setOpenSnack
 */
export const saveNotify =
	(
		setNotificationList: React.Dispatch<React.SetStateAction<FormNotification[]>>,
		setOpenSnack: React.Dispatch<React.SetStateAction<boolean>>
	) =>
	(notifications: FormNotification[]) => {
		// ACTUALIZAR
		setNotificationList((prevList: FormNotification[]) => {
			// LISTAR
			const notifyListCopy = [...prevList]
			notifications.forEach((not: FormNotification) => notifyListCopy.unshift(not))

			// ABRIR SNACK
			if (notifyListCopy[0] && notifyListCopy[0].body) setOpenSnack(true)
			return notifyListCopy
		})
	}

// BADGE
export const badgeList: string[] = ['Q', '$', '€', '£', '$']
export const badgePrefix: string[] = ['GT', 'USD', 'EUR', 'GBP', 'ARS']
