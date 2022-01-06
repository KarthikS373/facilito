import { SelectChangeEvent } from '@mui/material/Select'
import { parseDate } from 'utils/tools'

/**
 * Obtener dias
 * @description Obtener dias de la semana
 * @param $
 * @returns
 */
const getDaysStr = ($: TemplateStrBuilder): string[] => [
	$`Todos`,
	$`Domingo`,
	$`Lunes`,
	$`Martes`,
	$`Miércoles`,
	$`Jueves`,
	$`Viernes`,
	$`Sábado`,
]

/**
 * Fechas por defecto
 * @description Obtener valores de fechas por defecto
 * @param time
 * @returns
 */
export const getDefDates = (time: (Date | null)[] | undefined): (Date | null)[] | undefined =>
	time ? [time[0] ? parseDate(time[0]) : null, time[1] ? parseDate(time[1]) : null] : [null, null]

/**
 * Enviar tiempo
 * @description Enviar tiempo de fecha
 * @param index
 * @param date
 * @param setIntervals
 * @param onChange
 */
export const sendTime = (
	index: keyof BlockComponent,
	date: (Date | null)[],
	setIntervals: React.Dispatch<React.SetStateAction<number>>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	if (date[0] && date[1])
		setIntervals(Math.min(Math.abs(date[1].getHours() - date[0].getHours()), 8))
	if (onChange) onChange(index, date)
}

/**
 * Valores por defecto
 * @description Obtener valores por defecto para estado
 * @param daysOfWeek
 * @returns
 */
export const getDefValues = (daysOfWeek?: boolean[]): boolean[] =>
	daysOfWeek
		? [daysOfWeek.every((day: boolean) => day === true), ...daysOfWeek]
		: Array(8).fill(false)

/**
 * Asignar dias
 * @description Asignar valores de checkbox para dias
 * @param ev
 * @param setDays
 * @param onChange
 */
export const setAllDays = (
	ev: React.ChangeEvent<HTMLInputElement>,
	setDays: React.Dispatch<React.SetStateAction<boolean[]>>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	setDays(Array(8).fill(ev.target.checked))
	if (onChange) onChange('daysOfWeek', Array(7).fill(ev.target.checked))
}

/**
 * Duracion
 * @description Asignar duracion de fecha
 * @param ev
 * @param setDuration
 * @param onChange
 */
export const handleDuration = (
	ev: SelectChangeEvent,
	setDuration: React.Dispatch<React.SetStateAction<number>>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	const time: number = +ev.target.value as number
	if (onChange) onChange('duration', time)
	setDuration(time)
}

/**
 * Seleccionar dia
 * @description Seleccionar dia actual
 * @param index
 * @param ev
 * @param setDays
 * @param onChange
 */
export const setSelectedDay = (
	index: number,
	ev: React.ChangeEvent<HTMLInputElement>,
	setDays: React.Dispatch<React.SetStateAction<boolean[]>>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	/// COPIAR DIAS
	setDays((days: boolean[]) => {
		const daysCopy = [...days]

		// ASIGNAR
		daysCopy[index] = ev.target.checked
		daysCopy[0] = true

		// VALIDAR TODOS
		daysCopy[0] = daysCopy.every((day: boolean) => day === true)

		// ENVIAR
		if (onChange)
			onChange(
				'daysOfWeek',
				daysCopy.filter((_d, index: number) => index > 0)
			)

		// ACTUALIZAR
		return daysCopy
	})
}

export default getDaysStr
