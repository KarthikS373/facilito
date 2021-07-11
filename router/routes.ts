interface RoutesProps {
	login: string

	forms: string
	newForm: string
	answers: string
	form: string

	company: string
	visitor: string
	edit: string

	products: string
	editProduct: string
	newProduct: string

	admission: string

	calendar: string

	orderTracking: string
	orderTrackingSettings: string
	publicOrderTracking: string
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
	visitor: '/e/:companyURL',
	edit: '/e/editar',

	// PRODUCTOS
	products: '/productos',
	editProduct: '/p/:product/editar',
	newProduct: '/p/crear',

	// CALENDARIO
	calendar: '/calendario',

	// SOLICITUD DE ADMISIÓN
	admission: '/a/:id',

	// ORDER TRACKING
	orderTracking: '/tracking',
	publicOrderTracking: '/t/:formID/setting',
	orderTrackingSettings: '/t/:companyURL/:formURL',
}

export default ROUTES
