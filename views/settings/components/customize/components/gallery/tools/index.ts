import imagesSplash, { imagesSplashFull } from '../utils'

/**
 * Obtener todas las imagenes
 * @param  {React.MutableRefObject<Business|null>} business
 * @returns {string[]}
 */
const getBusinessGallery = (business: React.MutableRefObject<Business | null>): string[] => [
	...imagesSplash,
	...(business.current?.gallery ?? []),
]

/**
 * Seleccionar imagen de galeria
 * @param  {number} index
 * @param  {React.MutableRefObject<Business|null>} business
 * @param  {(backStr:string)=>void} onSelect
 */
export const selectImage = (
	index: number,
	business: React.MutableRefObject<Business | null>,
	onSelect: (backStr: string) => void
): void => {
	const originalGallery = [...imagesSplashFull, ...(business.current?.gallery ?? [])]
	onSelect(originalGallery[index])
}

export default getBusinessGallery
