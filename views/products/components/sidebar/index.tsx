// REACT
import React, { useContext } from 'react'

// UTILS
import saveAllCategories, { removeAllCategories } from './tools'

// COMPONENTS
import SideBar from 'components/sideBar'
import Row from './components/row'

// CONTEXT
import BusinessContext from 'context/business'

interface SideBarProps {
	open: boolean
	onClose: () => unknown
}
const CustomSideBar: React.FC<SideBarProps> = ({ open, onClose }) => {
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
		<SideBar open={open} onClose={onClose}>
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
