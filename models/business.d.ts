interface Business {
	// STRING INDEX
	[index: string]:
		| string
		| string
		| string[]
		| undefined
		| CompanyBankAccount[]
		| CardPointeData[]
		| CompanyPermissions
		| Subscription

	// INFORMACIÓN BÁSICA
	backgroundImage?: string
	description?: string
	background?: string
	category: string
	lang: 'es' | 'en'
	picture?: string
	phone: string
	badge: string
	name: string
	url: string
	id: string

	// PRODUCTOS LISTA DE ID
	categories?: string[]
	products?: string[]

	// FORMULARIOS LISTA DE ID
	forms?: string[]

	// USUARIOS LISTA DE CORREOS
	users?: string[]

	// PERSONALIZACIÓN
	tokens?: string[]
	gallery: string[]

	// INFORMACIÓN BANCARIA Y PAGOS
	paymentAccounts?: CompanyPaymentAccount[]
	bankAccounts?: CompanyBankAccount[]
	subscription?: Subscription

	// PERMISOS
	permissions?: CompanyPermissions
}

// PERMISOS
interface CompanyPermissions {
	[index: string]: boolean
	templates: boolean
	payments: boolean
	products: boolean
	calendar: boolean
	tracking: boolean
	forms: boolean
	print: boolean
}

// PAGOS Y BANCO
interface CompanyBankAccount {
	[id: string]: string
	typeAccount: string
	nameAccount: string
	noAccount: string
	bank: string
}

interface CompanyPaymentAccount extends CardPointeData {
	main: boolean
}

interface Subscription {
	plan: string
	price: string
	duration: number // DATO EN DIAS
}

// PERSONALIZACIÓN
interface CompanyBackgroundProfile {
	background?: string
	backgroundImage?: string
	backgroundSize?: string
}
