import getFirebase from 'keys/firebase'
import type { StorageReference, UploadResult } from '@firebase/storage'

/**
 * Obtener referencia
 * @param  {string} path
 */
const getRef = async (path: string) => {
	const { getStorage, ref } = await import('firebase/storage')

	// STORAGE
	const firebaseApp = await getFirebase()
	const str = getStorage(firebaseApp)
	const refs = ref(str, path)

	return refs
}

/**
 * Borrar archivo en storage
 * @param  {string} path
 * @returns {Promise<void>}
 */
const removeFile = async (path: string): Promise<void> => {
	const { listAll, deleteObject } = await import('firebase/storage')

	// STORAGE
	const refs = await getRef(path)

	// LISTA
	const list = await listAll(refs)
	const deleteReq = list.items.map(async (list: StorageReference) => deleteObject(list))

	// BORRAR
	await Promise.all(deleteReq)
}

export default removeFile

/**
 * Guardar archivo
 * @param  {File} file
 * @param  {string} path
 * @returns {Promise<UploadResult | null>}
 */
export const uploadFile = async (file: File, path: string): Promise<UploadResult | null> => {
	if (path.length) {
		// FIREBASE
		const { uploadBytes } = await import('firebase/storage')

		// VALIDAR DIMENSIONES
		if (file.size / 1_000_000 > 10) throw new Error('Error de tamaño en archivo')

		// STORAGE
		const refs = await getRef(path)

		// REF DE URL DESDE CLOUD
		return uploadBytes(refs, file)
	} else return null
}

/**
 * Comprimir imagen
 * @param  {File} file
 * @returns {Promise<File>}
 */
export const compressImage = async (file: File): Promise<File> => {
	// COMPRESS
	const { default: compress } = await import('browser-image-compression')

	// ARCHIVO COMPRIMIDO
	const compressedFile: File = file.type.includes('video')
		? file
		: await compress(file, {
				maxSizeMB: 10,
		  }).catch(() => {
				throw new Error('Error al comprimir imagen')
		  })

	return compressedFile
}

/**
 * Borrar archivo en storage
 * @param  {string} path
 * @returns {Promise<string>}
 */
export const getURL = async (path: string): Promise<string> => {
	const { getDownloadURL } = await import('firebase/storage')

	// STORAGE
	const refs = await getRef(path)

	// LISTA
	const url = await getDownloadURL(refs)
	return url
}

/**
 * Guardar archivos de banner y background
 * @param  {string} path
 * @param  {File|string} background
 * @returns {Promise<string>}
 */
export const saveFile = (path: string, background: File | string): Promise<string> => {
	return new Promise((resolve, reject) => {
		// LEER
		if (typeof background === 'object') {
			// ALERTA
			window.Alert({
				title: 'Espera...',
				body: 'Se esta subiendo tu archivo, esto dependerá de tu velocidad, no te salgas de la aplicación por favor.',
				type: 'window',
				fixed: true,
			})

			// SUBIR A CLOUD
			uploadFile(background, path)
				.then(() => {
					getURL(path)
						.then((src: string) => {
							if (src) {
								// REGRESAR
								window.hideAlert()

								// CAMBIAR FONDO
								resolve(src)
							}
						})
						.catch(reject)
				})
				.catch(reject)
		} else resolve(background)
	})
}
