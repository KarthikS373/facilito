// REACT
import React, { useContext } from 'react'

// COMPONENTES
import ComponentsSideBar from './components/componentsSidebar'
import Footer from 'components/layout/components/footer'
import ComponentsViewer from './components/viewer'
import FormHeader from 'components/formHeader'

// CONTEXT
import FormsContext from 'context/forms'

// TOOLS
import { copyComponent, deleteComponent, saveComponentProps } from './tools/components'
import { onDragEnd, updatePersonalInputs } from './tools'

// DND
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

// ESTILOS
import Styles from './style.module.scss'

interface FormComponentsProps {
	id: string
	formData: React.MutableRefObject<Form>
	onChangeDescription: (value: string) => unknown
}

const FormComponents: React.FC<FormComponentsProps> = ({ id, formData, onChangeDescription }) => {
	// FLOAT PROPS
	const { background } = formData.current

	// FORMULARIOS
	const formsCtx = useContext(FormsContext)

	// CAMBIAR OPCIONES DE INPUTS CON DATOS PERSONALES
	const setPersonalInputs = (key: keyof FormPersonalData, checked: boolean) =>
		updatePersonalInputs(formData, key, checked, formsCtx)

	// GUARDAR DATOS DE COMPONENTES
	const saveCompProps = (index: number, component: keyof BlockComponent, val: FormInputValue) =>
		saveComponentProps(index, component, val, formData)

	// BORRAR COMPONENTE
	const deleteComp = (index: number) => deleteComponent(index, formsCtx, formData)

	// COPIAR COMPONENTE
	const copyComp = (index: number) => copyComponent(index, formsCtx, formData)

	// ON DRAG
	const reOrderComponents = (res: DropResult) => onDragEnd(res, formsCtx, formData)

	return (
		<DragDropContext onDragEnd={reOrderComponents}>
			{/* COMPONENTES */}
			<ComponentsSideBar />

			{/* VIEWER DE COMPONENTES */}
			<div
				className={Styles.viewer}
				style={{
					background: background.startsWith('transparent linear-gradient')
						? background
						: `url(${background}) center center/cover no-repeat fixed`,
				}}>
				<div className={Styles.viewContent}>
					{/* HEADER */}
					<FormHeader
						banner={formData.current.banner}
						formTitle={formData.current.title}
						onChangeDescription={onChangeDescription}
						formDescription={formData.current.description}
					/>

					{/* LISTA DE COMPONENTES */}
					<ComponentsViewer
						personalOptions={formData.current.includePersonalData}
						onChangePersonalOptions={setPersonalInputs}
						components={formData.current.components}
						onChange={saveCompProps}
						onDelete={deleteComp}
						onCopy={copyComp}
						formId={id}
					/>

					<Footer hideFooter={true} minimize={false} />
				</div>
			</div>
		</DragDropContext>
	)
}

export default FormComponents
