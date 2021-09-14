/**
 * Cambiar producto
 * @description Actualiza en la DB y en el contexto las propiedades de un producto
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {React.MutableRefObject<Product>} localProduct
 */
const changeProductProps = (
	ev: React.ChangeEvent<HTMLInputElement>,
	localProduct: React.MutableRefObject<Product>
) => {
	// EVENTOS
	const { name, value } = ev.target

	// COPIA
	const newProduct = { ...localProduct.current, [name]: value }

	// ELIMINAR NUEVA CATEGORIA
	if (newProduct['new_category']?.length) {
		newProduct.category = newProduct['new_category'].toString()
		delete newProduct['new_category']
	}

	// RENDER
	localProduct.current = newProduct
}

export default changeProductProps
