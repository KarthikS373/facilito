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
) => {
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
	categories: string[],
	setBusinessDB: (business: Partial<Business>) => unknown
) => {
	// CREAR NUEVA LISTA
	const newCategories: string[] = categories.filter(
		(_category: string, catIndex: number) => catIndex !== index
	)

	// GUARDAR EN DB
	setBusinessDB({ categories: newCategories })
}
