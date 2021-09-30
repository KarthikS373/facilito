import React from 'react'

// REACT
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ROUTER
import type { NextRouter } from 'next/router'

// ICONOS
import FormatColorTextTwoTone from '@mui/icons-material/FormatColorTextTwoTone'

// UTILS
import { addBusinessFormURL } from 'utils/business'
import { normalizeString } from 'utils/tools'
import saveFormSchema from 'utils/forms'

// RUTAS
import ROUTES from 'router/routes'

/**
 * Mostrar prompt de nuevo formulario
 * @description Crea una alerta con un input para crear un nuevo formulario
 * @param  {TemplateStrBuilder} $
 * @param  {Business | null} business
 * @param  {NextRouter} router
 * @param  {(title:string) => Promise<void>} callback
 */
const showNewFormPrompt = (
	$: TemplateStrBuilder,
	business: Business | null,
	router: NextRouter,
	customForm?: Form,
	user?: User | null
): void => {
	// GUARDAR
	let title = ''
	const changeTitleName = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = ev.target
		title = value
	}

	// ALERTA
	window.Alert({
		title: 'Crear formulario',
		body: 'Para crear un nuevo formulario escribe el titulo (este tambien se mostrara como la URL pública).',
		type: 'confirm',
		onConfirm: () => {
			if (business && business.id) {
				// GUARDAR NOMBRE
				const parsedTitle: string = normalizeString(title)
				window.Snack('Creando...')
				addBusinessFormURL(parsedTitle, business.id).then(async () => {
					window.hideAlert()
					if (customForm && user)
						await saveFormSchema(business.id, {
							...customForm,
							title,
							url: `${business.url}_${parsedTitle}`,
							company: {
								user: user.email,
								url: business.url,
							},
						})

					// ROUTER
					window.Snack('Formulario creado')
					router.push(`${ROUTES.newForm}?title=${title}`.replace(':formID', parsedTitle))
				})
			}
		},
		customElements: (
			<TextField
				fullWidth
				label={$`Titulo`}
				variant='outlined'
				onChange={changeTitleName}
				placeholder={$`Mi formulario`}
				style={{
					marginTop: '15px',
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<FormatColorTextTwoTone color='primary' />
						</InputAdornment>
					),
				}}
			/>
		),
	})
}

export default showNewFormPrompt
