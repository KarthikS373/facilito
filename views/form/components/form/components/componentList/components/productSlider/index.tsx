// REACT
import React, { useEffect, useState, useContext } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import { useTheme } from '@mui/material/styles'

// ICONOS
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ShoppingCart from '@mui/icons-material/ShoppingCart'

// COMPONENTES
import ProductBackdrop from './components/productBackdrop'
import ProductCard from './components/productCard'

// CONTEXTO
import FormContext from '../../context'
import Collapse from '@mui/material/Collapse'

const ProductSlider: React.FC = () => {
	// PRODUCTOS
	const [productList, setProductList] = useState<Product[]>([])

	// COLLAPSE
	const [collapsed, setCollapsed] = useState<boolean>(false)

	// BACKDROP
	const [currentProduct, setCurrentProduct] = useState<CurrentProduct | null>(null)
	const openBackdropProduct = (product: CurrentProduct) => () => setCurrentProduct(product)
	const closeBackdropProduct = () => setCurrentProduct(null)

	// FORM PROPS
	const props = useContext(FormContext)

	// TEMA
	const theme = useTheme()

	// CAMBIAR COLLAPSED
	const toggleCollapsed = () => setCollapsed(!collapsed)

	// ENVIAR A FORMULARIO
	const sendProduct = (product: ProductSelected, index: number) => {
		// AGREGAR PRODUCTO
		const products: FormProductSliderAnswer[] = props.formProducts
			? ((props.formProducts[`${props.name}_${props.id}`] || []) as FormProductSliderAnswer[])
			: []
		const tmpProductList = [...productList]
		const extras: ExtraOptional[][] = props.formProducts
			? ((props.formProducts[`extras_${props.name}_${props.id}`] || []) as ExtraOptional[][])
			: []

		// ACTUALIZAR LISTA CON CONTADORES
		tmpProductList[index] = {
			...tmpProductList[index],
			count: tmpProductList[index].count - product.count,
		}

		// AGREGAR
		const sliderProduct: FormProductSliderAnswer = {
			picture: product.product.picture ? product.product.picture[0] : '',
			stockOption: product.product.stockOption,
			productCount: product.product.count,
			category: product.product.category,
			totalPrice: product.totalPrice,
			title: product.product.title,
			sku: product.product.sku,
			count: product.count,
		}
		products.push(sliderProduct)
		extras.push(product.extras)

		// PRECIO TOTAL
		const totalPrice: number = products
			.map((productVal: FormProductSliderAnswer) => productVal.totalPrice)
			.reduce((price: number, nextPrice: number) => price + nextPrice, 0)

		// ENVIAR
		if (props.setValue) {
			props.setValue(`products.summary_${props.name}_${props.id}`, totalPrice)
			props.setValue(`products.extras_${props.name}_${props.id}`, extras)
			props.setValue(`products.${props.name}_${props.id}`, products)
		}

		// ACTUALIZAR LISTA
		setProductList(tmpProductList)
	}

	// REGISTRAR
	useEffect(() => {
		if (props.register) {
			props.register(`products.summary_${props.name}_${props.id}`, {
				required: props.required,
				validate: (value) => typeof value === 'number',
			})
			props.register(`products.extras_${props.name}_${props.id}`)
			props.register(`products.${props.name}_${props.id}`, { required: props.required })
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.name, props.id])

	// OBTENER PRODUCTOS
	const productsProps = props.products
	const products = props.productsList

	useEffect(() => {
		// PRODUCTOS
		const productsFilter: Product[] = productsProps
			?.map((id: string) => {
				// BUSCAR
				let current = -1
				products.forEach((product: Product, pIndex: number) => {
					if (product.sku === id) current = pIndex
				})

				// RETORNAR
				if (current >= 0) return products[current]
				else return undefined
			})
			.filter(Boolean)
			.sort((prevProduct?: Product) => (prevProduct?.featured ? -1 : 0)) as Product[]

		setProductList(productsFilter)
	}, [productsProps, products])

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
			<ArrowDropDown
				className={Styles.dropdownIcon}
				style={{ transform: `rotateZ(${collapsed ? '180' : '0'}deg)` }}
			/>
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

			<ProductBackdrop
				closeBackdropProduct={closeBackdropProduct}
				showCaseMode={props.showcaseMode}
				currentProduct={currentProduct}
				onAddProduct={sendProduct}
				name={props.name}
				id={props.id}
			/>
		</>
	)
}

export default ProductSlider
