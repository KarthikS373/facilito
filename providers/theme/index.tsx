// REACT
import React from 'react'

// THEME
import MaterialThemeProvider from '@material-ui/styles/ThemeProvider'
import { theme } from './theme'

const ThemeProvider: React.FC = (props) => {
	return <MaterialThemeProvider theme={theme}>{props.children}</MaterialThemeProvider>
}

// EXPORT
export default ThemeProvider
