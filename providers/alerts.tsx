// REACT
import React from 'react'

// COMPONENTS
import AlertTemplate from 'components/lualert'

// HOC
import withStrings from 'hoc/lang'

const AlertsProvider: React.FC = withStrings(({ $ }) => {
	// ALERTA VACIÁ
	const emptyAlert = () => {}

	return (
		<AlertTemplate
			blurred
			zIndex={100}
			confirmColor='#1AA5BB'
			cancelText={$`Cancelar`}
			ref={(AlertRef) => {
				window.Alert = AlertRef?.show || emptyAlert
				window.hideAlert = AlertRef?.forceHide || emptyAlert
			}}
		/>
	)
})

export default AlertsProvider
