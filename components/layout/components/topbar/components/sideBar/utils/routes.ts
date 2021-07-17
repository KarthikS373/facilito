/**
 * Obtener ruta activa
 * @description Obtener cual es la ruta actual
 * @param  {string} path
 * @param  {string} route
 */
const getActiveRoute = (path: string, route: string): boolean => {
	const trimmed: string = path.substr(1)
	return trimmed.toLowerCase() === route.toLowerCase()
}

export default getActiveRoute
