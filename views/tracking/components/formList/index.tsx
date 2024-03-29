// REACT
import React, { useState, useContext } from 'react'

// HOOKS
import { useFormFilter } from 'hooks/forms'
import deleteForm from './tools'

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
		deleteForm(formID, setForms, formsCtx.setForms, businessCtx.business?.id)

	return (
		<div className={Styles.container}>
			{forms.forms.length > 0
				? forms.forms.map((form: Form, index: number) => (
						<FormCard
							form={form}
							key={`${form.id}_${index}`}
							bottomLink='trackingSettings'
							contentLink='trackingSettings'
							onDelete={deleteFormEv(form.id)}
							bottomSection={`${forms.forms[index]?.tracking?.length || 0} ${$`estado(s)`}`}
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
