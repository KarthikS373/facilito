// REACT
import React, { useState, useContext } from 'react'

// COMPONENTES
import AnswersList from './components/answersList'
import Header from 'components/header'
import Info from './components/info'

// XLSX
import { ExportSheet } from 'react-xlsx-sheet'
import XLSX from 'xlsx'

// ICON
import GetAppTwoTone from '@material-ui/icons/GetAppTwoTone'

// MATERIAL
import Button from '@material-ui/core/Button'

// HOOKS
import { useFilters, useInitialFilter } from './utils/hooks'
import {
	saveFilter,
	getChangesTrigger,
	updateLocalAnswerState,
	getExcelExportData,
} from './utils/tools'

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

	// FORMULARIO
	const currentForm: Form | undefined = formsCtx.forms.forms.find((form) => form.id === formID)

	// ASIGNAR FILTRO
	const changeFilter = (newFilter: string) => saveFilter(newFilter, setFilter)

	// BUSCAR RESPUESTAS
	const changesTrigger: number = getChangesTrigger(formsCtx.forms)

	// CAMBIAR ESTADO DE RESPUESTAS
	const updateAnswerState = (index: number, newState: number) =>
		updateLocalAnswerState(index, newState, setAnswers)

	// DATASET DE EXCEL
	const getExcelDataset = () => getExcelExportData(answers, currentForm?.components || [], $)

	// CAMBIAR FILTROS
	useFilters(filter, formID, formsCtx.forms, changesTrigger, setAnswers)

	// FILTRO INICIAL
	useInitialFilter(setFilter)

	return (
		<>
			<Header customDescription={`${answers.length || 0} ${$`respuesta(s) creadas`}`}>
				<ExportSheet
					// @ts-ignore
					xlsx={XLSX}
					dataSource={getExcelDataset()}
					fileName={currentForm?.title || 'data'}
					header={[
						{ title: $`Pregunta`, dataIndex: 'quest' },
						{ title: $`Respuesta`, dataIndex: 'answer' },
					]}>
					<Button
						variant='contained'
						style={{ color: '#fff' }}
						startIcon={<GetAppTwoTone />}
						color='primary'>{$`Descargar todo`}</Button>
				</ExportSheet>
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
