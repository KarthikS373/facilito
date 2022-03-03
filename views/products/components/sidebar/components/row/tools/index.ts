// UTILS
import { changeProductsCategory } from 'utils/products'

/**
 * Cambiar categoria
 * @param  {string} category
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {SetState<boolean>} setSave
 * @param  {SetState<string>} setValue
 */
const onChangeCategory = (
	category: string,
	ev: React.ChangeEvent<HTMLInputElement>,
	setSave: SetState<boolean>,
	setValue: SetState<string>
): void => {
	const newValue = ev.target.value
	setSave(newValue !== category)
	setValue(newValue)
}

interface SaveCategoryProps {
	setProducts: (
		products: Record<string, Product>,
		merge?: boolean,
		initialSKU?: string,
		onSuccess?: () => unknown
	) => unknown
	onChange: (newCategory: string) => unknown
	products: Record<string, Product>
	onClose: () => unknown
	category: string
	value: string
}

/**
 * Guardar categoria
 * @param  {SaveCategoryProps} options
 */
export const saveCategory = (options: SaveCategoryProps): void => {
	// CLAVES
	const keys: string[] = Object.keys(options.products)

	// ACTUALIZAR
	options.onChange(options.value)
	options.setProducts(
		Object.fromEntries(
			changeProductsCategory(Object.values(options.products), options.category, options.value).map(
				(product: Product, index: number) => [keys[index], product]
			)
		),
		false,
		''
	)

	// CERRAR
	options.onClose()
}

export default onChangeCategory
