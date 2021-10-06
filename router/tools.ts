// TIPOS
import type { GetServerSideProps, NextApiRequest } from 'next'

// FIREBASE Y NOOKIES
import { firebaseAdmin } from 'keys/firebase-admin'

/**
 * Auth obligatorio
 * @description Verifica un endpoint con Auth
 * @param {GetServerSidePropsContext<never>} ctx
 * @param {EmptyFunction} callback
 * @param {EmptyFunction} onError
 */
export const authRequired = async <T>(
	req: NextApiRequest,
	callback: () => Promise<T>,
	onError?: () => Promise<T>
): Promise<T> => {
	// COOKIE
	const sessionCookie = req.cookies.__session || ''

	// VERIFICAR TOKEN
	let idToken: firebaseAdmin.auth.DecodedIdToken | null = null
	if (sessionCookie?.length)
		idToken = await firebaseAdmin.auth().verifySessionCookie(sessionCookie, true)

	// EVENTO
	if (idToken) return await callback()
	else if (onError) return await onError()
	else return {} as T
}

/**
 * Ruta protegida
 * @description Declarar ruta protegida por auth
 * @param ctx
 */
const isProtectedRoute: GetServerSideProps = async (ctx) => {
	const path: string = ctx.resolvedUrl
	return await authRequired(
		ctx.req as NextApiRequest,
		async () => ({
			redirect:
				path === '/cuenta'
					? {
							permanent: false,
							destination: '/formularios',
					  }
					: undefined,
			props: {} as never,
		}),
		async () => ({
			redirect:
				path !== '/cuenta'
					? {
							permanent: false,
							destination: '/cuenta',
					  }
					: undefined,
			props: {} as never,
		})
	)
}

export default isProtectedRoute
