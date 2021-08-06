// REACT
import React, { useState, useContext } from 'react'

// MATERIAL
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import FormatColorTextTwoTone from '@material-ui/icons/FormatColorTextTwoTone'
import BackspaceTwoTone from '@material-ui/icons/BackspaceTwoTone'
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone'
import ChatTwoTone from '@material-ui/icons/ChatTwoTone'

// HOOKS
import useStyles from './utils/hooks'
import useStrings from 'hooks/lang'

// TOOLS
import deleteState, { onStateChange, clearStateInputs, changeStateColor } from './utils/tools'

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

	// FORMULARIOS
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
		deleteState(index, formID, businessCtx.business?.id, localTracking, formsCtx.setForms)

	// ASIGNAR COLOR
	const setStepColor = (color: string) => () =>
		changeStateColor(index, color, localTracking, setStep)

	return (
		<>
			<div
				className={Styles.container}
				style={
					{
						borderColor: stepState.color || '#1AA5BB',
						'--currentColor': stepState.color || '#1AA5BB',
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
											fill: stepState.color || '#1AA5BB',
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
											fill: stepState.color || '#1AA5BB',
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
							backgroundColor: stepState.color || '#1AA5BB',
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
					<li>
						<IconButton onClick={setStepColor('#1AA5BB')} />
					</li>
					<li>
						<IconButton onClick={setStepColor('#ef5350')} />
					</li>
					<li>
						<IconButton onClick={setStepColor('#689f38')} />
					</li>
					<li>
						<IconButton onClick={setStepColor('#ef6c00')} />
					</li>
					<li>
						<IconButton onClick={setStepColor('#ab47bc')} />
					</li>
				</ul>
			</PopperMenuList>
		</>
	)
}

export default TrackingState
