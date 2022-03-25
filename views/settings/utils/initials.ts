const defBusiness: Business = {
	backgroundImage: '',
	description: '',
	background:
		'transparent linear-gradient(125deg, #1bcbe6 0%, #096de8 100%) 0% 0% no-repeat padding-box',
	category: '',
	lang: 'es',
	picture: '',
	phone: '',
	badge: 'GTQ',
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
		plan: 'Plan Básico',
		price: '99',
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

	// TEMA
	theme: {
		deg: '125deg',
		primary: '#1bcbe6',
		secondary: '#096de8',
		muted: '#096de8',
	},
}

export default defBusiness
