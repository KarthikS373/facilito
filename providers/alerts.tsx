// REACT
import React from 'react'

// COMPONENTS
import AlertTemplate from 'components/lualert'

// HOC
import useStrings from 'hooks/lang'

const AlertsProvider: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// ALERTA VACIÁ
	const emptyAlert = () => {}

	return (
		<AlertTemplate
			blurred
			zIndex={100}
			confirmColor='#1AA5BB'
			cancelText={$`Cancelar`}
			confirmText={$`Aceptar`}
			ref={(AlertRef) => {
				window.Alert = AlertRef?.show || emptyAlert
				window.hideAlert = AlertRef?.forceHide || emptyAlert
			}}
		/>
	)
}

export default AlertsProvider
