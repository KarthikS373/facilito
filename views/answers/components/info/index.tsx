// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// NEXT
import Link from 'next/link'

// ICONOS
import QuestionAnswerTwoTone from '@material-ui/icons/QuestionAnswerTwoTone'
import DescriptionTwoTone from '@material-ui/icons/DescriptionTwoTone'

// MATERIAL
import Button from '@material-ui/core/Button'

// STRINGS
import withStrings from 'hoc/lang'

interface InfoProps {
	formID: string
}
const Info: React.FC<InfoProps> = withStrings(({ $, formID }) => {
	return (
		<div className={Styles.container}>
			<div className={Styles.info}>
				<QuestionAnswerTwoTone />
				<div className={Styles.text}>
					<h2>{$`Lista de respuestas`}</h2>
					<p>{$`Imprime y visualiza todas las respuestas de este formulario.`}</p>
				</div>
			</div>
			<div className={Styles.actions}>
				<Link href={`/formularios/${formID}`}>
					<Button fullWidth variant='outlined' startIcon={<DescriptionTwoTone />}>
						{$`Abrir formulario`}
					</Button>
				</Link>
			</div>
		</div>
	)
})

export default Info
