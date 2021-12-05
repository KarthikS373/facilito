import ROUTES from 'router/routes'

/**
 * Evaluá ruta
 * @description Valida las rutas donde se mostrará el topbar
 * @param  {string} path
 */
const evaluateTopbarPath = (path: string): boolean => {
	// MOSTRAR
	if (/\/f\/.+\/respuestas/.test(path)) return true
	else if (/\/f\/.+\/.+$/.test(path)) return false
	else if (path === '/tiendas') return true
	else if (/\/f\/(.+)$/.test(path)) return false
	else if (path === '/tracking') return true
	else if (/\/t\/(.+)\/editar/.test(path)) return true
	else if (/\/t\/(.+)$/.test(path)) return false
	else if (path === '/productos') return true
	else if (/\/p\/(.+)$/.test(path)) return true
	else if (/\/e\/editar/.test(path)) return true
	else if (/\/calendario$/.test(path)) return true
	else if (/\/productos$/.test(path)) return true
	// OCULTAR
	else return false
}

/**
 * Evaluá ruta para footer
 * @description Valida las rutas donde se mostrará el topbar
 * @param  {string} path
 */
export const evaluateFooterPath = (path: string): boolean => {
	// MOSTRAR
	if (/\/f\/.+\/respuestas/.test(path)) return false
	else if (/\/f\/(.+)$/.test(path)) return true
	else if (path === ROUTES.login) return true
	else if (/\/t\/.+\/editar/.test(path)) return false
	else if (/\/t\/.+\/.+/.test(path)) return true
	// OCULTAR
	else return false
}

export default evaluateTopbarPath
