// REACT
import React, { useContext, useState } from 'react'

// CONTEXT
import BusinessContext from 'context/business'
import FormsContext from 'context/forms'

// HOOKS
import useForms from 'hooks/forms'

const ProductsProvider: React.FC = (props) => {
	// ESTADO
	const [forms, setLocalForms] = useState<FormInterface>({
		answers: [],
		forms: [],
	})

	// USER
	const businessCtx = useContext(BusinessContext)

	// OBTENER PRODUCTOS
	useForms(setLocalForms, businessCtx.business?.id)

	// GUARDAR PRODUCTOS GLOBAL
	const setForms = (forms: FormInterface) =>
		setLocalForms(() => {
			// GUARDAR EN NEGOCIO
			businessCtx.setBusinessDB({ forms: forms.forms.map((form: Form) => form.id) })
			return forms
		})

	return <FormsContext.Provider value={{ forms, setForms }}>{props.children}</FormsContext.Provider>
}

export default ProductsProvider
