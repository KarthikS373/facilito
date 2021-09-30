// REACT
import React from 'react'

const showInfo = ($: TemplateStrBuilder): void => {
	window.Alert({
		title: '',
		type: 'confirm',
		cancelBtn: <></>,
		body: '',
		customElements: (
			<div style={{ opacity: 0.8 }}>
				<h1 style={{ margin: '0 0 10px 0' }}>{$`Opcion de stock`}</h1>
				<ul>
					<li>
						<b>{$`Stock limitado a disponibilidad`}</b>
						<p>{$`Esta opcion mostrara un mensaje de "No disponible" cuando el producto se acabe en tu stock.`}</p>
					</li>
					<br />
					<li>
						<b>{$`Continuar vendiendo sin stock`}</b>
						<p>{$`Esta opcion creara valores negativos en tu stock cuando el producto se encuentre agotado.`}</p>
					</li>
					<br />
					<li>
						<b>{$`Stock sin limites de venta`}</b>
						<p>{$`Esta opcion permite que el valor del stock nunca termine y el producto siempre este disponible.`}</p>
					</li>
				</ul>
			</div>
		),
	})
}

export default showInfo
