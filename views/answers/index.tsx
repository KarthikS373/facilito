// REACT
import React, { useState, useContext } from 'react'

// COMPONENTES
import AnswersList from './components/answersList'
import Header from 'components/header'
import Info from './components/info'

// ICON
import GetAppTwoTone from '@material-ui/icons/GetAppTwoTone'

// MATERIAL
import Button from '@material-ui/core/Button'

// HOOKS
import useAnswers, { useFilters, useInitialFilter } from './utils/hooks'
import { saveFilter, getChangesTrigger } from './utils/tools'

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

	// COMPONENTES
	const components: FormComponent[] =
		formsCtx.forms.forms.find((form) => form.id === formID)?.components || []

	// ASIGNAR FILTRO
	const changeFilter = (newFilter: string) => saveFilter(newFilter, setFilter)

	// BUSCAR RESPUESTAS
	const changesTrigger: number = getChangesTrigger(formsCtx.forms)

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
					startIcon={<GetAppTwoTone />}
					color='primary'>{$`Descargar todo`}</Button>
			</Header>
			<Info formID={formID} />
			<AnswersList
				filter={filter}
				formID={formID}
				answers={answers}
				components={components}
				setFilter={changeFilter}
			/>
		</>
	)
})

export default Answers
