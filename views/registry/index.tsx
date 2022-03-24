// REACT
import React, { useContext, useState } from 'react'

// HOOKS
import { useRouter } from 'next/router'
import AuthContext from 'context/auth'
import useStrings from 'hooks/lang'

// TOOLS
import { saveFormData, saveOnBusinessData, savePhoneOnBusinessData } from './events'
import { getDefBusiness, validateContinue } from './tools'

// COMPONENTES
import SelectBusinessForm from './components/selectForm'
import NewCompanyForm from './components/newCompany'
import CStepper from './components/stepper'

// MATERIAL
import Button from '@mui/material/Button'

// ICONOS
import ArrowForward from '@mui/icons-material/ArrowForward'
import ArrowBack from '@mui/icons-material/ArrowBack'

// ESTILOS
import Styles from './style.module.scss'
import Plans from './components/plans'

const w = process.browser ? window.innerWidth : 0
const RegistryView: React.FC = () => {
	// LENGUAJE
	const { $ } = useStrings()

	// USER
	const { user } = useContext(AuthContext)

	// ROUTER
	const router = useRouter()

	// PASOS
	const [activeStep, setActiveStep] = useState<number>(1)

	// EMPRESA SELECCIONADA
	const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)

	// DATOS DE EMPRESA
	const [businessData, setBusinessData] = useState<Business>(getDefBusiness(router.query))

	// CREAR/UNIRSE A EMPRESA
	const [isNewCompany, setCompanyForm] = useState<boolean>(true)

	// NUMERO DE TELÉFONOm
	const [phone, setPhone] = useState<string>('')

	// CAMBIAR DE PASOS
	const nextStep = (add: number) => () => setActiveStep(activeStep + add)

	// GUARDAR DATOS
	const saveOnBusinessDataEv = (ev: React.ChangeEvent<HTMLInputElement>) =>
		saveOnBusinessData(setBusinessData, ev)

	// GUARDAR TELÉFONO
	const savePhoneOnBusinessDataEv = (phone: string) =>
		savePhoneOnBusinessData(setPhone, setBusinessData, phone)

	// ENVIAR FORMULARIO
	const saveFormDataEv = () =>
		saveFormData(isNewCompany, businessData, user ?? null, selectedBusiness)

	// FORMULARIO DE CREAR/UNIRSE
	const toggleForm = () => setCompanyForm(!isNewCompany)

	// CAMBIAR DE FORMULARIO
	const changeForm = (slide: boolean) => () => w > 850 && setCompanyForm(slide)

	// HABILITAR BOTÓN DE CONTINUAR
	const validateContinueEv = () => validateContinue(isNewCompany, businessData, selectedBusiness)

	return (
		<div className={Styles.container}>
			<CStepper activeStep={activeStep} />
			{activeStep === 1 && <Plans nextStep={nextStep(1)} setBusinessData={setBusinessData} />}

			{/* FORMULARIOS */}
			{activeStep === 2 && (
				<div
					className={Styles.content}
					style={{ transform: w <= 850 ? `translateX(-${isNewCompany ? '0%' : '50%'})` : 'none' }}>
					{/* FORMULARIO DE NUEVA EMPRESA */}
					<NewCompanyForm
						phone={phone}
						changeForm={changeForm}
						isNewCompany={isNewCompany}
						saveOnBusinessDataEv={saveOnBusinessDataEv}
						savePhoneOnBusinessDataEv={savePhoneOnBusinessDataEv}
					/>

					{/* FORMULARIO DE SELECCIÓN DE EMPRESA */}
					<SelectBusinessForm
						changeForm={changeForm}
						isNewCompany={isNewCompany}
						selectedBusiness={selectedBusiness}
						setSelectedBusiness={setSelectedBusiness}
					/>
				</div>
			)}

			{/* BOTÓN DE ENVIAR */}
			{w <= 850 && (
				<Button
					color='primary'
					variant='contained'
					endIcon={<ArrowForward />}
					className={Styles.continue}
					onClick={toggleForm}>
					{isNewCompany ? $`Pertenezco a una empresa` : $`Registrar nueva empresa`}
				</Button>
			)}

			{/* BOTÓN DE ENVIAR */}
			{activeStep === 2 && (
				<div>
					<Button
						color='primary'
						variant='contained'
						startIcon={<ArrowBack />}
						className={Styles.continue}
						sx={{ mr: 2 }}
						onClick={nextStep(-1)}>
						{$`Regresar`}
					</Button>

					<Button
						color='primary'
						variant='contained'
						disabled={validateContinueEv()}
						endIcon={<ArrowForward />}
						className={Styles.continue}
						onClick={saveFormDataEv}>
						{$`Continuar`}
					</Button>
				</div>
			)}
		</div>
	)
}

export default RegistryView
