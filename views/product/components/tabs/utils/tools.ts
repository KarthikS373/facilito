/**
 * Cambiar producto
 * @description Actualiza en la DB y en el contexto las propiedades de un producto
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {React.MutableRefObject<Product>} localProduct
 * @param  {React.Dispatch<React.SetStateAction<Product>>} setGeneralState
 */
const changeProductProps = (
	ev: React.ChangeEvent<HTMLInputElement>,
	localProduct: React.MutableRefObject<Product>,
	setGeneralState: React.Dispatch<React.SetStateAction<Product>>
) => {
	// EVENTOS
	const { name, value } = ev.target

	// UPDATE
	setGeneralState((prevProduct: Product) => {
		// COPIA
		const newProduct = { ...prevProduct, [name]: value }
		const refProduct = { ...newProduct }

		// ELIMINAR NUEVA CATEGORIA
		if (refProduct['new_category']?.length) {
			refProduct.category = refProduct['new_category'].toString()
			delete refProduct['new_category']
		}

		// RENDER
		localProduct.current = refProduct
		return newProduct
	})
}

export default changeProductProps
