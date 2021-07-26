// REACT
import React, { useCallback } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import TableHead from './components/tableHead'
import AnswerRow from './components/row'

// MATERIAL
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'

// HOOC
import withStrings from 'hoc/lang'

// REACT WINDOW
import { FixedSizeList as List } from 'react-window'

interface AnswersListProps {
	answers: FormAnswer
	tracking: FormTrackingStep[]
}
const AnswersList: React.FC<AnswersListProps> = withStrings(({ tracking, answers }) => {
	// FILAS
	const answersTrigger: number = answers?.data.length || 0
	const row = useCallback(
		({ index, style }) => {
			let newIndex: number = index - 1
			const answer: FormAnswerSelf = {
				data: answers.data[newIndex],
				date: answers.dates[newIndex],
				state: tracking[answers.states[newIndex]]?.name || '',
			}

			return newIndex === -1 ? (
				<TableHead style={style} />
			) : (
				<AnswerRow {...answer} index={index} style={style} />
			)
		},
		[answersTrigger]
	)

	return (
		<>
			<div className={Styles.container}>
				<TableContainer component={Paper} style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
					<List
						height={272}
						itemSize={68}
						width='100%'
						className={Styles.listContainer}
						itemCount={(answers?.data.length || 0) + 1}>
						{row}
					</List>
				</TableContainer>
			</div>
		</>
	)
})

export default AnswersList
