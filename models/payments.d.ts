interface CardPointeData {
	account: string
	expiry: string
	amount: string
	name: string
	cvv2: string
}

interface PaymentData {
	cliente: {
		currency: string
		firstName: string
		lastName: string
		street1: string
		country: string
		city: string
		state: string
		postalCode: string
		email: string
		ipAddress: string
		phone: string
		Total: string
		fecha_transaccion: string
	}

	tarjetaPagalo: {
		nameCard: string
		accountNumber: string
		expirationMonth: string
		expirationYear: string
		CVVCard: string
	}

	detalle: {
		id_producto: string
		nombre: string
		precio: string
		cantidad: number
		tipo: 'producto' | 'servicio'
		Subtotal: string
	}[]
}
