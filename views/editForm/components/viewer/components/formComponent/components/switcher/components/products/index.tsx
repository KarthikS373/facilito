/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React, { useState, MouseEvent, useContext } from 'react'

// ESTILOS
import StylesGlb from '../../../../style.module.scss'
import Styles from './style.module.scss'

// NEXT
import Image from 'next/image'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputAdornment from '@mui/material/InputAdornment'
import Autocomplete from '@mui/material/Autocomplete'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Input from '@mui/material/Input'
import Menu from '@mui/material/Menu'

// DND
import {
	DragDropContext,
	DropResult,
	Droppable,
	Draggable,
	DroppableProvided,
} from 'react-beautiful-dnd'

// ICONOS
import Search from '@mui/icons-material/SearchTwoTone'
import Close from '@mui/icons-material/Close'
import Add from '@mui/icons-material/Add'

// UTILS
import FormContext from 'views/editForm/components/viewer/context'
import { useCompanyProducts } from 'hooks/business'
import BusinessContext from 'context/business'
import useStrings from 'hooks/lang'

const ProductSlider: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()
	const company = useContext(BusinessContext)

	// CONTEXTO
	const props = useContext(FormContext)

	// PRODUCTOS
	const [companyProducts, setCompanyProducts] = useState<Product[] | null>([])
	const [productsList, setProductList] = useState<string[]>(
		props.products ? [...props.products] : ['']
	)

	// CATEGORÍAS
	const [selectedCategory, setSelectedCategory] = useState<string>('')

	// MENU DE BÚSQUEDA
	const [openSearchProducts, setOpenSearchProducts] = useState<HTMLInputElement | null>(null)

	// REORDENAR DRAG N DROP
	const handleDragNDrop = (res: DropResult) => {
		setProductList((prevProductList: string[]) => {
			const tmpList = [...prevProductList]
			const [reorderedItem] = tmpList.splice(res.source.index, 1)

			// AGREGAR A ESTADO Y REFERENCIA
			tmpList.splice(res.destination?.index || 0, 0, reorderedItem)

			// ACTUALIZAR
			props.onChange && props.onChange('products', tmpList)
			return tmpList
		})
	}

	// ABRIR MENU DE BÚSQUEDA
	const handleSearchProducts = (ev: MouseEvent<HTMLInputElement>) =>
		setOpenSearchProducts(ev.currentTarget)
	const closeSearchProducts = () => setOpenSearchProducts(null)

	// REMOVER PRODUCTOS
	const removeProduct = (index: number) => () => {
		// ELIMINAR
		const productsCopy = [...productsList]
		const filteredProducts = productsCopy.filter((_product: string, key: number) => index !== key)

		// ACTUALIZAR
		setProductList(filteredProducts)
		props.onChange && props.onChange('products', filteredProducts)
	}

	// CARGAR CATEGORÍA
	const setCategory = (ev: SelectChangeEvent) => {
		// CERRAR
		closeSearchProducts()

		// SELECCIONAR
		const category: string = ev.target.value as string
		setSelectedCategory(category)

		// ASIGNAR A SLIDER
		const companyCategories: string[] | undefined = company.business?.categories
		if (companyCategories) {
			const products: string[] = companyProducts
				?.map((product: Product) => (product.category === category ? product.sku : false))
				.filter(Boolean) as string[]
			// ACTUALIZAR
			products.push('')
			setProductList(products)

			// ENVIAR
			props.onChange && props.onChange('products', products)
		}
	}

	// ALERTA DE PRODUCTOS
	const productsAlert = async () => {
		closeSearchProducts()

		// LEER PRODUCTOS
		const listCopy = [...productsList]
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
					listCopy.unshift(tmpProduct.sku)
					setProductList(listCopy)

					// ENVIAR
					props.onChange && props.onChange('products', listCopy)
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

	// OBTENER TODOS LOS PRODUCTOS
	useCompanyProducts(setCompanyProducts, true, company.business?.id ?? null, true)

	return (
		<>
			<Input
				placeholder={$`Describe el titulo de estos productos`}
				required
				defaultValue={props.label}
				className={`${StylesGlb.label} ${props.preview && StylesGlb.labelPreview}`}
				id={`${props.name}_${props.id}`}
				inputProps={{ 'aria-label': 'Answer' }}
				onChange={props.onWrite && props.onWrite('label')}
			/>
			{props.required && props.preview && <span className={StylesGlb.requiredSpan}>＊</span>}
			<input
				required
				aria-label='Helper'
				defaultValue={props.helper}
				id={`${props.name}_helper_${props.id}`}
				placeholder={$`Agrega un texto de ayuda`}
				className={`${StylesGlb.label} ${StylesGlb.helper}`}
				onChange={props.onWrite && props.onWrite('helper')}
			/>
			<DragDropContext onDragEnd={handleDragNDrop}>
				<div
					className={Styles.sliderContainer}
					style={props.preview ? { marginBottom: '25px' } : undefined}>
					<Droppable droppableId={`products_${props.id}`} direction='horizontal'>
						{(provided: DroppableProvided) => (
							<div className={Styles.slider} {...provided.droppableProps} ref={provided.innerRef}>
								{productsList.map((productId: string, key: number) => {
									// PRODUCTO
									const currentProduct: Product | undefined = companyProducts?.find(
										(product: Product) => (product ? product.sku === productId : false)
									)
									// PRODUCTOS

									return (
										<Draggable
											index={key}
											draggableId={`product_${props.id}_${key}`}
											key={`product_${props.id}_${key}`}>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													className={Styles.productItemDrag}>
													<span>{currentProduct ? currentProduct.title : $`Agregar producto`}</span>
													<div
														className={Styles.product}
														onClick={currentProduct ? undefined : handleSearchProducts}>
														{currentProduct && (
															<IconButton
																size='small'
																onClick={removeProduct(key)}
																className={Styles.productClose}>
																<Close />
															</IconButton>
														)}
														{productId ? (
															<Image
																unoptimized
																src={currentProduct?.picture[0] ?? '/images/logo.png'}
																alt={currentProduct?.picture[0]}
																height={150}
																width={150}
															/>
														) : (
															<Add />
														)}
													</div>
												</div>
											)}
										</Draggable>
									)
								})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</div>
			</DragDropContext>
			<Menu
				keepMounted
				anchorEl={openSearchProducts}
				open={Boolean(openSearchProducts)}
				onClose={closeSearchProducts}
				id='products-menu'>
				<MenuItem>
					<FormControl fullWidth>
						<InputLabel id='category-select'>{$`Categoría`}</InputLabel>
						<Select
							label={$`Categoría`}
							fullWidth
							id='category-select'
							onChange={setCategory}
							labelId='category-select'
							value={selectedCategory}>
							{company.business?.categories?.map((category: string, key: number) => (
								<MenuItem key={`product_select_${key}`} value={category}>
									{category}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</MenuItem>
				<MenuItem onClick={productsAlert}>
					<Search style={{ marginRight: '10px' }} color='primary' />
					{$`Buscar producto`}
				</MenuItem>
			</Menu>
		</>
	)
}

export default ProductSlider
