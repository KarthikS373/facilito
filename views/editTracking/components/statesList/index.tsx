// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import TrackingState from './components/trackingState'

// PROPS
interface StatesListProps {
	tracking: FormTrackingStep[]
}
const StatesList: React.FC<StatesListProps> = ({ tracking }) => {
	return (
		<div className={Styles.container}>
			{tracking.map((step: FormTrackingStep, index: number) => (
				<TrackingState key={step.name} step={step} index={index} />
			))}
		</div>
	)
}

export default StatesList
