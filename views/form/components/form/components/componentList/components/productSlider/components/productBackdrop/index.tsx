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

// TOOLS
import sendProduct, { addExtra, handleProductCounter, onClose } from './tools'

export interface ProductBackdropProps {
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

	// CONTADOR DE EXTRAS
	const [extrasCounter, setExtrasCounter] = useState<(ExtraOptional[] | undefined)[]>([])

	// CONTADOR DE PRODUCTOS
	const [productsCounter, setProductsCounter] = useState<number>(0)

	// AGREGAR A CONTADOR
	const handleProductCounterEv = (add: number) => () =>
		handleProductCounter(add, props, setProductsCounter)

	// ENVIAR PRODUCTO
	const sendProductEv = () =>
		sendProduct(props, setExtrasCounter, extrasCounter, setProductsCounter, productsCounter)

	// AGREGAR EXTRA SELECCIÓN UNICA
	const addExtraEv = (index: number) => (extra: ExtraOptional[] | undefined) =>
		addExtra(index, extra, setExtrasCounter)

	// REINICIAR
	const onCloseEv = () => onClose(setProductsCounter, props.closeBackdropProduct)

	return (
		<Backdrop className={Styles.productBackdrop} open={Boolean(props.currentProduct)}>
			{props.currentProduct?.product && (
				<>
					<IconButton onClick={onCloseEv} className={Styles.backdropClose}>
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
								<Button variant='contained' onClick={handleProductCounterEv(-1)}>
									-
								</Button>
								<Button>{productsCounter}</Button>
								<Button variant='contained' onClick={handleProductCounterEv(1)}>
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
													<ExtraSelect extra={extra} onSelect={addExtraEv(key)} />
												) : extra.type === 1 ? (
													<ExtraMultiple extra={extra} onSelect={addExtraEv(key)} />
												) : (
													<ExtraLimited extra={extra} onSelect={addExtraEv(key)} />
												)}
											</div>
										)
									} else return null
								})}
							{!props.showCaseMode && (
								<Button
									color='primary'
									variant='contained'
									onClick={sendProductEv}
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
