import { useEffect, useContext } from 'react'

import { splitBackgroundColors } from 'utils/tools'
import BusinessContext from 'context/business'

/**
 * Cargar colores por defecto
 * @returns
 */
const usePaletteColors = (
	setColors: React.Dispatch<React.SetStateAction<string[]>>,
	defBackground?: string
): void => {
	const businessCtx = useContext(BusinessContext)

	// COLORES
	useEffect(() => {
		splitBackgroundColors(
			defBackground ??
				(businessCtx.business?.backgroundImage?.length
					? businessCtx.business?.backgroundImage
					: businessCtx.business?.background ?? ''),
			setColors
		)
	}, [
		defBackground,
		businessCtx.business?.backgroundImage,
		businessCtx.business?.background,
		setColors,
	])
}

export default usePaletteColors
