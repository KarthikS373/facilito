// OBTENER VALORES
const onChangeOption = (
	key: keyof FormPersonalData,
	ev: React.ChangeEvent<HTMLInputElement>,
	setPersonalOptions: SetState<FormPersonalData>,
	onChangePersonalOptions?: (options: FormPersonalData) => unknown
): void => {
	setPersonalOptions((personalOptions) => {
		// ASIGNAR
		const checked: boolean = ev.target.checked
		const options: FormPersonalData = { ...personalOptions }
		options[key] = checked

		// ENVIAR
		if (onChangePersonalOptions) onChangePersonalOptions(options)
		return options
	})
}

export const optionsKeys: (keyof FormPersonalData)[] = ['phone', 'email', 'address', 'instructions']

export default onChangeOption
