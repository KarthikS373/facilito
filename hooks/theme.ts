import { useEffect } from 'react'

/**
 * Hook de material
 * @description Remueve los estilos inyectados por material-ui en el servidor
 */
const useRemoveSSRStyles = () => {
	// QUITAR ESTILOS SSR DE MATERIAL
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) jssStyles.parentElement.removeChild(jssStyles)
	}, [])
}

export default useRemoveSSRStyles
