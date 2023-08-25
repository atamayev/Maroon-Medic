import Button from "../button"

interface Props {
	showPassword: boolean,
	setShowPassword: (showPassword: boolean) => void,
}

const ShowOrHidePasswordButton = (props: Props) => {
	const { showPassword, setShowPassword } = props

	const hideOrShowPassword = () => {
		if (showPassword) return "Hide Password"
		return "Show Password"
	}

	return (
		<Button
			className = "mt-3 font-bold text-md"
			colorClass = "bg-orange-600"
			hoverClass = "hover:bg-orange-700"
			onClick = {() => (setShowPassword(!showPassword))}
			title = {hideOrShowPassword()}
			textColor  = "text-white"
		/>
	)
}

export default ShowOrHidePasswordButton
