// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import { useTheme } from '@mui/material/styles'
import Collapse from '@mui/material/Collapse'

// ICONOS
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone'
import ArrowDropDown from '@mui/icons-material/ArrowDropDownOutlined'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import Skeleton from '@mui/material/Skeleton'

// COMPONENTES
import ProductBackdrop from './components/productBackdrop'
import ProductCard from './components/productCard'

// CONTEXTO
import FormContext from '../../context'

// HOOKS
import useProductsFilter, { useProductsRegister } from './hooks'
import sendProduct from './tools'

const ProductSlider: React.FC = () => {
	// PRODUCTOS
	const [productList, setProductList] = useState<Product[] | null>(null)

	// COLLAPSE
	const [collapsed, setCollapsed] = useState<boolean>(false)

	// BACKDROP
	const [currentProduct, setCurrentProduct] = useState<CurrentProduct | null>(null)

	// FORM PROPS
	const props = useContext(FormContext)

	// TEMA
	const theme = useTheme()

	// CAMBIAR COLLAPSED
	const toggleCollapsed = () => setCollapsed(!collapsed)

	// ENVIAR A TIENDA
	const sendProductEv = (product: ProductSelected, index: number) =>
		sendProduct(product, index, props, setProductList)

	// EVENTOS DE BACKDROP
	const openBackdropProduct = (product: CurrentProduct) => () => setCurrentProduct(product)
	const closeBackdropProduct = () => setCurrentProduct(null)

	// LISTA DE PRODUCTOS CON FALLBACK
	const fallBackProducts: (Product | null)[] = productList ?? Array(3).fill(null)

	// REGISTRAR
	useProductsRegister(props.register, props.required, props.name, props.id)

	// OBTENER PRODUCTOS
	useProductsFilter(setProductList, props.productsList, props.products)

	return (
		<>
			<div
				style={
					props.allowProductDropdown
						? {
								border: '2px solid rgba(0,0,0,.3)',
								borderColor: !collapsed ? theme.palette.primary.main : 'transparent',
								padding: '20px',
								borderRadius: 'var(--radius)',
						  }
						: undefined
				}
				className={Styles.dropDownLabel}
				onClick={props.allowProductDropdown ? toggleCollapsed : undefined}>
				{props.allowProductDropdown && <ShoppingBagTwoToneIcon color='primary' />}
				<h3 className={Styles.title} style={{ fontSize: '1rem' }}>
					{props.label}
				</h3>
			</div>
			{props.allowProductDropdown && (
				<ArrowDropDown
					className={Styles.dropdownIcon}
					style={{ transform: `rotateZ(${collapsed ? '180' : '0'}deg)` }}
				/>
			)}
			<Collapse in={props.allowProductDropdown ? collapsed : true}>
				<div className={Styles.sliderContainer}>
					<div className={Styles.slider}>
						{fallBackProducts &&
							fallBackProducts.map((productSpace: Product | null, key: number) =>
								productSpace ? (
									<ProductCard
										key={`product_card_${props.name}_${props.id}_${key}`}
										openBackdropProduct={openBackdropProduct}
										productSpace={productSpace}
										index={key}
									/>
								) : (
									<div
										className={Styles.skeleton}
										key={`product_skeleton_${props.name}_${props.id}_${key}`}>
										<Skeleton variant='rectangular' width={200} height={196} animation='wave' />
										<div>
											<Skeleton variant='text' />
											<Skeleton variant='text' />
											<Skeleton variant='text' />
											<Skeleton variant='text' />
											<Skeleton
												variant='rectangular'
												className={Styles.btn}
												width={170}
												height={40}
											/>
										</div>
									</div>
								)
							)}
					</div>
				</div>
			</Collapse>
			<span className={Styles.helperOrError}>
				{props.error && <InfoOutlined />} {props.helper}
			</span>
			<ProductBackdrop
				closeBackdropProduct={closeBackdropProduct}
				showCaseMode={props.showcaseMode}
				currentProduct={currentProduct}
				onAddProduct={sendProductEv}
				name={props.name}
				id={props.id}
			/>
		</>
	)
}

export default ProductSlider
