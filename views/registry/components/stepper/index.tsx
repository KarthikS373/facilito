import React from 'react'

import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import Box from '@mui/material/Box'

import Styles from './style.module.scss'

import useStrings from 'hooks/lang'

interface CStepperProps {
	activeStep: number
}
const CStepper: React.FC<CStepperProps> = ({ activeStep }) => {
	const { $ } = useStrings()
	return (
		<Box sx={{ width: '100%', maxWidth: '900px', marginBottom: '30px' }}>
			<Stepper activeStep={activeStep}>
				{[$`Crear cuenta`, $`Seleccionar plan`, $`Registrar empresa`, $`Crear tienda!`].map(
					(label) => {
						return (
							<Step key={label}>
								<StepLabel className={Styles.step}>{label}</StepLabel>
							</Step>
						)
					}
				)}
			</Stepper>
		</Box>
	)
}

export default CStepper
