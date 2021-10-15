import type { SelectChangeEvent } from '@mui/material/Select'

/**
 * Administrar selectores
 * @description Administrar opciones de seleccion del extra
 * @param extra
 * @param ev
 * @param setSelectedExtra
 * @param onSelect
 */
const handleSelect = (
	extra: Extra,
	ev: SelectChangeEvent,
	setSelectedExtra: React.Dispatch<React.SetStateAction<number | string>>,
	onSelect?: (extra: ExtraOptionalExt[]) => unknown
): void => {
	const index: number = parseInt(ev.target.value.toString()) as number
	setSelectedExtra(index)
	onSelect &&
		onSelect([
			{ name: extra.options[index].name, price: extra.options[index].price, title: extra.title },
		])
}

export default handleSelect
