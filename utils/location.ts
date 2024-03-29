import type { Country } from 'react-phone-number-input'

/**
 * Obtener posicion
 */
export const getPosition: () => Promise<GeolocationPosition> = () => {
	return new Promise((resolve, reject) => {
		if (process.browser && 'geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(resolve, (err) => reject(err), {
				enableHighAccuracy: true,
			})
		}
	})
}

/**
 * Obtener IP
 * @returns {Promise<string>}
 */
export const getIP = async (): Promise<string> => {
	const ip = await fetch('https://ipapi.co/json/')
	const json = await ip.json()

	// CÓDIGO
	return json?.ip
}

/**
 * Obtener postal code
 * @returns {Promise<[string, string]>}
 */
export const getPostalAndCity = async (): Promise<[string, string]> => {
	const ip = await fetch('https://ipapi.co/json/')
	const json = await ip.json()

	// CÓDIGO
	return [json.postal, json.city]
}

/**
 * Obtener direccion con lat, lon
 * @param  {number} lat
 * @param  {number} lon
 * @returns {Promise}
 */
export const reverseGeocoding = async (
	lat: number,
	lon: number
): Promise<{
	address: string
}> => {
	// FETCH
	const gGeocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyDe_C11fr8huOOTrcwAWANAe7JRTtgH13k`
	const gData = await fetch(gGeocodingAPI)
	const gJson = await gData.json()
	let address = ''

	console.log('%cFETCH GOOGLE REVERSE GEOCODING API', 'color:lightblue;font-weight:bold')

	// CREAR DIRECCIÓN
	if (gJson.results[1])
		address = `${gJson.results[1].address_components[0].long_name}, ${gJson.results[1].address_components[2].long_name}, ${gJson.results[1].address_components[3].long_name}`
	return { address }
}

/**
 * Obtener codigo de pais
 * @returns {Promise<Country>}
 */
export const getCountryCode = async (): Promise<Country> => {
	const ip = await fetch('https://ipapi.co/json/')
	const json = await ip.json()

	// CÓDIGO
	return json?.country_code || 'US'
}
