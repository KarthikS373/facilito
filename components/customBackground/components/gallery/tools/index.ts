import imagesSplash, { imagesSplashFull } from '../utils'

/**
 * Obtener todas las imagenes
 * @param business
 * @returns
 */
const getBusinessGallery = (business: Business | null): string[] => [
	...imagesSplash,
	...(business?.gallery ?? []),
]

/**
 * Seleccionar imagen de galeria
 * @param index
 * @param businessRef
 * @param backgroundRef
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
