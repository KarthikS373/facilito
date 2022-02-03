import React from 'react'
const REGEX = /^Subtotal:(?: )?(\w{0,3})(?: )?(\d+(\.\d+)?)/gm

/**
 * Editar titulo de producto
 * @param answer
 * @returns
 */
export const getCustomPre = (answer: string): (JSX.Element | string)[] => {
	return answer.split(/\n/).map((part, index) => {
		const matchs = REGEX.exec(part)?.map((match) => match)

		return matchs ? (
			<>
				{index > 0 && <hr />}
				{index > 0 && <br />}
				{`Subtotal: `}
				{
					<strong>
						{matchs?.[1]} {matchs?.[2]}
					</strong>
				}
				{'\n'}
			</>
		) : (
			part + '\n'
		)
	})
}
