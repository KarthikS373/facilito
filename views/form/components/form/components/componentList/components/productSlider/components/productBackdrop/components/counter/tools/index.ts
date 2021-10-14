/**
 * Contador de extra
 * @description Cambiar contador de extra
 * @param add
 * @param setProductsCounter
 * @param onChangeVal
 */
const handleProductCounter = (
	add: number,
	max: number,
	setProductsCounter: React.Dispatch<React.SetStateAction<number>>,
	onChangeVal?: (added: number) => unknown
): void => {
	setProductsCounter((productsCounter: number) => {
		const added: number = Math.min(Math.max(0, productsCounter + add), max) || 0
		onChangeVal && onChangeVal(added)
		return added
	})
}

export default handleProductCounter
