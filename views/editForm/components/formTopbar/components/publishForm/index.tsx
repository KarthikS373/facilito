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
 * @description Publicar formulario y mostrar link
 * @param $
 * @param props
 * @param published
 * @param company
 */
const publishFormEvent = (
	$: TemplateStrBuilder,
	props: FormTopbarProps,
	published: boolean,
	company: Business | null
): void => {
	// GUARDAR
	props.onSave(false)

	// PUBLICAR
	if (company?.id) {
		if (!published) {
			const publishMethod = (answersConnection?: ConnectionMethods) => {
				// ALERT
				window.Alert({
					title: 'Espera un momento',
					body: 'Se esta publicando tu formulario, esto no suele tardar mucho, no te salgas de la aplicación por favor.',
					type: 'window',
					customElements: <PublicLoading />,
					fixed: true,
				})

				// PUBLICAR
				props.onAnswersConnection(answersConnection)
				publishForm(company?.id, props.id).then(() =>
					window.Alert({
						title: 'Formulario publicado',
						body: 'Ahora tu formulario sera visible para todos, puedes compartirles el siguiente link:',
						type: 'confirm',
						confirmText: $`Ver ahora`,
						onHide: () => props.onPublish(true),
						onConfirm: () =>
							window.open(`${window.location.origin}/f/${company?.url}/${props.url}`),
						customElements: <PublicLink url={props.url} />,
					})
				)
			}

			// VERIFICAR MÉTODOS DE ENVIÓ
			if (
				props.answersConnection?.whatsapp.toString().length === 0 ||
				props.answersConnection?.email.length === 0
			)
				showSettingsMenu(props)
			else publishMethod()
		}

		// MENSAJE DE ALERTA
		else {
			window.Alert({
				title: 'Anular publicación',
				body: 'Si anulas la publicación este formulario solo sera visible para tu empresa y no podrás recibir respuestas hasta que lo vuelvas a publicar.',
				type: 'confirm',
				onConfirm: () => {
					props.onPublish(false)
					unPublishForm(company?.id, props.id)
				},
			})
		}
	}
}

export default publishFormEvent
