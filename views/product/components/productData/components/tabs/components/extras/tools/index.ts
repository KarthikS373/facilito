/**
 * Agregar extra
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {SetState<ExtendedExtra[]>} setExtras
 */
const addExtra = (
	productRef: React.MutableRefObject<Product>,
	setExtras: SetState<ExtendedExtra[]>,
	setVariableExtras: SetState<EtendedExtraVariable[]>
): void => {
	if (productRef.current.variable) {
		setVariableExtras((prev: EtendedExtraVariable[]) => {
			const newExtras = [...prev, { id: prev.length, name: '', price: 0, count: 0 }]
			productRef.current.variableExtras = newExtras
			return newExtras
		})
	} else {
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
	setExtras: SetState<ExtendedExtra[]>,
	setVariableExtras: SetState<EtendedExtraVariable[]>
): void => {
	if (productRef.current.variable) {
		setVariableExtras((prev: EtendedExtraVariable[]) => {
			const newExtras = prev.filter(
				(_ext: EtendedExtraVariable, index: number) => index !== extIndex
			)
			productRef.current.variableExtras = newExtras
			return newExtras
		})
	} else {
		setExtras((prevExtras: ExtendedExtra[]) => {
			const newExtras = [...prevExtras].filter((_ext, index: number) => index !== extIndex)
			productRef.current.extras = newExtras
			return newExtras
		})
	}
}
