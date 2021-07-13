// REACT
import { FormEvent, MouseEvent, MutableRefObject, RefObject } from 'react'

// TOOLS
import { signingUser } from 'utils/auth'

/**
 * Iniciar validación de login
 * @description Inicia un usuario o muestra alertas de error
 * @param  {FormEvent|MouseEvent} ev
 * @param  {MutableRefObject<LoginData|SigningData>} userData
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
) => {
	// EVITAR RELOAD
	ev.preventDefault()

	// ALERTA DE ERROR
	const onError = (error: firebase.default.auth.AuthError | string) => {
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
		onError,
		rememberUser
	)

	return null
}
