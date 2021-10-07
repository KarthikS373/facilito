import React, { useContext, useEffect } from 'react'

// CONTEXTO
import AuthContext from 'context/auth'

// ROUTER
import { useRouter } from 'next/router'
import ROUTES from 'router/routes'

// TIPOS
import type { NextPage } from 'next'

/**
 * HOC de ruta protegida
 */
const withAuth = (Page: NextPage): NextPage => {
	// GLOBAL AUTH
	const AuthPage: NextPage = () => {
		const { user } = useContext(AuthContext)

		// ROUTER
		const router = useRouter()
		const path = router.asPath

		// REDIRECT
		useEffect(() => {
			if (user !== undefined) {
				if (user === null) {
					if (path !== ROUTES.login) router.replace(ROUTES.login)
				} else if (path === ROUTES.login) router.replace(ROUTES.forms)
			}
		}, [user, path, router])

		// COMPONENTE
		return <Page />
	}

	return AuthPage
}

export default withAuth
