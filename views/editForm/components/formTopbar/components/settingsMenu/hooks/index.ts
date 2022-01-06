import { getDefValues, SendData } from '../tools'
import { useEffect } from 'react'

/**
 * Actualizar estado con props
 * @param connectionMethods
 * @param url
 * @param setFormData
 */
const useDefProps = (setFormData: SetState<SendData>, form: React.MutableRefObject<Form>): void => {
	useEffect(() => {
		setFormData(getDefValues(form))
	}, [form, setFormData])
}

export default useDefProps
