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
 */
export const startSigning = async (
	ev: FormEvent | MouseEvent,
	userData: LoginData | SigningData,
	progressRef: RefObject<HTMLDivElement>,
	isNew?: boolean
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

		signingUser(
			isNew ? userData.semail : userData.email,
			isNew ? userData.spass : userData.pass,
			isNew ? userData.name : undefined,
			onError
		)
			.then(() => {
				if (progressRef.current) progressRef.current.style.display = 'none'
			})
			.catch(() => {
				window.Alert({
					type: 'error',
					title: 'Ocurrio un error',
					body: 'Ocurrio un error al iniciar sesión con tu cuenta, verifica que tu correo y contraseña sean correctos.',
				})
				if (progressRef.current) progressRef.current.style.display = 'none'
			})
	}
}
