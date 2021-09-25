// REACT
import React from 'react'

// THEME
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

const ThemeProvider: React.FC = (props) => {
	return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}

// EXPORT
export default ThemeProvider
