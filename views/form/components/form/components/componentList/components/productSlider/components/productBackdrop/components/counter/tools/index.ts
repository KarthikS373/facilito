/**
 * Contador de extra
 * @param  {number} add
 * @param  {number} max
 * @param  {SetState<number>} setProductsCounter
 * @param  {(added:number)=>unknown} onChangeVal?
 */
const handleProductCounter = (
	add: number,
	max: number,
	setProductsCounter: SetState<number>,
	onChangeVal?: (added: number) => unknown
): void => {
	setProductsCounter((productsCounter: number) => {
		const added: number = Math.min(Math.max(0, productsCounter + add), max) || 0
		onChangeVal && onChangeVal(added)
		return added
	})
}

export default handleProductCounter
