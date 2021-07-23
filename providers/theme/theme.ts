import { createTheme } from '@material-ui/core/styles'

export const theme = createTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
		fontFamily: 'Orkney',
	},
	overrides: {
		MuiPaper: {
			rounded: {
				borderRadius: '10px',
				backgroundColor: 'rgb(246,246,246)',
			},
		},
		MuiButton: {
			root: {
				borderRadius: '10px',
				fontSize: '1rem',
				padding: '10px 0',
			},
			outlined: {
				borderColor: 'rgba(0,0,0,.1)',
				color: '#828282',
				fontSize: '1rem',
				backgroundColor: '#FBFBFB',
				padding: '10px 15px',
			},
		},
		MuiCheckbox: {
			root: {
				backgroundColor: 'transparent',
				border: 'none',
				borderRadius: '100%',

				'& .MuiSvgIcon-root': {
					opacity: 1,
				},
			},
		},
		MuiSwitch: {
			root: {
				'& .MuiIconButton-root': {
					backgroundColor: 'transparent',
					border: 'none',
					opacity: 1,
				},
			},
		},
		MuiIconButton: {
			sizeSmall: {
				backgroundColor: 'transparent',
				border: 'none',
				borderRadius: '100%',

				'& .MuiSvgIcon-root': {
					opacity: 1,
				},
			},
			root: {
				fontSize: '1rem',
				color: '#828282',
				backgroundColor: 'rgb(246,246,246)',
				borderRadius: 10,

				'&:active': {
					backgroundColor: 'rgb(246,246,246)',
				},

				'&:hover': {
					backgroundColor: 'rgb(246,246,246)',
				},

				'& .MuiSvgIcon-root': {
					opacity: 0.6,
				},

				'& .MuiBadge-badge': {
					top: '-10px',
					right: '-10px',
					fontSize: '10px',
					fontWeight: 'bold',
					height: 25,
					minWidth: 25,
					borderRadius: '100%',
				},
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
		MuiAppBar: {
			root: {
				boxShadow: 'none',
				zIndex: 10,
			},
		},
		MuiToolbar: {
			root: {
				minHeight: 'unset',
			},
			regular: {
				minHeight: 'unset',
			},
			gutters: {
				paddingLeft: 0,
				paddingRight: 0,
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
