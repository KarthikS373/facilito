import { useEffect } from 'react'

/**
 * Hook de top de label
 * @param  {React.RefObject<HTMLDivElement>} fieldRef
 */
const useLabelTop = (fieldRef: React.RefObject<HTMLDivElement>): void => {
	useEffect(() => {
		// LABEL
		const label = fieldRef.current?.children[0] as HTMLLabelElement
		const height = 0

		// AJUSTAR LABEL
		if (height > 1 && fieldRef.current)
			fieldRef.current.style.marginTop = (height * 1.3 - 1) * 8 + 'px'
		label.style.top = `-${height}px`
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}

export default useLabelTop
