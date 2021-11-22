import { useEffect } from 'react'

/**
 * Hook de extras iniciales
 * @param productRef
 * @param setExtras
 */
const useDefExtras = (
	productRef: React.MutableRefObject<Product>,
	setExtras: SetState<ExtendedExtra[]>
): void => {
	useEffect(() => {
		setExtras(productRef.current.extras?.map((ext: Extra, id: number) => ({ ...ext, id })) || [])
	}, [setExtras, productRef])
}

export default useDefExtras
