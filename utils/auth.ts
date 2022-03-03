// STRINGS
import AuthErrorsJSON from 'lang/auth-errors.json'

// TIPOS
import type {
	Auth,
	AuthError,
	UserCredential,
	FacebookAuthProvider,
	GoogleAuthProvider,
} from '@firebase/auth'
import type { CollectionReference } from '@firebase/firestore'

// DB
import { getCollection } from './db'

// UTILS
import getFirebase from 'keys/firebase'

// GLOBALES
let globalAuth: Auth | null = null
let fbProvider: FacebookAuthProvider | null = null
let gProvider: GoogleAuthProvider | null = null

// MENSAJES DE ERROR
interface AuthErrorES {
	[index: string]: string
	'auth/user-not-found': string
}

const authErrors: AuthErrorES = AuthErrorsJSON

/**
 * Administrador de errores de auth
 * @param  {(message:string)=>unknown} cb?
 */
const authErrorHandler = (cb?: (message: string) => void) => (err: AuthError) => {
	// MENSAJE EN CONSOLA
	console.error('Ocurrió un error de auth', err)

	// SELECCIONAR ERROR
	if (err.code in authErrors && cb) cb(authErrors[err.code])
	else if (cb) cb(err.message)
}

/**
 * Obtener Auth
 * @returns {Promise<Auth>}
 */
export const getAuth = async (): Promise<Auth> => {
	const {
		GoogleAuthProvider,
		FacebookAuthProvider,
		getAuth: getAuthFrb,
	} = await import('firebase/auth')

	// INSTANCIA
	if (globalAuth === null) {
		const firebaseApp = await getFirebase()
		globalAuth = getAuthFrb(firebaseApp)
		globalAuth.languageCode = 'es-GT'

		// PROVIDERS
		fbProvider = new FacebookAuthProvider()
		gProvider = new GoogleAuthProvider()
	}

	// LISTENER
	return globalAuth
}

/**
 * Iniciar anónimo
 * @returns {Promise<UserCredential>}
 */
export const signingAnonymously = async (): Promise<UserCredential> => {
	const { signInAnonymously: signInAnonymouslyFrb } = await import('firebase/auth')
	const auth = await getAuth()
	return signInAnonymouslyFrb(auth)
}

/**
 * Verificar correo
 * @param  {string} email
 * @returns {boolean}
 */
export const verifyEmail = (email: string): boolean => {
	// REGEX DE EMAIL
	const rg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return rg.test(String(email).toLowerCase())
}

/**
 * Verificar campos de login
 * @param  {string} email
 * @param  {string} pass
 */
