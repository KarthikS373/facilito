import { useEffect } from 'react'

/**
 * Actualizar estado con estado de respuesta
 * @param stateIndex
 * @param setActiveStep
 */
const useDefaultStep = (stateIndex: number, setActiveStep: SetState<number>): void => {
	useEffect(() => {
		setActiveStep(stateIndex)
	}, [stateIndex, setActiveStep])
}

export default useDefaultStep
