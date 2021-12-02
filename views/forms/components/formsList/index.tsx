// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import deleteForm from './tools'
import { useFormFilter } from 'hooks/forms'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import Skeleton from '@mui/material/Skeleton'

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

	// TIENDAS
	const [forms, setForms] = useState<FormInterface>({
		forms: [],
		answers: [],
	})

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// TIENDAS
	const formsCtx = useContext(FormsContext)

	useFormFilter(filter || 'asc', setForms, formsCtx.forms)

	// BORRAR TIENDA
	const deleteFormEv = (formID: string) => () =>
		deleteForm(formID, setForms, formsCtx.setFormsDB, businessCtx.business?.id)

	return (
		<div className={Styles.container}>
			<div className={Styles.respSpace} />
			{forms.forms.length > 0
				? forms.forms.map((form: Form, index: number) => (
						<FormCard
							form={form}
							bottomLink='answers'
							contentLink='newForm'
							key={`${form.id}_${index}`}
							onDelete={deleteFormEv(form.id)}
							bottomSection={`${forms.answers[index]?.data.length || 0} ${$`respuesta(s)`}`}
						/>
				  ))
				: Array(6)
						.fill({})
						.map((_f, index) => <Skeleton key={index} className={Styles.formSkeleton} />)}
		</div>
	)
}

FormsList.defaultProps = {
	filter: 'asc',
}

export default FormsList
