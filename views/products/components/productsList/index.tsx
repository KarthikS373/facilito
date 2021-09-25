// REACT
import React, { useState, useCallback, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import TableContainer from '@mui/material/TableContainer'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'
import TableHead from './components/tableHead'
import ProductRow from './components/row'
import Link from 'components/link'

// UTILS
import deleteProduct from './utils/tools'

// CONTEXTO
import ProductsContext from 'context/products'

// ICONS
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone'
import CreateTwoTone from '@mui/icons-material/CreateTwoTone'

// HOOC
import useStrings from 'hooks/lang'

// REACT WINDOW
import { FixedSizeList as List } from 'react-window'

interface ProductsListProps {
	filter: string
	products: Product[]
	setFilter: (newFilter: string) => void
}
const ProductsList: React.FC<ProductsListProps> = ({ setFilter, filter, products }) => {
	// STRINGS
	const { $ } = useStrings()

	// PRODUCTOS
	const productsCtx = useContext(ProductsContext)

	// FILA
	const [currentRow, setCurrentRow] = useState<HTMLElement | null>(null)
	const openRowMenu = Boolean(currentRow)

	// NUMERO DE PRODUCTO
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	// CERRAR MENU DE FILA
	const closeRowMenu = () => setCurrentRow(null)

	// BORRAR PRODUCTO
	const deleteProductEv = () => deleteProduct(productsCtx, products, currentIndex)

	// ASIGNAR FILA
	const handleRow = (index: number) => (ev: React.MouseEvent<HTMLButtonElement>) => {
		setCurrentRow(ev.currentTarget)
		setCurrentIndex(index)
	}

	// FILA
	const productsTrigger: string = products.map((product: Product) => product.sku).join('')
	const row = useCallback(
		({ index, style }) => {
			let newIndex: number = index - 1
			const product: Product = products[Math.max(0, newIndex)]
			return newIndex === -1 ? (
				<TableHead style={style} key='header_00' filter={filter} setFilter={setFilter} />
			) : (
				<ProductRow
					style={style}
					key={product.sku}
					product={product}
					handleRow={handleRow(newIndex)}
				/>
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
			<PopperMenuList
				placement='bottom-end'
				onClose={closeRowMenu}
				anchorEl={currentRow}
				open={openRowMenu}>
				<MenuItem>
					<Link rKey='editProduct' id={products[currentIndex]?.sku}>
						<Button fullWidth variant='outlined' startIcon={<CreateTwoTone />}>
							{$`Editar`}
						</Button>
					</Link>
				</MenuItem>
				<MenuItem>
					<Button
						fullWidth
						variant='outlined'
						onClick={deleteProductEv}
						startIcon={<DeleteTwoTone />}>
						{$`Borrar`}
					</Button>
				</MenuItem>
			</PopperMenuList>
		</>
	)
}

export default ProductsList
