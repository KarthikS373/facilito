// REACT
import React, { useMemo, useRef, useState, useContext } from 'react'

// COMPONENTES
import ComponentsSideBar from './components/formComponents'
import ComponentsViewer from './components/viewer'
import CustomizeMenu from './components/customize'
import FormTopbar from './components/formTopbar'
import FormHeader from 'components/formHeader'

// DND
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

// NEXT
import dynamic from 'next/dynamic'

// HOOKS
import { useCloudForm } from './hooks'

// MATERIAL
import { ThemeProvider } from '@mui/material/styles'

// UTILS
import { initialCustomFormState, formComponentsList, initialFormData } from './utils/initials'
import { updateCheckoutOptions, updatePersonalInputs, updateUrl } from './tools/formProps'
import { copyComponent, deleteComponent, saveComponentProps } from './tools/components'
import { generateTheme, splitBackgroundColors } from 'utils/tools'
import { extractFormComponent } from 'utils/forms'
import { saveFormOnCloud } from './tools/cloud'
import { onDragEnd } from './tools'

// CONTEXTO
import BusinessContext from 'context/business'
import UserContext from 'context/user'

// ESTILO
import Styles from './style.module.scss'

// DYNAMIC COMPONENTS
const AlertProvider = dynamic(() => import('providers/alerts'))

// PROPIEDADES
interface FormViewProps {
	id: string
	formTitle?: string
}

