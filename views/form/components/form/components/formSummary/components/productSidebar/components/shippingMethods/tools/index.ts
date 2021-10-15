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
	const shippingMethodValue: string = ev.target.value as string

	// GUARDAR
	setFieldValue('shippingMethod', shippingMethodValue)
	setSummaryData((prevSummaryData: FormSummaryData) => ({
		...prevSummaryData,
		shippingMethodValue,
	}))
}

export default handleMethods
