/**
 * Manejar checks
 * @description Administrar opciones de extras como checks
 * @param extra
 * @param index
 * @param checked
 * @param selectedChecks
 * @param setChecks
 * @param onSelect
 */
const handleChecks = (
	extra: Extra,
	index: number,
	checked: boolean,
	selectedChecks: number,
	setChecks: React.Dispatch<React.SetStateAction<boolean[]>>,
	onSelect?: (extra: ExtraOptionalExt[] | undefined) => unknown
): void => {
	setChecks((checks: boolean[]) => {
		// COPIAR Y ASIGNAR
		const currentChecks = [...checks]
		currentChecks[index] = checked

		// LIMITAR A CANTIDAD
		if (extra.cant && extra.cant - selectedChecks === 0) currentChecks[index] = false

		// ITEMS
		const items: ExtraOptionalExt[] = extra.options
			.map((extraOpt: ExtraOptional) => ({
				name: extraOpt.name,
				price: extraOpt.price,
				title: extra.title,
			}))
			.filter((_c, eIndex: number) => currentChecks[eIndex])

		// ENVIAR
		if (onSelect) {
			if (currentChecks.every((check: boolean) => !check)) onSelect(undefined)
			else onSelect(items)
		}

		return currentChecks
	})
}

export default handleChecks
