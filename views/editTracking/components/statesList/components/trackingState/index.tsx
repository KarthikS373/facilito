// REACT
import React, { useState, useContext } from 'react'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import FormatColorTextTwoTone from '@mui/icons-material/FormatColorTextTwoTone'
import BackspaceTwoTone from '@mui/icons-material/BackspaceTwoTone'
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone'
import ChatTwoTone from '@mui/icons-material/ChatTwoTone'

// HOOKS
import useStyles from './hooks'
import useStrings from 'hooks/lang'

// TOOLS
import deleteState, { onStateChange, clearStateInputs, changeStateColor } from './tools'

// CONTEXTOS
import BusinessContext from 'context/business'
import FormsContext from 'context/forms'

// PROPS
interface TrackingState {
	index: number
	formID: string
	step: FormTrackingStep
	localTracking: React.MutableRefObject<FormTrackingStep[]>
}
const TrackingState: React.FC<TrackingState> = ({ step, formID, index, localTracking }) => {
	// STRINGS
	const { $ } = useStrings()

	// ESTADO
	const [stepState, setStep] = useState<FormTrackingStep>(step)

	// MENU
	const [colorMenuAnchor, setColorMenuAnchor] = useState<HTMLButtonElement | null>(null)
	const openColorMenu = Boolean(colorMenuAnchor)

	// TIENDAS
	const formsCtx = useContext(FormsContext)

	// NEGOCIO
	const businessCtx = useContext(BusinessContext)

	// ESTILOS
	const classes = useStyles()

	// CERRAR MENU
	const closeColorMenu = () => setColorMenuAnchor(null)

	// ABRIR MENU
	const openColorMenuEv = (ev: React.MouseEvent<HTMLButtonElement>) =>
		setColorMenuAnchor(ev.currentTarget)

	// CAMBIAR VALORES
	const onChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
		onStateChange(index, ev, localTracking, setStep)

	// LIMPIAR
	const clearState = () => clearStateInputs(index, localTracking, setStep)

	// BORRAR ESTADO ACTUAL
	const deleteCurrentState = () =>
		deleteState(index, formID, localTracking, formsCtx.setForms, businessCtx.business?.id)

	// ASIGNAR COLOR
	const setStepColor = (color: string) => () =>
		changeStateColor(index, color, closeColorMenu, localTracking, setStep)

	return (
		<>
			<div
				className={Styles.container}
				style={
					{
						borderColor: stepState.color || 'var(--primary)',
						'--currentColor': stepState.color || 'var(--primary)',
					} as React.CSSProperties
				}>
				<div className={Styles.inputs}>
					{/* NOMBRE */}
					<TextField
						fullWidth
						name='name'
						label={$`Titulo`}
						variant='outlined'
						onChange={onChange}
						value={stepState.name}
						className={classes.root}
						placeholder={$`Una palabra`}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<FormatColorTextTwoTone
										style={{
											fill: stepState.color || 'var(--primary)',
										}}
									/>
								</InputAdornment>
							),
						}}
					/>

					{/* DESCRIPCION */}
					<TextField
						multiline
						fullWidth
						maxRows={2}
						name='description'
						variant='outlined'
						onChange={onChange}
						label={$`Descripcion`}
						className={classes.root}
						value={stepState.description}
						placeholder={$`Maximo 250 caracteres`}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<ChatTwoTone
										style={{
											fill: stepState.color || 'var(--primary)',
										}}
									/>
								</InputAdornment>
							),
						}}
					/>
				</div>
				<div className={Styles.actions}>
					{/* LIMPIAR */}
					<IconButton onClick={clearState}>
						<BackspaceTwoTone />
					</IconButton>

					{/* BORRAR */}
					<IconButton onClick={deleteCurrentState}>
						<DeleteTwoTone />
					</IconButton>

					{/* CAMBIAR COLOR */}
					<IconButton
						onClick={openColorMenuEv}
						style={{
							backgroundColor: stepState.color || 'var(--primary)',
						}}
						className={Styles.colorButton}>
						{index + 1}
					</IconButton>
				</div>
			</div>
			<PopperMenuList
				placement='bottom'
				open={openColorMenu}
				style={{ zIndex: 3 }}
				onClose={closeColorMenu}
				anchorEl={colorMenuAnchor}>
				<ul className={Styles.colors}>
					{/* AZUL */}
					<li>
						<IconButton onClick={setStepColor('#1AA5BB')} />
					</li>

					{/* VERDE */}
					<li>
						<IconButton onClick={setStepColor('#689f38')} />
					</li>

					{/* MORADO */}
					<li>
						<IconButton onClick={setStepColor('#ab47bc')} />
					</li>

					{/* ROSA */}
					<li>
						<IconButton onClick={setStepColor('#ec407a')} />
					</li>

					{/* ROJO */}
					<li>
						<IconButton onClick={setStepColor('#ef5350')} />
					</li>

					{/* NARANJA */}
					<li>
						<IconButton onClick={setStepColor('#ef6c00')} />
					</li>
				</ul>
			</PopperMenuList>
		</>
	)
}

export default TrackingState
