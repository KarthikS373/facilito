// REACT
import React, { useCallback, useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'
import TableHead from './components/tableHead'
import AnswerRow from './components/row'

// ICONOS
import SettingsInputCompositeTwoTone from '@material-ui/icons/SettingsInputCompositeTwoTone'
import VisibilityTwoTone from '@material-ui/icons/VisibilityTwoTone'
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone'
import PrintTwoTone from '@material-ui/icons/PrintTwoTone'

// MATERIAL
import TableContainer from '@material-ui/core/TableContainer'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

// HOOC
import withStrings from 'hoc/lang'

// REACT WINDOW
import { FixedSizeList as List } from 'react-window'

interface AnswersListProps {
	filter: string
	answers: FormAnswerSelf[]
	setFilter: (newFilter: string) => void
}
const AnswersList: React.FC<AnswersListProps> = withStrings(({ $, filter, setFilter, answers }) => {
	// FILA
	const [currentRow, setCurrentRow] = useState<HTMLElement | null>(null)
	const openRowMenu = Boolean(currentRow)

	// NUMERO DE RESPUESTA
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	// ASIGNAR FILA
	const handleRow = (index: number) => (ev: React.MouseEvent<HTMLButtonElement>) => {
		setCurrentRow(ev.currentTarget)
		setCurrentIndex(index)
	}

	// CERRAR MENU DE FILA
	const closeRowMenu = () => setCurrentRow(null)

	// FILAS
	const answersTrigger: string = answers
		?.map((answer: FormAnswerSelf) => answer.data['personal_name_0'].answer)
		.join('')
	const row = useCallback(
		({ index, style }) => {
			let newIndex: number = index - 1
			const answer: FormAnswerSelf = answers[newIndex]
			return newIndex === -1 ? (
				<TableHead style={style} filter={filter} setFilter={setFilter} />
			) : (
				<AnswerRow {...answer} style={style} handleRow={handleRow(newIndex)} />
			)
		},
		[answersTrigger, filter]
	)

	console.log(currentIndex)

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
			<PopperMenuList
				placement='bottom-end'
				onClose={closeRowMenu}
				anchorEl={currentRow}
				open={openRowMenu}>
				<MenuItem>
					<Button fullWidth variant='outlined' startIcon={<VisibilityTwoTone />}>
						{$`Ver todo`}
					</Button>
				</MenuItem>
				<MenuItem>
					<Button fullWidth variant='outlined' startIcon={<PrintTwoTone />}>
						{$`Imprimir`}
					</Button>
				</MenuItem>
				<MenuItem>
					<Button fullWidth variant='outlined' startIcon={<SettingsInputCompositeTwoTone />}>
						{$`Tracking`}
					</Button>
				</MenuItem>
				<MenuItem>
					<Button fullWidth variant='outlined' startIcon={<DeleteTwoTone />}>
						{$`Eliminar`}
					</Button>
				</MenuItem>
			</PopperMenuList>
		</>
	)
})

export default AnswersList