// REACT
import { useEffect } from 'react'

// TOOLS
import { evaluatePath } from './tools'

// OCULTAR O MOSTRAR
export const useToggleBar = (
	setShowTopbar: React.Dispatch<React.SetStateAction<boolean>>,
	history: any
) => {
	useEffect(() => {
		// LISTENER
		let listener = history.listen((location: Location) => {
			const path: string = location.pathname
			setShowTopbar(evaluatePath(path))
		})

		// LIMPIAR
		return () => {
			listener()
		}
	}, [setShowTopbar, history])
}
