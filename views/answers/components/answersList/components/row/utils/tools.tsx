// UTILS
import React from 'react'
import { renderToString } from 'react-dom/server'
import { sortAnswers, deleteAnswer } from 'utils/answers'
import { printHTML } from 'utils/tools'

// COMPONENTES
import { AnswerPreview } from '../components/showAnswer'

/**
 * Imprimir respuestas
 * @description Renderiza la lista de respuestas y luego la imprime
 * @param  {FormAnswerItemContainer} data
 * @param  {FormComponent[]} components
 */
const printAnswer = (data: FormAnswerItemContainer, components: FormComponent[]) => {
	const html: string = renderToString(<AnswerPreview answers={sortAnswers(components, data)} />)
	printHTML(html)
}

/**
 * Borrar respuestas
 * @description Crea una alerta para confirmar y borrar
 * @param  {number} index
 * @param  {string} formID
 * @param  {string} companyID
 */
export const deleteAnswerPrompt = (index: number, formID?: string, companyID?: string) => {
	window.Alert({
		title: 'Borrar respuesta',
		body: '¿Estas seguro de querer borrar esta repuesta?, este proceso sera permamente.',
		type: 'confirm',
		onConfirm: () => {
			window.Snack('Borrando...')
			deleteAnswer(index, formID, companyID).then(() => window.Snack('Respuesta borrada'))
		},
	})
}

export default printAnswer
