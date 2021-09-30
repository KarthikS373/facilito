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
 * @description Retornar strings de error en español
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
 * @description Retorna la instancia global de firebase/auth
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
 * @description Inicia sesión como usuario anónimo
 */
export const signingAnonymously = async (): Promise<UserCredential> => {
	const { signInAnonymously: signInAnonymouslyFrb } = await import('firebase/auth')
	const auth = await getAuth()
	return signInAnonymouslyFrb(auth)
}

/**
 * Verificar correo
 * @description Verifica un string 'email' con una expresión regular
 * @param  {string} email
 */
export const verifyEmail = (email: string): boolean => {
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
 * @description Actualiza el perfil en el objeto auth
 * @param  {string} displayName
 */
const updateUserName = async (displayName: string) => {
	const { updateProfile } = await import('firebase/auth')
	if (globalAuth?.currentUser) return updateProfile(globalAuth.currentUser, { displayName })
	else return null
}

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
): Promise<void> => {
	// VERIFICAR
	const handler = verifyLoginFields(email, pass)

	if (handler.verify) {
		const { setPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword } =
			await import('firebase/auth')

		// AUTH
		const auth = await getAuth()

		// RECORDAR USUARIO
		await setPersistence(auth, {
			type: rememberUser ? 'LOCAL' : 'SESSION',
		})

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
	} else {
		// MOSTRAR ERROR EN VERIFICACIÓN DE CAMPOS
		if (onError) onError(handler.msg)
	}
}

/**
 * Asignar usuario en firestore
 * Almacena un usuario en la collection 'users' de firestore
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
 * @description Almacena y valida el usuario
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
 * @description Inicio o Registro con un proveedor facebook.
 * @param  {(error:string)=>unknown} onError?
 */
export const facebookSigning = async (onError?: (error: string) => unknown): Promise<void> => {
	const { signInWithPopup, getAdditionalUserInfo } = await import('firebase/auth')

	// AUTH
	const auth = await getAuth()

	// INICIAR
	if (fbProvider)
		await signInWithPopup(auth, fbProvider)
			.then((res) => {
				if (getAdditionalUserInfo(res)?.isNewUser) saveUser()(res)
				window.postMessage({ action: 'auth' }, '*')
			})
			.catch(authErrorHandler(onError))
}

/**
 * Iniciar con Google
 * @description Inicio o Registro con un proveedor google.
 * @param  {(error:string)=>unknown} onError?
 */
export const googleSigning = async (onError?: (error: string) => unknown): Promise<void> => {
	const { signInWithPopup, getAdditionalUserInfo } = await import('firebase/auth')

	// AUTH
	const auth = await getAuth()

	// INICIAR
	if (gProvider)
		signInWithPopup(auth, gProvider)
			.then((res) => {
				if (getAdditionalUserInfo(res)?.isNewUser) saveUser()(res)
				window.postMessage({ action: 'auth' }, '*')
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
	onSuccess: () => void,
	onError?: (error: string) => unknown
): Promise<void> => {
	const { sendPasswordResetEmail } = await import('firebase/auth')
	const auth = await getAuth()
	return sendPasswordResetEmail(auth, email).then(onSuccess).catch(authErrorHandler(onError))
}
/**
 * Cerrar sesión
 * @description Enviá un evento y cierra sesión
 */
export const logout = async (): Promise<void> => {
	const { signOut } = await import('firebase/auth')
	const auth = await getAuth()
	window.postMessage({ action: 'logout' }, '*')
	return signOut(auth)
}
