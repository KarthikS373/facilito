// REACT
import React, { useEffect, useState } from 'react'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

// ICONOS
import Search from '@mui/icons-material/Search'

// REACT HOOK FORM
import { UseFormSetValue, UseFormRegister, FieldValues } from 'react-hook-form'

// HOOKS
import useStrings from 'hooks/lang'

// PROPIEDADES
interface FormSearchProps {
	formProducts: FormDataProductSliderAnswer | undefined
	register: UseFormRegister<FieldValues> | null
	setValue: UseFormSetValue<FieldValues> | null
	components: BlockComponent[]
	showCaseMode: boolean
	products: Product[]
	className?: string
}

const FormSearch: React.FC<FormSearchProps> = (props: FormSearchProps) => {
	// PRODUCTOS
	const [productsList, setProductsList] = useState<Product[]>([])

	// STRINGS
	const { $ } = useStrings()

	// AGREGAR PRODUCTOS
	useEffect(() => {
		// PRODUCTOS
		const newProductsList: Product[] = []

		// BUSCAR
		props.components.forEach((component: BlockComponent) => {
			if (component.name === 'products' && component.products) {
				component.products.forEach((sku: string) => {
					const currentProduct = props.products.find((product: Product) => product.sku === sku)
					if (currentProduct) newProductsList.push(currentProduct)
				})
			}
		})

		// ACTUALIZAR
		setProductsList(newProductsList)
	}, [props.products, props.components])

	// REGISTRAR
	useEffect(() => {
		if (props.register) {
			props.register(`products.summary_products_0`)
			props.register(`products.extras_products_0`)
			props.register(`products.products_0`)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{/* SEARCH */}
			<Autocomplete
				getOptionLabel={(product) => (product ? product.title : '')}
				noOptionsText={$`Sin productos`}
				options={productsList || []}
				className={props.className}
				key={`autocomplete_${0}`}
				id='product-search'
				freeSolo
				renderInput={(params) => (
					// INPUT
					<TextField
						{...params}
						margin='normal'
						label={$`Buscar`}
						variant='outlined'
						fullWidth
						InputProps={{
							...params.InputProps,
							type: 'text',
							startAdornment: (
								<InputAdornment position='start'>
									<Search color='primary' />
								</InputAdornment>
							),
						}}
					/>
				)}
			/>
		</>
	)
}

export default FormSearch
