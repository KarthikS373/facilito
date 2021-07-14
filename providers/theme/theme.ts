import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
		fontFamily: 'Orkney',
	},
	overrides: {
		MuiButton: {
			root: {
				borderRadius: '10px',
				fontSize: '1.2em',
				padding: '10px 0',
			},
		},
		MuiTextField: {
			root: {
				'& .MuiOutlinedInput-root': {
					'& fieldset': {
						borderRadius: 10,
					},
				},
			},
		},
	},
	palette: {
		secondary: {
			main: '#511F73',
		},
		primary: {
			main: '#1AA5BB',
		},
	},
})
