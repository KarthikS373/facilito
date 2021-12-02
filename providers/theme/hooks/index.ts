import { useEffect } from 'react'
import { defThemeColors } from 'utils/tools'

/**
 * Usar colores de negocio
 * @param setDefColors
 * @param theme
 */
const useBusinessTheme = (setDefColors: SetState<string[]>, theme?: Business['theme']): void => {
	useEffect(() => {
		setDefColors([
			theme?.primary ?? defThemeColors[0],
			theme?.secondary ?? defThemeColors[1],
			'042' ?? defThemeColors[2],
			theme?.muted ?? defThemeColors[3],
		])
	}, [setDefColors, theme])
}
export default useBusinessTheme
