/* eslint-disable @typescript-eslint/ban-ts-comment */
// PICKERS
import { TimePickerProps } from '@mui/lab/TimePicker'

/**
 * Esta clase describe las propiedades del selector.
 *
 * @class      PickerProps (name)
 */
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
 * Obtiene las propiedades del selector.
 *
 * @param      {PickerProps}  props
 * @return     {PickerProps}  Las propiedades del selector.
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

/**
 * Envía una cita.
 *
 * @param      {number}                                                 index
 * @param      {(Date|null)}                                            date
 * @param      {((Date|null)[])}                                        selectedDate
 * @param      {(SetState<(Date|null)[]>)}  handleDateChange
 * @param      {(dates:(Date|null)[])=>unknown | undefined}             onDates?
 */
export const sendDate = (
	index: number,
	date: Date | null,
	selectedDate: (Date | null)[],
	handleDateChange: SetState<(Date | null)[]>,
	onDates?: (dates: (Date | null)[]) => unknown
): void => {
	// COPIAR
	const dates = [...selectedDate] as (Date | null)[]

	// ASIGNAR
	dates[index] = date
	if (
		index === 1 &&
		dates[1]?.getTime() &&
		dates[0]?.getTime() &&
		dates[1]?.getTime() - dates[0]?.getTime() < 0
	)
		dates[0] = dates[1]
	else if (
		index === 0 &&
		dates[1]?.getTime() &&
		dates[0]?.getTime() &&
		dates[1]?.getTime() - dates[0]?.getTime() < 0
	)
		dates[1] = dates[0]

	// ACTUALIZAR
	if (onDates) onDates(dates)
	handleDateChange(dates)
}

export default getPickerProps
