// REACT
import React, { useCallback, useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import TableHead from './components/tableHead'
import SideBar from './components/sideBar'
import AnswerRow from './components/row'

// MATERIAL
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'

// REACT WINDOW
import { FixedSizeList as List } from 'react-window'

interface AnswersListProps {
	filter: string
	formID: string
	answers: FormAnswerSelf[]
	components: FormComponent[]
	tracking: FormTrackingStep[]
	setFilter: (newFilter: string) => void
	updateAnswerState: (index: number, newState: number) => void
}
const AnswersList: React.FC<AnswersListProps> = ({
	components,
	formID,
	tracking,
	filter,
	setFilter,
	answers,
	updateAnswerState,
}) => {
	// NUMERO DE RESPUESTA
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	// ABRIR SIDEBAR
	const [openSideBar, setOpenSideBar] = useState<boolean>(false)

	// ASIGNAR FILA
	const handleRow = (index: number) => () => {
		setOpenSideBar(true)
		setCurrentIndex(index)
	}

	// ABRIR/CERRAR SIDEBAR
	const hanldeSideBar = (open: boolean) => () => setOpenSideBar(open)

	// FILAS
	const answersTrigger: string = answers
		.map((answer: FormAnswerSelf) => `${answer.index}_${answer.stateIndex}`)
		.join('')

	const row = useCallback(
		({ index, style }) => {
			let newIndex: number = index - 1
			const answer: FormAnswerSelf = answers[newIndex]
			return newIndex === -1 ? (
				<TableHead key='header_00' style={style} filter={filter} setFilter={setFilter} />
			) : (
				<AnswerRow
					{...answer}
					style={style}
					formID={formID}
					key={answer.index}
					tracking={tracking}
					components={components}
					handleRow={handleRow(newIndex)}
				/>
			)
		},
		[answersTrigger, filter]
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
						itemCount={(answers?.length || 0) + 1}>
						{row}
					</List>
				</TableContainer>
			</div>
			<SideBar
				formID={formID}
				open={openSideBar}
				tracking={tracking}
				currentIndex={currentIndex}
				onClose={hanldeSideBar(false)}
				updateAnswerState={updateAnswerState}
				answerIndex={answers[currentIndex]?.index - 1}
				stateIndex={answers[currentIndex]?.stateIndex || 0}
			/>
		</>
	)
}

export default AnswersList
