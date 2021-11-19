// REACT
import React, {
	RefObject,
	MutableRefObject,
	useRef,
	AnimationEvent,
	ChangeEvent,
	useState,
} from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import FilterNoneRounded from '@mui/icons-material/FilterNoneTwoTone'
import DeleteOutlineRounded from '@mui/icons-material/DeleteTwoTone'
import DragIndicator from '@mui/icons-material/DragIndicatorTwoTone'

// COMPONENTES
import { getComponent, getComponentIcon } from './components/switcher'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Switch from '@mui/material/Switch'

// CONTEXTO
import FormContext from '../../context'

// UTILS
import sendComponent, {
	animateCopy,
	animateDelete,
	getNotRequired,
	handleComponent,
	onRequired,
} from './tools'
import useStrings from 'hooks/lang'

const FormComponent: React.FC<FormContainerProps> = (props) => {
	// STRINGS
	const { $ } = useStrings()

	// TEMA
	const theme = useTheme()

	// ESTADO
	const [required, setRequired] = useState<boolean>(props.required)

	// REFERENCIA DE ANIMACIÓN
	const enableUnMount: MutableRefObject<boolean> = useRef(false)

	// REFERENCIA DE COPIA
	const enableCopy: MutableRefObject<boolean> = useRef(false)

	// REFERENCIA A COMPONENT
	const formComponentRef: RefObject<HTMLInputElement> = useRef(null)

	// ANIMAR BORRAR
	const handleDelete = () => animateDelete(formComponentRef, enableUnMount, Styles)

	// ANIMAR COPIA
	const handleCopy = () => animateCopy(formComponentRef, enableCopy, Styles)

	// ELIMINAR ANIMACIÓN
	const handleComponentAnim = (ev: AnimationEvent) =>
		handleComponent(ev, formComponentRef, enableCopy, enableUnMount, props, Styles)

	// CAMBIAR OBLIGATORIO
	const handleRequired = (_ev: unknown, checked: boolean) =>
		onRequired(checked, setRequired, props.onRequired)

	// ENVIAR DATOS
	const handleSendComponent = (prop: keyof BlockComponent) => (value: ChangeEvent | string[]) =>
		sendComponent(prop, value, props.onChange)

	// OCULTAR OBLIGATORIO
	const hideRequired: boolean = getNotRequired(props.name)

	return (
		<div className={Styles.container} ref={formComponentRef} onAnimationEnd={handleComponentAnim}>
			<div className={`${Styles.content} ${props.active ? Styles.active : Styles.inactive}`}>
				{/* BARRA DE ACTIVO */}
				{props.active && (
					<div
						className={Styles.activeBar}
						style={{ background: theme.palette.secondary.main }}></div>
				)}

				{/* ICONO */}
				<div style={props.active ? { right: '20px' } : undefined} className={Styles.componentIcon}>
					{getComponentIcon(props.name)}
				</div>

				{/* ICONO DE MOVER */}
				<Tooltip title={$`Mover`} placement='right' arrow>
					<DragIndicator />
				</Tooltip>

				{/* CONTENIDO COMPONENTE */}
				<FormContext.Provider
					value={{
						...props,
						onWrite: handleSendComponent,
						preview: !props.active,
						required: required,
						onAddValue: handleSendComponent,
					}}>
					{getComponent(props.name)}
				</FormContext.Provider>

				{/* BOTONES DE ACCIÓN */}
				{props.name !== 'multiple' && props.active && (
					<div className={Styles.actions}>
						{/* BOTÓN DE COPIAR */}
						<Tooltip title={$`Duplicar`} placement='top' arrow>
							<IconButton size='small' onClick={handleCopy}>
								<FilterNoneRounded />
							</IconButton>
						</Tooltip>

						{/* BOTÓN DE BORRAR */}
						<Tooltip title={$`Borrar`} placement='top' arrow>
							<IconButton size='small' onClick={handleDelete}>
								<DeleteOutlineRounded />
							</IconButton>
						</Tooltip>

						{/* SWITCH DE OBLIGATORIO */}
						{!hideRequired && (
							<Tooltip title={$`Obligatorio`} placement='top' arrow>
								<FormControlLabel
									value='start'
									onChange={handleRequired}
									label={$`Obligatorio`}
									labelPlacement='start'
									control={<Switch checked={required} color='primary' />}
								/>
							</Tooltip>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default FormComponent
