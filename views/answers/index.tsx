// REACT
import React, { useState, useContext, Suspense } from 'react'

// COMPONENTES
import AnswersListSkeleton from './components/answersList/components/skeleton'
import Header from 'components/header'
import Info from './components/info'
import View from 'components/view'

// HOOKS
import { updateLocalAnswerState } from './tools'
import useDefaultFilter from 'hooks/filters'
import { useFilters } from './hooks'
import { changeFilter } from 'utils/tools'
import { useForm } from 'hooks/forms'

// STRINGS
import useStrings from 'hooks/lang'

// CONTEXTOS
import FormsContext from 'context/forms'

// NEXT
import dynamic from 'next/dynamic'
const DownloadAnswers = dynamic(() => import('./components/download'))
const AnswersList = dynamic(() => import('./components/answersList'), { suspense: true })

// PROPS
interface AnswersProps {
	formID: string
}
const Answers: React.FC<AnswersProps> = ({ formID }) => {
	// STRINGS
	const { $ } = useStrings()

	// TIENDAS
	const formsCtx = useContext(FormsContext)

	// RESPUESTAS
	const [answers, setAnswers] = useState<FormAnswerSelf[]>([])

	// FILTROS
	const [filter, setFilter] = useState<string>('iza')

	// TIENDAS
	const currentForm: Form | undefined = useForm(formID, formsCtx.forms.forms)

	// ASIGNAR FILTRO
	const changeFilterEv = (newFilter: string) => changeFilter('answers-filter', newFilter, setFilter)

	// CAMBIAR ESTADO DE RESPUESTAS
	const updateAnswerState = (index: number, newState: number) =>
		updateLocalAnswerState(index, newState, setAnswers)

	// CAMBIAR FILTROS
	useFilters(filter, formID, formsCtx.forms, setAnswers)

	// FILTRO INICIAL
	useDefaultFilter('answers-filter', 'iza', setFilter)

	return (
		<View>
			<Header customDescription={`${answers.length || 0} ${$`respuesta(s) creadas`}`}>
				<DownloadAnswers answers={answers} currentForm={currentForm} />
			</Header>

			<Info formID={formID} />

			<Suspense fallback={<AnswersListSkeleton />}>
				<AnswersList
					filter={filter}
					formID={formID}
					answers={answers}
					setFilter={changeFilterEv}
					updateAnswerState={updateAnswerState}
					tracking={currentForm?.tracking || []}
					components={currentForm?.components || []}
				/>
			</Suspense>
		</View>
	)
}

export default Answers