const verifyLoginFields = (email: string, pass: string) => {
	// GLOBALES
	let verify = false
	let msg = ''

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
 * @param  {string} displayName
 * @returns {Promise<void> | null}
 */
const updateUserName = async (displayName: string) => {
	const { updateProfile } = await import('firebase/auth')
	if (globalAuth?.currentUser) return updateProfile(globalAuth.currentUser, { displayName })
	else return null
}

/**
 * Registrar usuario
 * @param  {string} email
 * @param  {string} pass
 * @param  {string} name?
 * @param  {(error:string)=>unknown} onError?
 * @param  {boolean} rememberUser?
 * @returns {Promise<void>}
 */
export const signingUser = async (
	email: string,
	pass: string,
	name?: string,
	onError?: (error: string) => unknown,
	rememberUser?: boolean
): Promise<void> => {
	// VERIFICAR
	const handler = verifyLoginFields(email, pass)

	if (handler.verify) {
		const {
			setPersistence,
			signInWithEmailAndPassword,
			createUserWithEmailAndPassword,
			browserLocalPersistence,
			browserSessionPersistence,
		} = await import('firebase/auth')

		// AUTH
		const auth = await getAuth()

		// RECORDAR USUARIO
		window.localStorage.setItem('remember', rememberUser ? '1' : '0')

		// CREACIÓN/LOGIN
		if (name)
			await createUserWithEmailAndPassword(auth, email, pass)
				.then((cred: UserCredential) => {
					// ACTUALIZAR OBJETO EN AUTH Y FIRESTORE
					saveUser(name)(cred)
					updateUserName(name)
					window.postMessage(
						{
							action: 'auth',
							data: {
								email,
								pass,
							},
						},
						'*'
					)
				})
				.catch(authErrorHandler(onError))
		else
			await signInWithEmailAndPassword(auth, email, pass)
				.then(() => {
					window.postMessage(
						{
							action: 'auth',
							data: {
								email,
								pass,
							},
						},
						'*'
					)
				})
				.catch(authErrorHandler(onError))

		// PERSISTENCIA
		await setPersistence(auth, rememberUser ? browserLocalPersistence : browserSessionPersistence)
	} else {
		// MOSTRAR ERROR EN VERIFICACIÓN DE CAMPOS
		if (onError) onError(handler.msg)
	}
}

/**
 * Asignar usuario en firestore
 * @param  {Partial<User>} userData
 * @param  {boolean} merge? combinar propiedades en el usuario existente
 */
const setUserFirestore = async (userData: Partial<User>, merge?: boolean) => {
	const { doc, setDoc } = await import('firebase/firestore')

	// REFERENCIA
	const col: CollectionReference = await getCollection('users')

	// GUARDAR
	const docRef = doc(col, userData.email)
	if (merge) return setDoc(docRef, userData, { merge })
	else return setDoc(docRef, userData)
}

/**
 * Guardar usuario
 * @param  {string} name?
 */
const saveUser = (name?: string) => (credential: UserCredential) => {
	// VERIFICAR CREDENCIAL
	if (credential.user?.uid && credential.user.email)
		return setUserFirestore(
			{
				uid: credential.user?.uid,
				name: name || credential.user.displayName || '',
				email: credential.user.email,
				provider: credential.providerId || 'password',
				phone: credential.user?.phoneNumber || null,
				picture: credential.user?.photoURL || null,
			},
			true
		)
}

/**
 * Iniciar con facebook
 * @param  {boolean} rememberUser
 * @param  {(error:string)=>unknown} onError?
 * @returns {Promise<void>}
 */
export const facebookSigning = async (
	rememberUser: boolean,
	onError?: (error: string) => unknown
): Promise<void> => {
	const {
		signInWithPopup,
		getAdditionalUserInfo,
		setPersistence,
		browserLocalPersistence,
		browserSessionPersistence,
	} = await import('firebase/auth')

	// AUTH
	const auth = await getAuth()

	// INICIAR
	if (fbProvider) {
		// RECORDAR USUARIO
		window.localStorage.setItem('remember', rememberUser ? '1' : '0')
		await signInWithPopup(auth, fbProvider)
			.then((res) => {
				if (getAdditionalUserInfo(res)?.isNewUser) saveUser()(res)
				window.postMessage({ action: 'auth' }, '*')
			})
			.catch(authErrorHandler(onError))

		// PERSISTENCIA
		await setPersistence(auth, rememberUser ? browserLocalPersistence : browserSessionPersistence)
	}
}

/**
 * Iniciar con Google
 * @param  {boolean} rememberUser
 * @param  {(error:string)=>unknown} onError?
 * @returns {Promise<void>}
 */
export const googleSigning = async (
	rememberUser: boolean,
	onError?: (error: string) => unknown
): Promise<void> => {
	const {
		signInWithPopup,
		getAdditionalUserInfo,
		setPersistence,
		browserLocalPersistence,
		browserSessionPersistence,
	} = await import('firebase/auth')

	// AUTH
	const auth = await getAuth()

	// INICIAR
	if (gProvider) {
		// RECORDAR USUARIO
		window.localStorage.setItem('remember', rememberUser ? '1' : '0')
		await signInWithPopup(auth, gProvider)
			.then((res) => {
				if (getAdditionalUserInfo(res)?.isNewUser) saveUser()(res)
				window.postMessage({ action: 'auth' }, '*')
			})
			.catch(authErrorHandler(onError))

		// PERSISTENCIA
		await setPersistence(auth, rememberUser ? browserLocalPersistence : browserSessionPersistence)
	}
}

/**
 * Recuperar contraseña
 * @param  {string} email
 * @param  {EmptyFunction} onSuccess
 * @param  {(error:string)=>unknown} onError?
 * @returns {Promise<void>}
 */
export const forgotPass = async (
	email: string,
	onSuccess: () => void,
	onError?: (error: string) => unknown
): Promise<void> => {
	const { sendPasswordResetEmail } = await import('firebase/auth')
	const auth = await getAuth()
	return sendPasswordResetEmail(auth, email).then(onSuccess).catch(authErrorHandler(onError))
}
/**
 * Cerrar sesión
 * @returns {Promise<void>}
 */
export const logout = async (): Promise<void> => {
	const { signOut } = await import('firebase/auth')
	const auth = await getAuth()
	window.postMessage({ action: 'logout' }, '*')
	return signOut(auth)
}
