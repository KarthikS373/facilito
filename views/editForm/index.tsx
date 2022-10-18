// REACT
import React, { useRef, useState, useContext } from 'react'

// COMPONENTES
import FormComponents from './components/formComponents'
import CustomizeMenu from './components/customize'
import FormTopbar from './components/formTopbar'

// NEXT
import dynamic from 'next/dynamic'

// HOOKS
import usePaletteColors from 'hooks/theme'
import { useRouter } from 'next/router'
import useBlockAlert from './hooks'

// MATERIAL
import { ThemeProvider } from '@mui/material/styles'

// UTILS
import { defThemeColors, generateTheme } from 'utils/tools'
import { getForm, updateFormProp } from './tools'
import { initialFormData } from './utils/initials'
import { saveFormOnCloud } from './tools/cloud'
import { updateUrl } from './tools/formProps'

// CONTEXTO
import BusinessContext from 'context/business'
import FormsContext from 'context/forms'

// ESTILO
import Styles from './style.module.scss'

// DYNAMIC COMPONENTS
const AlertProvider = dynamic(() => import('providers/alerts'))

// PROPIEDADES
interface FormViewProps {
	id: string
	formTitle?: string
}

const NewFormView: React.FC<FormViewProps> = ({ id }) => {
	// EMPRESA
	const { business } = useContext(BusinessContext)

	// FORMULARIOS
	const formsCtx = useContext(FormsContext)

	// ROUTER
	const router = useRouter()

	// FORMULARIP ACTUAL
	const currentForm = getForm(id, formsCtx.forms.forms)

	// MENU DE PERSONALIZACIÓN
	const [openCustomized, setOpenCustomized] = useState<boolean>(false)

	// ACTUALIZAR
	const [defColors, setDefColors] = useState<string[]>(defThemeColors)

	// REFERENCIA DE TIENDA ACTUAL
	const formData: React.MutableRefObject<Form> = useRef(currentForm ?? initialFormData)

	// ASIGNAR DATOS A REF
	formData.current = currentForm ?? initialFormData

	// GUARDAR TIENDA EN CLOUD
	const saveCurrentForm = (ctrl: boolean) => saveFormOnCloud(ctrl, formData, business)

	// CAMBIAR PROPIEDAD
	const changeFormProp = (prop: keyof Form) => (newValue: FormValue) =>
		updateFormProp(prop, newValue, formsCtx, formData)

	// ACTUALIZAR ID DE TIENDA
	const setUrl = (newUrl: string) =>
		updateUrl(newUrl, formData, business, saveCurrentForm, formsCtx)

	// ABRIR MENU DE PERSONALIZAR
	const handleCustomizeMenu = (open: boolean) => () => {
		saveCurrentForm(false)
		setOpenCustomized(open)
	}

	// COLORES
	usePaletteColors(setDefColors, formData.current.background)

	// PANTALLA DE BLOQUEO
	useBlockAlert(router)

	return (
		<>
			<div>
				<ThemeProvider theme={generateTheme(defColors)}>
					<AlertProvider />

					<div
						className={Styles.container}
						style={
							{
								'--primary': defColors[0],
								'--secondary': defColors[1],
								'--primaryDark': defColors[0],
								'--secondaryDark': defColors[3],
							} as React.CSSProperties
						}>
						{/* TOPBAR */}
						<FormTopbar
							formData={formData}
							onChangeURL={setUrl}
							onSave={saveCurrentForm}
							onTitle={changeFormProp('title')}
							onPublish={changeFormProp('public')}
							onCustomize={handleCustomizeMenu(true)}
						/>

						{/* MENU DE PERSONALIZACION */}
						<CustomizeMenu
							id={id}
							open={openCustomized}
							onBanner={changeFormProp('banner')}
							onBack={handleCustomizeMenu(false)}
							onColor={changeFormProp('background')}
							defaultBanner={formData.current.banner}
							defaultBackground={formData.current.background}
						/>

						<FormComponents
							id={id}
							formData={formData}
							onChangeDescription={changeFormProp('description')}
						/>
					</div>
				</ThemeProvider>
			</div>
		</>
	)
}

export default NewFormView
