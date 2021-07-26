// UTILS
import { sortAnswers } from 'utils/answers'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import IconButton from '@material-ui/core/IconButton'

// LISTA
export const AnswerPreview: React.FC<{
	answers: FormSortedAnswer[]
}> = ({ answers }) => {
	return (
		<ul>
			{answers.map((answer: FormSortedAnswer) => (
				<li className={Styles.row} key={answer.key}>
					<IconButton>{answer.answer.quest.substr(0, 2)}</IconButton>
					<div>
						<strong>{answer.answer.quest.substr(2)}</strong>
						<p>{answer.answer.answer}</p>
					</div>
				</li>
			))}
		</ul>
	)
}

/**
 * Ver respuesta
 * @description Muestra en una alerta todas las respuestas y preguntas
 * @param  {FormAnswerItemContainer} data
 * @param  {FormComponent[]} components
 */
const showAnswer = (data: FormAnswerItemContainer, components: FormComponent[]) => {
	window.Alert({
		title: '',
		body: '',
		type: 'alert',
		customElements: <AnswerPreview answers={sortAnswers(components, data)} />,
	})
}

export default showAnswer
