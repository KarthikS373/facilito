// TIPOS
import { NextPage } from 'next'
import { useRouter } from 'next/router'

// PAGE
const Answers: NextPage = () => {
	// ROUTER
	const router = useRouter()
	const { formID } = router.query
	console.log(formID)

	return <p>Prueba</p>
}

export default Answers
