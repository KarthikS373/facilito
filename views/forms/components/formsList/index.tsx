// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import useFilter from './utils/hooks'
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
	const changesTrigger: number =
		formsCtx.forms.forms.length +
		formsCtx.forms.answers.length +
		formsCtx.forms.answers
			.map((answer) => answer?.data.length || 0)
			.reduce((prev, next) => prev + next, 0)

	useFilter(filter, changesTrigger, setForms, formsCtx.forms)

	// BORRAR FORMULARIO
	const deleteFormEv = (formID: string) => () => deleteForm(formID, setForms, formsCtx.setForms)

	return (
		<div className={Styles.container}>
			<div className={Styles.respSpace} />
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
