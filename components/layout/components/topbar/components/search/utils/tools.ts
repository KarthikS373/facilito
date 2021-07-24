// UTILS
import { normalizeString } from 'utils/tools'

export interface LinkInfo {
	type: 'form' | 'product'
	description: string
	title: string
	id: string
}

/**
 * Buscar formularios y productos
 * @description Busca todos los items en el contexto global
 * @param  {React.ChangeEvent<HTMLInputElement>} ev
 * @param  {FormInterface} forms
 * @param  {Product[]} products
 * @param  {React.Dispatch<React.SetStateAction<LinkInfo[]>>} setLinks
 */
const searchItems = (
	ev: React.ChangeEvent<HTMLInputElement>,
	forms: FormInterface,
	products: Product[],
	setLinks: React.Dispatch<React.SetStateAction<LinkInfo[]>>
) => {
	const value: string = normalizeString(ev.target.value)
	const tmpLinks: LinkInfo[] = []

	// BUSCAR EN FORMULARIOS
	if (value.length > 0) {
		for (
			let formsIndex: number = 0, length: number = forms.forms.length;
			formsIndex < length;
			formsIndex++
		) {
			if (
				normalizeString(forms.forms[formsIndex].title).indexOf(value) !== -1 ||
				normalizeString(forms.forms[formsIndex].url).indexOf(value) !== -1 ||
				normalizeString(forms.forms[formsIndex].description).indexOf(value) !== -1
			)
				tmpLinks.push({
					title: forms.forms[formsIndex].title,
					description: forms.forms[formsIndex].description,
					id: forms.forms[formsIndex].url,
					type: 'form',
				})
		}

		// BUSCAR EN PRODUCTOS
		for (
			let productsIndex: number = 0, length: number = products.length;
			productsIndex < length;
			productsIndex++
		) {
			if (
				normalizeString(products[productsIndex].title).indexOf(value) !== -1 ||
				normalizeString(products[productsIndex].description).indexOf(value) !== -1 ||
				normalizeString(products[productsIndex].sku).indexOf(value) !== -1
			)
				tmpLinks.push({
					title: products[productsIndex].title,
					description: products[productsIndex].description,
					id: products[productsIndex].sku,
					type: 'product',
				})
		}

		// ACTUALIZAR
		setLinks(tmpLinks)
	} else setLinks([])
}

export default searchItems
