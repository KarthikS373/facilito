import { useEffect, useContext } from 'react'

import { splitBackgroundColors } from 'utils/tools'
import BusinessContext from 'context/business'

/**
 * Cargar colores por defecto
 * @param  {SetState<string[]>} setColors
 * @param  {string} defBackground?
 * @returns void
 */
const usePaletteColors = (setColors: SetState<string[]>, defBackground?: string): void => {
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
