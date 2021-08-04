// REACT
import React from 'react'

// COMPONENTES
import StatesList from './components/statesList'
import Header from 'components/header'
import Info from './components/info'

// HOOKS
import { useForm } from 'hooks/forms'
import useStrings from 'hooks/lang'

// MATERIAL
import Button from '@material-ui/core/Button'

// ICONS
import SaveTwoTone from '@material-ui/icons/SaveTwoTone'

// PROPS
interface EditTracking {
	formID: string
}
const EditTracking: React.FC<EditTracking> = ({ formID }) => {
	// FORMULARIO
	const form = useForm(formID)

	// STRINGS
	const { $ } = useStrings()

	return (
		<>
			<Header customDescription={`${form?.tracking?.length || 0} ${$`evento(s) creados`}`}>
				<Button
					color='primary'
					variant='contained'
					style={{ color: '#fff' }}
					startIcon={<SaveTwoTone />}>{$`Guardar estados`}</Button>
			</Header>
			<Info />
			<StatesList tracking={form?.tracking || []} />
		</>
	)
}

export default EditTracking
