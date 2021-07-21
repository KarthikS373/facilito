// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import { useForms } from 'hooks/forms'
import deleteForm from './utils/tools'
import useFilter from './utils/hooks'

// ESTILOS
import Styles from './style.module.scss'

// CONTEXTO
import BusinessContext from 'context/business'

// COMPONENTES
import FormCard from './components/card'

// PROPS
interface FormsListProps {
	filter?: 'asc' | 'des'
}

const FormsList: React.FC<FormsListProps> = ({ filter }) => {
	// FORMULARIOS
	const [forms, setForms] = useState<FormInterface>({
		forms: [],
		answers: [],
	})

	// NEGOCIO
	const businessCtx = useContext(BusinessContext)

	// OBTENER EL LISTADO DE FORMULARIOS
	useForms(setForms, businessCtx.business?.id)

	// FILTROS
	const hasForms: boolean = forms.forms.length > 0
	useFilter(filter, hasForms, setForms)

	// BORRAR FORMULARIO
	const deleteFormEv = (formID: string) => () =>
		deleteForm(formID, setForms, businessCtx.setBusinessDB)

	return (
		<div className={Styles.container}>
			{forms.forms.map((form: Form, index: number) => (
				<FormCard
					form={form}
					key={`${form.id}_${index}`}
					onDelete={deleteFormEv(form.id)}
					answers={forms.answers[index]}
				/>
			))}
		</div>
	)
}

FormsList.defaultProps = {
	filter: 'asc',
}

export default FormsList
