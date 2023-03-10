import { useEffect } from 'react'

/**
 * Hook de extras iniciales
 * @param  {React.MutableRefObject<Product>} productRef
 * @param  {SetState<ExtendedExtra[]>} setExtras
 */
const useDefExtras = (
	productRef: React.MutableRefObject<Product>,
	setExtras: SetState<ExtendedExtra[]>,
	setVariableExtras: SetState<EtendedExtraVariable[]>
): void => {
	useEffect(() => {
		setExtras(productRef.current.extras?.map((ext: Extra, id: number) => ({ ...ext, id })) || [])
		setVariableExtras(
			productRef.current.variableExtras?.map((ext: ExtraVariable, id: number) => ({
				...ext,
				id,
			})) || []
		)
	}, [setExtras, setVariableExtras, productRef])
}

export default useDefExtras
