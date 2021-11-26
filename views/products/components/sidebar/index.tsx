// REACT
import React, { useContext, useState } from 'react'

// UTILS
import saveAllCategories, { addNewCategory, removeAllCategories } from './tools'

// COMPONENTS
import ColorButton from 'components/button'
import SideBar from 'components/sideBar'
import Row from './components/row'

// CONTEXT
import BusinessContext from 'context/business'
import useStrings from 'hooks/lang'

// ICONOS
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import AddTwoTone from '@mui/icons-material/AddTwoTone'

// ESTILOS
import Styles from './style.module.scss'

// TOOLS
import useDefCategories from './hooks'

interface SideBarProps {
	open: boolean
	onClose: () => unknown
}
const CustomSideBar: React.FC<SideBarProps> = ({ open, onClose }) => {
	// STRINGS
	const { $ } = useStrings()

	// BUSINESS
	const businessCtx = useContext(BusinessContext)
	const defCategories: string[] = businessCtx.business?.categories || []

	// ESTADO
	const [categories, setCategories] = useState<string[]>(defCategories)

	// AGREGAR CATEGORIA
	const addCategory = () => addNewCategory(setCategories)

	// GUARDAR CATEGORIA NUEVA
	const saveCategory = (index: number) => (newCategory: string) =>
		saveAllCategories(index, newCategory, categories, businessCtx.setBusinessDB)

	// ELIMINAR CATEGORIA
	const removeCategory = (index: number) => () =>
		removeAllCategories(index, setCategories, businessCtx.setBusinessDB)

	// HOOKS
	useDefCategories(defCategories, setCategories)

	return (
		<SideBar open={open} onClose={onClose}>
			<div className={Styles.info}>
				<h2>
					<CategoryTwoToneIcon />
					{$`Categorias`}
				</h2>
				<p>{$`Lista de todas las categorias creadas para tus productos.`}</p>
				<ColorButton
					fullWidth
					color='primary'
					variant='outlined'
					onClick={addCategory}
					startIcon={<AddTwoTone />}
					$style={{
						color: 'var(--primary)',
						borderColor: 'var(--primary)',
					}}>{$`Agregar categoria`}</ColorButton>
			</div>
			{categories.map((category: string, index: number) => (
				<Row
					category={category}
					onCloseSideBar={onClose}
					key={`${category}_${index}`}
					onChange={saveCategory(index)}
					onDelete={removeCategory(index)}
				/>
			))}
		</SideBar>
	)
}

export default CustomSideBar
