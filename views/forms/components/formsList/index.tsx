// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import useFilter, { useGlobalForms } from './utils/hooks'
import deleteForm from './utils/tools'

// ESTILOS
import Styles from './style.module.scss'

// CONTEXTO
import FormsContext from 'context/forms'

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

	// FORMULARIOS
	const formsCtx = useContext(FormsContext)

	// FILTROS
	const hasForms: boolean = formsCtx.forms.forms.length > 0
	useFilter(filter, hasForms, setForms)

	// BORRAR FORMULARIO
	const deleteFormEv = (formID: string) => () => deleteForm(formID, setForms, formsCtx.setForms)

	// ACTUALIZAR CON CONTEXT
	useGlobalForms(setForms, hasForms, formsCtx.forms)

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
