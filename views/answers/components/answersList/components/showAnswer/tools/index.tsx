import React from 'react'

const REGEX = /^(\d+) x (.+) - (\w{0,3} \d+(?:\.)?\d+)/gm
/**
 * Editar titulo de producto
 * @param answer
 * @returns
 */
export const getCustomPre = (answer: string): (JSX.Element | string)[] => {
	return answer.split(/\n/).map((part, index) => {
		const matchs = REGEX.exec(part)

		return matchs ? (
			<>
				{index > 0 && <hr />}
				{index > 0 && <br />}
				{`${matchs?.[1]} x ${matchs?.[2]} - `} {<strong>{matchs?.[3]}</strong>} {'\n'}
			</>
		) : (
			part + '\n'
		)
	})
}
