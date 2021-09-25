// REACT
import React, { useContext } from 'react'

// MATERIAL
import IconButton from '@mui/material/IconButton'

// ICONOS
import ErrorTwoTone from '@mui/icons-material/ErrorTwoTone'
import MoreVert from '@mui/icons-material/MoreVert'

// ESTILOS
import Styles from './style.module.scss'

// NEXT
import Image from 'next/image'

// CONTEXTO
import BusinessContext from 'context/business'

interface RowProps {
	product: Product
	style: React.CSSProperties
	handleRow: (ev: React.MouseEvent<HTMLButtonElement>) => unknown
}
const ProductRow: React.FC<RowProps> = ({ product, style, handleRow }) => {
	// BUSINESS
	const businessCtx = useContext(BusinessContext)

	return (
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
			<IconButton onClick={handleRow}>
				<MoreVert />
			</IconButton>
		</div>
	)
}

export default ProductRow
