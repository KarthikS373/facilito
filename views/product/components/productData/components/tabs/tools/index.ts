/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/ban-ts-comment */

export interface GeneralProps {
	show: boolean
	productRef: React.MutableRefObject<Product>
}

/**
 * Cambiar producto
 * @param  {BaseEvent} ev
 * @param  {React.MutableRefObject<Product>} localProduct
 * @returns void
 */
const changeProductProps = (ev: BaseEvent, localProduct: React.MutableRefObject<Product>): void => {
	// EVENTOS
	const { name, value } = ev.target

	// COPIA
	const newProduct = { ...localProduct.current, [name]: value }

	// ELIMINAR NUEVA CATEGORIA
	// @ts-ignore
	if (newProduct['new_category']?.length) {
		newProduct.category = newProduct['new_category'].toString()
		delete newProduct['new_category']
	}

	// RENDER
	localProduct.current = newProduct
}

export default changeProductProps
