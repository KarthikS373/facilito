import React from 'react'

// REACT
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ROUTER
import type { NextRouter } from 'next/router'

// ICONOS
import FormatColorTextTwoTone from '@mui/icons-material/FormatColorTextTwoTone'

// UTILS
import { formComponentsList, initialFormData } from 'views/editForm/utils/initials'
import { addBusinessFormURL } from 'utils/business'
import { getQRCode, normalizeString } from 'utils/tools'
import { Theme } from '@mui/material/styles'
import saveFormSchema from 'utils/forms'

// RUTAS
import ROUTES from 'router/routes'
import { saveUrl } from 'utils/urls'

const showNewFormPrompt = (
	$: TemplateStrBuilder,
	business: Business | null,
	router: NextRouter,
	customForm?: Form,
	user?: User | null,
	theme?: Theme
): void => {
	// GUARDAR
	let title = ''
	const changeTitleName = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = ev.target
		title = value
	}

	// ALERTA
	window.Alert({
		title: 'Crear tienda',
		body: 'Para crear una nueva tienda escribe el titulo (este tambien se mostrara como la URL pública).',
		type: 'confirm',
		onConfirm: () => {
			if (business && business.id) {
				// GUARDAR NOMBRE
				const parsedTitle: string = normalizeString(title)
				window.Snack('Creando...')
				addBusinessFormURL(parsedTitle, business.id).then(async () => {
					window.hideAlert()
					if (user) {
						// CREAR
						const qr = await getQRCode(
							`${window.location.origin}/f/${business?.url}/${business.url}_${parsedTitle}`
						)

						// GUARDAR FORMULARIO
						await saveFormSchema(business.id, {
							...(customForm ?? initialFormData),
							title,
							id: parsedTitle,
							background: `transparent linear-gradient(042deg, ${theme?.palette.primary.main} 0%, ${theme?.palette.secondary.main} 100%) 0% 0% no-repeat padding-box`,
							components: [{ ...formComponentsList[formComponentsList.length - 1] }],
							url: `${business.url}_${parsedTitle}`,
							qr,
							company: {
								user: user.email,
								url: business.url,
							},
						})

						// GHUARDAR URL
						await saveUrl(false, `${business.url}_${parsedTitle}`, {
							target: `${window.location.origin}/f/${business?.url}/${business.url}_${parsedTitle}`,
							info: {
								companyID: business.id,
								formID: parsedTitle,
							},
						})
					}

					// ROUTER
					window.Snack('Tienda creada')
					await router.push(ROUTES.newForm.replace(':formID', parsedTitle))
				})
			}
		},
		customElements: (
			<TextField
				fullWidth
				label={$`Titulo`}
				variant='outlined'
				onChange={changeTitleName}
				placeholder={$`Mi tienda`}
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
