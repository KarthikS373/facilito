/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { HttpsCallableResult } from '@firebase/functions'
import { createTheme, Theme } from '@mui/material/styles'

/**
 * Remover tildes
 * @description Retornar un string sin tildes
 * @param  {string} str
 */
const slugify = (str: string) => {
	const map: { [key: string]: string } = {
		'-': '_',
		a: 'á|à|ã|â|ä|À|Á|Ã|Â|Ä',
		e: 'é|è|ê|ë|É|È|Ê|Ë',
		i: 'í|ì|î|ï|Í|Ì|Î|Ï',
		o: 'ó|ò|ô|õ|ö|Ó|Ò|Ô|Õ|Ö',
		u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
		c: 'ç|Ç',
		n: 'ñ|Ñ',
	}

	for (const pattern in map) str = str.replace(new RegExp(map[pattern], 'g'), pattern)
	return str
}
/**
 * Normalizar string
 * @description Convierte un string en su cadena mas optima
 * @param  {string} str
 */
export const normalizeString = (str: string): string => {
	return slugify(str)
		.trim()
		.replace(/[^\w\s]/gi, '')
		.replace(/ /g, '_')
		.toLowerCase()
}

/**
 * Parser de date
 * @description Convierte un objeto TimeStamp o Date en Date
 * @param  {unknown} date
 */
export const parseDate = (date: unknown): Date | null => {
	if (date && typeof date === 'object') {
		// @ts-ignore
		if ('_nanoseconds' in date && '_seconds' in date) {
			// @ts-ignore
			if ('toDate' in date) return date.toDate()
			// @ts-ignore
			else return new Date(date._seconds * 1000)
		} else return date as Date
	} else return null
}

/**
 * Fecha a string
 * @description Convierte una fecha a un string Fecha, Hora
 * @param  {Date} date
 */
export const dateToString = (date: Date): string => {
	const currentDate = parseDate(date)
	if (currentDate)
		return `${currentDate.toLocaleDateString('en-GB')}, ${currentDate.toLocaleTimeString('en-US')}`
	else return ''
}

/**
 * Fecha a string de hora
 * @description Convierte una fecha a un string hora
 * @param  {Date} date
 */
export const hourToString = (date: Date | null | string | number): string => {
	if (date && typeof date !== 'string' && typeof date !== 'number') {
		return (
			parseDate(date)?.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
			}) || ''
		)
	} else return ''
}

/**
 * Enviar correo
 * @description Llama a la api sendEmail
 * @param  {string} html
 * @param  {string} subject
 * @param  {string | string[]} email
 */
export const sendMail = async (
	html: string,
	subject: string,
	email?: string | string[]
): Promise<HttpsCallableResult<unknown>> => {
	const { default: getCallable } = await import('./functions')

	// QUERY STRING
	const sendEmail = await getCallable('sendEmail')

	// ENVIAR CORREO
	return await sendEmail({
		email,
		subject,
		content: html,
	})
}

/**
 * Imprimir html
 * @description Imprime una ventana con text/html
 * @param  {string} html
 */
export const printHTML = (html: string): void => {
	// VENTANA
	const customWindow = window.open('', 'PRINT')

	// ESCRIBIR
	customWindow?.document.write(html)

	// CERRAR
	customWindow?.document.close()
	customWindow?.focus()

	// IMPRIMIR
	customWindow?.print()
	customWindow?.close()
}

/**
 * Cambiar filtros
 * @description Cambia en localStorage el filtro
 * @param  {string} key
 * @param  {string} filter
 * @param  {React.Dispatch<React.SetStateAction<string>>} setFilter
 */
export const changeFilter = (
	key: string,
	filter: string,
	setFilter: React.Dispatch<React.SetStateAction<string>>
): void => {
	window.localStorage.setItem(key, filter)
	setFilter(filter)
}

/**
 * Obtener imagen de input
 * @description Retorna una imagen como DataURL de un input
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {(data:string | ArrayBuffer | null) => void} imageCallback
 */
