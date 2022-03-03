// REACT
import { useEffect } from 'react'

// TIPOS
import type { CardData } from '..'

/**
 * Hook de enviar
 * @param  {CardData} state
 * @param  {string|null} captchaToken
 * @param  {string} amount
 * @param  {(data:CardPointeData,captchaToken:string|null)=>unknown} onChange
 */
const useSendData = (
	state: CardData,
	captchaToken: string | null,
	amount: string,
	onChange: (data: CardPointeData, captchaToken: string | null) => unknown
): void => {
	// ENVIAR DATOS
	useEffect(() => {
		const tmpData = { ...state }

		// ARREGLAR
		tmpData.expiry = tmpData.expiry.replace('/', '')
		tmpData.number = tmpData.number.replace(/ /g, '')

		// ENVIAR
		onChange(
			{
				name: tmpData.name,
				cvv2: tmpData.cvc,
				account: tmpData.number,
				expiry: tmpData.expiry,
				amount,
			},
			captchaToken
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state, amount, captchaToken])
}

/**
 * Agregar css externo
 * @param  {string} href
 * @param  {string} id
 * @param  {string} media='all'
 */
export const useExternalCSS = (href: string, id: string, media = 'all'): void => {
	useEffect(() => {
		// ELEMENTO EXISTENTE
		if (document.getElementById(id)) return

		// SELECCIONAR HEAD
		const head = document.getElementsByTagName('head')[0]
		const link = document.createElement('link')

		// CONFIGURAR
		link.id = id
		link.rel = 'stylesheet'
		link.type = 'text/css'
		link.href = href
		link.media = media

		// AGREGAR AL HEAD
		head.appendChild(link)
	}, [href, id, media])
}

export default useSendData
