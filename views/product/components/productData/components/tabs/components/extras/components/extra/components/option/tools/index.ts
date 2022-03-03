/**
 * Cambiar opcion
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {number} extraIndex
 * @param  {number} optionIndex
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
