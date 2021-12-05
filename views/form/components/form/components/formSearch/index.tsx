// REACT
import React, { useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

// ICONOS
import Search from '@mui/icons-material/Search'

// REACT HOOK FORM
import { UseFormSetValue, UseFormRegister, FieldValues } from 'react-hook-form'

// HOOKS
import { useCustomRegister, useProductList } from './hooks'
import useStrings from 'hooks/lang'

// COMPONENTES
import ProductBackdrop from '../componentList/components/productSlider/components/productBackdrop'

// TOOLS
import closeBackdropProduct, { sendProduct } from './tools'

// PROPIEDADES
export interface FormSearchProps {
	formProducts: FormDataProductSliderAnswer | undefined
	register: UseFormRegister<FieldValues> | null
	setValue: UseFormSetValue<FieldValues> | null
	components: BlockComponent[]
	products: Product[] | null
	showCaseMode: boolean
}

const FormSearch: React.FC<FormSearchProps> = (props: FormSearchProps) => {
	// PRODUCTOS
	const [productsList, setProductsList] = useState<Product[]>([])

	// ID DE PRODUCTOS
	const [currentKey, setCurrentKey] = useState<number>(0)

	// CURRENT PRODUCT
	const [currentProduct, setCurrentProduct] = useState<CurrentProduct | null>(null)

	// STRINGS
	const { $ } = useStrings()

	// PRODUCTO ALEATORIO
	const randomProductName: string =
		productsList[Math.round(Math.min(Math.random() * productsList.length, productsList.length - 1))]
			?.title || $`Hamburguesas`

	// BACKDROP OPEN
	const openBackdropProduct = (_ev: unknown, product: Product | null | string) =>
		product && typeof product !== 'string' && setCurrentProduct({ product, index: 0 })

	// BACKDROP CLOSE
	const closeBackdropProductEv = () => closeBackdropProduct(setCurrentProduct, setCurrentKey)

	// GUARDAR PRODUCT
	const sendProductEv = (product: ProductSelected) =>
		sendProduct(product, props.formProducts, props.setValue)

	// AGRUPAR
	const groupBy = (option: Product) => option.category

	// AGREGAR PRODUCTOS
	useProductList(props, setProductsList)

	// REGISTRAR
	useCustomRegister(props)

	return (
		<>
			{/* SEARCH */}
			<Autocomplete
				freeSolo
				disableClearable
				groupBy={groupBy}
				id='product-search'
				className={Styles.search}
				options={productsList || []}
				onChange={openBackdropProduct}
				noOptionsText={$`Sin productos`}
				key={`autocomplete_${currentKey}`}
				getOptionLabel={(product) => (product ? product.title : '')}
				renderInput={(params) => (
					// INPUT
					<TextField
						{...params}
						fullWidth
						margin='normal'
						variant='outlined'
						label={$`Buscar productos`}
						placeholder={`${$`Ejemplo`}: ${randomProductName}`}
						InputProps={{
							...params.InputProps,
							type: 'text',
							endAdornment: <></>,
							startAdornment: (
								<InputAdornment position='start'>
									<Search color='primary' />
								</InputAdornment>
							),
						}}
					/>
				)}
			/>
			<ProductBackdrop
				closeBackdropProduct={closeBackdropProductEv}
				showCaseMode={props.showCaseMode}
				currentProduct={currentProduct}
				onAddProduct={sendProductEv}
				name='products'
				id={0}
			/>
		</>
	)
}

export default FormSearch
