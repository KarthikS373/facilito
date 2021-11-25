// REACT
import React, { useState, useEffect, useContext } from 'react'

// UTILS
import handleStep from './tools'

// MATERIAL
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Button from '@mui/material/Button'
import Step from '@mui/material/Step'

// COMPONENTES
import SideBar from 'components/sideBar'

// CONTEXTO
import BusinessContext from 'context/business'

// STRINGS
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
	useEffect(() => {
		setActiveStep(stateIndex)
	}, [stateIndex])

	return (
		<SideBar open={open} onClose={onClose}>
			<div className={Styles.infoPersonal}>
				<h3>{`${$`Respuesta de`} ${name}`}</h3>
				<p>{$`Configura los estados de tracking para el pedido del cliente.`}</p>
			</div>
			<Stepper className={Styles.content} activeStep={activeStep} orientation='vertical'>
				{tracking.map((option: FormTrackingStep, optionIndex: number) => (
					<Step
						key={option.name}
						style={
							{
								'--currentColor': option.color,
								'--btnColor': optionIndex === 0 ? '#555' : option.color,
							} as React.CSSProperties
						}>
						<StepLabel className={Styles.stepTitle}>{option.name}</StepLabel>
						<StepContent>
							<p>{option.description || $`Descripción no disponible en este momento...`}</p>
							<div className={Styles.actions}>
								<div>
									<Button disabled={activeStep === 0} onClick={changeStep(-1)}>
										{$`Regresar`}
									</Button>
									<Button
										color='primary'
										variant='contained'
										onClick={changeStep(1)}
										disabled={activeStep === tracking.length - 1}
										className={activeStep === tracking.length - 1 ? Styles.disabled : ''}>
										{$`Siguiente`}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
				))}
			</Stepper>
		</SideBar>
	)
}

export default CustomSideBar
