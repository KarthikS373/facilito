// REACT
import React from 'react'

// THEME
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

const MuiThemeProvider: React.FC = (props) => {
	return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

// EXPORT
export default MuiThemeProvider
