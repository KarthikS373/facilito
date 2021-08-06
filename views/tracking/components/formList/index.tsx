// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import { useFormFilter } from 'hooks/forms'
import deleteForm from './utils/tools'

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
		formsCtx.forms.forms.map((form: Form) => form.tracking?.length || 0).join('')

	useFormFilter(filter, changesTrigger, setForms, formsCtx.forms)

	// BORRAR FORMULARIO
	const deleteFormEv = (formID: string) => () =>
		deleteForm(formID, setForms, formsCtx.setForms, businessCtx.business?.id)

	return (
		<div className={Styles.container}>
			{forms.forms.map((form: Form, index: number) => (
				<FormCard
					form={form}
					key={`${form.id}_${index}`}
					bottomLink='trackingSettings'
					contentLink='trackingSettings'
					onDelete={deleteFormEv(form.id)}
					bottomSection={`${forms.forms[index]?.tracking?.length || 0} ${$`estado(s)`}`}
				/>
			))}
		</div>
	)
}

FormsList.defaultProps = {
	filter: 'asc',
}

export default FormsList
