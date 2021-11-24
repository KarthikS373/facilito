import imagesSplash, { imagesSplashFull } from '../utils'

/**
 * Obtener todas las imagenes
 * @param business
 * @returns
 */
const getBusinessGallery = (business: React.MutableRefObject<Business | null>): string[] => [
	...imagesSplash,
	...(business.current?.gallery ?? []),
]

/**
 * Seleccionar imagen de galeria
 * @param index
 * @param businessRef
 * @param backgroundRef
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
