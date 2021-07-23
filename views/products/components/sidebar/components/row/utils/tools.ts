// UTILS
import { changeProductsCategory, updateProductsCategory } from 'utils/products'
import { filterProducts } from '../../../../../utils/tools'

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
) => {
	const newValue = ev.target.value
	setSave(newValue !== category)
	setValue(newValue)
}

interface SaveCategoryProps {
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>
	onChange: (newCategory?: string) => unknown
	onClose: () => unknown
	companyID?: string
	category: string
	filter: string
	value: string
}
/**
 * Guardar categoria
 * @description Guardar y actualiza la fila de categoria
 * @param  {SaveCategoryProps} props
 */
export const saveCategory = ({
	value,
	filter,
	onClose,
	category,
	onChange,
	companyID,
	setProducts,
}: SaveCategoryProps) => {
	onChange(value)
	updateProductsCategory(category, value, companyID)
	setProducts((prevProducts: Product[]) =>
		filterProducts(changeProductsCategory(prevProducts, category, value), filter)
	)
	onClose()
}

export default onChangeCategory
