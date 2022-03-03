import type { SelectChangeEvent } from '@mui/material/Select'

/**
 * Enviar datos
 * @param  {SelectChangeEvent} ev
 * @param  {SetState<FormSummaryData>} setSummaryData
 * @param  {(name:string,value:string|null)=>unknown} setFieldValue
 */
const handleMethods = (
	ev: SelectChangeEvent,
	setSummaryData: SetState<FormSummaryData>,
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
