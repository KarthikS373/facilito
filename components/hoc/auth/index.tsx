import React, { useContext, useEffect } from 'react'

// CONTEXTO
import AuthContext from 'context/auth'

// ROUTER
import { useRouter } from 'next/router'
import ROUTES from 'router/routes'

// TIPOS
import type { NextPage } from 'next'
import { signingAnonymously } from 'utils/auth'

// PROPS
interface WithAuthProps {
	tryAnonymous: boolean
}

/**
 * HOC de ruta protegida
 */
function withAuth<T>(Page: NextPage<T>, props?: WithAuthProps): NextPage<T> {
	// GLOBAL AUTH
	const AuthPage: NextPage<T> = (pageProps: T) => {
		const { user } = useContext(AuthContext)

		// ROUTER
		const router = useRouter()
		const path = router.asPath

		// REDIRECT
		useEffect(() => {
			if (user !== undefined) {
				if (user === null) {
					// INICIAR ANONIMO
					if (props?.tryAnonymous) signingAnonymously()
					else if (path !== ROUTES.login) router.replace(ROUTES.login)
				} else if (path === ROUTES.login) {
					router.replace(ROUTES.forms).then(() => {
						window.Snack(`Bienvenido ${user.displayName}`)
					})
				}
			}
		}, [user, path, router])

		// COMPONENTE
		return <Page {...pageProps} />
	}

	return AuthPage
}

export default withAuth