const NewFormView: React.FC<FormViewProps> = ({ id, formTitle }) => {
	// EMPRESA, STRINGS Y USUARIO
	const { business } = useContext(BusinessContext)
	const { user } = useContext(UserContext)

	// LISTA DE COMPONENTES
	const [components, setComponents] = useState<FormContainerProps[]>([formComponentsList[13]])

	// PROPIEDADES DEL FORMULARIO
	const [formProps, setFormProps] = useState<CustomFormState>(initialCustomFormState)

	// PROPIEDADES DE CHECKOUT
	const [formCheckout, setFormCheckout] = useState<FormCheckout | undefined>(undefined)

	// MENU DE PERSONALIZACIÓN
	const [openCustomized, setOpenCustomized] = useState<boolean>(false)

	// REFERENCIA DE COMPONENTES
	const componentsList: React.MutableRefObject<BlockComponent[]> = useRef([
		extractFormComponent(formComponentsList[13]),
	])

	// REFERENCIA DE VIEWER DE COMPONENTES
	const viewerRef: React.RefObject<HTMLDivElement> = useRef(null)

	// REFERENCIA DE PRIMER GUARDADO
	const enableUrl: React.MutableRefObject<boolean> = useRef(true)

	// REFERENCIA DE FORMULARIO ACTUAL
	const formData: React.MutableRefObject<Form> = useRef({ ...initialFormData })

	// ON DRAG
	const reOrderComponents = (res: DropResult) =>
		onDragEnd(res, components, componentsList, setComponents, formData)

	// GUARDAR DESCRIPCIÓN
	const saveDescription = (description: string) => (formData.current.description = description)

	// GUARDAR FORMULARIO EN CLOUD
	const saveCurrentForm = (ctrl: boolean) =>
		saveFormOnCloud(ctrl, componentsList, formData, business, enableUrl)

	// OBTENER COLORES
	const { background } = formProps
	const defColors = useMemo(() => splitBackgroundColors(background), [background])
	const theme = useMemo(() => generateTheme(defColors), [defColors])

	// GUARDA TITULO
	const setTitle = (title: string) => {
		formData.current.title = title
		setFormProps((prevProps: CustomFormState) => ({ ...prevProps, title }))
	}

	// GUARDAR MÉTODOS DE ENVIÓ
	const saveSendMethods = (answersConnection?: ConnectionMethods) => {
		if (!answersConnection) delete formData.current.answersConnection
		else formData.current.answersConnection = answersConnection
	}

	// CAMBIAR COLOR DE FONDO
	const changeBackground = (background: string) => {
		formData.current.background = background
		setFormProps((prevProps: CustomFormState) => ({ ...prevProps, background }))
	}

	// CAMBIAR BANNER DE FONDO
	const changeBanner = (banner: string) => {
		formData.current.banner = banner
		setFormProps((prevProps: CustomFormState) => ({ ...prevProps, banner }))
	}

	// COPIAR COMPONENTE
	const copyComp = (index: number) =>
		copyComponent(index, components, componentsList, setComponents)

	// CAMBIAR OPCIONES DE CHECKOUT
	const setCheckoutOptions = (checkoutOptions: FormCheckout) =>
		updateCheckoutOptions(formData, checkoutOptions, setFormCheckout, business?.id)

	// ACTUALIZAR ID DE FORMULARIO
	const setUrl = (newUrl: string) =>
		updateUrl(newUrl, formData, business, saveCurrentForm, setFormProps, enableUrl)

	// PUBLICAR
	const onPublish = (published: boolean) => (formData.current.public = published)

	// ABRIR MENU DE PERSONALIZAR
	const handleCustomizeMenu = (open: boolean) => () => {
		setOpenCustomized(open)
		if (!open) saveCurrentForm(false)
	}

	// CAMBIAR OPCIONES DE INPUTS CON DATOS PERSONALES
	const setPersonalInputs = (personalOptions: FormPersonalData) =>
		updatePersonalInputs(formData, personalOptions, components)

	// CAMBIAR OBLIGATORIO
	const changeRequiredComponent = (index: number, required: boolean) =>
		(componentsList.current[index].required = required)

	// EVENTO AL SUBIR ARCHIVO
	const saveSrcComponent = (index: number, src: string) => (componentsList.current[index].src = src)

	// BORRAR COMPONENTE
	const deleteComp = (index: number) =>
		deleteComponent(index, components, componentsList, setComponents)

	// GUARDAR DATOS DE COMPONENTES
	const saveCompProps = (index: number, component: keyof BlockComponent, val: FormInputValue) =>
		saveComponentProps(index, component, val, components, componentsList)

	// CARGAR DESDE CLOUD
	useCloudForm(
		formData,
		business,
		id,
		user || null,
		componentsList,
		setComponents,
		setFormProps,
		setFormCheckout,
		formTitle
	)

	return (
		<>
			<div>
				<ThemeProvider theme={theme}>
					<AlertProvider />
					<div className={Styles.container}>
						{/* TOPBAR */}
						<FormTopbar
							onTitle={setTitle}
							url={formProps.url}
							onChangeURL={setUrl}
							onPublish={onPublish}
							onSave={saveCurrentForm}
							id={formData.current.id}
							formQR={formData.current.qr}
							checkoutOptions={formCheckout}
							public={formData.current.public}
							onAnswersConnection={saveSendMethods}
							onCustomize={handleCustomizeMenu(true)}
							onChangeCheckoutOptions={setCheckoutOptions}
							answersConnection={formData.current.answersConnection}
							defValue={formProps.title !== initialFormData.title ? formProps.title : undefined}
						/>

						{/* MENU DE PERSONALIZACION */}
						<CustomizeMenu
							id={id}
							open={openCustomized}
							onBanner={changeBanner}
							onColor={changeBackground}
							defaultBanner={formProps.banner}
							onBack={handleCustomizeMenu(false)}
							defaultBackground={formProps.background}
						/>

						<DragDropContext onDragEnd={reOrderComponents}>
							{/* COMPONENTES */}
							<ComponentsSideBar />

							{/* VIEWER DE COMPONENTES */}
							<div
								ref={viewerRef}
								className={Styles.viewer}
								style={{
									background: formProps.background.startsWith('transparent linear-gradient')
										? formProps.background
										: `url(${formProps.background}) center center/cover no-repeat fixed`,
								}}>
								<div className={Styles.viewContent}>
									{/* HEADER */}
									<FormHeader
										banner={formProps.banner}
										formTitle={formProps.title}
										formDescription={formProps.description}
										onChangeDescription={saveDescription}
									/>

									{/* LISTA DE COMPONENTES */}
									<ComponentsViewer
										personalOptions={formData.current.includePersonalData}
										onChangePersonalOptions={setPersonalInputs}
										onRequired={changeRequiredComponent}
										onFile={saveSrcComponent}
										onChange={saveCompProps}
										components={components}
										onDelete={deleteComp}
										onCopy={copyComp}
										formId={id}
									/>
								</div>
							</div>
						</DragDropContext>
					</div>
				</ThemeProvider>
			</div>
		</>
	)
}

export default NewFormView
