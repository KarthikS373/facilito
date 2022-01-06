// UTILS
import { FormsContextProps } from 'context/forms'

// ACTUALIZAR TITULO DE FORMULARIO
export const updateFormProp = (
	key: keyof Form,
	newValue: FormValue,
	formsCtx: FormsContextProps,
	formData: React.MutableRefObject<Form>
): void => {
	// ACTUALIZAR
	formData.current[key] = newValue
	formsCtx.setForms((forms) => {
		const tmpForms = { ...forms }
		const formIndex = tmpForms.forms.findIndex((form) => form.id === formData.current.id)
		if (formIndex >= 0 && formsCtx.forms.forms[formIndex]) tmpForms.forms[formIndex][key] = newValue
		return tmpForms
	})
}

// OBTENER FORMULARIO
export const getForm = (id: string, forms: Form[]): Form | undefined => {
	const form = forms.find((form) => form.id === id)
	return form
}
