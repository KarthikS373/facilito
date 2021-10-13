// TIPOS
import type { DateRange } from '@mui/lab/DateRangePicker'

/**
 * Cambiar fechas
 * @description Evento onchange de los pickers
 * @param date
 * @param reservations
 * @param setCurrentDate
 */
export const onChangePicker = (
	date: Date | null,
	reservations: number | undefined,
	setCurrentDate: React.Dispatch<React.SetStateAction<(Date | null)[]>>
): void => {
	if (reservations) {
		if (date) setCurrentDate([date])
	} else
		window.Alert({
			title: 'Ocurrió un error',
			body: 'Ya no hay ocupaciones disponibles en este horario, intenta de nuevo mas tarde.',
			type: 'error',
			zIndex: 1301,
		})
}

/**
 * Cambiar intervalos
 * @description Evento onchange en date range
 * @param dates
 * @param reservations
 * @param setCurrentDate
 */
export const onChangeInterval = (
	dates: DateRange<Date | null>,
	reservations: number | undefined,
	setCurrentDate: React.Dispatch<React.SetStateAction<(Date | null)[]>>
): void => {
	if (reservations) {
		if (dates.every((date: Date | null) => date !== null && date !== undefined))
			setCurrentDate(dates)
	} else
		window.Alert({
			title: 'Ocurrió un error',
			body: 'Ya no hay ocupaciones disponibles en este horario, intenta de nuevo mas tarde.',
			type: 'error',
			zIndex: 1301,
		})
}

/**
 * Des habilitar dias
 * @description Funcion para des habilitar dias en un picker
 * @param day
 * @param daysOfWeek
 * @returns
 */
export const disableDates = (day: Date | null, daysOfWeek: boolean[] | undefined): boolean => {
	if (day && daysOfWeek) return !daysOfWeek[day.getDay()]
	else return true
}
