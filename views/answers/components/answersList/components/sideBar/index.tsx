// REACT
import React, { useState, useEffect, useContext } from 'react'

// UTILS
import handleStep from './utils/tools'

// MATERIAL
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import Button from '@material-ui/core/Button'
import Step from '@material-ui/core/Step'

// COMPONENTES
import SideBar from 'components/sideBar'

// CONTEXTO
import BusinessContext from 'context/business'

// STRINGS
import withStrings from 'hoc/lang'

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
const CustomSideBar: React.FC<SideBarProps> = withStrings(
	({
		open,
		$,
		currentIndex,
		answerIndex,
		tracking,
		formID,
		updateAnswerState,
		stateIndex,
		onClose,
	}) => {
		// ESTADOS
		const [activeStep, setActiveStep] = useState<number>(stateIndex)

		// BUSINESS
		const businessCtx = useContext(BusinessContext)

		// MOVER PASO
		const changeStep = (step: number) => () =>
			handleStep(
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
					{tracking.map((option: FormTrackingStep) => (
						<Step key={option.name}>
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
)

export default CustomSideBar
