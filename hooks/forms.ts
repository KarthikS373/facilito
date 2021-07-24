import { useEffect } from 'react'
import { formsListener } from 'utils/forms'

/**
 * Hook de Formularios
 * @description Retornar todos los formularios de un negocio
 * @param  {(forms: FormInterface) => unknown} setForms
 * @param  {string} companyID
 */
const useForms = (setForms: (forms: FormInterface) => unknown, companyID?: string) => {
	useEffect(() => {
		// LISTENER
		let listener: EmptyFunction | null = null

		// VERIFICAR EMPRESA
		if (companyID) formsListener(companyID, setForms).then((listen) => (listener = listen))

		// LIMPIAR LISTENER
		return () => {
			if (listener) listener()
		}
	}, [companyID, setForms])
}

export default useForms
