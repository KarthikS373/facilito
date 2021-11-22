import { saveFile } from 'utils/storage'

export interface CustomizeMenuProps {
	onBanner: (bannerString: string) => unknown
	onColor: (backString: string) => unknown
	defaultBackground: string
	defaultBanner: string
	onBack: EmptyFunction
	open: boolean
	id: string
}

export interface ImagesState {
	background: string
	banner: string
}

/**
 * Guardar al salir
 * @param backgroundRef
 * @param bannerRef
 * @param onBackground
 * @param onBanner
 * @param onBack
 * @param path
 */
export const handleClose = async (
	backgroundRef: React.MutableRefObject<File | string>,
	bannerRef: React.MutableRefObject<File | string>,
	onBackground: (backString: string) => unknown,
	onBanner: (backString: string) => unknown,
	onBack: EmptyFunction,
	companyId?: string,
	id?: string
): Promise<void> => {
	if (backgroundRef.current)
		onBackground(await saveFile(`/${companyId}/forms/${id}/background`, backgroundRef.current))
	if (bannerRef.current)
		onBanner(await saveFile(`/${companyId}/forms/${id}/banner`, bannerRef.current))
	onBack()
}
