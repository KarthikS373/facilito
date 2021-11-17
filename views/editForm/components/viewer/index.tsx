/* eslint-disable @typescript-eslint/ban-ts-comment */
// REACT
import React, { CSSProperties, useState } from 'react'

// ESTILOS
import Styles from './style.module.scss'

// DND
import { Droppable, Draggable, DroppableProvided } from 'react-beautiful-dnd'
// @ts-ignore
import NaturalDragAnimation from 'natural-drag-animation-rbdnd'

// COMPONENTES
import FormComponent from './components/formComponent'

// PROPIEDADES
interface ComponentsViewerProps {
	onChange: (index: number, component: keyof BlockComponent, val: FormInputValue) => unknown
	onChangePersonalOptions: (options: FormPersonalData) => unknown
	onRequired: (index: number, required: boolean) => unknown
	onFile: (index: number, src: string) => unknown
	onDelete: (index: number) => unknown
	onCopy: (index: number) => unknown
	personalOptions: FormPersonalData
	components: FormContainerProps[]
	formId?: string
}

const ComponentsViewer: React.FC<ComponentsViewerProps> = (props: ComponentsViewerProps) => {
	// ESTADO
	const [activeComponent, setActiveComponent] = useState<number>(0)

	// GUARDAR
	const saveComponent = (index: number) => (component: keyof BlockComponent, val: FormInputValue) =>
		props.onChange(index, component, val)

	// BORRAR
	const deleteComponent = (index: number) => () => props.onDelete(index)

	// COPIAR
	const copyComponent = (index: number) => () => props.onCopy(index)

	// CAMBIAR OBLIGATORIO
	const changeRequired = (index: number) => (required: boolean) => props.onRequired(index, required)

	// SUBIR ARCHIVO
	const uploadFile = (index: number) => (src: string) => props.onFile(index, src)

	// ACTIVAR COMPONENTE
	const setActiveFromIndex = (index: number) => () => {
		if (activeComponent !== index) setActiveComponent(index)
	}

	return (
		<div
			className={Styles.container}
			style={{ height: props.components.length > 0 ? 'auto' : '175px' }}>
			<Droppable droppableId='viewer'>
				{(provided: DroppableProvided) => (
					<ul className={Styles.componentList} {...provided.droppableProps} ref={provided.innerRef}>
						{props.components.map((componentProps: FormContainerProps, key: number) => (
							<Draggable
								index={key}
								draggableId={`component_${componentProps.id}`}
								key={`component_${componentProps.id}`}>
								{(provided, snapshot) => (
									<NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot}>
										{(style: CSSProperties) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className={Styles.itemDrag}
												onClick={setActiveFromIndex(componentProps.id)}
												style={style}>
												<FormComponent
													{...componentProps}
													formId={props.formId}
													id={componentProps.id}
													onFile={uploadFile(key)}
													onCopy={copyComponent(key)}
													onChange={saveComponent(key)}
													onDelete={deleteComponent(key)}
													onRequired={changeRequired(key)}
													personalOptions={props.personalOptions}
													active={componentProps.id === activeComponent}
													onChangePersonalOptions={props.onChangePersonalOptions}
												/>
											</div>
										)}
									</NaturalDragAnimation>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</div>
	)
}

export default ComponentsViewer
