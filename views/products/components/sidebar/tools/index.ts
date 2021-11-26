/**
 * Guardar categorias
 * @description Guardar en la DB las categorias y las remplaza en todos los productos
 * @param  {number} index
 * @param  {string} newCategory
 * @param  {string[]} categories
 * @param 	{(business: Partial<Business>) => unknown} setBusinessDB
 */
const saveAllCategories = (
	index: number,
	newCategory: string,
	categories: string[],
	setBusinessDB: (business: Partial<Business>) => unknown
): void => {
	// CREAR NUEVA LISTA
	const newCategories: string[] = categories.map((category: string, catIndex: number) =>
		catIndex !== index ? category : newCategory
	)

	// GUARDAR EN DB
	setBusinessDB({ categories: newCategories })
}

export default saveAllCategories

/**
 * Remover categorias
 * @description Quita una categoria de la DB y todos los productos
 * @param  {number} index
 * @param  {string[]} categories
 * @param 	{(business: Partial<Business>) => unknown} setBusinessDB
 */
export const removeAllCategories = (
	index: number,
	setCategories: React.Dispatch<React.SetStateAction<string[]>>,
	setBusinessDB: (business: Partial<Business>) => unknown
): void => {
	setCategories((prevCategories) => {
		// CREAR NUEVA LISTA
		const newCategories: string[] = prevCategories.filter(
			(_category: string, catIndex: number) => catIndex !== index
		)

		// GUARDAR EN DB
		setBusinessDB({ categories: newCategories })
		return newCategories
	})
}

/**
 * Agregar nueva categoria
 * @param setCategories
 */
export const addNewCategory = (
	setCategories: React.Dispatch<React.SetStateAction<string[]>>
): void => {
	setCategories((categories: string[]) => {
		const tmpCategories = [...categories]
		tmpCategories.push('')
		return tmpCategories
	})
}
