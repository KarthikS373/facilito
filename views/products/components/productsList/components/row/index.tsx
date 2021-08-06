// REACT
import React, { useContext, useState } from 'react'

// MATERIAL
import IconButton from '@material-ui/core/IconButton'

// COMPONENTES
import PopperMenuList from 'components/popperMenu'
import Link from 'components/link'

// MATERIAL
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

// ICONOS
import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone'
import CreateTwoTone from '@material-ui/icons/CreateTwoTone'
import ErrorTwoTone from '@material-ui/icons/ErrorTwoTone'
import MoreVert from '@material-ui/icons/MoreVert'

// HOOKS
import useStrings from 'hooks/lang'

// UTILS
import deleteProduct from './utils/tools'

// ESTILOS
import Styles from './style.module.scss'

// NEXT
import Image from 'next/image'

// CONTEXTO
import BusinessContext from 'context/business'
import ProductsContext from 'context/products'

interface RowProps {
	product: Product
	style: React.CSSProperties
}
const ProductRow: React.FC<RowProps> = ({ product, style }) => {
	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	// PRODUCTOS
	const productsCtx = useContext(ProductsContext)

	// STRINGS
	const { $ } = useStrings()

	// MENU
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
	const openMenu = Boolean(anchorEl)

	// ABRIR
	const openMenuEv = (ev: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(ev.currentTarget)

	// CERRAR
	const closeMenuEv = () => setAnchorEl(null)

	// BORRAR PRODUCTO
	const deleteProductEv = () => deleteProduct(productsCtx, product.sku)

	return (
		<>
			<div
				className={Styles.row}
				style={{
					...style,
					backgroundColor: !product.active ? 'rgba(255, 0, 0, .03)' : '',
				}}>
				<span>
					<Image unoptimized src={product.picture[0]} alt={product.title} height={48} width={48} />
				</span>
				<span>
					<strong>{product.title}</strong>
					{product.description && <i>{product.description}</i>}
				</span>
				<span>
					<i>{product.sku}</i>
				</span>
				<span>
					{product.category.startsWith(' ') && <ErrorTwoTone />}
					<i>{product.category}</i>
				</span>
				<span>
					<i className={product.promoPrice ? Styles.disabledPrice : ''}>
						{businessCtx.business?.badge} {product.price}
					</i>
					{product.promoPrice && (
						<i>
							{businessCtx.business?.badge} {product.promoPrice}
						</i>
					)}
				</span>
				<IconButton onClick={openMenuEv}>
					<MoreVert />
				</IconButton>
			</div>
			<PopperMenuList
				open={openMenu}
				anchorEl={anchorEl}
				style={{ zIndex: 3 }}
				onClose={closeMenuEv}
				placement='bottom-end'>
				<MenuItem>
					<Link rKey='newProduct' id={product?.sku}>
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

export default ProductRow
