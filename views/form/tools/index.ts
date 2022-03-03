/* eslint-disable @typescript-eslint/ban-ts-comment */
// TODO: IMPROVE THIS S**T
/* eslint-disable @typescript-eslint/no-unused-vars */
/// TOOLS
import { changeCouponsCount, changeReservations } from 'utils/forms'
import { dateToString, openNewWindow, parseDate, sendMail } from 'utils/tools'
import { getPosition, reverseGeocoding } from 'utils/location'
import { senPushNotification } from 'utils/functions'
import { bulkUpdateProducts } from 'utils/products'
import { orderAnswers, saveFormAnswer } from 'utils/answers'
import { saveEvents } from 'utils/events'

// COMPONENTES
import successAlertComponent from '../components/success/successAlert'
import paymentAlert from '../components/payment'

/**
 * Referencias geo
 * @param  {FormComponent[]|undefined} formComponents
 * @param  {React.MutableRefObject<FormAnswerItemContainer>} geoReferences
 * @returns {Promise<void>}
 */
export const setGeoRefs = async (
	formComponents: FormComponent[] | undefined,
	geoReferences: React.MutableRefObject<FormAnswerItemContainer>
): Promise<void> => {
	// CARGAR POSICIÓN
	getPosition().then(async (position: GeolocationPosition) => {
		const address: string = (
			await reverseGeocoding(position.coords.latitude, position.coords.longitude)
		).address

		// AGREGAR A RESPUESTAS
		let firstGeo = 0
		formComponents?.forEach((component: FormComponent) => {
			if (component.name === 'geo' && firstGeo === 0) {
				// CREAR RESPUESTA
				geoReferences.current[`geo_${component.id}`] = {
					quest: 'Localizacion',
					answer: address,
				}
				firstGeo++
			}
		})
	})
}

/**
 * Obtener cupones
 * @param  {(Coupon[]|undefined)[]|undefined} coupons
 * @returns {string}
 */
export const getCouponProducts = (coupons: (Coupon[] | undefined)[] | undefined): string[] => {
	// PRODUCTOS CON CUPONES
	const productCoupons = coupons
		? coupons
				.map((coupon) => {
					if (coupon)
						return coupon
							.map((coupon: Coupon) =>
								coupon.products
									? coupon.products.map((product: Partial<Product>) => product.sku || false)
									: ['']
							)
							.flat()
					else return false
				})
				.flat()
				.filter(Boolean)
		: ([] as string[])

	// ELIMINAR DUPLICADOS
	const filteredProductCoupons = [...new Set(productCoupons)] as string[]
	return filteredProductCoupons
}

/**
 * Un formulario tiene un componente
 * @param  {BlockComponent[]|undefined} formComponents
 * @param  {string} name
 * @param  {boolean} withSwitch1=false
 * @param  {boolean} withSwitch2=false
 * @returns {boolean}
 */
export const formHasComponent = (
	formComponents: BlockComponent[] | undefined,
	name: string,
	withSwitch1 = false,
	withSwitch2 = false
): boolean => {
	// COMPONENTES DE LOCALIZACIÓN
	const hasComponent: boolean = formComponents
		? formComponents?.some(
				(component: BlockComponent) =>
					component.name === name &&
					(withSwitch1 ? component.switch_1 : true) &&
					(withSwitch2 ? component.switch_2 : true)
		  )
		: false

	return hasComponent
}

/**
 * Obtener geo componentes
 * @param  {BlockComponent[]|undefined} formComponents
 * @param  {React.MutableRefObject<FormAnswerItemContainer|never>} geoReferences
 */
export const setGeoComponents = (
	formComponents: BlockComponent[] | undefined,
	geoReferences: React.MutableRefObject<FormAnswerItemContainer | never>
): void => {
	// COMPONENTES DE LOCALIZACIÓN
	const hasLocations: boolean = formHasComponent(formComponents, 'geo', true)
	if (hasLocations) setGeoRefs(formComponents, geoReferences)
}

