// STRINGS
import AuthErrorsJSON from 'lang/auth-errors.json'

// DB
import { getCollection } from './db'

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

/**
 * Administrador de errores de auth
 * @description Retornar strings de error en español
 * @param  {(message:string)=>unknown} cb?
 */
const authErrorHandler =
	(cb?: (message: string) => unknown) => (err: firebase.default.auth.AuthError) => {
		// MENSAJE EN CONSOLA
		console.error('Ocurrió un error de auth', err)

		// SELECCIONAR ERROR
		if (err.code in authErrors && cb) cb(authErrors[err.code])
		else if (cb) cb(err.message)
	}

/**
 * Obtener Auth
 * @description Retorna la instancia global de firebase/auth
 */
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

/**
 * Iniciar anónimo
 * @description Inicia sesión como usuario anónimo
 */
export const signingAnonymously = async () => {
	const auth = await getAuth()
	return auth().signInAnonymously()
}

/**
 * Verificar correo
 * @description Verifica un string 'email' con una expresión regular
 * @param  {string} email
 */
export const verifyEmail = (email: string) => {
	// REGEX DE EMAIL
	const rg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return rg.test(String(email).toLowerCase())
}

/**
 * Verificar campos de login
 * @description Verificar y retorna un mensaje de error
 * @param  {string} email
 * @param  {string} pass
 */
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

/**
 * Actualizar nombre de usuario
 * @description Actualiza el perfil en el objeto auth
 * @param  {string} displayName
 * @param  {firebase.default.auth.UserCredential} credential
 */
const updateUserName = (displayName: string, credential: firebase.default.auth.UserCredential) =>
	credential.user?.updateProfile({ displayName })

/**
 * Registrar usuario
 * @description Registrar nuevo usuario con correo y contraseña
 * @param  {string} email
 * @param  {string} pass
 * @param  {string} name?
 * @param  {(error:string)=>unknown} onError?
 * @param  {boolean} rememberUser?
 */
export const signingUser = async (
	email: string,
	pass: string,
	name?: string,
	onError?: (error: string) => unknown,
	rememberUser?: boolean
) => {
	// VERIFICAR
	const handler = verifyLoginFields(email, pass)

	if (handler.verify) {
		// AUTH
		const auth = await getAuth()

		// RECORDAR USUARIO
		await auth().setPersistence(rememberUser ? 'LOCAL' : 'SESSION')

		// CREACIÓN/LOGIN
		if (name)
			await auth()
				.createUserWithEmailAndPassword(email, pass)
				.then((cred: firebase.default.auth.UserCredential) => {
					// ACTUALIZAR OBJETO EN AUTH Y FIRESTORE
					saveUser(name)(cred)
					updateUserName(name, cred)
					window.postMessage(
						{
							action: 'auth',
							data: {
								email,
								pass,
							},
						},
						'desktop'
					)
				})
				.catch(authErrorHandler(onError))
		else
			await auth()
				.signInWithEmailAndPassword(email, pass)
				.then(() => {
					window.postMessage(
						{
							action: 'auth',
							data: {
								email,
								pass,
							},
						},
						'desktop'
					)
				})
				.catch(authErrorHandler(onError))
	} else {
		// MOSTRAR ERROR EN VERIFICACIÓN DE CAMPOS
		if (onError) onError(handler.msg)
		return null
	}
}

/**
 * Asignar usuario en firestore
 * Almacena un usuario en la collection 'users' de firestore
 * @param  {Partial<User>} userData
 * @param  {boolean} merge? combinar propiedades en el usuario existente
 */
const setUserFirestore = async (userData: Partial<User>, merge?: boolean) => {
	// REFERENCIA
	const col: firebase.default.firestore.CollectionReference = await getCollection('users')

	// GUARDAR
	const doc = col.doc(userData.email)
	if (merge) return doc.set(userData, { merge })
	else return doc.set(userData)
}

/**
 * Guardar usuario
 * @description Almacena y valida el usuario
 * @param  {string} name?
 */
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

/**
 * Iniciar con facebook
 * @description Inicio o Registro con un proveedor facebook.
 * @param  {(error:string)=>unknown} onError?
 */
export const facebookSigning = async (onError?: (error: string) => unknown) => {
	// AUTH
	const auth = await getAuth()

	// INICIAR
	if (fbProvider)
		auth()
			.signInWithPopup(fbProvider)
			// @ts-ignore
			.then((res) => {
				// @ts-ignore
				window.localStorage.setItem('fbToken', res.credential.accessToken)
				if (res.credential && res.additionalUserInfo?.isNewUser) saveUser()(res)
				window.postMessage(
					{
						action: 'auth',
						data: res.credential,
					},
					'desktop'
				)
			})
			.catch(authErrorHandler(onError))
}

/**
 * Iniciar con Google
 * @description Inicio o Registro con un proveedor google.
 * @param  {(error:string)=>unknown} onError?
 */
export const googleSigning = async (onError?: (error: string) => unknown) => {
	// AUTH
	const auth = await getAuth()

	// INICIAR
	if (gProvider)
		auth()
			.signInWithPopup(gProvider)
			.then((res) => {
				// @ts-ignore
				window.localStorage.setItem('gToken', res.credential.accessToken)
				if (res.credential && res.additionalUserInfo?.isNewUser) saveUser()(res)
				window.postMessage(
					{
						action: 'auth',
						data: res.credential,
					},
					'desktop'
				)
			})
			.catch(authErrorHandler(onError))
}

/**
 * Recuperar contraseña
 * @description Enviá un mensaje de recuperación al correo de la cuenta
 * @param  {string} email
 * @param  {EmptyFunction} onSuccess
 * @param  {(error:string)=>unknown} onError?
 */
export const forgotPass = async (
	email: string,
	onSuccess: EmptyFunction,
	onError?: (error: string) => unknown
) => {
	const auth = await getAuth()
	return auth().sendPasswordResetEmail(email).then(onSuccess).catch(authErrorHandler(onError))
}
/**
 * Cerrar sesión
 * @description Enviá un evento y cierra sesión
 */
export const logout = async () => {
	const auth = await getAuth()
	window.postMessage(
		{
			action: 'logout',
		},
		'desktop'
	)
	return auth().signOut()
}
