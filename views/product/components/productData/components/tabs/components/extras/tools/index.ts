/**
 * Agregar extra
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {SetState<ExtendedExtra[]>} setExtras
 */
const addExtra = (
	productRef: React.MutableRefObject<Product>,
	setExtras: SetState<ExtendedExtra[]>
): void => {
	setExtras((prevExtras: ExtendedExtra[]) => {
		const newExtras = [...prevExtras]
		newExtras.push({
			title: '',
			type: 0,
			options: [],
			required: false,
			id: prevExtras.length,
		})
		productRef.current.extras = newExtras
		return newExtras
	})
}

export default addExtra

/**
 * Remover extra
 * @param  {number} extIndex
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {SetState<ExtendedExtra[]>} setExtras
 */
export const removeExtra = (
	extIndex: number,
	productRef: React.MutableRefObject<Product>,
	setExtras: SetState<ExtendedExtra[]>
): void => {
	setExtras((prevExtras: ExtendedExtra[]) => {
		const newExtras = [...prevExtras].filter((_ext, index: number) => index !== extIndex)
		productRef.current.extras = newExtras
		return newExtras
	})
}
