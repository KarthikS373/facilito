// TIPOS
import type { GetServerSideProps } from 'next'

// FIREBASE Y NOOKIES
import { firebaseAdmin } from 'keys/firebase-admin'
import nookies from 'nookies'

const isProtectedRoute: GetServerSideProps = async (ctx) => {
	const path: string = ctx.resolvedUrl

	try {
		// OBTENER TOKEN
		const cookies = nookies.get(ctx)
		await firebaseAdmin.auth().verifyIdToken(cookies.token)

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
	} catch (err) {
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
