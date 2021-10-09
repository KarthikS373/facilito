// UTILS
import { changeProductsCategory } from 'utils/products'

/**
 * Cambiar categoria
 * @description Guardar y actualiza la fila de categoria
 * @param  {string} category
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {React.Dispatch<React.SetStateAction<boolean>>} setSave
 * @param  {React.Dispatch<React.SetStateAction<string>>} setValue
 */
const onChangeCategory = (
	category: string,
	ev: React.ChangeEvent<HTMLInputElement>,
	setSave: React.Dispatch<React.SetStateAction<boolean>>,
	setValue: React.Dispatch<React.SetStateAction<string>>
): void => {
	const newValue = ev.target.value
	setSave(newValue !== category)
	setValue(newValue)
}

interface SaveCategoryProps {
	setProducts: (products: { [id: string]: Product }, merge?: boolean) => unknown
	onChange: (newCategory: string) => unknown
	products: { [id: string]: Product }
	onClose: () => unknown
	category: string
	value: string
}
/**
 * Guardar categoria
 * @description Guardar y actualiza la fila de categoria
 * @param  {SaveCategoryProps} props
 */
export const saveCategory = ({
	value,
	onClose,
	category,
	onChange,
	products,
	setProducts,
}: SaveCategoryProps): void => {
	// CLAVES
	const keys: string[] = Object.keys(products)

	// ACTUALIZAR
	onChange(value)
	setProducts(
		Object.fromEntries(
			changeProductsCategory(Object.values(products), category, value).map(
				(product: Product, index: number) => [keys[index], product]
			)
		)
	)

	// CERRAR
	onClose()
}

export default onChangeCategory
