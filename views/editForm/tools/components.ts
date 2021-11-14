/* eslint-disable @typescript-eslint/ban-ts-comment */
// TOOLS
import { extractFormComponent } from 'utils/forms'

/**
 * Borrar componente
 * @param index
 * @param components
 * @param componentsList
 * @param setComponents
 */
export const deleteComponent = (
	index: number,
	components: FormContainerProps[],
	componentsList: React.MutableRefObject<BlockComponent[]>,
	setComponents: React.Dispatch<React.SetStateAction<FormContainerProps[]>>
): void => {
	// COPIA
	const listCopy = [...components].filter((_item, key) => key !== index)
	componentsList.current = componentsList.current.filter((_item, key) => key !== index)

	// ACTUALIZAR
	setComponents(listCopy)
}

/**
 * Copiar componentes
 * @param index
 * @param components
 * @param componentsList
 * @param setComponents
 */
export const copyComponent = (
	index: number,
	components: FormContainerProps[],
	componentsList: React.MutableRefObject<BlockComponent[]>,
	setComponents: React.Dispatch<React.SetStateAction<FormContainerProps[]>>
): void => {
	// COPIA
	const listCopy = [...components]

	// COMPONENTE TEMPORAL
	const reorderedItem = { ...listCopy[index] }
	reorderedItem.id = Math.round(Math.random() * 100_000)

	// AGREGAR A ESTADO Y REFERENCIA
	listCopy.splice(index + 1, 0, reorderedItem)
	componentsList.current.splice(index + 1, 0, extractFormComponent(reorderedItem))

	// ACTUALIZAR
	setComponents(listCopy)
}

/**
 * Agregar componentes de un solo click
 * @param component
 * @param components
 * @param componentsList
 * @param setComponents
 * @param viewerRef
 */
export const addSelfComponent = (
	component: FormContainerProps,
	components: FormContainerProps[],
	componentsList: React.MutableRefObject<BlockComponent[]>,
	setComponents: React.Dispatch<React.SetStateAction<FormContainerProps[]>>,
	viewerRef: React.RefObject<HTMLDivElement>
): void => {
	// COPIA
	const listCopy = [...components]
	const tmpComponent = { ...component }

	// ASIGNAR ID
	tmpComponent.id = Math.round(Math.random() * 100_000)

	// AGREGAR
	listCopy.push(tmpComponent)
	setTimeout(() => {
		if (viewerRef.current) viewerRef.current.scrollTo({ top: 100000, behavior: 'smooth' })
	}, 100)

	// ACTUALIZAR Y GUARDAR
	componentsList.current.push(extractFormComponent(tmpComponent))
	setComponents(listCopy)
}

/**
 * Guardar componente
 * @description Guardar propiedades de componentes en referencia
 * @param index
 * @param component
 * @param val
 * @param components
 * @param componentsList
 */
export const saveComponentProps = (
	index: number,
	component: keyof BlockComponent,
	val: FormInputValue,
	components: FormContainerProps[],
	componentsList: React.MutableRefObject<BlockComponent[]>
): void => {
	// BUSCAR REFERENCIAS EN ESTADO
	const listCopy: BlockComponent[] = [...components].map((component: FormContainerProps) => {
		const original: BlockComponent | undefined = componentsList.current.find(
			(refComponent: BlockComponent) => refComponent.id === component.id
		)
		return original || component
	})

	// REMPLAZAR
	// @ts-ignore
	listCopy[index][component] = val

	// FILTRAR
	const listFiltered = listCopy.map((containerProps: FormContainerProps) =>
		extractFormComponent(containerProps)
	)

	/// GUARDAR
	componentsList.current = listFiltered
}
