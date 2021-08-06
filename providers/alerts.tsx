// REACT
import React from 'react'

// COMPONENTS
import AlertTemplate from 'components/lualert'

// HOC
import useStrings from 'hooks/lang'

const AlertsProvider: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	return (
		<AlertTemplate
			blurred
			zIndex={100}
			confirmColor='#1AA5BB'
			cancelText={$`Cancelar`}
			confirmText={$`Aceptar`}
		/>
	)
}

export default AlertsProvider
