// REACT
import React, { useCallback, useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'
import showAnswer from './components/showAnswer'
import TableHead from './components/tableHead'
import SideBar from './components/sideBar'
import AnswerRow from './components/row'

// UTILS
import printAnswer, { deleteAnswerPrompt } from './utils/tools'

// ICONOS
import SettingsInputCompositeTwoTone from '@mui/icons-material/SettingsInputCompositeTwoTone'
import VisibilityTwoTone from '@mui/icons-material/VisibilityTwoTone'
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone'
import PrintTwoTone from '@mui/icons-material/PrintTwoTone'

// MATERIAL
import TableContainer from '@mui/material/TableContainer'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

// CONTEXTO
import BusinessContext from 'context/business'

// STRINGS
import useStrings from 'hooks/lang'

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
	// STRINGS
	const { $ } = useStrings()

	// FILA
	const [currentRow, setCurrentRow] = useState<HTMLElement | null>(null)
	const openRowMenu = Boolean(currentRow)

	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// NUMERO DE RESPUESTA
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	// ABRIR SIDEBAR
	const [openSideBar, setOpenSideBar] = useState<boolean>(false)

	// ABRIR/CERRAR SIDEBAR
	const hanldeSideBar = (open: boolean) => () => setOpenSideBar(open)

	// CERRAR MENU DE FILA
	const closeRowMenu = () => setCurrentRow(null)

	// MOSTRAR FILA
	const showCurrentAnswer = () => showAnswer(answers[currentIndex].data, components)

	// IMPRIMIR FILA
	const printCurrentAnswer = () => printAnswer(answers[currentIndex].data, components)

	// BORRAR FILA
	const deleteCurrentAnswer = () =>
		deleteAnswerPrompt(currentIndex, formID, businessCtx.business?.id)

	// ASIGNAR FILA
	const handleRow = (index: number) => (ev: React.MouseEvent<HTMLButtonElement>) => {
		setCurrentRow(ev.currentTarget)
		setCurrentIndex(index)
	}

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
					key={answer.index}
					handleRow={handleRow(newIndex)}
					state={tracking[answer.stateIndex]?.name}
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
			<PopperMenuList
				placement='left'
				onClose={closeRowMenu}
				anchorEl={currentRow}
				open={openRowMenu}>
				<MenuItem onClick={closeRowMenu}>
					<Button
						fullWidth
						variant='outlined'
						onClick={showCurrentAnswer}
						startIcon={<VisibilityTwoTone />}>
						{$`Ver todo`}
					</Button>
				</MenuItem>
				<MenuItem onClick={closeRowMenu}>
					<Button
						fullWidth
						variant='outlined'
						onClick={printCurrentAnswer}
						startIcon={<PrintTwoTone />}>
						{$`Imprimir`}
					</Button>
				</MenuItem>
				<MenuItem onClick={closeRowMenu}>
					<Button
						fullWidth
						variant='outlined'
						onClick={hanldeSideBar(true)}
						startIcon={<SettingsInputCompositeTwoTone />}>
						{$`Tracking`}
					</Button>
				</MenuItem>
				<MenuItem onClick={closeRowMenu}>
					<Button
						fullWidth
						variant='outlined'
						onClick={deleteCurrentAnswer}
						startIcon={<DeleteTwoTone />}>
						{$`Eliminar`}
					</Button>
				</MenuItem>
			</PopperMenuList>
		</>
	)
}

export default AnswersList
