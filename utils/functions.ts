import type { HttpsCallableResult, HttpsCallable } from '@firebase/functions'
import getFirebase from 'keys/firebase'

/**
 * Obtener callable
 * @description Invoca una función callable desde cloud functions
 * @param  {string} name
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
 * @description Enviar correo electronico como html string
 * @param html
 * @param subject
 * @param email
 * @returns
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
 * @description Enviar notificacion push
 * @param pushData
 * @returns
 */
export const senPushNotification = async (
	pushData: PushData
): Promise<HttpsCallableResult<unknown>> => {
	const sendPush = await getCallable('sendPush')
	return sendPush(pushData)
}

export default getCallable
