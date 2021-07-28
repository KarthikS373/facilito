interface CustomAppointment {
	title: string
	start: Date
	end: Date
	allDay?: boolean
	resource?: {
		background: string
		email?: string
		name: string
		id: string
	}
}

interface EventAppointment {
	background: string
	email: string
	endDate: Date
	id: string
	name: string
	startDate: Date
	title: string
}

interface EventFormContainer {
	events: EventAppointment[]
}