/**
 * Reducir respuestas
 * @param  {Record<string, unknown>} data
 * @param  {FormAnswerItemContainer} dataCopy
 * @param  {string} badge
 * @param  {TemplateStrBuilder} $
 * @returns {FormAnswerItemParsed}
 */
export const reduceAnswers = (
	data: Record<string, unknown>,
	dataCopy: FormAnswerItemContainer,
	badge: string,
	$: TemplateStrBuilder
): FormAnswerItemParsed => {
	const tmpData: FormAnswerItemParsed = {
		...dataCopy,
		personal_name_0: {
			quest: `👨 ${$`Nombre`}`,
			answer: data.personal_name_0 as string,
		},
		personal_email_0: data.personal_email_0
			? {
					quest: `📮 ${$`Correo electrónico`}`,
					answer: data.personal_email_0 as string,
			  }
			: undefined,
		personal_phone_0: data.personal_phone_0
			? {
					quest: `📞 ${$`Número de teléfono`}`,
					answer: data.personal_phone_0 as string,
			  }
			: undefined,
		personal_address_0: data.personal_address_0
			? {
					quest: `📪 ${$`Dirección`}`,
					answer: data.personal_address_0 as string,
			  }
			: undefined,
		personal_instructions_0: data.personal_instructions_0
			? {
					quest: `🔍 ${$`Observaciones`}`,
					answer: data.personal_instructions_0 as string,
			  }
			: undefined,
	}

	// ELIMINAR DATOS PERSONALES
	Object.keys(tmpData).forEach((key: string) => {
		if (tmpData[key] === undefined) delete tmpData[key]
		if (key.startsWith('multiple')) delete tmpData[key]
		if (key.startsWith('extras')) delete tmpData[key]
		if (key.startsWith('link')) delete tmpData[key]
		if (key.startsWith('products')) {
			const answer = tmpData[key]?.answer as FormProductSliderAnswer[]
			if (answer && typeof answer === 'object' && tmpData[key]) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				tmpData[key]!.answer = (
					answer?.map(
						(resp: FormProductSliderAnswer, productIndex: number) =>
							`${$`Subtotal: `}${badge} ${resp.totalPrice.toString()}\n${resp.count} x ${
								resp.title
							} - ${badge} ${parseFloat(resp.price.toString()).toFixed(2)} ${
								// @ts-ignore
								(data[`extras_${key}`]?.[productIndex] as unknown as ExtraProductData[])
									?.map(
										(ex: ExtraProductData) =>
											`\n ${ex.title}${ex.options
												.map(
													(option: ExtraOptional) =>
														`\n    + ${option.name}${+option.price > 0 ? ' - ' : ''}${
															+option.price > 0 ? badge : ''
														} ${+option.price > 0 ? (+option.price).toFixed(2) : ''}`
												)
												.join('')}`
									)
									.join('')
							}`
					) || []
				).join('\n\n')
			} else delete tmpData[key]
		}
		if (!tmpData[key]) delete tmpData[key]
		if (tmpData[key] && !tmpData[key]?.answer) delete tmpData[key]
		if (key.startsWith('summary')) delete tmpData[key]
		if (key.startsWith('discountTotal')) delete tmpData[key]
		if (key.startsWith('taxesPrice')) delete tmpData[key]
		if (key.startsWith('cardPrice')) delete tmpData[key]
		if (key.startsWith('shippingPrice')) delete tmpData[key]
	})

	// RETORNO
	return tmpData
}

/**
 * Agregar iconos
 * @param  {FormAnswerItemContainer} filteredData
 * @param  {TemplateStrBuilder} $
 * @returns {FormAnswerItemContainer}
 */
