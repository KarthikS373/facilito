// REACT
import React, { useState, useContext } from 'react'

// COMPONENTES
import AnswersList from './components/answersList'
import Header from 'components/header'

// ICON
import QuestionAnswerTwoTone from '@material-ui/icons/QuestionAnswerTwoTone'

// MATERIAL
import Button from '@material-ui/core/Button'

// HOOKS
import useAnswers, { useFilters, useInitialFilter } from './utils/hooks'
import { saveFilter } from './utils/tools'

// STRINGS
import withStrings from 'hoc/lang'

// CONTEXTOS
import FormsContext from 'context/forms'

// PROPS
interface AnswersProps {
	formID: string
}
const Answers: React.FC<AnswersProps> = withStrings(({ $, formID }) => {
	// FORMULARIOS
	const formsCtx = useContext(FormsContext)

	// RESPUESTAS
	const [answers, setAnswers] = useState<FormAnswerSelf[]>([])

	// FILTROS
	const [filter, setFilter] = useState<string>('naz')

	// ASIGNAR FILTRO
	const changeFilter = (newFilter: string) => saveFilter(newFilter, setFilter)

	// BUSCAR RESPUESTAS
	const changesTrigger: number =
		formsCtx.forms.forms.length +
		formsCtx.forms.answers.length +
		formsCtx.forms.answers
			.map((answer) => answer?.data.length || 0)
			.reduce((prev, next) => prev + next, 0)

	useAnswers(formID, formsCtx.forms, changesTrigger, setAnswers)

	// CAMBIAR FILTROS
	useFilters(setAnswers, filter)

	// FILTRO INICIAL
	useInitialFilter(setFilter)

	return (
		<>
			<Header customDescription={`${answers.length || 0} ${$`respuesta(s) creadas`}`}>
				<Button
					variant='contained'
					style={{ color: '#fff' }}
					startIcon={<QuestionAnswerTwoTone />}
					color='primary'>{$`Descargar todo`}</Button>
			</Header>
			<AnswersList answers={answers} setFilter={changeFilter} filter={filter} />
		</>
	)
})

export default Answers
