/* eslint-disable @typescript-eslint/ban-ts-comment */
// DB
import type { Unsubscribe } from '@firebase/firestore'
import { getCollection } from './db'
import removeFile from './storage'

/**
 * Leer documento
 * @param  {string} companyID
 * @param  {string} formID
 */
const getFormDoc = async (companyID: string, formID: string) => {
	const { doc, collection: getCollectionFrb } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, companyID)
	const formsCol = getCollectionFrb(businessDoc, 'forms')
	const formDoc = doc(formsCol, formID)
	return formDoc
}

/**
 * Listener de tiendas
 * @param  {string} companyID
 * @param  {(forms:FormInterface)=>unknown} setForms
 * @returns {Promise<Unsubscribe>}
 */
export const formsListener = async (
	companyID: string,
	setForms: (forms: Record<string, Form>) => unknown
): Promise<Unsubscribe> => {
	const { doc, onSnapshot, collection: getCollectionFrb } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, companyID)
	const formsCol = getCollectionFrb(businessDoc, 'forms')

	// LISTENER
	return onSnapshot(formsCol, (snap) => {
		const forms = Object.fromEntries(snap.docs.map((doc) => [doc.id, doc.data() as Form]))
		setForms(forms)
	})
}

/**
 * Borrar tienda en storage
 * @param  {string} companyID
 * @param  {string} id
 * @returns {Promise<void>}
 */
export const removeFormFromStorage = async (companyID: string, id: string): Promise<void> => {
	return removeFile(`/${companyID}/forms/${id}`)
}

/**
 * Comparar tiendas
 * @param  {Form[]} first
 * @param  {Form[]} second
 * @returns {Form[]}
 */
export const getFormsDifference = (first: Form[], second: Form[]): Form[] => {
	// OBTENER IDS
	const firstIds: string[] = first.map((form: Form) => form.url)
	const secondIds: string[] = second.map((form: Form) => form.url)

	// FILTRAR IDS
	const formsUnion: Form[] = first.concat(second)
	const filteredIds: string[] = firstIds
		.concat(secondIds)
		.filter((item) => !firstIds.includes(item) || !secondIds.includes(item))

	// DEVOLVER TIENDAS
	return filteredIds
		.map((id: string) => formsUnion.find((form: Form) => form.url === id))
		.filter((form: Form | undefined) => form !== undefined) as Form[]
}

/**
 * Tiendas para templates
 * @returns {Promise<Form[]>}
 */
export const readTemplates = async (): Promise<Form[]> => {
	const { doc, getDocs, collection: getCollectionFrb } = await import('firebase/firestore')

	// LEER
	const businessCol = await getCollection('business')
	const businessDoc = doc(businessCol, 'plantillasfacilito')
	const formsCol = getCollectionFrb(businessDoc, 'forms')
	const form = (await getDocs(formsCol)).docs.map((doc) => doc.data()) as Form[]

	return form
}

/**
 * Leer tienda
 * @param  {string} companyID
 * @param  {string} id
 * @returns {Promise<Form | null>}
 */
export const readFormSchema = async (companyID: string, id: string): Promise<Form | null> => {
	const { getDoc } = await import('firebase/firestore')

	// LEER
	const formDoc = await getFormDoc(companyID, id)
	const form = (await getDoc(formDoc)).data() as Form

	// RETORNAR
	return form || null
}

/**
 * Guardar tienda
 * @param  {string} companyID
 * @param  {Partial<Form>} form
 * @returns {Promise<void>}
 */
const saveFormSchema = async (companyID: string, form: Partial<Form>): Promise<void> => {
	const { setDoc } = await import('firebase/firestore')

	if (form.id) {
		// LEER
		const formDoc = await getFormDoc(companyID, form.id)

		// GUARDAR
		if (formDoc) await setDoc(formDoc, form, { merge: true })
	}
}

export default saveFormSchema

/**
 * Borrar tienda
 * @param  {string} companyID
 * @param  {string} id
 * @returns {Promise<void>}
 */
export const removeFormSchema = async (companyID: string, id: string): Promise<void> => {
	const { deleteDoc } = await import('firebase/firestore')

	// LEER
	const formDoc = await getFormDoc(companyID, id)

	// BORRAR
	if (formDoc) return deleteDoc(formDoc)
}

/**
 * Cambiar las reservaciones
 * @param  {string[]} dateKeys
 * @param  {string} companyID
 * @param  {string} id
 * @returns {Promise<void>}
 */