export const addAnswerIcons = (
	filteredData: FormAnswerItemContainer,
	$: TemplateStrBuilder
): FormAnswerItemContainer => {
	// COPIAR
	const customDates: FormAnswerItemContainer = { ...filteredData }
	Object.keys(customDates).forEach((key: string) => {
		if (key.startsWith('date')) {
			customDates[key].quest = '📆 ' + customDates[key].quest
			customDates[key].answer = `${dateToString(customDates[key].answer[0] as unknown as Date)}${
				customDates[key].answer.length === 2
					? `- ${dateToString(customDates[key].answer[1] as unknown as Date)}`
					: ''
			}`
		} else if (key.startsWith('short')) customDates[key].quest = '🗒 ' + customDates[key].quest
		else if (key.startsWith('long')) customDates[key].quest = '📄 ' + customDates[key].quest
		else if (key.startsWith('radios')) customDates[key].quest = '🔘 ' + customDates[key].quest
		else if (key.startsWith('checkboxes')) customDates[key].quest = '✅ ' + customDates[key].quest
		else if (key.startsWith('select')) customDates[key].quest = '🗂 ' + customDates[key].quest
		else if (key.startsWith('products')) {
			if (key === 'products_0') customDates[key].quest = '🏷 ' + $`Productos buscados`
			else customDates[key].quest = '🏷 ' + customDates[key].quest
		} else if (key.startsWith('total')) customDates[key].quest = '💰 ' + customDates[key].quest
		else if (key.startsWith('payMethod')) customDates[key].quest = '💵 ' + customDates[key].quest
		else if (key.startsWith('shippingMethod'))
			customDates[key].quest = '🚘 ' + customDates[key].quest
		else if (key.startsWith('coupon')) customDates[key].quest = '🎟️ ' + customDates[key].quest
	})

	// RETORNO
	return customDates
}

/**
 * Obtener texto url whatsapp
 * @param  {FormAnswerItemContainer} data
 * @param  {string} companyName
 * @param  {string} formTitle
 * @param  {FormComponent[]} components
 * @param  {TemplateStrBuilder} $
 * @param  {number} phone?
 * @returns {string}
 */
export const getWhatsappAnswers = (
	data: FormAnswerItemContainer,
	companyName: string,
	formTitle: string,
	components: FormComponent[],
	$: TemplateStrBuilder,
	phone?: number
): string => {
	// CREAR TEXTO
	const orderAnswersData: OrderedAnswer[] = orderAnswers(components, data)
	const now = new Date()

	// FECHA
	const ansDate = `📅 ${$`Enviado el`} ${now.toLocaleDateString('en-GB')}, ${now.toLocaleTimeString(
		'en-US'
	)}`

	let firstTransferTitle = true
	const stringAns: string =
		`*${companyName}*\n\n📝 ${$`Tienda`}: ${formTitle}\n${ansDate}\n${'-'.repeat(
			ansDate.length + 3
		)}\n` +
		orderAnswersData
			.map((reqAnswer: OrderedAnswer) => {
				const isBankAccountName: boolean = reqAnswer.key.startsWith('bank_account_name')
				const isBankAccountBankName: boolean = reqAnswer.key.startsWith('bank_account_bank')
				const ansText = `${
					isBankAccountName
						? firstTransferTitle
							? $`Estás serían las siguientes cuentas dónde puede hacer su transferencia, al realizar por favor enviar captura de la misma`
							: ''
						: ''
				} *${reqAnswer.answer.quest}*:\n${reqAnswer.answer.answer}${
					reqAnswer.key.startsWith('bank_account_') ? (isBankAccountBankName ? '\n' : '') : '\n'
				}`

				// IMPEDIR TEXTO DE BANCO
				if (isBankAccountName) firstTransferTitle = false
				return ansText
			})
			.join('\n')

	// QUERY STRING
	const queryString = new URLSearchParams({
		text: stringAns,
		phone: phone?.toString().replace('+', '') ?? '',
	}).toString() as string

	// RETURN
	return queryString
}
/**
 * Obtener repuestas de email
 * @param  {FormAnswerItemContainer} data
 * @param  {string} companyName
 * @param  {string} formTitle
 * @param  {FormComponent[]} components
 * @param  {TemplateStrBuilder} $
 * @returns {string}
 */
