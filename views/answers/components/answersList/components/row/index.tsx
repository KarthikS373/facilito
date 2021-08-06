// REACT
import React, { useContext, useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

// ICONS
import SettingsInputCompositeTwoTone from '@material-ui/icons/SettingsInputCompositeTwoTone'
import VisibilityTwoTone from '@material-ui/icons/VisibilityTwoTone'
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone'
import PrintTwoTone from '@material-ui/icons/PrintTwoTone'
import MoreVert from '@material-ui/icons/MoreVert'

// UTILS
import printAnswer, { deleteAnswerPrompt } from './utils/tools'
import { dateToString } from 'utils/tools'

// HOOKS
import useStrings from 'hooks/lang'

// CONTEXTO
import BusinessContext from 'context/business'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'
import showAnswer from './components/showAnswer'

// PROPS
interface RowProps {
	date: Date
	index: number
	formID: string
	stateIndex: number
	handleRow: () => void
	style: React.CSSProperties
	components: FormComponent[]
	tracking: FormTrackingStep[]
	data: FormAnswerItemContainer
}
const AnswerRow: React.FC<RowProps> = ({
	data,
	date,
	style,
	index,
	formID,
	handleRow,
	tracking,
	components,
	stateIndex,
}) => {
	// BUSINES
	const businessCtx = useContext(BusinessContext)

	// STRINGS
	const { $ } = useStrings()

	// MENU
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
	const openMenu = Boolean(anchorEl)

	// ABRIR
	const openMenuEv = (ev: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(ev.currentTarget)

	// CERRAR
	const closeMenuEv = () => setAnchorEl(null)

	// MOSTRAR
	const showCurrentAnswer = () => showAnswer(data, components)

	// IMPRIMIR FILA
	const printCurrentAnswer = () => printAnswer(data, components)

	// BORRAR FILA
	const deleteCurrentAnswer = () => deleteAnswerPrompt(index, formID, businessCtx.business?.id)

	return (
		<>
			<div className={Styles.row} style={style}>
				<span>
					<i>• {index}</i>
				</span>
				<span>
					<i>{data?.personal_name_0.answer}</i>
				</span>
				<span>
					<i>{tracking[stateIndex]?.name}</i>
				</span>
				<span>
					<i>{data?.total?.answer || `${businessCtx.business.badge} 0.00`}</i>
				</span>
				<span>
					<i>{date && dateToString(date)}</i>
				</span>
				<span>
					<IconButton onClick={openMenuEv}>
						<MoreVert />
					</IconButton>
				</span>
			</div>
			<PopperMenuList
				open={openMenu}
				anchorEl={anchorEl}
				style={{ zIndex: 3 }}
				onClose={closeMenuEv}
				placement='bottom-end'>
				<MenuItem onClick={closeMenuEv}>
					<Button
						fullWidth
						variant='outlined'
						onClick={showCurrentAnswer}
						startIcon={<VisibilityTwoTone />}>
						{$`Ver todo`}
					</Button>
				</MenuItem>
				<MenuItem onClick={closeMenuEv}>
					<Button
						fullWidth
						variant='outlined'
						onClick={printCurrentAnswer}
						startIcon={<PrintTwoTone />}>
						{$`Imprimir`}
					</Button>
				</MenuItem>
				<MenuItem onClick={closeMenuEv}>
					<Button
						fullWidth
						variant='outlined'
						onClick={handleRow}
						startIcon={<SettingsInputCompositeTwoTone />}>
						{$`Tracking`}
					</Button>
				</MenuItem>
				<MenuItem onClick={closeMenuEv}>
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

export default AnswerRow
