/* eslint-disable @typescript-eslint/ban-ts-comment */
// PICKERS
import { TimePickerProps } from '@mui/lab/TimePicker'

export interface PickerProps
	extends Omit<
		TimePickerProps<unknown> & React.RefAttributes<HTMLDivElement>,
		'value' | 'onChange' | 'renderInput'
	> {
	[index: string]: unknown
	onDates?: (dates: (Date | null)[]) => unknown
	def?: (Date | null)[]
	range?: boolean
}

/**
 * Custom props
 * @description Obtener propiedades para time picker
 * @param props
 * @returns
 */
const getPickerProps = (props: PickerProps): PickerProps => {
	// COPIAR
	const merged = {
		...props,
		onDates: undefined,
		def: undefined,
		range: undefined,
	}

	// BORRAR
	// @ts-ignore
	Object.keys(merged).forEach((key) => merged[key] === undefined && delete merged[key])
	return merged
}

export default getPickerProps
