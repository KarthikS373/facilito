import { getDefValues, SendData } from '../tools'
import { useEffect } from 'react'

/**
 * Actualizar estado con props
 * @param connectionMethods
 * @param url
 * @param setFormData
 */
const useDefProps = (
	url: string,
	setFormData: SetState<SendData>,
	connectionMethods?: ConnectionMethods
): void => {
	useEffect(() => {
		setFormData(getDefValues(url, connectionMethods))
	}, [connectionMethods, url, setFormData])
}

export default useDefProps
