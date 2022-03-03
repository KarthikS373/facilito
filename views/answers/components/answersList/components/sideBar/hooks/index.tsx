import { useEffect } from 'react'

const useDefaultStep = (stateIndex: number, setActiveStep: SetState<number>): void => {
	useEffect(() => {
		setActiveStep(stateIndex)
	}, [stateIndex, setActiveStep])
}

export default useDefaultStep
