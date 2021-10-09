// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// ICONOS
import BorderColorTwoTone from '@mui/icons-material/BorderColorTwoTone'
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone'
import SaveTwoTone from '@mui/icons-material/SaveTwoTone'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

// STRINGS
import useStrings from 'hooks/lang'

// UTILS
import onChangeCategory, { saveCategory } from './tools'

// CONTEXTO
import ProductsContext from 'context/products'

interface RowProps {
	category: string
	onDelete: () => unknown
	onCloseSideBar: () => unknown
	onChange: (newCategory: string) => unknown
}
const Row: React.FC<RowProps> = ({ category, onDelete, onChange, onCloseSideBar }) => {
	// STRINGS
	const { $ } = useStrings()

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
			value: deleteCategory ? $` Sin categoría` : value,
		})

	return (
		<li className={Styles.row}>
			<TextField
				value={value}
				label={$`Titulo`}
				variant='outlined'
				onChange={onChangeCategoryEv}
				placeholder={$`Nueva categoría`}
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

export default Row