export const getEmailAnswers = (
	data: FormAnswerItemContainer,
	companyName: string,
	formTitle: string,
	components: FormComponent[],
	$: TemplateStrBuilder
): string => {
	// CREAR TEXTO
	const orderAnswersData: OrderedAnswer[] = orderAnswers(components, data)
	const now = new Date()

	// FECHA
	const ansDate = `📅 ${$`Enviado el`} ${now.toLocaleDateString('en-GB')}, ${now.toLocaleTimeString(
		'en-US'
	)}`

	// STRINGS

	let firstTransferTitle = true
	const stringAns: string =
		`<h1>${companyName}</h1><h2>📝 ${$`Tienda`}: ${formTitle}</h2><h3>${ansDate}</h3><hr/>` +
		orderAnswersData
			.map((reqAnswer: OrderedAnswer) => {
				const isBankAccountName: boolean = reqAnswer.key.startsWith('bank_account_name')
				const answer = reqAnswer.answer.answer
				if (typeof answer === 'string') {
					const ansText = `<p>${
						isBankAccountName
							? firstTransferTitle
								? `<p>${$`Estás serían las siguientes cuentas dónde puede hacer su transferencia, al realizar por favor enviar captura de la misma:`}</p><br/><br/>`
								: ''
							: ''
					}<strong>${reqAnswer.answer.quest}</strong>:<br/>${reqAnswer.answer.answer
						.toString()
						.replace(/\n/g, '<br/>')
						.replace(/\s\s\s\s\+\s/g, '&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;')}</p>\n`

					// IMPEDIR TEXTO DE BANCO
					if (isBankAccountName) firstTransferTitle = false
					return ansText
				} else return ''
			})
			.join('\n')

	return stringAns
}

/**
 * Enviar datos
 * @param  {TemplateStrBuilder} $
 * @param  {Record<string, unknown>} data
 * @param  {EmptyFunction} reset
 * @param  {Form|null} formData
 * @param  {Business|null} company
 * @param  {string[]} defColors
 * @param  {React.MutableRefObject<FormAnswerItemContainer|never>} geoRef
 * @param  {string} formURL
 * @param  {string} companyURL
 */
