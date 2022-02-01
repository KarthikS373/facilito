// UTILS
import React from 'react'
import { sortAnswers } from 'utils/answers'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import IconButton from '@mui/material/IconButton'
import { getCustomPre } from './tools'

// LISTA
export const AnswerPreview: React.FC<{
	answers: FormSortedAnswer[]
	preview?: boolean
}> = ({ answers, preview }) => {
	return (
		<ul>
			{answers.map((answer: FormSortedAnswer) => {
				return (
					<li className={Styles.row} key={answer.key}>
						{!preview && <IconButton>{answer.answer.quest.substr(0, 2)}</IconButton>}
						<div style={{ marginLeft: preview ? '0' : '10px' }}>
							{!preview && <strong>{answer.answer.quest.substr(2)}</strong>}
							<pre>{getCustomPre(answer.answer.answer)}</pre>
						</div>
					</li>
				)
			})}
		</ul>
	)
}

/**
 * Ver respuesta
 * @description Muestra en una alerta todas las respuestas y preguntas
 * @param  {FormAnswerItemContainer} data
 * @param  {FormComponent[]} components
 */
const showAnswer = (data: FormAnswerItemContainer, components: FormComponent[]): void => {
	window.Alert({
		title: '',
		body: '',
		type: 'alert',
		customElements: <AnswerPreview answers={sortAnswers(components, data)} />,
	})
}

export default showAnswer
