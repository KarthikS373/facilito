// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// UTILS
import saveAllCategories, { removeAllCategories } from './utils/tools'

// COMPONENTS
import Row from './components/row'

// CONTEXT
import BusinessContext from 'context/business'

interface SideBarProps {
	open: boolean
	filter: string
	onClose: () => unknown
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}
const SideBar: React.FC<SideBarProps> = ({ open, onClose, filter, setProducts }) => {
	// BUSINESS
	const businessCtx = useContext(BusinessContext)
	const categories: string[] = businessCtx.business?.categories || []

	// GUARDAR CATEGORIA NUEVA
	const saveCategory = (index: number) => (newCategory: string) =>
		saveAllCategories(index, newCategory, categories, businessCtx.setBusinessDB)

	// ELIMINAR CATEGORIA
	const removeCategory = (index: number) => () =>
		removeAllCategories(index, categories, businessCtx.setBusinessDB)

	return (
		<>
			<div className={`${Styles.container} ${open ? Styles.openContent : Styles.closedContent}`}>
				<ul>
					{categories.map((category: string, index: number) => (
						<Row
							filter={filter}
							category={category}
							onCloseSideBar={onClose}
							setProducts={setProducts}
							key={`${category}_${index}`}
							onChange={saveCategory(index)}
							onDelete={removeCategory(index)}
						/>
					))}
				</ul>
			</div>
			<div
				onClick={onClose}
				className={`${Styles.shadow} ${open ? Styles.openShadow : Styles.closedShadow}`}
			/>
		</>
	)
}

export default SideBar
