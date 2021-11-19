/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component, Fragment } from 'react'
import type { Props, StateI } from './tools'
import defSigmoid from './tools'

// INICIALES
let animationId = 0
const initialState = {
	transform: null,
	prevX: 0,
	rotation: 0,
}

// COMPONENTE
class NaturalDragAnimation extends Component<Props, StateI> {
	// ESTADO
	state = {
		...initialState,
	}

	// DEF PROPS
	static defaultProps = {
		animationRotationFade: 0.9,
		rotationMultiplier: 1.3,
		sigmoidFunction: defSigmoid,
	}

	static getDerivedStateFromProps(props: Props, state: StateI) {
		// ACTUALIZAR ESTADO INICIAL
		if (props.snapshot.dropAnimation && state.transform)
			return {
				...initialState,
			}

		return null
	}

	// REACT PORTAL
	componentDidMount() {
		if (this.props.snapshot.isDragging) animationId = requestAnimationFrame(this.patchTransform)
	}

	// ACTUALIZAR
	componentDidUpdate(prevProps: Props) {
		// INICIAR ANIMACION
		if (!prevProps.snapshot.isDragging && this.props.snapshot.isDragging)
			animationId = requestAnimationFrame(this.patchTransform)

		// CANCELAR
		if (prevProps.snapshot.isDragging && !this.props.snapshot.isDragging)
			cancelAnimationFrame(animationId)
	}

	// SALIR CANCELAR
	componentWillUnmount() {
		cancelAnimationFrame(animationId)
	}

	// CSS TRANSFORM
	patchTransform = () => {
		// PROPS
		const {
			snapshot: { isDragging },
			style,
			animationRotationFade,
			rotationMultiplier,
			sigmoidFunction,
		} = this.props

		if (isDragging && style?.transform) {
			const currentX =
				style?.transform.match(/translate\(.{1,}\)/g)?.[0].match(/-?[0-9]{1,}/g)?.[0] ?? 0
			const velocity = +currentX - this.state.prevX
			const prevRotation = this.state.rotation
			let rotation =
				prevRotation * (animationRotationFade ?? 0.9) +
				sigmoidFunction!(velocity) * (rotationMultiplier ?? 1.3)
			const newTransform = `${style.transform} rotate(${rotation}deg)`

			// REINICIAR ROTACION
			if (Math.abs(rotation) < 0.01) rotation = 0

			// ACTUALIZACION
			this.setState(
				{
					transform: newTransform,
					prevX: +currentX,
					rotation,
				},
				() => {
					animationId = requestAnimationFrame(this.patchTransform)
				}
			)
		} else animationId = requestAnimationFrame(this.patchTransform)
	}

	// JSX
	render() {
		// PROPS
		const {
			snapshot: { isDragging, dropAnimation },
		} = this.props

		// ESTILOS
		const style = (
			isDragging && !dropAnimation
				? {
						...this.props.style,
						transform: this.state.transform,
				  }
				: this.props.style
		) as React.CSSProperties

		// RENDER
		return <Fragment>{this.props.children(style)}</Fragment>
	}
}

export default NaturalDragAnimation
