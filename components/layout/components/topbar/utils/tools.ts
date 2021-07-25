/**
 * Evaluá ruta
 * @description Retorna una lista boolean [appbar, buscador]
 * @param  {string} path
 */
export const evaluatePath = (path: string): boolean => {
	// MOSTRAR
	if (/\/f\/.+\/respuestas/.test(path)) return true
	else if (/\/f\/.+\/.+$/.test(path)) return false
	else if (path === '/formularios') return true
	else if (path === '/template') return true
	else if (/\/f\/(.+)$/.test(path)) return true
	else if (path === '/tracking') return true
	else if (/\/l\/(.+)\/setting/.test(path)) true
	else if (/\/l\/(.+)$/.test(path)) return false
	else if (path === '/productos') return true
	else if (/\/p\/(.+)$/.test(path)) return true
	else if (/\/e\/editar/.test(path)) return true
	else if (/\/calendario$/.test(path)) return true
	else if (/\/productos$/.test(path)) return true
	// OCULTAR
	else return false
}

// BADGE
export const badgeList: string[] = ['Q', '$', '€', '£', '$']
export const badgePrefix: string[] = ['GT', 'USD', 'EUR', 'GBP', 'ARS']
