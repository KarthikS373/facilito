// REACT
import React, { useEffect, useContext } from 'react'
import BusinessContext from 'context/business'
import { useRouter } from 'next/router'
import ROUTES from 'router/routes'

const PermissionsProvider: React.FC = (props) => {
	// HISTORY
	const router = useRouter()

	// COMPANY
	const company = useContext(BusinessContext)
	const permissions = company?.business?.permissions

	useEffect(() => {
		if (permissions) {
			// LISTENER
			router.events.on('routeChangeStart', (location) => {
				const path: string = location.pathname.substr(1)
				if (
					((path.match(/f\/.+$/) || path.match(/f\/.+\/respuestas$/)) && !permissions.forms) ||
					(path === ROUTES.calendar && !permissions.calendar) ||
					((path === ROUTES.products || path.startsWith('p/')) && !permissions.products) ||
					((path === ROUTES.tracking || path.match(/t\/.+\/editar$/)) && !permissions.tracking)
				) {
					router.back()
					window.Alert({
						title: 'Ocurrió un error',
						body: 'Actualmente no tienes los permisos necesarios para acceder a esta funcionalidad.',
						type: 'error',
					})
				}
			})
		}
	}, [permissions, router])

	return <>{props.children}</>
}

export default PermissionsProvider
