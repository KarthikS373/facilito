// MATERIAL
import { styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'

// PROPS
interface BtnProps extends ButtonProps {
	$style: React.CSSProperties
	$hoverStyle?: React.CSSProperties
}

const ColorButton = styled(Button)<BtnProps>(({ $style, $hoverStyle }) => ({
	...$style,
	'&:hover': {
		...$hoverStyle,
		boxShadow: $style?.boxShadow,
		background: $style?.background,
	},
}))

export default ColorButton
