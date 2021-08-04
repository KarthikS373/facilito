// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import deleteForm from './utils/tools'
import { useFormFilter } from 'hooks/forms'

// ESTILOS
import Styles from './style.module.scss'

// CONTEXTO
import BusinessContext from 'context/business'
import FormsContext from 'context/forms'

// STRINGS
import useStrings from 'hooks/lang'

// COMPONENTES
import FormCard from 'components/formCard'

// PROPS
interface FormsListProps {
	filter?: string
}

const FormsList: React.FC<FormsListProps> = ({ filter }) => {
	// STRINGS
	const { $ } = useStrings()

	// FORMULARIOS
	const [forms, setForms] = useState<FormInterface>({
		forms: [],
		answers: [],
	})

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// FORMULARIOS
	const formsCtx = useContext(FormsContext)

	// FILTROS
	const changesTrigger: string =
		formsCtx.forms.forms.length +
		formsCtx.forms.answers.length +
		formsCtx.forms.answers.map((answer) => answer?.data.length || 0).join('')

	useFormFilter(filter, changesTrigger, setForms, formsCtx.forms)

	// BORRAR FORMULARIO
	const deleteFormEv = (formID: string) => () =>
		deleteForm(formID, setForms, formsCtx.setForms, $, businessCtx.business?.id)

	return (
		<div className={Styles.container}>
			<div className={Styles.respSpace} />
			{forms.forms.map((form: Form, index: number) => (
				<FormCard
					form={form}
					key={`${form.id}_${index}`}
					contentLink={`f/${form.id}`}
					onDelete={deleteFormEv(form.id)}
					bottomLink={`f/${form.id}/respuestas`}
					bottomSection={`${forms.answers[index]?.data.length || 0} respuesta(s)`}
				/>
			))}
		</div>
	)
}

FormsList.defaultProps = {
	filter: 'asc',
}

export default FormsList
