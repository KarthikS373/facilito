/**
 * Actualizar y cambiar switch
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {React.MutableRefObject<Product>} productRef
 */
const onChangeSwitch = (
	ev: React.ChangeEvent<HTMLInputElement>,
	productRef: React.MutableRefObject<Product>
): void => {
	const { name, checked } = ev.target
	productRef.current[name] = checked
}

export default onChangeSwitch
