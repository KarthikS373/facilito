interface CustomPlaceString {
	country: string
	city: string
	address: string
}

/**
 *
 * @param ev
 * @param setCustomPlace
 */
export const saveCustomPlace = (
	ev: React.ChangeEvent<HTMLInputElement>,
	setCustomPlace: SetState<CustomPlaceString>
): void => {
	const { name, value } = ev.target
	setCustomPlace((prevPlace: CustomPlaceString) => ({
		...prevPlace,
		[name]: value,
	}))
}

/**
 * Escribir direccion en el mapa
 * @param prop
 * @param ev
 * @param setCustomPlace
 * @param onWrite
 */
export const handleWrite = (
	prop: keyof BlockComponent,
	ev: React.ChangeEvent<HTMLInputElement>,
	setCustomPlace: SetState<CustomPlaceString>,
	onWrite?: (props: keyof BlockComponent) => (ev: React.ChangeEvent<Element>) => unknown
): void => {
	if (onWrite) onWrite(prop)(ev)
	saveCustomPlace(ev, setCustomPlace)
}

/**
 * Guardar switch de componente
 * @param prop
 * @param index
 * @param checked
 * @param setGeoSwitch
 * @param onChange
 */
export const handleSwitch = (
	prop: keyof BlockComponent,
	index: number,
	checked: boolean,
	setGeoSwitch: SetState<[boolean, boolean]>,
	onChange?: (component: keyof BlockComponent, value: FormInputValue) => unknown
): void => {
	setGeoSwitch((prevSwitch: [boolean, boolean]) => {
		// CAMBIAR
		const tmpSwitch = [...prevSwitch] as [boolean, boolean]
		tmpSwitch[index] = checked

		// EVITAR DESACTIVAR AMBOS
		if (tmpSwitch[1] && !tmpSwitch[0]) return prevSwitch
		else return tmpSwitch
	})

	if (onChange) onChange(prop, checked)
}
