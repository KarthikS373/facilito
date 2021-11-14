export const initialFormData: Form = {
	company: {
		url: '',
		user: '',
	},
	includePersonalData: {
		phone: false,
		email: false,
		address: false,
		instructions: false,
	},
	qr: '',
	banner: '',
	badge: 'GTQ',
	title: 'Formulario sin titulo',
	description: '',
	public: false,
	background:
		'transparent linear-gradient(042deg, #346898 0%, #511F73 100%) 0% 0% no-repeat padding-box',
	url: '',
	id: '',
	components: [],
	lang: 'es',
}

// LISTA DE COMPONENTES ORDENADAS
const defFormComponent: FormContainerProps = {
	id: Math.round(Math.random() * 100000),
	name: 'short',
	background: '#ffff',
	color: '#333',
	required: false,
	text: '',
	label: '',
	helper: '',
}

export const formComponentsList: FormContainerProps[] = [
	// RESPUESTA CORTA
	{
		...defFormComponent,
		name: 'short',
		id: Math.round(Math.random() * 100000),
	},

	// PÁRRAFO
	{
		...defFormComponent,
		name: 'long',
		id: Math.round(Math.random() * 100000),
	},

	// VARIAS OPCIONES
	{
		...defFormComponent,
		name: 'radios',
		id: Math.round(Math.random() * 100000),
	},

	// CASILLAS
	{
		...defFormComponent,
		name: 'checkboxes',
		id: Math.round(Math.random() * 100000),
	},

	// DESPLEGABLE
	{
		...defFormComponent,
		name: 'select',
		id: Math.round(Math.random() * 100000),
	},

	// FECHA Y HORA
	{
		...defFormComponent,
		name: 'date',
		id: Math.round(Math.random() * 100000),
	},

	// VINCULO
	{
		...defFormComponent,
		name: 'link',
		href: '',
		id: Math.round(Math.random() * 100000),
	},

	// TITULO
	{
		...defFormComponent,
		name: 'title',
		id: Math.round(Math.random() * 100000),
	},

	// IMAGE
	{
		...defFormComponent,
		name: 'image',
		src: '',
		id: Math.round(Math.random() * 100000),
	},

	// VIDEO
	{
		...defFormComponent,
		name: 'video',
		src: '',
		alt: '',
		id: Math.round(Math.random() * 100000),
	},

	// PRODUCTOS
	{
		...defFormComponent,
		name: 'products',
		id: Math.round(Math.random() * 100000),
	},

	// LOCALIZACIÓN
	{
		...defFormComponent,
		name: 'geo',
		id: Math.round(Math.random() * 100000),
	},

	// CUPONES
	{
		...defFormComponent,
		name: 'coupons',
		id: Math.round(Math.random() * 100000),
	},

	// MULTIPLE
	{
		...defFormComponent,
		name: 'multiple',
		id: Math.round(Math.random() * 100000),
	},
]

export const initialCustomFormState: CustomFormState = {
	title: initialFormData.title,
	url: '',
	banner: '',
	description: '',
	background:
		'transparent linear-gradient(042deg, #346898 0%, #511F73 100%) 0% 0% no-repeat padding-box',
}
