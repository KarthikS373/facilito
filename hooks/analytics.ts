// REACT
import { useEffect } from 'react'

// UTILS
import { analytics } from 'keys/firebase'

/**
 * Hook de Analytics
 * @description Inicia firebase analytics de manera segura (client side)
 */
const useAnalytics = () => {
	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			analytics()
		}
	}, [])
}

export default useAnalytics
