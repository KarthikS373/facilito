// REACT
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

// ROUTER
import { NextRouter } from 'next/router'

// ICONOS
import FormatColorTextTwoTone from '@material-ui/icons/FormatColorTextTwoTone'

// UTILS
import { addBusinessFormURL } from 'utils/business'
import { normalizeString } from 'utils/tools'
import saveFormSchema from 'utils/forms'

// RUTAS
import ROUTES from 'router/routes'

/**
 * Mostrar prompt de nuevo formulario
 * @description Crea una alerta con un input para crear un nuevo formulario
 * @param  {(TemplateStringsArray)=>string} $
 * @param  {Business | null} business
 * @param  {NextRouter} router
 * @param  {(title:string) => Promise<void>} callback
 */
const showNewFormPrompt = (
	$: (TemplateStringsArray) => string,
	business: Business | null,
	router: NextRouter,
	customForm?: Form,
	user?: User | null
) => {
	// GUARDAR
	let title: string = ''
	const changeTitleName = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = ev.target
		title = value
	}

	// ALERTA
	window.Alert({
		title: $`Crear formulario`,
		body: $`Para crear un nuevo formulario escribe el titulo (este tambien se mostrara como la URL pública).`,
		type: 'confirm',
		onConfirm: () => {
			if (business && business.id) {
				// GUARDAR NOMBRE
				const parsedTitle: string = normalizeString(title)
				addBusinessFormURL(parsedTitle, business.id).then(async () => {
					window.hideAlert()
					if (customForm && user)
						await saveFormSchema(business.id, {
							...customForm,
							title,
							url: parsedTitle,
							company: {
								user: user.email,
								url: business.url,
							},
						})

					// ROUTER
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
							<FormatColorTextTwoTone />
						</InputAdornment>
					),
				}}
			/>
		),
	})
}

export default showNewFormPrompt
