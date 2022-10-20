interface CustomerPersonalData {
	ip: string
	city: string
	form: string
	name: string
	phone: string
	email: string
	postal: string
	address: string
	country: string
	instructions: string
}

interface CustomerData {
	data: CustomerPersonalData[]
	dates: Date[]
}

interface CustomerSelf {
	data: CustomerPersonalData
	date: Date
}
