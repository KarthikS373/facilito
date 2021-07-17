// REACT
import React, { useState, useEffect } from 'react'

// MATERIAL
import Button from '@material-ui/core/Button'

// COMPONENTES
import templateIcons from './utils/icons'

// ESTILOS
import Styles from './style.module.scss'

// UTILS
import { readTemplates } from 'utils/forms'

const NewForm: React.FC = () => {
	// LISTA DE TEMPLATES
	const [templates, setTemplates] = useState<Form[]>([])

	// LEER TEMPLATES
	useEffect(() => {
		readTemplates().then((forms: Form[]) => {
			const spliced = [...forms]
			spliced.length = Math.min(7, spliced.length)
			setTemplates(spliced)
		})
	}, [])

	console.log(templates)

	return (
		<>
			{templates.map((template: Form, index: number) => (
				<Button
					fullWidth
					key={template.id}
					variant='outlined'
					className={Styles.btn}
					endIcon={templateIcons[index]}>
					{template.title}
				</Button>
			))}
		</>
	)
}

export default NewForm
