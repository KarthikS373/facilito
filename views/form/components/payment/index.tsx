// REACT
import React from 'react'

// NEXT
import dynamic from 'next/dynamic'

// HOOKS
import { makePaymentWithFormData } from './tools'

// COMPONENTES
const CardForm = dynamic(() => import('./components/card'))

// MOSTRAR ALERTA DE PAGO GENERAL
export const paymentAlert = (
	data: Record<string, unknown>,
	badge: string,
	reset: () => unknown,
	endpoint: string
): Promise<unknown> =>
	new Promise((resolve, reject) => {
		// DATOS
		let tmpCardData: CardPointeData | null = null
		let captchaToken: string | null = null

		// GUARDAR DATOS
		const saveCardData = (data: CardPointeData, reqCaptchaToken: string | null) => {
			tmpCardData = data
			captchaToken = reqCaptchaToken
		}

		// ALERTA DE PAGO
		window.Alert({
			title: 'Agregar tarjeta',
			body: 'Llena el siguiente formulario para procesar tu pago, tus datos son confidenciales y no serán compartidos con nadie.',
			type: 'confirm',
			onHide: reset,
			maxWidth: window.innerWidth <= 700 ? 400 : 650,
			onConfirm: () => {
				setTimeout(() => {
					if (tmpCardData && captchaToken) {
						window.Alert({
							title: 'Espera un momento',
							body: 'Se esta procesando tu pago, no salgas de esta pagina o no se completara tu orden',
							type: 'window',
							fixed: true,
						})
						if (tmpCardData)
							makePaymentWithFormData(data, badge, tmpCardData, endpoint)
								.then((resp) => {
									if (JSON.stringify(resp).includes('REJECT')) {
										window.Alert({
											title: 'Ocurrió un error',
											body: 'Tu pago no se proceso correctamente, intenta nuevamente. Asegurate de tener los fondos necesarios y tu tarjeta habilitada',
											type: 'error',
										})
										reset()
										reject(new Error('Pago rechazado'))
									} else resolve(resp)
								})
								.catch((err: Error) => {
									window.Alert({
										title: 'Ocurrió un error',
										body: 'Tu pago no se proceso correctamente, intenta nuevamente. Asegurate de tener los fondos necesarios y tu tarjeta habilitada',
										type: 'error',
									})
									reset()
									reject(err)
								})
					} else {
						window.Alert({
							title: 'Ocurrió un error',
							body: 'Faltó verificar el captcha',
							type: 'error',
						})
						reset()
					}
				}, 300)
			},
			customElements: (
				<CardForm
					onChange={saveCardData}
					amount={(data.total as string)?.replace(/^\D+/g, '').substr(1)}
				/>
			),
		})
	})

export default paymentAlert
