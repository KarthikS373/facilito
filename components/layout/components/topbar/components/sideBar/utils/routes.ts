/**
 * Obtener ruta activa
 * @param  {string} path
 * @param  {string} route
 * @returns {boolean}
 */
const getActiveRoute = (path: string, route: string): boolean => {
	const trimmed: string = path.substr(1)
	return trimmed.toLowerCase() === route.toLowerCase()
}

export default getActiveRoute
