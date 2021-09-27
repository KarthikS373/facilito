// REACT
import React, { useState, useContext } from 'react'

// COMPONENTES
import Header from 'components/header'
import Info from './components/info'
import View from 'components/view'

// HOOKS
import { getChangesTrigger, updateLocalAnswerState } from './utils/tools'
import useDefaultFilter from 'hooks/filters'
import { useFilters } from './utils/hooks'
import { changeFilter } from 'utils/tools'
import { useForm } from 'hooks/forms'

// STRINGS
import useStrings from 'hooks/lang'

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
const Answers: React.FC<AnswersProps> = ({ formID }) => {
	// STRINGS
	const { $ } = useStrings()

	// FORMULARIOS
	const formsCtx = useContext(FormsContext)

	// RESPUESTAS
	const [answers, setAnswers] = useState<FormAnswerSelf[]>([])

	// FILTROS
	const [filter, setFilter] = useState<string>('iza')

	// FORMULARIO
	const currentForm: Form | undefined = useForm(formID, formsCtx.forms.forms)

	// ASIGNAR FILTRO
	const changeFilterEv = (newFilter: string) => changeFilter('answers-filter', newFilter, setFilter)

	// BUSCAR RESPUESTAS
	const changesTrigger: string = getChangesTrigger(formsCtx.forms)

	// CAMBIAR ESTADO DE RESPUESTAS
	const updateAnswerState = (index: number, newState: number) =>
		updateLocalAnswerState(index, newState, setAnswers)

	// CAMBIAR FILTROS
	useFilters(filter, formID, formsCtx.forms, changesTrigger, setAnswers)

	// FILTRO INICIAL
	useDefaultFilter('answers-filter', 'iza', setFilter)

	return (
		<View>
			<Header customDescription={`${answers.length || 0} ${$`respuesta(s) creadas`}`}>
				<DownloadAnswers answers={answers} currentForm={currentForm} />
			</Header>

			<Info formID={formID} />

			<AnswersList
				filter={filter}
				formID={formID}
				answers={answers}
				setFilter={changeFilterEv}
				updateAnswerState={updateAnswerState}
				tracking={currentForm?.tracking || []}
				components={currentForm?.components || []}
			/>
		</View>
	)
}

export default Answers
