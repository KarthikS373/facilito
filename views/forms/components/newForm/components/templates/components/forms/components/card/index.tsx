// REACT
import React from 'react'

// ICONS
import NoteAddTwoTone from '@material-ui/icons/NoteAddTwoTone'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

const showTemplateCard = (form: Form, $: (key: TemplateStringsArray) => string) => {
	window.Alert({
		title: '',
		body: '',
		type: 'confirm',
		hideActions: true,
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
				<CardActions className={Styles.actions}>
					<Button onClick={window.hideAlert}>{$`Cancelar`}</Button>
					<Button color='primary' startIcon={<NoteAddTwoTone />}>
						{$`Iniciar`}
					</Button>
				</CardActions>
			</Card>
		),
		confirmText: $`Iniciar`,
	})
}

export default showTemplateCard
