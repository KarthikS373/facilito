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
	open: boolean
	formID: string
	stateIndex: number
	answerIndex: number
	currentIndex: number
	onClose: () => unknown
	tracking: FormTrackingStep[]
	updateAnswerState: (index: number, newState: number) => void
}
const CustomSideBar: React.FC<SideBarProps> = ({
	open,
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
									<Button variant='contained' color='primary' onClick={changeStep(1)}>
										{activeStep === tracking.length - 1 ? $`Terminar` : $`Siguiente`}
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
