// UTILS
import { useEffect } from 'react'
import { readTemplates } from 'utils/forms'

/**
 * Hook de tiendas de plantillas
 * @param  {SetState<Form[]>} setTemplates
 * @param  {string} companyID
 */
const useTemplateForms = (setTemplates: SetState<Form[]>, companyID?: string): void => {
	// LEER TEMPLATES
	useEffect(() => {
		if (companyID)
			readTemplates().then((forms: Form[]) => {
				const spliced = [...forms]
				spliced.length = Math.min(7, spliced.length)
				setTemplates(spliced)
			})
	}, [setTemplates, companyID])
}

export default useTemplateForms
