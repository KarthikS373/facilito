interface User {
	business: string
	role?: 'admin' | 'user' | 'editor'
	uid: string
	email: string
	provider: string
	name: string
	phone: string | null
	picture: string | null
}
