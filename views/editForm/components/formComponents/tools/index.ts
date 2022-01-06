// DND
import { formComponentsList } from 'views/editForm/utils/initials'
import { FormsContextProps } from 'context/forms'
import { DropResult } from 'react-beautiful-dnd'
import { updateFormProp } from '../../../tools'

// LISTA DE COMPONENTES POR DEFECTO

/**
 * Inputs personales
 * @description Actualizar inputs de datos de personales
 * @param formData
 * @param personalOptions
 * @param components
 */
export const updatePersonalInputs = (
	formData: React.MutableRefObject<Form>,
	personalOptions: FormPersonalData
): void => {
	formData.current.includePersonalData = personalOptions

	// BUSCAR COMPONENTE DE CALENDARIO ( CORREO OBLIGATORIO )
	formData.current.components.forEach((component: FormContainerProps) => {
		if (component.name.startsWith('date')) formData.current.includePersonalData.email = true
	})
}

/**
 * Reorganizar componentes
 * @description Evento de DnD y reorganizar componentes
 * @param res
 * @param components
 * @param componentsList
 * @param setComponents
 * @param formData
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
