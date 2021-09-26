// REACT
import React, { useRef, useContext } from 'react'

// COMPONENTES
import StatesList from './components/statesList'
import Header from 'components/header'
import Info from './components/info'
import View from 'components/view'

// HOOKS
import saveStates, { addNewState } from './utils/tools'
import { useForm } from 'hooks/forms'
import useStrings from 'hooks/lang'

// MATERIAL
import Button from '@mui/material/Button'

// ICONS
import SaveTwoTone from '@mui/icons-material/SaveTwoTone'

// CONTEXTO
import BusinessContext from 'context/business'
import FormsContext from 'context/forms'

// PROPS
interface EditTracking {
	formID: string
}
const EditTracking: React.FC<EditTracking> = ({ formID }) => {
	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// FORMS
	const formsCtx = useContext(FormsContext)

	// FORMULARIO
	const form = useForm(formID, formsCtx.forms.forms)

	// TRACKING
	const localTracking: React.MutableRefObject<FormTrackingStep[]> = useRef(form?.tracking || [])
	localTracking.current = form?.tracking || []

	// STRINGS
	const { $ } = useStrings()

	// GUARDAR TRACKING
	const saveTracking = () => saveStates(localTracking, formID, businessCtx.business?.id)

	// AGREGAR ESTADO
	const addNewStateOnTracking = () => addNewState(localTracking, formsCtx.setForms, form?.id)

	return (
		<View>
			<Header customDescription={`${form?.tracking?.length || 0} ${$`evento(s) creados`}`}>
				<Button
					fullWidth
					color='primary'
					variant='contained'
					onClick={saveTracking}
					style={{ color: '#fff' }}
					startIcon={<SaveTwoTone />}>{$`Guardar estados`}</Button>
			</Header>
			<Info onAdd={addNewStateOnTracking} />
			<StatesList formID={formID} localTracking={localTracking} />
		</View>
	)
}

export default EditTracking
