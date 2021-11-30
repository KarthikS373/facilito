import React from 'react'

// NEXT
import Image from 'next/image'

// ICONOS
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'

// ESTILOS
import Styles from './style.module.scss'

// MATERIAL
import IconButton from '@mui/material/IconButton'

interface CompanyViewProps {
	company: Business | null
	companyURL: string
	forms: Form[]
}

const CompanyView: React.FC<CompanyViewProps> = ({ company, forms }) => {
	// ESTADO
	const [activeStep, setActiveStep] = React.useState(0)

	// MOVER SLIDER
	const handleNext = (step: number) => () =>
		setActiveStep((prevActiveStep) =>
			Math.max(0, Math.min(prevActiveStep + step, forms.length - 2))
		)

	return (
		<div className={Styles.container}>
			<div className={Styles.content}>
				<div className={Styles.image}>
					{company?.picture ? (
						<Image src={company?.picture} alt='Logo' height={130} width={130} />
					) : (
						<BusinessCenterTwoToneIcon />
					)}
				</div>
				<div className={Styles.info}>
					<h1>{company?.name}</h1>
					<p>{company?.category ?? ''}</p>
					{company?.description && <p>{company.description}</p>}
				</div>
				<div className={Styles.forms}>
					<IconButton onClick={handleNext(-1)} disabled={activeStep === 0}>
						<KeyboardArrowLeft />
					</IconButton>

					<div className={Styles.sliderContainer}>
						<div
							className={Styles.slider}
							style={{ transform: `translateX(-${activeStep * 170}px)` }}>
							{forms.map((form) => (
								<a
									key={form.id}
									target='_blank'
									className={Styles.form}
									rel='noreferrer noopener'
									href={`/f/${company?.url}/${form.url}`}>
									{form.banner && <Image src={form.banner} alt='Logo' height={100} width={150} />}
									<div className={Styles.formInfo}>
										<h3>{form.title}</h3>
										<span>{form.url}</span>
									</div>
								</a>
							))}
						</div>
					</div>

					<IconButton onClick={handleNext(1)} disabled={activeStep === forms.length - 2}>
						<KeyboardArrowRight />
					</IconButton>
				</div>
			</div>
		</div>
	)
}

export default CompanyView