export const changeReservations = async (
	dateKeys: string[],
	companyID: string,
	id: string
): Promise<void> => {
	const { getDoc, setDoc } = await import('firebase/firestore')

	// LEER
	const formDoc = await getFormDoc(companyID, id)
	const currentForm = (await getDoc(formDoc)).data() as Form

	if (currentForm) {
		// CAMBIAR RESERVACIONES
		dateKeys.forEach((key: string) => {
			// INDEX
			let index = 0

			// BUSCAR COMPONENTE
			if (currentForm && currentForm.components) {
				const component: BlockComponent | undefined = currentForm.components.find(
					(cp: BlockComponent, cIndex: number) => {
						if (`${cp.name}_${cp.id}` === key) {
							index = cIndex
							return true
						} else return false
					}
				)

				// CAMBIAR
				if (component) {
					component.reservations = (component.reservations || 1) - 1
					currentForm.components[index] = component
				}
			}
		})

		// ASIGNAR
		await setDoc(formDoc, currentForm)
	}
}

/**
 * Cambiar cupones
 * @param  {string[]} couponCodes
 * @param  {string} companyID
 * @param  {string} id
 * @returns {Promise<void>}
 */
export const changeCouponsCount = async (
	couponCodes: string[],
	companyID: string,
	id: string
): Promise<void> => {
	const { getDoc, setDoc } = await import('firebase/firestore')

	// LEER
	const formDoc = await getFormDoc(companyID, id)
	const currentForm = (await getDoc(formDoc)).data() as Form

	if (currentForm) {
		// CAMBIAR CUPONES
		currentForm.components.forEach((component: BlockComponent, compIndex: number) => {
			component.coupons?.forEach((coupon: Coupon, coupIndex: number) => {
				couponCodes.forEach((code: string) => {
					if (coupon.id.trim().toUpperCase() === code.toUpperCase()) {
						if (
							currentForm.components[compIndex].coupons &&
							// @ts-ignore
							currentForm.components[compIndex].coupons[coupIndex]
						)
							// @ts-ignore
							currentForm.components[compIndex].coupons[coupIndex].count =
								// @ts-ignore
								(currentForm.components[compIndex].coupons[coupIndex].count || 1) - 1
					}
				})
			})
		})

		// ASIGNAR
		return setDoc(formDoc, currentForm)
	}
}

/**
 * Extraer componentes
 * @param  {FormContainerProps} original
 * @returns {FormContainerProps}
 */
export const extractFormComponent = (original: FormContainerProps): FormContainerProps => {
	// COPIAR
	const copy = { ...original }
	const keys: Array<keyof FormContainerProps> = [
		'onChangePersonalOptions',
		'personalOptions',
		'productsList',
		'formValues',
		'onRequired',
		'onDates',
		'onChange',
		'onDelete',
		'onCopy',
		'onFile',
		'active',
		'range',
		'badge',
	]

	// BORRAR
	keys.forEach((prop: keyof FormContainerProps) => delete copy[prop])

	// RETORNAR
	return copy
}

/**
 * Cambiar url de facilito
 * @param  {string} companyID
 * @param  {string} id
 * @param  {string} newUrl
 * @returns {Promise<void>}
 */
export const replaceFormURL = async (
	companyID: string,
	id: string,
	newUrl: string
): Promise<void> => {
	const { setDoc } = await import('firebase/firestore')

	// LEER
	const formsCol = await getFormDoc(companyID, id)

	// AGREGAR NUEVO
	await setDoc(formsCol, { url: newUrl }, { merge: true })
}
/**
 * Guardar metodos de envio
 * @param  {string} companyID
 * @param  {string} id
 * @param  {ConnectionMethods} answersConnection
 * @returns {Promise<void>}
 */
export const saveFormSendMethods = async (
	companyID: string,
	id: string,
	answersConnection: ConnectionMethods
): Promise<void> => {
	const { setDoc } = await import('firebase/firestore')

	// LEER
	const formDoc = await getFormDoc(companyID, id)

	// GUARDAR
	return setDoc(formDoc, { answersConnection }, { merge: true })
}

/**
 * Publicar
 * @param  {string} companyID
 * @param  {string} id
 * @returns {Promise<void>}
 */
export const publishForm = async (companyID: string, id: string): Promise<void> => {
	if (companyID?.length) {
		// LEER
		const { setDoc } = await import('firebase/firestore')
		const formDoc = await getFormDoc(companyID, id)

		// GUARDAR
		await setDoc(formDoc, { public: true }, { merge: true })
	}
}

/**
 * No Publicar
 * @param  {string} companyID
 * @param  {string} id
 * @returns {Promise<void>}
 */
export const unPublishForm = async (companyID: string, id: string): Promise<void> => {
	if (companyID?.length) {
		// LEER
		const { setDoc } = await import('firebase/firestore')
		const formDoc = await getFormDoc(companyID, id)

		// GUARDAR
		await setDoc(formDoc, { public: false }, { merge: true })
	}
}
