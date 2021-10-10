// REACT
import React, { useState } from 'react'

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

// PROPIEDADES
export interface FormSearchProps {
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
	useProductList(props, setProductsList)

	// REGISTRAR
	useCustomRegister(props)

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
						label={$`Buscar productos`}
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
