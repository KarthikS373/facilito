import React from 'react'

// MATERIAL
import InputAdornment from '@mui/material/InputAdornment'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

// ICONOS
import Search from '@mui/icons-material/Search'

// ALERTA DE PRODUCTOS
const searchProducts = (
	$: TemplateStrBuilder,
	closeSearchProducts: EmptyFunction,
	setProductList: SetState<string[]>,
	companyProducts: Product[],
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	closeSearchProducts()

	// LEER PRODUCTOS
	let tmpProduct: Product | undefined

	// GUARDAR PRODUCTO
	const saveProduct = (_ev: unknown, product: string | Product | null) => {
		// AGREGAR
		if (product && typeof product !== 'string') tmpProduct = product
	}

	// MOSTRAR
	window.Alert({
		type: 'confirm',
		title: 'Buscar productos',
		body: 'Utiliza el siguiente buscador para seleccionar un producto y agregarlo a tu bloque de productos, solo puedes seleccionar un producto a la vez.',
		onHide: () => window.hideAlert(),
		onConfirm: () => {
			// AGREGAR
			if (tmpProduct) {
				setProductList((prevProducts) => {
					const listCopy = [...prevProducts]
					if (tmpProduct?.sku) listCopy.unshift(tmpProduct?.sku)

					// ENVIAR
					if (onChange) onChange('products', listCopy)
					return listCopy
				})
			}
		},
		customElements: (
			<div style={{ position: 'relative', marginTop: '10px' }}>
				<Autocomplete
					freeSolo
					id='product-search'
					options={companyProducts || []}
					getOptionLabel={(option) => (option ? option.title : '')}
					onChange={saveProduct}
					noOptionsText='Sin productos'
					renderInput={(params) => (
						<TextField
							{...params}
							label={$`Buscar productos`}
							margin='normal'
							variant='outlined'
							fullWidth
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
			</div>
		),
	})
}

export default searchProducts
