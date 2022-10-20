import React, { useState } from 'react'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

// REACT-HOOK-FORM
import { UseFormSetValue, FieldValues } from 'react-hook-form'

// ICONOS
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone'

// PROPS
interface CustomerRegisterProps {
	setFieldValue: UseFormSetValue<FieldValues>
}
const CustomerRegister: React.FC<CustomerRegisterProps> = ({ setFieldValue }) => {
	// STATE
	const [showInfo, setShowInfo] = useState(false)

	// ACTUALIZAR
	const handleChange = (_ev: unknown, checked: boolean) => {
		setShowInfo(checked)
		setFieldValue('saveCustomer', checked)
	}

	return (
		<div>
			<FormGroup>
				<FormControlLabel
					onChange={handleChange}
					control={<Switch checked={showInfo} />}
					label='Guardar mis datos para proximas compras'
				/>
				{showInfo && (
					<Stack
						p={2}
						direction='row'
						alignItems='center'
						sx={{ backgroundColor: 'rgba(0,0,0,.05)', borderRadius: 'var(--radius)' }}>
						<Avatar sx={{ mr: 2 }}>
							<PersonOutlineTwoToneIcon />
						</Avatar>
						<p>{`Ahora en tu proxima compra dentro de la tienda, todos tus datos personales se llenaran automaticamente.`}</p>
					</Stack>
				)}
			</FormGroup>
		</div>
	)
}

export default CustomerRegister
