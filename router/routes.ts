export interface RoutesProps {
	login: string
	registry: string

	forms: string
	newForm: string
	answers: string
	form: string
	customers: string

	company: string
	guest: string
	edit: string

	products: string
	editProduct: string
	newProduct: string
	stock: string

	admission: string

	calendar: string

	tracking: string
	trackingSettings: string
	publicTracking: string
}

const ROUTES: RoutesProps = {
	// LOGIN
	login: '/cuenta',
	registry: '/registrar',

	// TIENDAS
	forms: '/tiendas',
	newForm: '/f/:formID',
	answers: '/f/:formID/respuestas',
	form: '/f/:companyURL/:formURL',
	customers: '/clientes',

	// EMPRESA
	company: '/company',
	guest: '/e/:companyURL',
	edit: '/e/editar',

	// PRODUCTOS
	products: '/productos',
	editProduct: '/p/:productID/editar',
	newProduct: '/p/crear',
	stock: '/inventario',

	// CALENDARIO
	calendar: '/calendario',

	// SOLICITUD DE ADMISIÓN
	admission: '/a/:id',

	// ORDER TRACKING
	tracking: '/tracking',
	trackingSettings: '/t/:formID/editar',
	publicTracking: '/t/:companyURL/:formURL',
}

export default ROUTES
