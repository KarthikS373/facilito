// REACT
import React, { useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import { useTheme } from '@mui/material/styles'
import Collapse from '@mui/material/Collapse'

// ICONOS
import ArrowDropDown from '@mui/icons-material/ArrowDropDownOutlined'
import ShoppingCart from '@mui/icons-material/ShoppingCartTwoTone'
import InfoOutlined from '@mui/icons-material/InfoOutlined'

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
	const [productList, setProductList] = useState<Product[]>([])

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

	// ENVIAR A FORMULARIO
	const sendProductEv = (product: ProductSelected, index: number) =>
		sendProduct(product, index, props, setProductList)

	// EVENTOS DE BACKDROP
	const openBackdropProduct = (product: CurrentProduct) => () => setCurrentProduct(product)
	const closeBackdropProduct = () => setCurrentProduct(null)

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
								padding: '18.5px 32px 18.5px 14px',
								borderRadius: '15px',
						  }
						: undefined
				}
				className={Styles.dropDownLabel}
				onClick={props.allowProductDropdown ? toggleCollapsed : undefined}>
				{props.allowProductDropdown && <ShoppingCart />}
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
						{productList &&
							productList.map((productSpace: Product | null, key: number) => (
								<ProductCard
									key={`product_card_${props.name}_${props.id}_${key}`}
									openBackdropProduct={openBackdropProduct}
									productSpace={productSpace}
									index={key}
								/>
							))}
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
