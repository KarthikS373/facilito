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

	// PRECIOS VARIABLES
	const sortedPrices =
		product.variableExtras?.map((extra) => extra.price).sort((a, b) => a - b) ?? []

	return (
		<div
			className={Styles.row}
			style={{
				...style,
				backgroundColor: !product.active ? 'rgba(255, 0, 0, .03)' : '',
			}}>
			<span>
				{product.picture?.[0] && product.picture[0].length > 0 && (
					<Image
						src={product.picture ? product.picture[0] || '' : ''}
						alt={product.title}
						height={48}
						width={48}
					/>
				)}
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
				{!product.variable && (
					<>
						<i className={product.promoPrice ? Styles.disabledPrice : ''}>
							{businessCtx.business?.badge} {product.price}
						</i>
						{product.promoPrice && (
							<i>
								{businessCtx.business?.badge} {product.promoPrice}
							</i>
						)}
					</>
				)}

				{product.variable && (
					<>
						<i className={Styles.priceRange}>
							Desde: {businessCtx.business?.badge}
							{sortedPrices[0]}
						</i>
						<i className={Styles.priceRange}>
							Hasta: {businessCtx.business?.badge}
							{sortedPrices[sortedPrices.length - 1]}
						</i>
					</>
				)}
			</span>
			<IconButton onClick={handleRow}>
				<MoreVert />
			</IconButton>
		</div>
	)
}

export default ProductRow
