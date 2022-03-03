import { DraggableStateSnapshot } from 'react-beautiful-dnd'

/**
 * Funcion SIGMOID
 * @param {number} x
 * @returns {number}
 */
const defSigmoid = (x: number): number => x / (1 + Math.abs(x))
export default defSigmoid

export interface Props {
	snapshot: DraggableStateSnapshot
	children: (style: React.CSSProperties) => JSX.Element
	style?: React.CSSProperties
	animationRotationFade?: number
	rotationMultiplier?: number
	sigmoidFunction?: (x: number) => number
}

export interface StateI {
	transform: null | string
	prevX: number
	rotation: number
}
