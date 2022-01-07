// REACT
import React, { useContext } from 'react'

// MATERIAL
import { CheckboxProps } from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Input from '@mui/material/Input'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import Close from '@mui/icons-material/Close'
import useStrings from 'hooks/lang'

// CONTEXTO
import FormContext from '../../../../../../../../context'
import onEnter, { sendOptionText } from './tools'

export interface EditableOptionProps {
	InputElement?: React.FC<CheckboxProps>
	onChange: (value: string) => unknown
	onClose: EmptyFunction
	onEnter: EmptyFunction
	placeholder: string
	value: string
	id: number
}

const EditableOption: React.FC<EditableOptionProps> = (props: EditableOptionProps) => {
	// STRINGS
	const { $ } = useStrings()

	// FORM PROPS
	const formProps = useContext(FormContext)

	// EVENTO DE ENTER
	const onEnterEv = (ev: React.KeyboardEvent) => onEnter(ev, props.onEnter)

	// ENVIAR TEXTO DE OPCIÓN
	const sendOptionTextEv = (ev: React.ChangeEvent) => sendOptionText(ev, props.onChange)

	return (
		<div className={Styles.container}>
			{props.InputElement && <props.InputElement color='primary' checked={false} />}
			<Input
				autoFocus={!formProps.preview}
				onKeyDown={onEnterEv}
				onChange={sendOptionTextEv}
				value={props.value}
				placeholder={props.placeholder}
				className={`${Styles.input} ${formProps.preview && Styles.optionPreview}`}
				autoComplete='off'
				id={`${formProps.name}_option_${props.id}`}
				inputProps={{ 'aria-label': 'Option' }}
			/>
			{!formProps.preview && (
				<Tooltip title={$`Borrar`} arrow placement='left'>
					<IconButton size='small' onClick={props.onClose}>
						<Close />
					</IconButton>
				</Tooltip>
			)}
		</div>
	)
}

export default EditableOption
