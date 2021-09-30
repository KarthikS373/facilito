// REACT
import React, { useContext, useEffect } from 'react'

// HOOKS
import { useRouter } from 'next/router'

// UTILS
import validateProtectedRoute from 'utils/routes'
import { signingAnonymously } from 'utils/auth'

// RUTAS
import ROUTES from 'router/routes'

// CONTEXTO
import UserContext from 'context/user'
import BusinessContext from 'context/business'

const ProtectedRoutesProvider: React.FC = (props) => {
	// USER
	const userCtx = useContext(UserContext)

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// HISTORY
	const router = useRouter()
	const path = router.asPath

	// HANDLER
	const { user, isAnonymous } = userCtx
	const { business } = businessCtx
	useEffect(() => {
		// VALIDAR
		const isProtectedRoute: boolean = validateProtectedRoute(path.substr(1))

		// PAGINA DE LOGIN
		if (isProtectedRoute) {
			if (user === null && process.env.NODE_ENV === 'production') router.push(ROUTES.login)
			else if (business === undefined) router.push(ROUTES.company)
		} else {
			if (!user && path !== '/cuenta') signingAnonymously()
		}
	}, [user, business, isAnonymous, path, router])

	return <>{props.children}</>
}

export default ProtectedRoutesProvider
