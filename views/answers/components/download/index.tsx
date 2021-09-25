// REACT
import React from 'react'

// UTILS
import { getExcelExportData } from '../../utils/tools'

// XLSX
import { ExportSheet } from 'react-xlsx-sheet'
import XLSX from 'xlsx'

// ICON
import GetAppTwoTone from '@mui/icons-material/GetAppTwoTone'

// MATERIAL
import Button from '@mui/material/Button'

// STRINGS
import useStrings from 'hooks/lang'

// PROPS
interface DownloadAnswersProps {
	answers: FormAnswerSelf[]
	currentForm: Form | undefined
}
const DownloadAnswers: React.FC<DownloadAnswersProps> = ({ answers, currentForm }) => {
	// STRINGS
	const { $ } = useStrings()

	// DATASET DE EXCEL
	const getExcelDataset = () => getExcelExportData(answers, currentForm?.components || [], $)

	return (
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
	)
}

export default DownloadAnswers
