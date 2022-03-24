// TOOLS
import { sendAdmissionRequest, sendAdmissionRequestCompany } from 'utils/business'
import { stringToUrl } from 'utils/tools'
import type { User } from '@firebase/auth'
import React from 'react'
import CardForm from 'views/form/components/payment/components/card'
import showCardForm from 'views/settings/components/tabs/components/payments/components/newCard'

/**
 * Guardar todos los datos del negocio
 * @param  {React.Dispatch<React.SetStateAction<Business>>} setBusinessData
 * @param  {InputData} data
 */
export const saveOnBusinessData = (
	setBusinessData: React.Dispatch<React.SetStateAction<Business>>,
	ev: React.ChangeEvent<HTMLInputElement>
) => {
	const { name, value } = ev.target
	setBusinessData((prevData: Business) => ({
		...prevData,
		[name]: name === 'url' ? stringToUrl(value.toString()).toLowerCase() : value.toString(),
	}))
}

/**
 * Guardar telefono en negocio
 * @param  {React.Dispatch<React.SetStateAction<string>>} setPhone
 * @param  {React.Dispatch<React.SetStateAction<Business>>} setBusinessData
 * @param  {string} phone
 */
export const savePhoneOnBusinessData = (
	setPhone: React.Dispatch<React.SetStateAction<string>>,
	setBusinessData: React.Dispatch<React.SetStateAction<Business>>,
	phone: string
) => {
	setPhone(phone)
	setBusinessData((prevData: Business) => ({
		...prevData,
		phone,
	}))
}

/**
 * Guardar datos de formulario
 * @param  {boolean} isNewCompany
 * @param  {Business} businessData
 * @param  {User|null} user
 * @param  {Business|null} selectedBusiness
 */
export const saveFormData = (
	isNewCompany: boolean,
	businessData: Business,
	user: User | null,
	selectedBusiness: Business | null
) => {
	// ENVIAR SI ES NUEVA
	if (isNewCompany) {
		// MOSTRAR ALERTA DE CUENTA
		showCardForm((data) => {
			if (businessData) {
				businessData.paymentAccounts = data ? [{ ...data, main: true }] : []
			}

			// ALERTA DE INICIO
			window.Alert({
				title: 'Espera un momento...',
				body: 'Se esta esta registrando tu empresa, esto no suele tardar demasiado, por favor no cierres esta pestaña.',
				type: 'window',
			})

			// NUEVA EMPRESA
			if (isNewCompany && user && user?.displayName) {
				businessData.id = businessData.url
				sendAdmissionRequestCompany(user.displayName, businessData).then(() =>
					window.Alert({
						title: 'Solicitud enviada',
						body: 'Ya se envió tu solicitud de empresa, de momento no podrás acceder hasta que se conceda tu acceso en Facilito APP.',
						type: 'window',
						fixed: true,
					})
				)
			}
		})
	} else {
		// ALERTA DE INICIO
		window.Alert({
			title: 'Espera un momento...',
			body: 'Se esta esta enviando tu solicitud, esto no suele tardar demasiado, por favor no cierres esta pestaña.',
			type: 'window',
		})

		// ENVIAR
		if (user?.displayName && selectedBusiness)
			sendAdmissionRequest(user?.displayName, selectedBusiness).then(() =>
				window.Alert({
					title: 'Solicitud enviada',
					body: 'Ya se envió tu solicitud a la empresa, de momento no podrás acceder hasta que se conceda tu acceso por el administrador.',
					type: 'window',
					fixed: true,
				})
			)
	}
}
