import React from 'react'
const REGEX = /^\s+(\d+(?:\.)?\d+ \w{0,3}) - (.+) x (\d+)/gm

/**
 * Editar titulo de producto
 * @param answer
 * @returns
 */
export const getCustomPre = (answer: string): (JSX.Element | string)[] => {
	return answer.split(/\n/).map((part, index) => {
		const matchs = REGEX.exec(part.split('').reverse().join(''))?.map((match) =>
			match.split('').reverse().join('')
		)

		return matchs ? (
			<>
				{index > 0 && <hr />}
				{index > 0 && <br />}
				{`${matchs?.[3]} x ${matchs?.[2]} - `} {<strong>{matchs?.[1]}</strong>} {'\n'}
			</>
		) : (
			part + '\n'
		)
	})
}
