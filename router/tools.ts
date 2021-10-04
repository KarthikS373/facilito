// TIPOS
import type { GetServerSideProps } from 'next'

// FIREBASE Y NOOKIES
import { firebaseAdmin } from 'keys/firebase-admin'

const isProtectedRoute: GetServerSideProps = async (ctx) => {
	// COOKIE
	const path: string = ctx.resolvedUrl
	const sessionCookie = ctx.req.cookies.token || ''

	// VERIFICAR TOKEN
	let idToken: firebaseAdmin.auth.DecodedIdToken | null = null
	if (sessionCookie?.length)
		idToken = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true)

	// REDIRECT
	if (idToken) {
		if (path === '/cuenta')
			return {
				redirect: {
					permanent: false,
					destination: '/formularios',
				},
				props: {} as never,
			}
		else
			return {
				props: {} as never,
			}
	} else {
		// REDIRECT A CUENTA SI NO HAY USUARIO
		if (path !== '/cuenta')
			return {
				redirect: {
					permanent: false,
					destination: '/cuenta',
				},
				props: {} as never,
			}
		else
			return {
				props: {} as never,
			}
	}
}

export default isProtectedRoute
