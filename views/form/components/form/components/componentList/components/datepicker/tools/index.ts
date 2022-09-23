// TIPOS
import { DateRange } from '@mui/x-date-pickers-pro/DateRangePicker'

/**
 * Cambiar fechas
 * @param  {Date|null} date
 * @param  {number|undefined} reservations
 * @param  {SetState<(Date|null} setCurrentDate
 */
export const onChangePicker = (
	date: Date | null,
	reservations: number | undefined,
	setCurrentDate: SetState<(Date | null)[]>
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
 * @param  {DateRange<Date|null>} dates
 * @param  {number|undefined} reservations
 * @param  {SetState<(Date|null} setCurrentDate
 */
export const onChangeInterval = (
	dates: DateRange<Date | null>,
	reservations: number | undefined,
	setCurrentDate: SetState<(Date | null)[]>
): void => {
	if (reservations) {
		if (dates.every((date: Date | null) => date !== null && date !== undefined)) {
			setCurrentDate(dates)
		}
	} else
		window.Alert({
			title: 'Ocurrió un error',
			body: 'Ya no hay ocupaciones disponibles en este horario, intenta de nuevo mas tarde.',
			type: 'error',
			zIndex: 1301,
		})
}

/**
 * Deshabilitar fechas
 * @param  {Date|null} day
 * @param  {boolean[]|undefined} daysOfWeek
 * @returns {boolean}
 */
export const disableDates = (day: Date | null, daysOfWeek: boolean[] | undefined): boolean => {
	if (day && daysOfWeek) return !daysOfWeek[day.getDay()]
	else return true
}

export const hideLicense = (): void => {
	setTimeout(() => {
		const xpath = "//div[text()='MUI X: Missing license key']"
		const matchingElement = document.evaluate(
			xpath,
			document,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null
		).singleNodeValue as HTMLDivElement
		matchingElement.style.display = 'none'
	}, 10)
}
