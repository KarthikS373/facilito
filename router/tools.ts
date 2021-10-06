// TIPOS
import type { GetServerSideProps } from 'next'

// FIREBASE Y NOOKIES
import { firebaseAdmin } from 'keys/firebase-admin'

const isProtectedRoute: GetServerSideProps = async (ctx) => {
	if (process.env.NODE_ENV === 'production') {
		// COOKIE
		const path: string = ctx.resolvedUrl
		const sessionCookie = ctx.req.cookies.session || ''

		// VERIFICAR TOKEN
		let idToken: firebaseAdmin.auth.DecodedIdToken | null = null
		if (sessionCookie?.length)
			idToken = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true)

		// REDIRECT
		if (idToken) {
			return {
				redirect:
					path === '/cuenta'
						? {
								permanent: false,
								destination: '/formularios',
						  }
						: undefined,
				props: {} as never,
			}
		} else {
			// REDIRECT A CUENTA SI NO HAY USUARIO
			return {
				redirect:
					path !== '/cuenta'
						? {
								permanent: false,
								destination: '/cuenta',
						  }
						: undefined,
				props: {} as never,
			}
		}
	} else
		return {
			props: {} as never,
		}
}

export default isProtectedRoute
