// DND
import { formComponentsList } from 'views/editForm/utils/initials'
import { FormsContextProps } from 'context/forms'
import { DropResult } from 'react-beautiful-dnd'
import { updateFormProp } from '../../../tools'

// LISTA DE COMPONENTES POR DEFECTO

/**
 * Actualiza las opciones de datos personales del formulario
 * @param formData - Reaccionar.MutableRefObject<Form>
 * @param {FormPersonalData} personalOptions - El objeto que contiene las opciones de datos personales.
 * @param {FormsContextProps} formsCtx - FormulariosContextoAccesorios
 */
export const updatePersonalInputs = (
	formData: React.MutableRefObject<Form>,
	key: keyof FormPersonalData,
	checked: boolean,
	formsCtx: FormsContextProps
): void => {
	formData.current.includePersonalData[key] = checked

	// BUSCAR COMPONENTE DE CALENDARIO ( CORREO OBLIGATORIO )
	formData.current.components.forEach((component: FormContainerProps) => {
		if (component.name.startsWith('date')) formData.current.includePersonalData.email = true
	})

	// MARCAR OPCION DE CORREO OBLIGATORIO CON OPCION DE REGISTERCUSTOMER
	if (formData.current.checkout?.registerCustomers)
		formData.current.includePersonalData.email = true

	// ACTUALIZAR GLOBAL
	updateFormProp('personalOptions', formData.current.includePersonalData, formsCtx, formData)
}

/**
 * Toma el objeto `DropResult`, `FormsContext` y la referencia `formData`, y luego copia la matriz
 * `components`, crea un componente temporal y luego lo agrega a la matriz `components`
 * @param {DropResult} res - DropResult: El resultado de la operación de arrastrar y soltar.
 * @param {FormsContextProps} formsCtx - FormulariosContextoAccesorios
 * @param formData - Reaccionar.MutableRefObject<Form>
 */
export const onDragEnd = (
	res: DropResult,
	formsCtx: FormsContextProps,
	formData: React.MutableRefObject<Form>
): void => {
	// COPIA
	const listCopy = [...formData.current.components]
	const tmpComponentsList = [...formComponentsList]

	// SPLICE
	if (res.destination?.index || res.destination?.index === 0) {
		if (res.source.droppableId === 'components') {
			// CREAR COMPONENTE TEMPORAL
			const tmpComponent = { ...tmpComponentsList[res.source.index] }
			tmpComponent.id = Math.round(Math.random() * 100000)

			// AGREGAR A ESTADO Y REFERENCIA
			listCopy.splice(res.destination?.index, 0, tmpComponent)

			// BUSCAR COMPONENTE DE CALENDARIO ( CORREO OBLIGATORIO )
			if (tmpComponent.name.startsWith('date')) formData.current.includePersonalData.email = true

			// MARCAR OPCION DE CORREO OBLIGATORIO CON OPCION DE REGISTERCUSTOMER
			if (formData.current.checkout?.registerCustomers)
				formData.current.includePersonalData.email = true
		}

		// MOVER
		else if (res.source.droppableId === 'viewer') {
			// COMPONENTE TEMPORAL
			const [reorderedItem] = listCopy.splice(res.source.index, 1)

			// AGREGAR A ESTADO Y REFERENCIA
			listCopy.splice(res.destination?.index, 0, reorderedItem)
		}

		// ACTUALIZAR
		updateFormProp('components', listCopy, formsCtx, formData)
	}
}
