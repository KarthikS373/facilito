interface Admission {
	user: {
		email?: string
		phone: string | null
		picture: string | null
		name: string
	}
	business: Business
}
