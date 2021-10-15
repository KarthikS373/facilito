/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React from 'react'

// NEXT
import Image from 'next/image'

// TOOLS
import removeProducts from './tools'

// MATERIAL
import IconButton from '@mui/material/IconButton'

// ICONOS
import Remove from '@mui/icons-material/Remove'

// ESTILOS
import Styles from './style.module.scss'

// HOOKS
import useStrings from 'hooks/lang'

// PROPS
interface ProductSidebarProps {
	formProducts: FormDataProductSliderAnswer | undefined
	setFieldValue: (field: string, value: unknown) => void
	productsCounter: number[]
	totalPrice: string
	formData?: Form
}

const ProductSidebarList: React.FC<ProductSidebarProps> = (props: ProductSidebarProps) => {
	// STRINGS
	const { $ } = useStrings()

	// REMOVER PRODUCTOS
	const deleteProducts = (resp: string, index: number) => () =>
		removeProducts(props.formProducts, index, resp, props.setFieldValue)

	return (
		<>
			{/* CANTIDAD DE PRODUCTOS */}
			<p>
				{$`Resumen de compra:`} ({props.productsCounter[1]})
			</p>
			<div className={Styles.shopProductList}>
				{props.totalPrice &&
					props.formProducts !== undefined &&
					Object.keys(props.formProducts).map((resp: string, key: number) => {
						if (!resp.startsWith('extras') && !resp.startsWith('summary')) {
							if (props.formProducts && typeof props.formProducts[resp] === 'object')
								// @ts-ignore
								return props.formProducts[resp].map(
									(product: FormProductSliderAnswer, index: number) => (
										// TARJETA
										<div className={Styles.shopProductRow} key={`product_cart_${key}_${index}`}>
											{/* IMAGEN */}
											<div className={Styles.pic}>
												<Image height={50} width={50} src={product.picture} alt='Product' />
											</div>

											{/* CONTENIDO */}
											<div>
												{product.category && <span>{product.category}</span>}
												<span>{`${product.count} x ${product.title}`}</span>
												<strong>
													{props.formData?.badge}{' '}
													{product.totalPrice ? product.totalPrice.toFixed(2) : ''}
												</strong>

												{/* INFORMACIÓN DE EXTRAS */}
												<div className={Styles.shopProductExtra}>
													{props.formProducts !== undefined &&
														(props.formProducts[`extras_${resp}`]
															? // @ts-ignore
															  props.formProducts[`extras_${resp}`][index].map(
																	(extra: ExtraOptional, extraIndex: number) => (
																		<span key={`extra_${resp}_${extraIndex}`}>+ {extra?.name}</span>
																	)
															  )
															: null)}
												</div>
											</div>

											{/* QUITAR PRODUCTO DE LISTA */}
											<IconButton onClick={deleteProducts(resp, index)}>
												<Remove />
											</IconButton>
										</div>
									)
								)
							else return null
						} else return null
					})}
			</div>
		</>
	)
}

export default ProductSidebarList
