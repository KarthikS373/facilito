// UTILS
import { logout } from 'utils/auth'

// RUTAS
import ROUTES from 'router/routes'
import type { NextRouter } from 'next/router'

const logoutEvent = async (onClose: EmptyFunction, router: NextRouter): Promise<void> => {
	// CERRAR SESION
	await fetch('/api/logout', { method: 'POST' })
	await logout()

	// REDIRECT
	router.push(ROUTES.login)
	onClose()
}

export default logoutEvent
