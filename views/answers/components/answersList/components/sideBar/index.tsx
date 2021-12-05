// REACT
import React, { useState, useContext } from 'react'

// UTILS
import handleStep from './tools'

// ICONOS
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone'

// COMPONENTES
import SideBar from 'components/sideBar'
import States from './components/states'

// CONTEXTO
import BusinessContext from 'context/business'

// STRINGS
import useDefaultStep from './hooks'
import useStrings from 'hooks/lang'

// ESTILOS
import Styles from './style.module.scss'

interface SideBarProps {
	name?: string
	open: boolean
	formID: string
	filter: string
	stateIndex: number
	answerIndex: number
	currentIndex: number
	onClose: () => unknown
	tracking: FormTrackingStep[]
	updateAnswerState: (index: number, newState: number) => void
}
const CustomSideBar: React.FC<SideBarProps> = ({
	filter,
	open,
	name,
	currentIndex,
	answerIndex,
	tracking,
	formID,
	updateAnswerState,
	stateIndex,
	onClose,
}) => {
	// STRINGS
	const { $ } = useStrings()

	// ESTADOS
	const [activeStep, setActiveStep] = useState<number>(stateIndex)

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// MOVER PASO
	const changeStep = (step: number) => () =>
		handleStep(
			onClose,
			currentIndex,
			answerIndex,
			step,
			filter,
			setActiveStep,
			updateAnswerState,
			formID,
			businessCtx.business?.id
		)

	// ACTUALIZAR PASOS
	useDefaultStep(stateIndex, setActiveStep)

	return (
		<SideBar open={open} onClose={onClose}>
			<div className={Styles.infoPersonal}>
				<h2>
					<QuestionAnswerTwoToneIcon />
					{`${$`Respuesta de`} ${name?.split(' ')[0]}`}
				</h2>
				<p>{$`Configura los estados de tracking para el pedido del cliente.`}</p>
			</div>
			<States
				steps={tracking}
				activeStep={activeStep}
				onNext={changeStep(1)}
				onBack={changeStep(-1)}
			/>
		</SideBar>
	)
}

export default CustomSideBar
