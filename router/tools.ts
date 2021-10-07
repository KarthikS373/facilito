// TIPOS
import type { NextApiRequest } from 'next'

// FIREBASE
import admin from 'keys/firebase-admin'

/**
 * Auth obligatorio
 * @description Verifica un endpoint con Auth
 * @param {GetServerSidePropsContext<never>} ctx
 * @param {EmptyFunction} callback
 * @param {EmptyFunction} onError
 */
const authRequired = async <T>(
	req: NextApiRequest,
	callback: () => Promise<T>,
	onError?: () => Promise<T>
): Promise<T> => {
	// COOKIE
	const sessionCookie = req.cookies.__session || ''

	// VERIFICAR TOKEN
	let idToken: admin.auth.DecodedIdToken | null = null
	if (sessionCookie?.length) idToken = await admin.auth().verifySessionCookie(sessionCookie, true)

	// EVENTO
	if (idToken) return await callback()
	else if (onError) return await onError()
	else return {} as T
}

export default authRequired
