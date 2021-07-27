// UTILS
import { useEffect } from 'react'
import { readTemplates } from 'utils/forms'

/**
 * Hook de formularios de plantillas
 * @description Retorna una lista de formularios en 'plantillas facilito'
 * @param  {React.Dispatch<React.SetStateAction<Form[]>>} setTemplates
 * @param  {string} companyID
 */
const useTemplateForms = (
	setTemplates: React.Dispatch<React.SetStateAction<Form[]>>,
	companyID?: string
) => {
	// LEER TEMPLATES
	useEffect(() => {
		if (companyID)
			readTemplates().then((forms: Form[]) => {
				const spliced = [...forms]
				spliced.length = Math.min(7, spliced.length)
				setTemplates(spliced)
			})
	}, [companyID])
}

export default useTemplateForms
