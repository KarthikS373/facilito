// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'

// ICONOS
import Close from '@mui/icons-material/Close'
import Check from '@mui/icons-material/Check'

// HOOKS
import useStrings from 'hooks/lang'

// COMPONENTES
import SwipeViewer from './components/swipeViewer'
import ExtraMultiple from './components/multiple'
import ExtraLimited from './components/limited'
import ExtraSelect from './components/select'

// CONTEXTO
import FormContext from '../../../../context'

interface ProductBackdropProps {
	onAddProduct: (product: ProductSelected, index: number) => unknown
	currentProduct: CurrentProduct | null
	closeBackdropProduct: EmptyFunction
	showCaseMode: boolean
	name: string
	id: number
}

const ProductBackdrop: React.FC<ProductBackdropProps> = (props: ProductBackdropProps) => {
	// STRINGS
	const { $ } = useStrings()

	// BADGE
	const { badge } = useContext(FormContext)

	// CONTADOR DE PRODUCTOS
	const [productsCounter, setProductsCounter] = useState<number>(0)
	const [extrasCounter, setExtrasCounter] = useState<(ExtraOptional[] | undefined)[]>([])

	// AGREGAR A CONTADOR
	const handleProductCounter = (add: number) => () => {
		const added = Math.min(
			Math.max(0, productsCounter + add),
			props.currentProduct?.product.stockOption === 'inf'
				? Infinity
				: props.currentProduct?.product.stockOption === 'ctn'
				? Infinity
				: props.currentProduct?.product.count || 0
		)
		setProductsCounter(added)
	}

	// ENVIAR PRODUCTO
	const sendProduct = async () => {
		if (props.currentProduct?.product) {
			// // VALIDAR EXTRAS
			const invalidExtras: string[] = []
			if (props.currentProduct.product.extras)
				props.currentProduct.product.extras.forEach((extra: Extra, index: number) => {
					if (extra.required && !extrasCounter[index]) invalidExtras.push(extra.title)
				})

			// CREAR PRODUCTO A ENVIAR
			const extras = extrasCounter.filter(Boolean).flat() as ExtraOptional[]
			const price: number =
				(props.currentProduct?.product.isPromo
					? props.currentProduct?.product.promoPrice
					: props.currentProduct?.product.price) || 0
			const extrasPrice = extras
				.map((pExtra) => pExtra.price)
				.reduce((fExtra: number, nExtra: number) => fExtra + nExtra, 0)

			// PRODUCTO
			const cartProduct: ProductSelected = {
				product: props.currentProduct?.product,
				count: productsCounter,
				extras,
				totalPrice: price * productsCounter + extrasPrice,
			}

			// ENVIAR
			if (cartProduct.count > 0) {
				if (!invalidExtras.length) {
					// AGREGAR
					props.onAddProduct(cartProduct, props.currentProduct.index)

					// REINICIAR
					setProductsCounter(0)
					setExtrasCounter([])

					// CERRAR
					props.closeBackdropProduct()
				} else
					window.Alert({
						title: $`Ocurrió un error`,
						body: $`Las opciones o extras \"{{ extras }}\" son obligatorios, intenta nuevamente cuando se completen.`.replace(
							'{{ extras }}',
							invalidExtras.join(', ')
						),
						type: 'error',
					})
			} else
				window.Alert({
					title: $`Ocurrió un error`,
					body: $`Selecciona al menos un producto para poder agregar al carrito, o cierra esta ventana.`,
					type: 'error',
				})
		}
	}

	// AGREGAR EXTRA SELECCIÓN UNICA
	const addExtra = (index: number) => (extra: ExtraOptional[] | undefined) => {
		setExtrasCounter((extras: (ExtraOptional[] | undefined)[]) => {
			extras[index] = extra
			return extras
		})
	}

	// REINICIAR
	const onClose = () => {
		setProductsCounter(0)
		props.closeBackdropProduct()
	}

	return (
		<Backdrop className={Styles.productBackdrop} open={Boolean(props.currentProduct)}>
			{props.currentProduct?.product && (
				<>
					<IconButton onClick={onClose} className={Styles.backdropClose}>
						<Close />
					</IconButton>

					<div className={Styles.productContentBack}>
						<SwipeViewer
							images={props.currentProduct.product.picture}
							alts={props.currentProduct.product.picture.map(
								(_pic: string, index: number) => `${props.name}_${props.id}_pic_${index}`
							)}
						/>
						<div className={Styles.productInfo}>
							<h3>{props.currentProduct.product.title}</h3>
							<p>{props.currentProduct.product.description}</p>
							{props.currentProduct.product.category && (
								<p>
									<strong>{$`Categoría`}: </strong> {props.currentProduct.product.category}
								</p>
							)}
							<p>
								<strong>{$`Precio`}: </strong> {badge}
								{props.currentProduct.product.isPromo
									? props.currentProduct.product.promoPrice
									: props.currentProduct.product.price}
							</p>
							<p>
								<strong>{$`SKU`}: </strong> {props.currentProduct.product.sku}
							</p>
							<ButtonGroup
								className={Styles.productCounter}
								color='primary'
								aria-label='primary button group'>
								<Button variant='contained' onClick={handleProductCounter(-1)}>
									-
								</Button>
								<Button>{productsCounter}</Button>
								<Button variant='contained' onClick={handleProductCounter(1)}>
									+
								</Button>
							</ButtonGroup>
							{props.currentProduct.product.extras &&
								props.currentProduct.product.extras.map((extra: Extra, key: number) => {
									if (props.currentProduct) {
										return (
											<div className={Styles.productExtra} key={`extra_${key}`}>
												<span>{extra.title}</span>
												{extra.type === 0 ? (
													<ExtraSelect extra={extra} onSelect={addExtra(key)} />
												) : extra.type === 1 ? (
													<ExtraMultiple extra={extra} onSelect={addExtra(key)} />
												) : (
													<ExtraLimited extra={extra} onSelect={addExtra(key)} />
												)}
											</div>
										)
									} else return null
								})}
							{!props.showCaseMode && (
								<Button
									variant='contained'
									color='primary'
									onClick={sendProduct}
									className={Styles.addToCart}>
									<Check style={{ marginRight: '10px' }} />
									{$`Confirmar`}
								</Button>
							)}
						</div>
					</div>
				</>
			)}
		</Backdrop>
	)
}

export default ProductBackdrop
