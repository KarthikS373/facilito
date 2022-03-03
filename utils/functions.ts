import type { HttpsCallableResult, HttpsCallable } from '@firebase/functions'
import getFirebase from 'keys/firebase'

/**
 * Obtener callable
 * @param  {string} name
 * @returns {Promise<HttpsCallable<unknown, unknown>>}
 */
const getCallable = async (name: string): Promise<HttpsCallable<unknown, unknown>> => {
	const { getFunctions, httpsCallable } = await import('firebase/functions')

	// IMPORTAR
	const firebaseApp = await getFirebase()
	const functions = getFunctions(firebaseApp)

	// RETORNAR
	return httpsCallable(functions, name)
}

/**
 * Enviar correo
 * @param  {string} html
 * @param  {string} subject
 * @param  {string|string[]} email?
 * @returns {Promise<HttpsCallableResult<unknown>>}
 */
export const sendMail = async (
	html: string,
	subject: string,
	email?: string | string[]
): Promise<HttpsCallableResult<unknown>> => {
	// QUERY STRING
	const sendEmail = await getCallable('sendEmail')

	// ENVIAR CORREO
	return await sendEmail({
		email,
		subject,
		content: html,
	})
}

/**
 * Enviar push
 * @param  {PushData} pushData
 * @returns {Promise<HttpsCallableResult<unknown>>}
 */
export const senPushNotification = async (
	pushData: PushData
): Promise<HttpsCallableResult<unknown>> => {
	const sendPush = await getCallable('sendPush')
	return sendPush(pushData)
}

export default getCallable
