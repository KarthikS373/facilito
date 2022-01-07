import { SelectChangeEvent } from '@mui/material/Select'
import { DropResult } from 'react-beautiful-dnd'

/**
 * Dnd de productos
 * @param res
 * @param setProductList
 * @param onChange
 */
const handleDragNDrop = (
	res: DropResult,
	setProductList: SetState<string[]>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	setProductList((prevProductList: string[]) => {
		const tmpList = [...prevProductList]
		const [reorderedItem] = tmpList.splice(res.source.index, 1)

		// AGREGAR A ESTADO Y REFERENCIA
		tmpList.splice(res.destination?.index || 0, 0, reorderedItem)

		// ACTUALIZAR
		if (onChange) onChange('products', tmpList)

		return tmpList
	})
}

/**
 * Borrar productos de slider
 * @param index
 * @param setProductList
 * @param onChange
 */
export const removeProduct = (
	index: number,
	setProductList: SetState<string[]>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	setProductList((prevProducts) => {
		// ELIMINAR
		const productsCopy = [...prevProducts]
		const filteredProducts = productsCopy.filter((_product: string, key: number) => index !== key)

		// ACTUALIZAR
		if (onChange) onChange('products', filteredProducts)
		return filteredProducts
	})
}

/**
 * Asignar nueva categoria
 * @param ev
 * @param closeSearchProducts
 * @param setSelectedCategory
 * @param companyProducts
 * @param company
 * @param setProductList
 * @param onChange
 */
export const setCategory = (
	ev: SelectChangeEvent,
	closeSearchProducts: EmptyFunction,
	setSelectedCategory: SetState<string>,
	companyProducts: Product[],
	company: Business | null,
	setProductList: SetState<string[]>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	// CERRAR
	closeSearchProducts()

	// SELECCIONAR
	const category: string = ev.target.value as string
	setSelectedCategory(category)

	// ASIGNAR A SLIDER
	const companyCategories: string[] | undefined = company?.categories
	if (companyCategories) {
		const products: string[] = companyProducts
			?.map((product: Product) => (product.category === category ? product.sku : false))
			.filter(Boolean) as string[]

		// ACTUALIZAR
		setProductList(products)

		// ENVIAR
		if (onChange) onChange('products', products)
	}
}

export default handleDragNDrop
