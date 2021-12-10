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
	extraIndex: number,
	optionIndex: number,
	localProduct: React.MutableRefObject<Product>
): void => {
	// EVENTOS
	const { name, value } = ev.target

	// COPIA
	if (localProduct.current.extras && localProduct.current.extras[extraIndex]) {
		localProduct.current.extras[extraIndex].options[optionIndex] = {
			...localProduct.current.extras[extraIndex].options[optionIndex],
			[name]: value,
		}
	}
}

export default changeOptionProps
