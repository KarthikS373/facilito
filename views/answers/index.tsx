// REACT
import React, { useState, useContext } from 'react'

// COMPONENTES
import Header from 'components/header'
import Info from './components/info'

// HOOKS
import { useFilters, useInitialFilter } from './utils/hooks'
import { saveFilter, getChangesTrigger, updateLocalAnswerState } from './utils/tools'

// STRINGS
import withStrings from 'hoc/lang'

// CONTEXTOS
import FormsContext from 'context/forms'

// NEXT
import dynamic from 'next/dynamic'
const DownloadAnswers = dynamic(() => import('./components/download'))
const AnswersList = dynamic(() => import('./components/answersList'))

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

	// FORMULARIO
	const currentForm: Form | undefined = formsCtx.forms.forms.find((form) => form.id === formID)

	// ASIGNAR FILTRO
	const changeFilter = (newFilter: string) => saveFilter(newFilter, setFilter)

	// BUSCAR RESPUESTAS
	const changesTrigger: number = getChangesTrigger(formsCtx.forms)

	// CAMBIAR ESTADO DE RESPUESTAS
	const updateAnswerState = (index: number, newState: number) =>
		updateLocalAnswerState(index, newState, setAnswers)

	// CAMBIAR FILTROS
	useFilters(filter, formID, formsCtx.forms, changesTrigger, setAnswers)

	// FILTRO INICIAL
	useInitialFilter(setFilter)

	return (
		<>
			<Header customDescription={`${answers.length || 0} ${$`respuesta(s) creadas`}`}>
				<DownloadAnswers answers={answers} currentForm={currentForm} />
			</Header>
			<Info formID={formID} />
			<AnswersList
				filter={filter}
				formID={formID}
				answers={answers}
				setFilter={changeFilter}
				updateAnswerState={updateAnswerState}
				tracking={currentForm?.tracking || []}
				components={currentForm?.components || []}
			/>
		</>
	)
})

export default Answers
