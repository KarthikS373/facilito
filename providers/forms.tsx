// REACT
import React, { useContext, useState } from 'react'

// CONTEXT
import BusinessContext from 'context/business'
import FormsContext from 'context/forms'

// HOOKS
import useForms from 'hooks/forms'

const ProductsProvider: React.FC = (props) => {
	// ESTADO
	const [forms, setForms] = useState<FormInterface>({
		answers: [],
		forms: [],
	})

	// USER
	const businessCtx = useContext(BusinessContext)

	// OBTENER PRODUCTOS
	useForms(setForms, businessCtx.business?.id)

	// GUARDAR PRODUCTOS GLOBAL
	const setFormsDB = (forms: Partial<FormInterface>) =>
		setForms((prevForms: FormInterface) => {
			// GUARDAR EN NEGOCIO
			const newForms = { ...prevForms, ...forms }
			businessCtx.setBusinessDB({ forms: newForms.forms.map((form: Form) => form.id) })
			return newForms
		})

	return (
		<FormsContext.Provider value={{ forms, setFormsDB, setForms }}>
			{props.children}
		</FormsContext.Provider>
	)
}

export default ProductsProvider
