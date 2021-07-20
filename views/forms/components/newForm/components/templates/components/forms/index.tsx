// REACT
import React, { useState, useEffect } from 'react'

// MATERIAL
import Button from '@material-ui/core/Button'

// HOC
import withStrings from 'hoc/lang'

// COMPONENTES
import templateIcons from './utils/icons'
import showTemplateCard from './components/card'

// ESTILOS
import Styles from './style.module.scss'

// UTILS
import useTemplateForms from './utils/hooks'

const NewForm: React.FC = withStrings(({ $ }) => {
	// LISTA DE TEMPLATES
	const [templates, setTemplates] = useState<Form[]>([])

	// LEER TEMPLATES
	useTemplateForms(setTemplates)

	// MOSTRAR INFORMACION
	const showCard = (form: Form) => () => showTemplateCard(form, $)

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
