/**
 * Evaluá ruta
 * @description Valida las rutas donde se motrara el topbar
 * @param  {string} path
 */
const evaluateTopbarPath = (path: string): boolean => {
	// MOSTRAR
	if (/\/f\/.+\/respuestas/.test(path)) return true
	else if (/\/f\/.+\/.+$/.test(path)) return false
	else if (path === '/formularios') return true
	else if (/\/f\/(.+)$/.test(path)) return true
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

export default evaluateTopbarPath