export const getDataURL = (
	ev: React.ChangeEvent<HTMLInputElement>,
	imageCallback: (data: string | ArrayBuffer | null) => void
): void => {
	const tgt = ev.target || window.event?.srcElement
	const files = tgt.files

	// FileReader support
	if (FileReader && files && files.length) {
		const fr = new FileReader()
		fr.onload = () => imageCallback(fr.result)
		fr.readAsDataURL(files[0])
	}
}

/**
 * Separar fondo
 * @description Retorna una lista de colores si es un fondo degradado
 * @param background
 */
export const splitBackgroundColors: (background: string) => [string, string, string] = (
	background: string
) => {
	if ((background || '').startsWith('transparent linear-gradient')) {
		const firstColor: string = background.slice(36, 43)
		const secondColor: string = background.slice(48, 55)
		const degrees: string = background.slice(28, 31)
		return [firstColor, secondColor, degrees]
	} else return ['#346898', '#511F73', '042']
}

/**
 * Generar tema
 * @description Generar un tema de mui
 * @param defColors
 * @returns
 */
export const generateTheme = (defColors: string[]): Theme =>
	createTheme({
		typography: {
			button: {
				textTransform: 'none',
			},
			fontFamily: 'Orkney',
		},
		components: {
			MuiPaper: {
				styleOverrides: {
					rounded: {
						borderRadius: '10px',
						backgroundColor: 'rgb(246,246,246)',
					},
				},
			},
			MuiSelect: {
				styleOverrides: {
					outlined: {
						borderRadius: '10px',
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						borderRadius: '10px',
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: '10px',
						fontSize: '1rem',
						padding: '10px 0',
					},
					outlined: {
						borderColor: 'rgba(0,0,0,.05)',
						color: '#828282',
						fontSize: '1rem',
						backgroundColor: '#FBFBFB',
						padding: '10px 15px',

						'&:hover': {
							borderColor: 'rgba(0,0,0,.2)',
							backgroundColor: '#FBFBFB',
						},
					},
				},
			},
			MuiCheckbox: {
				styleOverrides: {
					root: {
						backgroundColor: 'transparent',
						border: 'none',
						borderRadius: '100%',

						'& .MuiSvgIcon-root': {
							opacity: 1,
						},
					},
				},
			},
			MuiSwitch: {
				styleOverrides: {
					root: {
						'& .MuiIconButton-root': {
							backgroundColor: 'transparent',
							border: 'none',
							opacity: 1,
						},
					},
				},
			},
			MuiIconButton: {
				styleOverrides: {
					sizeSmall: {
						backgroundColor: 'transparent',
						border: 'none',
						borderRadius: '100%',
						height: 'auto',
						width: 'auto',

						'& .MuiSvgIcon-root': {
							opacity: 1,
						},
					},
					root: {
						fontSize: '1rem',
						color: '#828282',
						backgroundColor: 'rgb(246,246,246)',
						borderRadius: 10,
						height: '49px',
						width: '49px',
						transition: 'border-color 0.16s linear',
						border: '1px solid rgba(0,0,0,.05)',

						'& .MuiSvgIcon-root': {
							opacity: 0.6,
						},

						'&:hover': {
							borderColor: 'rgba(0,0,0,.2)',
						},

						'& .MuiBadge-badge': {
							top: '-10px',
							right: '-10px',
							fontSize: '10px',
							fontWeight: 'bold',
							height: 25,
							minWidth: 25,
							borderRadius: '100%',
						},
					},
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderRadius: 10,
							},
						},
					},
				},
			},
			MuiAppBar: {
				styleOverrides: {
					root: {
						boxShadow: 'none',
						zIndex: 10,
					},
				},
			},
			MuiToolbar: {
				styleOverrides: {
					root: {
						minHeight: 'unset',
					},
					regular: {
						minHeight: 'unset',
					},
					gutters: {
						paddingLeft: 0,
						paddingRight: 0,
					},
				},
			},
		},
		palette: {
			secondary: {
				main: defColors[1],
			},
			primary: {
				main: defColors[0],
				light: defColors[0],
				dark: defColors[0],
			},
		},
	})
