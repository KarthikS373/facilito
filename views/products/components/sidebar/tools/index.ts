/**
 * Guardar categorias
 * @param  {number} index
 * @param  {string} newCategory
 * @param  {string[]} categories
 * @param  {(business:Partial<Business>)=>unknown} setBusinessDB
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
 * @param  {number} index
 * @param  {SetState<string[]>} setCategories
 * @param  {(business:Partial<Business>)=>unknown} setBusinessDB
 */
export const removeAllCategories = (
	index: number,
	setCategories: SetState<string[]>,
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
 * @param  {SetState<string[]>} setCategories
 */
export const addNewCategory = (setCategories: SetState<string[]>): void => {
	setCategories((categories: string[]) => {
		const tmpCategories = [...categories]
		tmpCategories.push('')
		return tmpCategories
	})
}
