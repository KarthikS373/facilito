import { useEffect } from 'react'

const useStateProps = (
	publicForm: boolean,
	answersConnection: ConnectionMethods | undefined,
	setPublished: SetState<boolean>,
	setConnectionMethods: SetState<ConnectionMethods | undefined>
) => {
	// ACTUALIZAR ESTADO DE PUBLICACIÓN
	useEffect(() => {
		setPublished(publicForm)
		setConnectionMethods(answersConnection)
	}, [publicForm, answersConnection])
}

export default useStateProps
