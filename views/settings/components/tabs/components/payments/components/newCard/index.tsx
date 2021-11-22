import React from 'react'

// COMPONENTES
import CardForm from 'views/form/components/payment/components/card'

const showCardForm = (onSave: (data: CardPointeData | undefined) => unknown): void => {
	// GUARDAR DATOS
	let tmpData: CardPointeData | undefined
	const onChange = (data: CardPointeData) => (tmpData = data)

	window.Alert({
		title: 'Agregar tarjeta',
		body: 'Completa los datos de tu tarjeta y valida el captcha para continuar.',
		type: 'confirm',
		maxWidth: window.innerWidth <= 700 ? 400 : 650,
		onConfirm: () => onSave(tmpData),
		customElements: <CardForm amount='' onChange={onChange} />,
	})
}

export default showCardForm
