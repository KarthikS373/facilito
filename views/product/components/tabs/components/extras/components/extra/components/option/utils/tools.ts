/**
 * Cambiar opcion
 * @description Actualiza en la DB y en el contexto las propiedades de un opcional
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {number} index
 * @param  {number} extraIndex
 * @param  {React.MutableRefObject<Product>} localProduct
 */
const changeOptionProps = (
	ev: React.ChangeEvent<HTMLInputElement>,
	index: number,
	extraIndex: number,
	localProduct: React.MutableRefObject<Product>
) => {
	// EVENTOS
	const { name, value } = ev.target

	// COPIA
	if (localProduct.current.extras[extraIndex]) {
		localProduct.current.extras[extraIndex].options[index] = {
			...localProduct.current.extras[extraIndex].options[index],
			[name]: value,
		}
	}
}

export default changeOptionProps
