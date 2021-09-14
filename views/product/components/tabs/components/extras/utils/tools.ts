/**
 * Agregar extra
 * @description Agregar un extra en la lista de extra
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {React.Dispatch<React.SetStateAction<ExtendedOpt[]>>} setExtras
 */
const addExtra = (
	productRef: React.MutableRefObject<Product>,
	setExtras: React.Dispatch<React.SetStateAction<ExtendedExtra[]>>
) => {
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
 * @description Remover un extra en la lista de extra
 * @param  {number} extIndex
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {React.Dispatch<React.SetStateAction<ExtendedOpt[]>>} setExtras
 */
export const removeExtra = (
	extIndex: number,
	productRef: React.MutableRefObject<Product>,
	setExtras: React.Dispatch<React.SetStateAction<ExtendedExtra[]>>
) => {
	setExtras((prevExtras: ExtendedExtra[]) => {
		const newExtras = [...prevExtras].filter((_ext, index: number) => index !== extIndex)
		productRef.current.extras = newExtras
		return newExtras
	})
}
