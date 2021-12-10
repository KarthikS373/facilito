import React from 'react'

// MATERIAL
import Stepper from '@mui/material/Stepper'

// ESITLOS
import Styles from './style.module.scss'

// MATERIAL
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Step from '@mui/material/Step'

// TOOLS
import useStrings from 'hooks/lang'

interface StatesProps {
	activeStep: number
	steps: FormTrackingStep[]
	onNext?: EmptyFunction
	onBack?: EmptyFunction
	hideActions?: boolean
}
const States: React.FC<StatesProps> = ({ activeStep, steps, onNext, onBack, hideActions }) => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<Stepper className={Styles.content} activeStep={activeStep} orientation='vertical'>
			{steps.map((option: FormTrackingStep, optionIndex: number) => (
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
						{!hideActions && (
							<div className={Styles.actions}>
								<div>
									<Button disabled={activeStep === 0} onClick={onBack}>
										{$`Regresar`}
									</Button>
									<Button
										color='primary'
										variant='contained'
										onClick={onNext}
										disabled={activeStep === steps.length}
										className={activeStep === steps.length ? Styles.disabled : ''}>
										{activeStep === steps.length - 1 ? $`Terminar` : $`Siguiente`}
									</Button>
								</div>
							</div>
						)}
					</StepContent>
				</Step>
			))}
		</Stepper>
	)
}

States.defaultProps = {
	hideActions: false,
}

export default States
