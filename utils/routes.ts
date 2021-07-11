/**
 * Validar ruta protegida
 * @param  {string} path
 * @description Valida una ruta que necesita autenticación
 */
const validateProtectedRoute = (path: string) => {
	const company = /e\/.+/.test(path)
	const admission = /a\/.+/.test(path)
	const form = /f\/.+\/.+/.test(path)
	const tracking = /l\/.+\/.+/.test(path)
	return path !== '/' && !form && !company && !admission && !tracking
}

export default validateProtectedRoute
