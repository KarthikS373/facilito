// REACT
import React from 'react'

// MATERIAL
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import FormatColorTextTwoTone from '@material-ui/icons/FormatColorTextTwoTone'
import BackspaceTwoTone from '@material-ui/icons/BackspaceTwoTone'
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone'
import ChatTwoTone from '@material-ui/icons/ChatTwoTone'

// HOOKS
import useStrings from 'hooks/lang'

// PROPS
interface TrackingState {
	step: FormTrackingStep
	index: number
}
const TrackingState: React.FC<TrackingState> = ({ step, index }) => {
	// STRINGS
	const { $ } = useStrings()

	// COLOR
	const textFieldStyle = {
		root: {
			'& label.Mui-focused': {
				color: step.color || '#1AA5BB',
			},
			'& .MuiInput-underline:after': {
				borderBottomColor: step.color || '#1AA5BB',
			},
			'& .MuiOutlinedInput-root': {
				'& fieldset': {
					borderColor: step.color || '#1AA5BB',
				},
				'&:hover fieldset': {
					borderColor: step.color || '#1AA5BB',
				},
				'&.Mui-focused fieldset': {
					borderColor: step.color || '#1AA5BB',
				},
			},
		},
	}

	return (
		<div className={Styles.container} style={{ borderColor: step.color || '#1AA5BB' }}>
			<div className={Styles.inputs}>
				<TextField
					fullWidth
					name='name'
					label={$`Titulo`}
					variant='outlined'
					// @ts-ignore
					classes={textFieldStyle}
					defaultValue={step.name}
					placeholder={$`Una palabra`}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<FormatColorTextTwoTone
									style={{
										fill: step.color || '#1AA5BB',
									}}
								/>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					multiline
					fullWidth
					maxRows={2}
					name='description'
					variant='outlined'
					label={$`Descripcion`}
					// @ts-ignore
					classes={textFieldStyle}
					defaultValue={step.description}
					placeholder={$`Maximo 250 caracteres`}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<ChatTwoTone
									style={{
										fill: step.color || '#1AA5BB',
									}}
								/>
							</InputAdornment>
						),
					}}
				/>
			</div>
			<div className={Styles.actions}>
				<IconButton>
					<BackspaceTwoTone />
				</IconButton>

				<IconButton>
					<DeleteTwoTone />
				</IconButton>

				<IconButton
					style={{
						backgroundColor: step.color || '#1AA5BB',
					}}
					className={Styles.colorButton}>
					{index + 1}
				</IconButton>
			</div>
		</div>
	)
}

export default TrackingState
