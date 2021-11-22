const defBusiness: Business = {
	backgroundImage: '',
	description: '',
	background: '',
	category: '',
	lang: 'es',
	picture: '',
	phone: '',
	badge: '',
	name: '',
	url: '',
	id: '',

	// PRODUCTOS LISTA DE ID
	categories: [],
	products: [],

	// TIENDAS LISTA DE ID
	forms: [],

	// USUARIOS LISTA DE CORREOS
	users: [],

	// PERSONALIZACIÓN
	tokens: [],
	gallery: [],

	// INFORMACIÓN BANCARIA Y PAGOS
	paymentAccounts: [],
	bankAccounts: [],
	subscription: {
		plan: '',
		price: '',
		duration: 0,
	},

	// PERMISOS
	permissions: {
		templates: true,
		payments: true,
		products: true,
		calendar: true,
		tracking: true,
		forms: true,
		print: true,
	},
}

export default defBusiness
