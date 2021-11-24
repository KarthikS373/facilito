// REACT
import React, { useState } from 'react'

// THEME
import { ThemeProvider } from '@mui/material/styles'

// TOOLS
import { defThemeColors, generateTheme } from 'utils/tools'
import usePaletteColors from 'hooks/theme'

const MuiThemeProvider: React.FC = (props) => {
	// ACTUALIZAR
	const [defColors, setDefColors] = useState<string[]>(defThemeColors)
	usePaletteColors(setDefColors)

	return <ThemeProvider theme={generateTheme(defColors)}>{props.children}</ThemeProvider>
}

// EXPORT
export default MuiThemeProvider