export const sendForm = async (
	$: TemplateStrBuilder,
	data: Record<string, unknown>,
	reset: EmptyFunction,
	formData: Form | null,
	company: Business | null,
	defColors: string[],
	geoRef: React.MutableRefObject<FormAnswerItemContainer | never>,
	formURL: string,
	companyURL: string
): Promise<void> => {
	// ID DE EMPRESA
	const companyID: string | undefined = company?.id || ''
	if (companyID.length) {
		// PROCESAR PAGO
		if (data.payMethod === $`Pago con tarjeta`) {
			//  MAMMAMARIA Y FRANKS
			await paymentAlert(data, formData?.badge ?? 'GTQ', reset, 'processPayment').catch((err) =>
				console.log(err)
			)
		}

		// ALERTA DE INICIO
		window.Alert({
			title: 'Enviando respuestas...',
			body: 'Gracias por responder, se están enviando tus respuestas espera un momento esto no suele tardar mucho, no te salgas de la tienda por favor.',
			type: 'window',
		})

		//  OBTENER LOCALIZACIÓN
		const hasLocations: boolean = formHasComponent(formData?.components, 'geo')
		if (formData?.components && hasLocations && Object.keys(geoRef.current).length === 0)
			await setGeoRefs(formData.components, geoRef)

		// DATOS
		let dataCopy = { ...data }
		const productIds: ParsedProduct[] = []
		const dataIDS: string[] = Object.keys(data)

		// ARREGLAR PREGUNTAS
		dataIDS.forEach((id: string) => {
			// BUSCAR PREGUNTA
			const compQuest: BlockComponent | undefined = formData?.components.find(
				(component: BlockComponent) => id.includes(component.id.toString())
			)

			// PRODUCTOS
			if (id.startsWith('products')) {
				if (data[id] && typeof data[id] === 'object') {
					const products: FormProductSliderAnswer[] = data[id] as FormProductSliderAnswer[]
					products.forEach((product: FormProductSliderAnswer) => {
						// CREAR OBJETO DE DETALLE
						productIds.push({ ...product, discount: product.productCount })
					})
				}
			}

			// CREAR OBJETO
			dataCopy[id] = {
				answer: data[id],
				quest:
					id === 'total'
						? $`Total de tu orden`
						: id === 'payMethod'
						? $`Pago en efectivo`
						: id === 'shippingMethod'
						? $`Envío`
						: id === 'coupon'
						? $`Cupón`
						: compQuest
						? compQuest?.label
						: '',
			}
		})

		// AGREGAR DATOS BANCARIOS
		if (data.payMethod === $`Pago con tarjeta`) {
			company?.bankAccounts?.forEach((bankAccount: CompanyBankAccount, index: number) => {
				// NOMBRE DE CUENTA
				if (bankAccount?.nameAccount)
					dataCopy[`bank_account_name_${index}`] = {
						answer: bankAccount?.nameAccount,
						quest: `👤 ${$`Nombre`}`,
					}

				// NÚMERO DE CUENTA
				if (bankAccount?.noAccount)
					dataCopy[`bank_account_number_${index}`] = {
						answer: bankAccount?.noAccount,
						quest: `💸 ${$`Número de cuenta`}`,
					}

				// TIPO DE CUENTA
				if (bankAccount?.typeAccount)
					dataCopy[`bank_account_type_${index}`] = {
						answer: bankAccount?.typeAccount,
						quest: `✍️ ${$`Tipo de cuenta`}`,
					}

				// BANCO
				if (bankAccount?.bank)
					dataCopy[`bank_account_bank_${index}`] = {
						answer: bankAccount?.bank,
						quest: `🏦 ${$`Banco`}`,
					}
			})
		}

		// ELIMINAR DATOS PERSONALES
		if (Object.keys(geoRef.current).length > 0) dataCopy = { ...dataCopy, ...geoRef.current }
		const filterData: FormAnswerItemContainer = reduceAnswers(
			data,
			dataCopy as FormAnswerItemContainer,
			formData?.badge.trim() || 'GTQ',
			$
		) as FormAnswerItemContainer

		// GUARDAR CITA
		let isDatesPresent = false
		const dateKeys: string[] = []
		const appointments: EventAppointment[] = Object.keys(filterData)
			.map((formKey: string) => {
				if (formKey.startsWith('date')) {
					isDatesPresent = true
					dateKeys.push(formKey)

					// BUSCAR DOCUMENTO
					const component: BlockComponent | undefined = formData?.components.find(
						(component: BlockComponent) => formKey.includes(component.id.toString())
					)

					// AGREGAR DURACIÓN
					const dates: Date[] = filterData[formKey].answer as unknown as Date[]
					const endDate: Date = new Date(
						parseDate(dates.length === 2 ? dates[1] : dates[0])?.getTime() || 0
					)
					const startDate: Date = new Date(parseDate(dates[0])?.getTime() || 0)

					// ASIGNAR DURACIÓN
					endDate.setMinutes(endDate.getMinutes() + (component?.duration || 0))

					// CREAR EVENTO
					const appointment: EventAppointment = {
						startDate,
						endDate,
						title: formData?.title || 'Tienda sin titulo',
						background: defColors[0],
						id: formData?.id || '',
						email: filterData.personal_email_0 ? filterData.personal_email_0.answer.toString() : '',
						name: filterData.personal_name_0.answer.toString(),
					}

					// GUARDAR
					if (formData?.title && companyID) return appointment
					else return undefined
				} else return undefined
			})
			.filter(
				(appoint: EventAppointment | undefined) => appoint !== undefined
			) as EventAppointment[]

		// ENVIAR
		if (formData && companyID) {
			await saveFormAnswer(companyID, formData.id, addAnswerIcons(filterData, $)).then(
				async (index: number) => {
					//  ALERTA DE EXITO
					const successAlert = () => successAlertComponent(formData, companyURL, formURL, index, $)

					// ACTUALIZAR STOCK
					if (productIds.length > 0) {
						// ACTUALIZAR
						const stocksReq: Partial<Product>[] = productIds
							.map((product: ParsedProduct) => {
								if (product.stockOption === 'ctn') {
									return {
										sku: product.sku,
										count: product.productCount - product.count,
									}
								} else if (product.stockOption === 'lim') {
									if (product.productCount >= product.count) {
										// CALCULAR DIFERENCIA
										const countDiff: number = product.productCount - product.count

										// AVISO DE STOCK VACIÓ
										if (countDiff === 0 && company)
											sendMail(
												`<h1>${$`Hola`} ${
													company.name
												}</h1><br/><p>${$`Facilito te informa que el producto`} <strong>${
													product.title
												}</strong> - ${
													product.sku
												} ${$`se acaba de agotar, agrega mas al inventario o cambia su disponibilidad.`}</p>`,
												$`Producto agotado`,
												company.users
											)

										// ACTUALIZAR PRODUCTO
										return {
											sku: product.sku,
											count: countDiff,
										}
									} else return false
								} else return false
							})
							.filter(Boolean) as Partial<Product>[]

						// CAMBIAR PRODUCTOS
						bulkUpdateProducts(stocksReq, companyID)
					}

					// ENVIAR NOTIFICACIÓN PUSH
					if (formData?.url && formData?.title) {
						const pushData: PushData = {
							url: '',
							title: $`Nueva respuesta`,
							message: `${$`Hola, hay una nueva respuesta de`} ${filterData.personal_name_0.answer.toString()} ${$`para la tienda`} "${
								formData?.title
							}", ${$`¿Deseas verlo ahora?`}`,
							form: formData?.url,
							tokens: company?.tokens || [],
						}
						senPushNotification(pushData)
					}

					// GUARDAR EVENTOS
					if (isDatesPresent) {
						if (formData?.title && companyID) {
							await saveEvents(companyID, formData.id, appointments)
							await changeReservations(dateKeys, companyID, formData.id)
						}
					}

					// GUARDAR CUPONES
					if (Object.keys(filterData).some((key: string) => key.startsWith('coupon')))
						await changeCouponsCount(
							[
								filterData.coupon?.answer.toString().split(' - ')[0],
								...Object.keys(filterData)
									.filter((key: string) => key.startsWith('coupon'))
									.map((key: string) => filterData[key]?.answer.toString()),
							].filter(Boolean),
							companyID,
							formData.id
						)

					// ENVIAR A WHATSAPP
					if (company && formData?.answersConnection?.methods.includes('whatsapp')) {
						const whatsappText = getWhatsappAnswers(
							filterData,
							company.name,
							formData.title,
							formData.components,
							$,
							+formData.answersConnection.whatsapp
						)
						openNewWindow(`https://api.whatsapp.com/send?${whatsappText}`)
						successAlert()
					}

					// ENVIAR A EMAIL
					if (company && formData?.answersConnection?.methods.includes('email')) {
						const emails = [
							formData.answersConnection?.email.toString(),
							filterData.personal_email_0
								? filterData.personal_email_0.answer.toString()
								: undefined,
						].filter(Boolean) as string[]

						const emailAnswers = getEmailAnswers(
							filterData,
							company.name,
							formData.title,
							formData.components,
							$
						)
						sendMail(emailAnswers, $`Nueva respuesta`, emails).then(successAlert)
					}

					// SALIR
					else successAlert()
				}
			)
		}
	}
}
