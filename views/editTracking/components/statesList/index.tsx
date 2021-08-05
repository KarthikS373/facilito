// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import TrackingState from './components/trackingState'

// PROPS
interface StatesListProps {
	formID: string
	localTracking: React.MutableRefObject<FormTrackingStep[]>
}
const StatesList: React.FC<StatesListProps> = ({ formID, localTracking }) => {
	return (
		<div className={Styles.container}>
			{localTracking.current.map((step: FormTrackingStep, index: number) => (
				<TrackingState
					step={step}
					index={index}
					formID={formID}
					key={`${step.name}_${index}`}
					localTracking={localTracking}
				/>
			))}
		</div>
	)
}

export default StatesList
