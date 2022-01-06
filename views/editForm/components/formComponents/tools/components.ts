/* eslint-disable @typescript-eslint/ban-ts-comment */
// TOOLS
import { FormsContextProps } from 'context/forms'
import { extractFormComponent } from 'utils/forms'
import { updateFormProp } from '../../../tools'

/**
 * Borrar componente
 * @param index
 * @param components
 * @param componentsList
 * @param setComponents
 */
export const deleteComponent = (
	index: number,
	formsCtx: FormsContextProps,
	formData: React.MutableRefObject<Form>
): void => {
	// COPIA
	const listCopy = [...formData.current.components].filter((_item, key) => key !== index)

	// ACTUALIZAR
	updateFormProp('components', listCopy, formsCtx, formData)
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
	formsCtx: FormsContextProps,
	formData: React.MutableRefObject<Form>
): void => {
	// COPIA
	const listCopy = [...formData.current.components]

	// COMPONENTE TEMPORAL
	const reorderedItem = { ...listCopy[index] }
	reorderedItem.id = Math.round(Math.random() * 100_000)

	// AGREGAR A ESTADO Y REFERENCIA
	listCopy.splice(index + 1, 0, reorderedItem)

	// ACTUALIZAR
	updateFormProp('components', listCopy, formsCtx, formData)
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
	value: FormInputValue,
	formData: React.MutableRefObject<Form>
): void => {
	// BUSCAR REFERENCIAS EN ESTADO
	const listCopy: BlockComponent[] = [...formData.current.components].map(
		(component: FormContainerProps) => {
			const original: BlockComponent | undefined = formData.current.components.find(
				(refComponent: BlockComponent) => refComponent.id === component.id
			)
			return original ?? component
		}
	)

	// REMPLAZAR
	listCopy[index][component] = value as unknown as never
	formData.current.components = listCopy
}
