/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

/**
 * Guardar
 * @description Crear eventos de guardado con intervalos y botones
 * @param onSave
 */
const useIntervalSave = ($: TemplateStrBuilder, onSave: (ctrl: boolean) => unknown): void => {
	useEffect(() => {
		// INTERVALO
		const interval = setTimeout(() => {
			onSave(false)
			window.Snack($`Guardando cambios...`)
		}, 60_000)

		const ctrl = (ev: KeyboardEvent) => {
			// CONTROL KEY
			if (ev.ctrlKey || ev.metaKey)
				if (ev.key === 's') {
					ev.preventDefault()
					onSave(true)
					window.Snack($`Guardando cambios...`)
				}
		}

		// AGREGAR
		window.addEventListener('keydown', ctrl)

		// LIMPIAR
		return () => {
			window.removeEventListener('keydown', ctrl)
			clearTimeout(interval)
		}
	}, [])
}

export default useIntervalSave
