// REACT
import React, { useState, useContext } from 'react'

// MATERIAL
import Button from '@material-ui/core/Button'

// ROUTER
import { useRouter } from 'next/router'

// HOC
import withStrings from 'hoc/lang'

// COMPONENTES
import showTemplateCard from './components/card'
import showNewFormPrompt from '../../../prompt'
import templateIcons from './utils/icons'

// ESTILOS
import Styles from './style.module.scss'

// UTILS
import useTemplateForms from './utils/hooks'

// CONTEXTO
import BusinessContext from 'context/business'
import UserContext from 'context/user'

const NewForm: React.FC = withStrings(({ $ }) => {
	// ROUTER
	const router = useRouter()

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// USER
	const userCtx = useContext(UserContext)

	// MOSTRAR ALERTA
	const showPrompt = (customForm?: Form) =>
		showNewFormPrompt($, businessCtx.business, router, customForm, userCtx.user)

	// LISTA DE TEMPLATES
	const [templates, setTemplates] = useState<Form[]>([])

	// LEER TEMPLATES
	useTemplateForms(setTemplates, businessCtx.business?.id)

	// MOSTRAR INFORMACION
	const showCard = (form: Form) => () => showTemplateCard(form, $, showPrompt)

	return (
		<>
			{templates.map((template: Form, index: number) => (
				<Button
					fullWidth
					key={template.id}
					variant='outlined'
					className={Styles.btn}
					onClick={showCard(template)}
					endIcon={templateIcons[index]}>
					{template.title}
				</Button>
			))}
		</>
	)
})

export default NewForm
