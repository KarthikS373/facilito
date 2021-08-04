export interface RoutesProps {
	login: string

	forms: string
	newForm: string
	answers: string
	form: string

	company: string
	guest: string
	edit: string

	products: string
	editProduct: string
	newProduct: string

	admission: string

	calendar: string

	tracking: string
	trackingSettings: string
	publicTracking: string
}

const ROUTES: RoutesProps = {
	// LOGIN
	login: '/cuenta',

	// FORMULARIOS
	forms: '/formularios',
	newForm: '/f/:formID',
	answers: '/f/:formID/respuestas',
	form: '/f/:companyURL/:formURL',

	// EMPRESA
	company: '/company',
	guest: '/e/:companyURL',
	edit: '/e/editar',

	// PRODUCTOS
	products: '/productos',
	editProduct: '/p/:productID/editar',
	newProduct: '/p/crear',

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
