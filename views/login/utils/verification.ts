// REACT
import { FormEvent, MouseEvent, MutableRefObject, RefObject } from 'react'

// TOOLS
import { signingUser } from 'utils/auth'

export const startSigning = async (
	ev: FormEvent | MouseEvent,
	userData: MutableRefObject<LoginData | SigningData>,
	progressRef: RefObject<HTMLDivElement>,
	isNew?: boolean
) => {
	// EVITAR RELOAD
	ev.preventDefault()

	// ALERTA DE ERROR
	const onError = (error: firebase.default.auth.AuthError | string) => {
		alert({
			type: 'error',
			title: 'Ocurrió un error',
			onHide: () => {
				if (progressRef.current) progressRef.current.style.display = 'none'
			},
			body: typeof error === 'string' ? error : error.message,
		})
	}

	// VALIDAR USUARIO
	if (progressRef.current) progressRef.current.style.display = 'block'
	signingUser(
		isNew ? userData.current.semail : userData.current.email,
		isNew ? userData.current.spass : userData.current.pass,
		isNew ? userData.current.name : undefined,
		onError
	)

	return null
}
