// REACT
import React, { useState, useContext, useCallback } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import TableContainer from '@mui/material/TableContainer'
import MenuItem from '@mui/material/MenuItem'
import Skeleton from '@mui/material/Skeleton'
import Paper from '@mui/material/Paper'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'
import TableHead from './components/tableHead'
import ColorButton from 'components/button'
import ProductRow from './components/row'
import Link from 'components/link'

// UTILS
import deleteProduct, { selectRow } from './tools'

// CONTEXTO
import ProductsContext from 'context/products'

// ICONS
import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone'
import CreateTwoTone from '@mui/icons-material/CreateTwoTone'

// HOC
import useStrings from 'hooks/lang'

// REACT WINDOW
import { FixedSizeList as List } from 'react-window'

interface ProductsListProps {
	filter: string
	products: Product[]
	setFilter: (newFilter: string) => void
	setProducts: SetState<Product[]>
}
const ProductsList: React.FC<ProductsListProps> = ({
	setFilter,
	setProducts,
	filter,
	products,
}) => {
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
	const deleteProductEv = () => deleteProduct(productsCtx, products, currentIndex, setProducts)

	// ASIGNAR FILA
	const handleRow = (index: number) => (ev: React.MouseEvent<HTMLButtonElement>) =>
		selectRow(ev, index, setCurrentRow, setCurrentIndex)

	// FILA
	const row = useCallback(
		({ index, style }: { index: number; style: React.CSSProperties }) => {
			const newIndex: number = index - 1
			const product: Product = products[Math.max(0, newIndex)]
			return newIndex === -1 ? (
				<TableHead style={style} key='header_00' filter={filter} setFilter={setFilter} />
			) : product ? (
				<ProductRow
					style={style}
					key={product.sku}
					product={product}
					handleRow={handleRow(newIndex)}
				/>
			) : (
				<div className={Styles.productSkeleton}>
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			)
		},
		[filter, setFilter, products]
	)

	return (
		<>
			<div className={Styles.container}>
				<TableContainer component={Paper} style={{ backgroundColor: 'rgb(252, 252, 252)' }}>
					<List
						height={272}
						itemSize={68}
						width='100%'
						itemCount={products.length === 0 ? 4 : products.length + 1}
						className={Styles.listContainer}>
						{row}
					</List>
				</TableContainer>
			</div>
			<PopperMenuList
				open={openRowMenu}
				anchorEl={currentRow}
				placement='bottom-end'
				onClose={closeRowMenu}>
				<MenuItem>
					<Link rKey='editProduct' id={products[currentIndex]?.sku}>
						<ColorButton
							fullWidth
							$style={{ height: '40px' }}
							variant='outlined'
							startIcon={<CreateTwoTone />}>
							{$`Editar`}
						</ColorButton>
					</Link>
				</MenuItem>
				<MenuItem>
					<ColorButton
						fullWidth
						variant='outlined'
						onClick={deleteProductEv}
						startIcon={<DeleteTwoTone />}
						$style={{ height: '40px' }}>
						{$`Borrar`}
					</ColorButton>
				</MenuItem>
			</PopperMenuList>
		</>
	)
}

export default ProductsList
