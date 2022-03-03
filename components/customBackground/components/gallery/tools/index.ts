import imagesSplash, { imagesSplashFull } from '../utils'

/**
 * Obtener todas las imagenes
 * @param {Business | null} business
 * @returns {string[]}
 */
const getBusinessGallery = (business: Business | null): string[] => [
	...imagesSplash,
	...(business?.gallery ?? []),
]

/**
 * Seleccionar imagen de galeria
 * @param  {number} index
 * @param  {Business|null} business
 * @param  {(backStr:string)=>void} onSelect
 */
export const selectImage = (
	index: number,
	business: Business | null,
	onSelect: (backStr: string) => void
): void => {
	const originalGallery = [...imagesSplashFull, ...(business?.gallery ?? [])]
	onSelect(originalGallery[index])
}

export default getBusinessGallery
