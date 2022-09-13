// REACT
import React from 'react'

// TYPES
import { FormTopbarProps } from '../settingsMenu/tools'

// COMPONENTES
import PublicLoading from './components/loading'
import PublicLink from './components/link'

// UTILS
import { publishForm, unPublishForm } from 'utils/forms'
import showSettingsMenu from '../settingsMenu'

/**
 * Publicar
 * @description Publicar tienda y mostrar link
 * @param $
 * @param props
 * @param published
 * @param company
 */
const publishFormEvent = (
	$: TemplateStrBuilder,
	props: FormTopbarProps,
	company: Business | null
): void => {
	// GUARDAR
	props.onSave(false)

	// PUBLICAR
	if (company?.id) {
		if (!props.formData.current.public) {
			const publishMethod = () => {
				// ALERT
				window.Alert({
					title: 'Espera un momento',
					body: 'Se esta publicando tu tienda, esto no suele tardar mucho, no te salgas de la aplicación por favor.',
					type: 'window',
					customElements: <PublicLoading />,
					fixed: true,
				})

				// PUBLICAR
				publishForm(company?.id, props.formData.current.id).then(() =>
					window.Alert({
						title: 'Tienda publicada',
						body: 'Ahora tu tienda sera visible para todos, puedes compartirles el siguiente link:',
						type: 'confirm',
						confirmText: $`Ver ahora`,
						onHide: () => props.onPublish(true),
						onConfirm: () =>
							window.open(
								`${window.location.origin}/f/${company?.url}/${props.formData.current.url}`
							),
						customElements: <PublicLink url={props.formData.current.url} />,
					})
				)
			}

			// VERIFICAR MÉTODOS DE ENVIÓ
			if (
				(props?.formData?.current?.answersConnection?.whatsapp.toString().length ?? 0) === 0 &&
				(props?.formData?.current?.answersConnection?.email.length ?? 0) === 0
			) {
				window.Alert({
					title: '¡Oops olvidaste algo!',
					body: 'Para poder publicar tu tienda debes configurar al menos tu correo electrónico para el envió de respuestas.',
					type: 'confirm',
					hasNextAlert: true,
					onConfirm: () => showSettingsMenu(props),
				})
			} else publishMethod()
		}

		// MENSAJE DE ALERTA
		else {
			window.Alert({
				title: 'Anular publicación',
				body: 'Si anulas la publicación esta tienda solo sera visible para tu empresa y no podrás recibir respuestas hasta que lo vuelvas a publicar.',
				type: 'confirm',
				onConfirm: () => {
					props.onPublish(false)
					unPublishForm(company?.id, props.formData.current.id)
				},
			})
		}
	}
}

export default publishFormEvent
