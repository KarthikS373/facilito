import ROUTES from 'router/routes'

/**
 * Evaluá ruta
 * @param  {string} path
 * @returns {boolean}
 */
const evaluateToShowTopbar = (path: string): boolean => {
	// TIENDAS
	if (/\/f\/.+\/respuestas/.test(path)) return true
	else if (/\/f\/.+\/.+$/.test(path)) return false
	else if (path === '/tiendas') return true
	else if (/\/f\/(.+)$/.test(path)) return false
	else if (path === '/clientes') return true
	// TRACKING
	else if (path === '/tracking') return true
	else if (/\/t\/(.+)\/editar/.test(path)) return true
	else if (/\/t\/(.+)$/.test(path)) return false
	// PRODUCTOS
	else if (path === '/productos') return true
	else if (/\/p\/(.+)$/.test(path)) return true
	// EMPRESA
	else if (/\/e\/editar/.test(path)) return true
	// CALENDARIO
	else if (path === '/calendario') return true
	// INVENTARIO
	else if (path === '/inventario') return true
	// OCULTAR
	else return false
}

/**
 * Evaluá ruta para footer
 * @param  {string} path
 * @returns {boolean}
 */
export const evaluateToHideFooter = (path: string): boolean => {
	// TIENDAS
	if (/\/f\/.+\/respuestas/.test(path)) return false
	else if (/\/f\/(.+)$/.test(path)) return true
	// LOGIN
	else if (path === ROUTES.login) return true
	// TRACKING
	else if (/\/t\/.+\/editar/.test(path)) return false
	else if (/\/t\/.+\/.+/.test(path)) return true
	// OCULTAR
	else return false
}

export default evaluateToShowTopbar
