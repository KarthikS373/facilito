// TIPOS
import type { GetServerSideProps } from 'next'

// FIREBASE Y NOOKIES
import { firebaseAdmin } from 'keys/firebase-admin'

const isProtectedRoute: GetServerSideProps = async (ctx) => {
	const path: string = ctx.resolvedUrl

	try {
		// OBTENER TOKEN
		const { token } = ctx.req.cookies
		await firebaseAdmin.auth().verifyIdToken(token)

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
		console.error(err)

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
