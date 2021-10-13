// REACT
import React, { useContext } from 'react'

// NEXT
import Image from 'next/image'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

// ICONS
import DoNotDisturbAltTwoToneIcon from '@mui/icons-material/DoNotDisturbAltTwoTone'
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import LocalOffer from '@mui/icons-material/LocalOffer'
import Star from '@mui/icons-material/Star'

// HOOKS
import useStrings from 'hooks/lang'
import FormContext from '../../../../context'

// PROPIEDADES
interface ProductCardProps {
	openBackdropProduct: (product: CurrentProduct) => EmptyFunction
	productSpace: Product | null
	index: number
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
	// CONTEXTO
	const eProps = useContext(FormContext)

	// VERIFICAR SI ES UN PRODUCTO CON CUPÓN
	const thisProductHasCoupon: boolean = props.productSpace
		? eProps.couponProducts.includes(props.productSpace?.sku)
		: false

	// TEMA Y STRINGS
	const theme = useTheme()
	const { $ } = useStrings()

	// PRODUCTO NO HABILITADO
	const unActive: boolean =
		!props.productSpace?.active ||
		(props.productSpace?.count === 0 && props.productSpace?.stockOption === 'lim')

	return (
		<div
			className={Styles.container}
			style={{
				pointerEvents: unActive ? 'none' : 'all',
			}}>
			<div className={Styles.badges}>
				{props.productSpace?.count === 0 && props.productSpace?.stockOption === 'lim' && (
					<Tooltip placement='top' title={$`Sin inventario`} arrow>
						<DoNotDisturbAltTwoToneIcon
							className={Styles.zero}
							style={{ background: theme.palette.primary.main }}
						/>
					</Tooltip>
				)}
				{props.productSpace?.isPromo && (
					<Tooltip placement='top' title={$`En oferta`} arrow>
						<LocalOffer style={{ background: theme.palette.primary.main }} />
					</Tooltip>
				)}
				{thisProductHasCoupon && (
					<Tooltip placement='top' title={$`Oferta con cupón`} arrow>
						<ConfirmationNumber style={{ background: theme.palette.primary.main }} />
					</Tooltip>
				)}
			</div>
			{props.productSpace && (
				<div
					className={Styles.product}
					style={{
						borderColor: theme.palette.primary.main,
					}}
					onClick={props.openBackdropProduct({
						index: props.index,
						product: props.productSpace,
					})}>
					{unActive && <div className={Styles.unActive}>{$`No disponible`}</div>}
					<Image
						height={196}
						width={196}
						src={props.productSpace.picture[0]}
						alt={props.productSpace.title}
					/>
					<div
						className={Styles.productContent}
						style={{ height: eProps.showcaseMode ? '110px' : '165px' }}>
						<div className={Styles.productBody}>
							<div className={Styles.productTitle}>
								{props.productSpace.featured && <Star />}{' '}
								<strong>{props.productSpace.title}</strong>
							</div>
							<span>{props.productSpace.description}</span>
							{props.productSpace.isPromo && props.productSpace.promoPrice ? (
								<span className={Styles.promoPrice}>
									{eProps.badge} {props.productSpace.promoPrice}
									<i>
										{eProps.badge} {props.productSpace.price}
									</i>
								</span>
							) : (
								<span className={Styles.promoPrice}>
									{eProps.badge} {props.productSpace.price}
								</span>
							)}
						</div>
						{!eProps.showcaseMode && (
							<Button
								fullWidth
								type='button'
								color='primary'
								variant='contained'
								startIcon={<ShoppingCart />}
								className={Styles.addToCart}>
								<span>{$`Agregar a carrito`}</span>
							</Button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default ProductCard
