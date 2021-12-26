// REACT
import React from 'react'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Card from '@mui/material/Card'

const showTemplateCard = (
	form: Form,
	$: (key: TemplateStringsArray) => string,
	showPrompt: (customForm?: Form) => unknown,
	permissions?: CompanyPermissions
): void => {
	// VERIFICAR PERMISOS PARA PLANTILLAS
	if (!permissions || permissions.templates) {
		window.Alert({
			title: '',
			body: '',
			type: 'confirm',
			hasNextAlert: true,
			confirmText: $`Iniciar`,
			onConfirm: () => showPrompt(form),
			customElements: (
				<Card>
					<CardActionArea>
						<CardMedia image={form.banner} title={form.title} className={Styles.image} />
						<CardContent>
							<Typography className={Styles.title} gutterBottom variant='h6' component='h2'>
								{form.title}
							</Typography>
							{form.description.length > 0 && (
								<Typography variant='body2' color='textSecondary' component='p'>
									{form.description}
								</Typography>
							)}
						</CardContent>
					</CardActionArea>
				</Card>
			),
		})
	} else
		window.Alert({
			title: 'Ocurrió un error',
			body: 'Actualmente no tienes los permisos necesarios para acceder a esta funcionalidad.',
			type: 'error',
		})
}

export default showTemplateCard
