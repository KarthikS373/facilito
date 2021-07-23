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
import ProductsContext from 'context/products'

interface RowProps {
	category: string
	onDelete: () => unknown
	onCloseSideBar: () => unknown
	onChange: (newCategory: string) => unknown
}
const Row: React.FC<RowProps> = withStrings(
	({ $, category, onDelete, onChange, onCloseSideBar }) => {
		// ESTADOS
		const [value, setValue] = useState<string>(category)
		const [save, setSave] = useState<boolean>(false)

		// PRODUCTOS
		const productsCtx = useContext(ProductsContext)

		// EDITAR CATEGORIA
		const onChangeCategoryEv = (ev: React.ChangeEvent<HTMLInputElement>) =>
			onChangeCategory(category, ev, setSave, setValue)

		// GUARDAR
		const updateCategory = (deleteCategory?: boolean) => () =>
			saveCategory({
				category,
				onClose: onCloseSideBar,
				products: productsCtx.products,
				setProducts: productsCtx.setProducts,
				onChange: deleteCategory ? onDelete : onChange,
				value: deleteCategory ? $` Sin categoria` : value,
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
