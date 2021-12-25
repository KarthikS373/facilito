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
												<Image
													width={50}
													height={50}
													unoptimized
													alt='Product'
													src={product.picture}
												/>
											</div>

											{/* CONTENIDO */}
											<div>
												{product.category && <span>{product.category}</span>}
												<span>{`${product.count} x ${product.title}`}</span>
												<strong>
													{props.formData?.badge} {(+product.price)?.toFixed(2) ?? '0.00'}
												</strong>

												{/* INFORMACIÓN DE EXTRAS */}
												<div className={Styles.shopProductExtra}>
													{props.formProducts !== undefined &&
														(props.formProducts[`extras_${resp}`]
															? // @ts-ignore
															  props.formProducts[`extras_${resp}`][index].map(
																	(extra: ExtraProductData, extraIndex: number) => {
																		const extraPrice: number =
																			extra?.options
																				.map((opt) => opt.price)
																				.reduce((a, b) => a + b, 0) ?? 0

																		return (
																			<div key={`product_cart_${key}_${index}_extra_${extraIndex}`}>
																				<strong>
																					{extra?.title} +{props.formData?.badge}
																					{(+extraPrice).toFixed(2)}
																				</strong>
																				{extra?.options.map((option: ExtraOptional) => (
																					<span key={`extra_${resp}_${extraIndex}`}>
																						+ {option?.name}
																					</span>
																				))}
																			</div>
																		)
																	}
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
