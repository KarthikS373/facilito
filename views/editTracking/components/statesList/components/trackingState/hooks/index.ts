import { makeStyles } from '@mui/styles'

/**
 * Hook de estilos
 * @description Estilos dinamicos
 */
const useStyles = makeStyles({
	root: {
		'& label.Mui-focused': {
			color: 'var(--currentColor)',
		},
		'& .MuiOutlinedInput-root': {
			'&.Mui-focused fieldset': {
				borderColor: 'var(--currentColor)',
			},
		},
	},
})

export default useStyles
