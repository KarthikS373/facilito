// REACT
import React from 'react'

// COMPONENTS
import AlertTemplate from 'components/lualert'

// HOC
import useStrings from 'hooks/lang'

// TEMA
import { useTheme } from '@mui/material/styles'

const AlertsProvider: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// TEMA
	const theme = useTheme()

	return (
		<AlertTemplate
			blurred
			zIndex={100}
			cancelText={$`Cancelar`}
			confirmText={$`Aceptar`}
			confirmColor={theme.palette.primary.main}
		/>
	)
}

export default AlertsProvider
