import { getCollection } from './db'
import AuthErrorsJSON from 'dict/firebase-errors.json'

// GLOBALES
let globalAuth: (() => firebase.default.auth.Auth) | null = null
let fbProvider: firebase.default.auth.FacebookAuthProvider | null = null
let gProvider: firebase.default.auth.GoogleAuthProvider | null = null

// MENSAJES DE ERROR
interface AuthErrorES {
	[index: string]: string
	'auth/user-not-found': string
}

const authErrors: AuthErrorES = AuthErrorsJSON

// ERROR HANDLER
const authErrorHandler = (cb?: (message: string) => unknown) => (
	err: firebase.default.auth.AuthError
) => {
	// MENSAJE EN CONSOLA
	console.log(err)
	console.error('Ocurrió un error de auth')

	// SELECCIONAR ERROR
	if (err.code in authErrors && cb) cb(authErrors[err.code])
	else if (cb) cb(err.message)
}

// ACTUALIZAR USUARIO
const updateUserName = (displayName: string, credential: firebase.default.auth.UserCredential) =>
	credential.user?.updateProfile({ displayName })

// GUARDAR USUARIO
const saveUser = (name?: string) => (credential: firebase.default.auth.UserCredential) => {
	// VERIFICAR CREDENCIAL
	if (credential.user?.uid && credential.user.email)
		return setUserFirestore(
			{
				uid: credential.user?.uid,
				name: name || credential.user.displayName || '',
				email: credential.user.email,
				provider: credential.additionalUserInfo?.providerId || 'password',
				phone: credential.user?.phoneNumber || null,
				picture: credential.user?.photoURL || null,
			},
			true
		)
}

// INSTANCIA DE AUTH
export const getAuth = async () => {
	const firebase = await import('keys/firebase')
	await import('firebase/auth')

	// INSTANCIA
	if (globalAuth === null) {
		globalAuth = firebase.default.auth
		globalAuth().languageCode = 'es-GT'

		// PROVIDERS
		fbProvider = new firebase.default.auth.FacebookAuthProvider()
		gProvider = new firebase.default.auth.GoogleAuthProvider()
	}

	// LISTENER
	return globalAuth
}

// INICIAR CON FACEBOOK
export const facebookSigning = async (onError?: (error: string) => unknown) => {
	// AUTH
	const auth = await getAuth()

	// INICIAR
	if (fbProvider)
		auth()
			.signInWithPopup(fbProvider)
			// @ts-ignore
			.then(res => {
				// @ts-ignore
				window.localStorage.setItem('fbToken', res.credential.accessToken)
				if (res.credential && res.additionalUserInfo?.isNewUser) saveUser()(res)
				window.postMessage({
					action: 'auth',
					data: res.credential,
				})
			})
			.catch(authErrorHandler(onError))
}

// INICIAR CON GOOGLE
export const googleSigning = async (onError?: (error: string) => unknown) => {
	// AUTH
	const auth = await getAuth()

	// INICIAR
	if (gProvider)
		auth()
			.signInWithPopup(gProvider)
			.then(res => {
				// @ts-ignore
				window.localStorage.setItem('gToken', res.credential.accessToken)
				if (res.credential && res.additionalUserInfo?.isNewUser) saveUser()(res)
				window.postMessage({
					action: 'auth',
					data: res.credential,
				})
			})
			.catch(authErrorHandler(onError))
}

// VERIFICAR CORREO
export const verifyEmail = (email: string) => {
	// REGEX DE EMAIL
	const rg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return rg.test(String(email).toLowerCase())
}

// VERIFICAR LOGIN
const verifyLoginFields = (email: string, pass: string) => {
	// GLOBALES
	let verify: boolean = false
	let msg: string = ''

	// VERIFICAR
	if (pass.length < 8)
		msg = 'La contraseña debe tener al menos 8 caracteres para considerarla segura.'
	else if (!verifyEmail(email)) msg = 'El email no tiene un formato correcto (example@domain.com).'
	else verify = true

	// RETORNAR MENSAJE Y ESTADO DE VERIFICACIÓN
	return { verify, msg }
}

// SIGNING
export const signingUser = async (
	email: string,
	pass: string,
	name?: string,
	onError?: (error: string) => unknown
) => {
	// VERIFICAR
	const handler = verifyLoginFields(email, pass)

	if (handler.verify) {
		// AUTH
		const auth = await getAuth()

		// CREACIÓN/LOGIN
		if (name)
			await auth()
				.createUserWithEmailAndPassword(email, pass)
				.then((cred: firebase.default.auth.UserCredential) => {
					// ACTUALIZAR OBJETO EN AUTH Y FIRESTORE
					saveUser(name)(cred)
					updateUserName(name, cred)
					window.postMessage({
						action: 'auth',
						data: {
							email,
							pass,
						},
					})
				})
				.catch(authErrorHandler(onError))
		else
			await auth()
				.signInWithEmailAndPassword(email, pass)
				.then(() => {
					window.postMessage({
						action: 'auth',
						data: {
							email,
							pass,
						},
					})
				})
				.catch(authErrorHandler(onError))
	} else {
		// MOSTRAR ERROR EN VERIFICACIÓN DE CAMPOS
		if (onError) onError(handler.msg)
		return null
	}
}

// CERRAR SESIÓN
export const logout = async () => {
	const auth = await getAuth()
	window.postMessage({
		action: 'logout',
	})
	return auth().signOut()
}

// INICIAR ANÓNIMO
export const signingAnonymously = async () => {
	const auth = await getAuth()
	return auth().signInAnonymously()
}

// RECUPERAR PASSWORD
export const forgotPass = async (
	email: string,
	onSuccess: EmptyFunction,
	onError?: (error: string) => unknown
) => {
	const auth = await getAuth()
	return auth()
		.sendPasswordResetEmail(email)
		.then(onSuccess)
		.catch(authErrorHandler(onError))
}

// GUARDAR USUARIO EN FIRESTORE
const setUserFirestore = async (userData: Partial<User>, merge?: boolean) => {
	// REFERENCIA
	const col: firebase.default.firestore.CollectionReference = await getCollection('users')

	// GUARDAR
	const doc = col.doc(userData.email)
	if (merge) return doc.set(userData, { merge })
	else return doc.set(userData)
}
