// REACT
import React, { useState, useContext } from 'react'

// THEME
import { ThemeProvider } from '@mui/material/styles'

// TOOLS
import { defThemeColors, generateTheme } from 'utils/tools'
import usePaletteColors from 'hooks/theme'
import useBusinessTheme from './hooks'

// CONTEXT
import BusinessContext from 'context/business'

const MuiThemeProvider: React.FC = (props) => {
	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// ACTUALIZAR
	const [defColors, setDefColors] = useState<string[]>([...defThemeColors])
	usePaletteColors(setDefColors)

	// HOOKS
	useBusinessTheme(setDefColors, businessCtx.business?.theme)

	return <ThemeProvider theme={generateTheme(defColors)}>{props.children}</ThemeProvider>
}

// EXPORT
export default MuiThemeProvider
