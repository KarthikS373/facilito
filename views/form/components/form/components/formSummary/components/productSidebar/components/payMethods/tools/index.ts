import type { SelectChangeEvent } from '@mui/material/Select'

/**
 * Enviar datos
 * @description Enviar datos
 * @param ev
 * @param setSummaryData
 * @param setFieldValue
 */
const handleMethods = (
	ev: SelectChangeEvent,
	setSummaryData: React.Dispatch<React.SetStateAction<FormSummaryData>>,
	setFieldValue: (name: string, value: string | null) => unknown
): void => {
	// VALOR
	const payMethodValue: string = ev.target.value as string

	// GUARDAR
	setFieldValue('payMethod', payMethodValue)
	setSummaryData((prevSummaryData: FormSummaryData) => ({
		...prevSummaryData,
		payMethodValue,
	}))
}

export default handleMethods
