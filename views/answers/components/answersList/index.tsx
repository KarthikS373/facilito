// REACT
import React, { useCallback, useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'
import showAnswer from './components/showAnswer'
import TableHead from './components/tableHead'
import ColorButton from 'components/button'
import SideBar from './components/sideBar'
import AnswerRow from './components/row'

// UTILS
import printAnswer, { deleteAnswerPrompt } from './tools'

// ICONOS
import SettingsInputCompositeTwoTone from '@mui/icons-material/SettingsInputCompositeTwoTone'
import VisibilityTwoTone from '@mui/icons-material/VisibilityTwoTone'
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone'
import PrintTwoTone from '@mui/icons-material/PrintTwoTone'

// MATERIAL
import TableContainer from '@mui/material/TableContainer'
import MenuItem from '@mui/material/MenuItem'
import Skeleton from '@mui/material/Skeleton'
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
	const handleSideBar = (open: boolean) => () => setOpenSideBar(open)

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

	const row = useCallback(
		({ index, style }: { index: number; style: React.CSSProperties }) => {
			const newIndex: number = index - 1
			const answer: FormAnswerSelf = answers[newIndex]
			return newIndex === -1 ? (
				<TableHead key='header_00' style={style} filter={filter} setFilter={setFilter} />
			) : answer ? (
				<AnswerRow
					{...answer}
					style={style}
					key={answer.index}
					handleRow={handleRow(newIndex)}
					state={tracking[answer.stateIndex]?.name}
				/>
			) : (
				<div className={Styles.answerSkeleton}>
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			)
		},
		[filter, setFilter, tracking, answers]
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
						itemCount={answers.length === 0 ? 4 : answers.length + 1}>
						{row}
					</List>
				</TableContainer>
			</div>
			<SideBar
				formID={formID}
				filter={filter}
				open={openSideBar}
				tracking={tracking}
				currentIndex={currentIndex}
				onClose={handleSideBar(false)}
				updateAnswerState={updateAnswerState}
				answerIndex={answers[currentIndex]?.index - 1}
				stateIndex={answers[currentIndex]?.stateIndex || 0}
				name={answers[currentIndex]?.data.personal_name_0?.answer}
			/>
			<PopperMenuList
				open={openRowMenu}
				anchorEl={currentRow}
				placement='left-start'
				onClose={closeRowMenu}>
				<MenuItem onClick={closeRowMenu}>
					<ColorButton
						fullWidth
						variant='outlined'
						$style={{ height: '40px' }}
						onClick={showCurrentAnswer}
						startIcon={<VisibilityTwoTone />}>
						{$`Ver todo`}
					</ColorButton>
				</MenuItem>
				<MenuItem onClick={closeRowMenu}>
					<ColorButton
						fullWidth
						variant='outlined'
						$style={{ height: '40px' }}
						onClick={printCurrentAnswer}
						startIcon={<PrintTwoTone />}>
						{$`Imprimir`}
					</ColorButton>
				</MenuItem>
				<MenuItem onClick={closeRowMenu}>
					<ColorButton
						fullWidth
						variant='outlined'
						$style={{ height: '40px' }}
						onClick={handleSideBar(true)}
						startIcon={<SettingsInputCompositeTwoTone />}>
						{$`Tracking`}
					</ColorButton>
				</MenuItem>
				<MenuItem onClick={closeRowMenu}>
					<ColorButton
						fullWidth
						variant='outlined'
						$style={{ height: '40px' }}
						onClick={deleteCurrentAnswer}
						startIcon={<DeleteTwoTone />}>
						{$`Eliminar`}
					</ColorButton>
				</MenuItem>
			</PopperMenuList>
		</>
	)
}

export default AnswersList
