// REACT
import React from 'react'

// ICONOS
import SaveTwoTone from '@mui/icons-material/SaveTwoTone'

// MATERIAL
import Button from '@mui/material/Button/Button'

// HOOKS
import useStrings from 'hooks/lang'
import useIntervalSave from './hooks'

// PROPIEDADES
interface SaveProps {
	onSave: (ctrl: boolean) => unknown
}

const SaveOnCloud: React.FC<SaveProps> = ({ onSave }) => {
	// STRINGS
	const { $ } = useStrings()

	// HOOKS
	useIntervalSave($, onSave)

	// GUARDAR
	const saveHandler = () => onSave(false) && window.Snack($`Guardando cambios...`)

	return (
		<Button
			variant='outlined'
			onClick={saveHandler}
			startIcon={<SaveTwoTone />}>{$`Guardar`}</Button>
	)
}

export default SaveOnCloud
