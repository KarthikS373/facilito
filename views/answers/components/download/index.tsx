/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React from 'react'

// UTILS
import { getExcelExportData } from '../../tools'

// XLSX
import { ExportSheet } from 'react-xlsx-sheet'
import * as XLSX from 'xlsx'

// ICON
import GetAppTwoTone from '@mui/icons-material/GetAppTwoTone'

// MATERIAL
import ColorButton from 'components/button'

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
			<ColorButton
				color='primary'
				variant='contained'
				$style={{ color: '#fff', background: 'var(--primary)' }}
				startIcon={<GetAppTwoTone />}>{$`Descargar todo`}</ColorButton>
		</ExportSheet>
	)
}

export default DownloadAnswers
