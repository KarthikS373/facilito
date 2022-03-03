import type { SelectChangeEvent } from '@mui/material/Select'

/**
 * Administrar selectores
 * @param  {Extra} extra
 * @param  {SelectChangeEvent} ev
 * @param  {SetState<number|string>} setSelectedExtra
 * @param  {(extra:ExtraOptionalExt[])=>unknown} onSelect?
 */
const handleSelect = (
	extra: Extra,
	ev: SelectChangeEvent,
	setSelectedExtra: SetState<number | string>,
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
