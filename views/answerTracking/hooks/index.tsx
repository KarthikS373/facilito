import { useEffect } from 'react'

import { Unsubscribe } from '@firebase/firestore'

// UTILSS
import { formAnswerListener } from 'utils/answers'
import { dateToString } from 'utils/tools'

/**
 * Actualizacion en tiempo real de respuesta
 * @param setFormAnswer
 * @param index
 * @param companyID
 * @param formID
 */
const useAnswer = (
	setFormAnswer: SetState<FormAnswerTracking | undefined>,
	index: number,
	companyID?: string,
	formID?: string
): void => {
	useEffect(() => {
		let listener: Unsubscribe | undefined
		if (companyID?.length && formID?.length && index >= 0)
			formAnswerListener(companyID, formID, (answer: FormAnswer) =>
				setFormAnswer({
					data: answer.data[index],
					date: dateToString(answer.dates[index]),
					state: answer.states[index],
				})
			).then((listen) => (listener = listen))

		// CERRAR
		return () => {
			if (listener) listener()
		}
	}, [setFormAnswer, index, companyID, formID])
}

export default useAnswer
