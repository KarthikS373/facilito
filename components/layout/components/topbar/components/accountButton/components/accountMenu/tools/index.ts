// UTILS
import { logout } from 'utils/auth'

// RUTAS
import ROUTES from 'router/routes'
import type { NextRouter } from 'next/router'

const logoutEvent = async (onClose: EmptyFunction, router: NextRouter): Promise<void> => {
	// CERRAR SESION
	window.Snack('Cerrando sesión...')
	await fetch('/api/logout', { method: 'POST' })

	// REDIRECT
	await logout()
	await router.push(ROUTES.login)
	onClose()
}

export default logoutEvent