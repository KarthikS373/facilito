// TIPOS
import type { NextApiRequest } from 'next'

// FIREBASE
import admin from 'keys/firebase-admin'

/**
 * Auth obligatorio
 * @param  {NextApiRequest} req
 * @param  {()=>Promise<T>} callback
 * @param  {()=>Promise<T>} onError?
 * @returns {Promise<T>}
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
