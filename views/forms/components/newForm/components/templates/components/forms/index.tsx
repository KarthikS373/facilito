// REACT
import React, { useState, useContext } from 'react'

// MATERIAL
import ColorButton from 'components/button'

// ROUTER
import { useRouter } from 'next/router'

// HOC
import useStrings from 'hooks/lang'

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

const NewForm: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

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
				<ColorButton
					fullWidth
					key={template.id}
					variant='outlined'
					className={Styles.btn}
					onClick={showCard(template)}
					endIcon={templateIcons[index]}
					$style={{
						lineHeight: 1.1,
						textAlign: 'left',
					}}>
					{template.title}
				</ColorButton>
			))}
		</>
	)
}

export default NewForm
