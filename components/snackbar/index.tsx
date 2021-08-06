// eslint-disable react-hooks/exhaustive-deps
// REACT
import React, { useState, useEffect } from 'react'

// MATERIAL
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'

// HOOKS
import useStrings from 'hooks/lang'

// PROPS
interface SnackProps {
	body: string
	open: boolean
}
const GlobalSnack: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// ESTADO
	const [snackState, setSnackState] = useState<SnackProps>({
		open: false,
		body: '',
	})

	// CERRAR
	const handleClose = (_event, reason: SnackbarCloseReason) => {
		if (reason === 'clickaway') return
		setSnackState({ open: false, body: '' })
	}

	// GLOBAL
	useEffect(() => {
		window.Snack = (msg: string) => setSnackState({ body: $`${msg}`, open: true })
	})

	return (
		<Snackbar
			key='global_snack'
			onClose={handleClose}
			open={snackState.open}
			autoHideDuration={2000}
			message={snackState.body}
			TransitionComponent={Slide}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
		/>
	)
}

export default GlobalSnack
