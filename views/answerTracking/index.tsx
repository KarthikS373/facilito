import React, { useState } from 'react'

// COMPONENTES
import Checkout from './components/checkout'
import States from './components/states'

// HOOKS
import useAnswer from './hooks'

// ESTILOS
import Styles from './style.module.scss'

interface AnswerTrackingProps {
	company: Business | null
	formData: Form | null
	answerIndex: number
	companyURL: string
	formURL: string
}

const AnswerTracking: React.FC<AnswerTrackingProps> = ({ company, formData, answerIndex }) => {
	// RESPUESTA
	const [formAnswer, setFormAnswer] = useState<FormAnswerTracking | undefined>()

	// HOOKS
	useAnswer(setFormAnswer, answerIndex, company?.id, formData?.id)

	return (
		<div className={Styles.container}>
			<States formData={formData} data={formAnswer} />
			<Checkout company={company} formData={formData} data={formAnswer} />
		</div>
	)
}

export default AnswerTracking
