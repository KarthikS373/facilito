/* eslint-disable react-hooks/exhaustive-deps */
// REACT
import React, { useEffect, useContext } from 'react'
import BusinessContext from 'context/business'
import { useRouter } from 'next/router'
import ROUTES from 'router/routes'

// FUNCION
const lockFunction = (
	path: string,
	callBack: () => Promise<boolean>,
	permissions?: CompanyPermissions
) => {
	if (permissions)
		if (
			((path.match(/\/f\/.+$/) || path.match(/\/f\/.+\/respuestas$/)) && !permissions?.forms) ||
			(path === ROUTES.calendar && !permissions?.calendar) ||
			((path === ROUTES.products || path.startsWith('/p/')) && !permissions?.products) ||
			((path === ROUTES.tracking || path.match(/\/t\/.+\/editar$/)) && !permissions?.tracking)
		) {
			callBack().then(() => {
				window.Alert({
					title: 'Ocurrió un error',
					body: 'Actualmente no tienes los permisos necesarios para acceder a esta funcionalidad.',
					type: 'error',
				})
			})
		}
}

const PermissionsProvider: React.FC = (props) => {
	// HISTORY
	const router = useRouter()

	// COMPANY
	const company = useContext(BusinessContext)
	const permissions = company?.business?.permissions

	// LISTENER DE RUTAS
	useEffect(() => {
		lockFunction(router.asPath, async () => router.replace(ROUTES.forms), permissions)
	}, [permissions, router])

	return <>{props.children}</>
}

export default PermissionsProvider
