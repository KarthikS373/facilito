import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
		fontFamily: 'Orkney',
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				rounded: {
					borderRadius: '10px',
					backgroundColor: 'rgb(246,246,246)',
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				outlined: {
					borderRadius: '10px',
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: '10px',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '10px',
					fontSize: '1rem',
					padding: '10px 0',
				},
				outlined: {
					borderColor: 'rgba(0,0,0,.05)',
					color: '#828282',
					fontSize: '1rem',
					backgroundColor: '#FBFBFB',
					padding: '10px 15px',

					'&:hover': {
						borderColor: 'rgba(0,0,0,.2)',
						backgroundColor: '#FBFBFB',
					},
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					backgroundColor: 'transparent',
					border: 'none',
					borderRadius: '100%',

					'& .MuiSvgIcon-root': {
						opacity: 1,
					},
				},
			},
		},
		MuiSwitch: {
			styleOverrides: {
				root: {
					'& .MuiIconButton-root': {
						backgroundColor: 'transparent',
						border: 'none',
						opacity: 1,
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				sizeSmall: {
					backgroundColor: 'transparent',
					border: 'none',
					borderRadius: '100%',
					height: 'auto',
					width: 'auto',

					'& .MuiSvgIcon-root': {
						opacity: 1,
					},
				},
				root: {
					fontSize: '1rem',
					color: '#828282',
					backgroundColor: 'rgb(246,246,246)',
					borderRadius: 10,
					height: '49px',
					width: '49px',
					transition: 'border-color 0.16s linear',
					border: '1px solid rgba(0,0,0,.05)',

					'& .MuiSvgIcon-root': {
						opacity: 0.6,
					},

					'&:hover': {
						borderColor: 'rgba(0,0,0,.2)',
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
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderRadius: 10,
						},
					},
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
					zIndex: 10,
				},
			},
		},
		MuiToolbar: {
			styleOverrides: {
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
