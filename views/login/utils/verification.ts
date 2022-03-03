// REACT
import type { FormEvent, MouseEvent, RefObject } from 'react'

// TIPOS
import type { AuthError } from '@firebase/auth'

// TOOLS
import { signingUser } from 'utils/auth'

/**
 * Iniciar validación de login
 * @param  {FormEvent|MouseEvent} ev
 * @param  {LoginData|SigningData} userData
 * @param  {RefObject<HTMLDivElement>} progressRef
 * @param  {boolean} isNew?
 * @param  {boolean} rememberUser
 */
export const startSigning = async (
	ev: FormEvent | MouseEvent,
	userData: LoginData | SigningData,
	progressRef: RefObject<HTMLDivElement>,
	isNew?: boolean,
	rememberUser?: boolean
): Promise<void> => {
	// EVITAR RELOAD
	ev.preventDefault()

	if (
		(isNew && userData.semail?.length && userData.spass?.length) ||
		(userData.email?.length && userData.pass?.length)
	) {
		// ALERTA DE ERROR
		const onError = (error: AuthError | string) => {
			window.Alert({
				type: 'error',
				title: 'Ocurrió un error',
				body: typeof error === 'string' ? error : error.message,
				onHide: () => {
					if (progressRef.current) progressRef.current.style.display = 'none'
				},
			})
		}

		// VALIDAR USUARIO
		if (progressRef.current) progressRef.current.style.display = 'block'
		window.Alert('Iniciando sesión...')
		signingUser(
			isNew ? userData.semail : userData.email,
			isNew ? userData.spass : userData.pass,
			isNew ? userData.name : undefined,
			onError,
			rememberUser
		).then(() => window.Alert('Bienvenido'))
	}
}
