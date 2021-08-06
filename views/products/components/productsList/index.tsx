// REACT
import React, { useCallback } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'

// COMPONENTES
import TableHead from './components/tableHead'
import ProductRow from './components/row'

// REACT WINDOW
import { FixedSizeList as List } from 'react-window'

interface ProductsListProps {
	filter: string
	products: Product[]
	setFilter: (newFilter: string) => void
}
const ProductsList: React.FC<ProductsListProps> = ({ setFilter, filter, products }) => {
	// FILA
	const productsTrigger: string = products.map((product: Product) => product.sku).join('')
	const row = useCallback(
		({ index, style }) => {
			let newIndex: number = index - 1
			const product: Product = products[Math.max(0, newIndex)]
			return newIndex === -1 ? (
				<TableHead style={style} key='header_00' filter={filter} setFilter={setFilter} />
			) : (
				<ProductRow style={style} key={product.sku} product={product} />
			)
		},
		[productsTrigger, filter]
	)

	return (
		<>
			<div className={Styles.container}>
				<TableContainer component={Paper} style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
					<List
						height={272}
						itemSize={68}
						width='100%'
						itemCount={products.length + 1}
						className={Styles.listContainer}>
						{row}
					</List>
				</TableContainer>
			</div>
		</>
	)
}

export default ProductsList
