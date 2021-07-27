interface CustomAppointment {
	startDate: Date
	endDate: Date
	title: string
	background: string
	name: string
	id: string
	email?: string
}

interface EventFormContainer {
	events: CustomAppointment[]
}
