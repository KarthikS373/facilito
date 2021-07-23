// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import BorderColorTwoTone from '@material-ui/icons/BorderColorTwoTone'
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone'
import SaveTwoTone from '@material-ui/icons/SaveTwoTone'

// MATERIAL
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

// STRINGS
import withStrings from 'hoc/lang'

// UTILS
import onChangeCategory, { saveCategory } from './utils/tools'

// CONTEXTO
import BusinessContext from 'context/business'

interface RowProps {
	filter: string
	category: string
	onDelete: () => unknown
	onCloseSideBar: () => unknown
	onChange: (newCategory: string) => unknown
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}
const Row: React.FC<RowProps> = withStrings(
	({ $, category, onDelete, onChange, onCloseSideBar, setProducts, filter }) => {
		// ESTADOS
		const [value, setValue] = useState<string>(category)
		const [save, setSave] = useState<boolean>(false)

		// BUSINESS
		const businessCtx = useContext(BusinessContext)

		// EDITAR CATEGORIA
		const onChangeCategoryEv = (ev: React.ChangeEvent<HTMLInputElement>) =>
			onChangeCategory(category, ev, setSave, setValue)

		// GUARDAR
		const updateCategory = (deleteCategory?: boolean) => () =>
			saveCategory({
				value: deleteCategory ? $` Sin categoria` : value,
				filter,
				category,
				onChange: deleteCategory ? onDelete : onChange,
				setProducts,
				onClose: onCloseSideBar,
				companyID: businessCtx.business?.id,
			})

		return (
			<li className={Styles.row}>
				<TextField
					value={value}
					label={$`Titulo`}
					variant='outlined'
					onChange={onChangeCategoryEv}
					placeholder={$`Nueva categoria`}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<BorderColorTwoTone color='primary' />
							</InputAdornment>
						),
					}}
				/>
				<IconButton disabled={!save} onClick={updateCategory()}>
					<SaveTwoTone />
				</IconButton>
				<IconButton onClick={updateCategory(true)}>
					<DeleteTwoTone />
				</IconButton>
			</li>
		)
	}
)

export default Row
