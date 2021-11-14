// DND
import { DropResult } from 'react-beautiful-dnd'

// LISTA DE COMPONENTES POR DEFECTO
import { formComponentsList } from '../utils/initials'

// UTILS
import { extractFormComponent } from 'utils/forms'

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
	components: FormContainerProps[],
	componentsList: React.MutableRefObject<BlockComponent[]>,
	setComponents: React.Dispatch<React.SetStateAction<FormContainerProps[]>>,
	formData: React.MutableRefObject<Form>
): void => {
	// COPIA
	const listCopy = [...components]
	const tmpComponentsList = [...formComponentsList]

	// SPLICE
	if (res.destination?.index || res.destination?.index === 0) {
		if (res.source.droppableId === 'components') {
			// CREAR COMPONENTE TEMPORAL
			const tmpComponent = { ...tmpComponentsList[res.source.index] }
			tmpComponent.id = Math.round(Math.random() * 100000)

			// AGREGAR A ESTADO Y REFERENCIA
			listCopy.splice(res.destination?.index, 0, tmpComponent)
			componentsList.current.splice(res.destination?.index, 0, extractFormComponent(tmpComponent))

			// BUSCAR COMPONENTE DE CALENDARIO ( CORREO OBLIGATORIO )
			if (tmpComponent.name.startsWith('date')) formData.current.includePersonalData.email = true
		}

		// MOVER
		else if (res.source.droppableId === 'viewer') {
			// COMPONENTE TEMPORAL
			const [reorderedItem] = listCopy.splice(res.source.index, 1)
			const [reorderedRefItem] = componentsList.current.splice(res.source.index, 1)

			// AGREGAR A ESTADO Y REFERENCIA
			listCopy.splice(res.destination?.index, 0, reorderedItem)
			componentsList.current.splice(
				res.destination?.index,
				0,
				extractFormComponent(reorderedRefItem)
			)
		}

		// ACTUALIZAR
		setComponents(listCopy)
	}
}
