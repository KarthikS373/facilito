import type { NextRouter } from 'next/router'
import React, { useEffect } from 'react'

/**
 * Es un enlace de React que muestra una alerta si el usuario está en un dispositivo móvil.
 */
const useBlockAlert = (router: NextRouter) => {
	useEffect(() => {
		const windowWidth = window.innerWidth

		if (windowWidth < 1024) {
			window.Alert({
				title: 'No disponible',
				body: 'Esta función no está disponible en dispositivos móviles, ¿Deseas regresar a la pantalla de inicio?',
				type: 'confirm',
				cancelBtn: <></>,
				onHide: () => {
					router.back()
				},
			})
		}
	}, [router])
}

export default useBlockAlert
