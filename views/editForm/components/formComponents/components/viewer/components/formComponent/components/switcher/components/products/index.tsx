/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React, { useState, MouseEvent, useContext } from 'react'

// ESTILOS
import StylesGlb from '../../../../style.module.scss'
import Styles from './style.module.scss'

// NEXT
import Image from 'next/image'

// COMPONENTES
import NaturalDragAnimation from 'components/naturalDnd'
import searchProducts from './components/search'

// MATERIAL
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
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
import handleDragNDrop, { removeProduct, setCategory } from './tools'
import FormContext from '../../../../../../context'
import BusinessContext from 'context/business'
import ProductsContext from 'context/products'
import useStrings from 'hooks/lang'

const ProductSlider: React.FC = () => {
	// STRINGS
	const { $ } = useStrings()

	// NEGOCIO
	const company = useContext(BusinessContext)

	// CONTEXTO
	const props = useContext(FormContext)

	// PRODUCTOS
	const productsCtx = useContext(ProductsContext)
	const companyProducts = Object.values(productsCtx.products)

	// LISTA DE PRODUCTOS
	const [productsList, setProductList] = useState<string[]>(props.products ?? [])

	// CATEGORÍAS
	const [selectedCategory, setSelectedCategory] = useState<string>('')

	// MENU DE BÚSQUEDA
	const [openSearchProducts, setOpenSearchProducts] = useState<HTMLInputElement | null>(null)

	// REORDENAR DRAG N DROP
	const dndEvent = (res: DropResult) => handleDragNDrop(res, setProductList, props.onChange)

	// ABRIR MENU DE BÚSQUEDA
	const handleSearchProducts = (ev: MouseEvent<HTMLInputElement>) =>
		setOpenSearchProducts(ev.currentTarget)

	// CERRAR BUSQUEDA
	const closeSearchProducts = () => setOpenSearchProducts(null)

	// REMOVER PRODUCTOS
	const removeProductEv = (index: number) => () =>
		removeProduct(index, setProductList, props.onChange)

	// BUSCAR PRODUCTOS
	const showSearchProducts = () =>
		searchProducts($, closeSearchProducts, setProductList, companyProducts, props.onChange)

	// CARGAR CATEGORÍA
	const setCategoryEv = (ev: SelectChangeEvent) =>
		setCategory(
			ev,
			closeSearchProducts,
			setSelectedCategory,
			companyProducts,
			company.business,
			setProductList,
			props.onChange
		)

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
			<DragDropContext onDragEnd={dndEvent}>
				<div
					className={Styles.sliderContainer}
					style={props.preview ? { marginBottom: '25px' } : undefined}>
					<div className={Styles.productItemDrag}>
						<span>{$`Agregar producto`}</span>
						<div onClick={handleSearchProducts} className={Styles.product}>
							<Add />
						</div>
					</div>
					<Droppable droppableId={`products_${props.id}`} direction='horizontal'>
						{(provided: DroppableProvided) => (
							<div className={Styles.slider} {...provided.droppableProps} ref={provided.innerRef}>
								{productsList.map((productId: string, key: number) => {
									// PRODUCTO
									const currentProduct: Product | undefined = companyProducts?.find(
										(product: Product) => (product ? product.sku === productId : false)
									)

									return (
										<Draggable
											index={key}
											draggableId={`product_${props.id}_${key}`}
											key={`product_${props.id}_${key}`}>
											{(providedDrag, snapshot) => (
												<NaturalDragAnimation
													style={providedDrag.draggableProps.style}
													snapshot={snapshot}>
													{(style) => (
														<div
															ref={providedDrag.innerRef}
															{...providedDrag.draggableProps}
															{...providedDrag.dragHandleProps}
															className={Styles.productItemDrag}
															style={style}>
															<span>{currentProduct?.title}</span>
															<div className={Styles.product}>
																{currentProduct && (
																	<IconButton
																		size='small'
																		onClick={removeProductEv(key)}
																		className={Styles.productClose}>
																		<Close />
																	</IconButton>
																)}
																{productId && (
																	<Image
																		unoptimized
																		src={currentProduct?.picture[0] ?? '/images/logo.png'}
																		alt={currentProduct?.picture[0]}
																		height={150}
																		width={150}
																	/>
																)}
															</div>
														</div>
													)}
												</NaturalDragAnimation>
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
							onChange={setCategoryEv}
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
				<MenuItem onClick={showSearchProducts}>
					<Search style={{ marginRight: '10px' }} color='primary' />
					{$`Buscar producto`}
				</MenuItem>
			</Menu>
		</>
	)
}

export default ProductSlider
