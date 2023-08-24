import FormGroup from "../form-group"

interface Props {
  loginOrSignUp: "Login" | "Sign up",
  setPasswordConfirm?: (passwordConfirm: string) => void,
  showPassword: "text" | "password",
}

const ConfirmPassword = (props: Props) => {
	const { loginOrSignUp, setPasswordConfirm, showPassword } = props

	if (loginOrSignUp === "Sign up" && setPasswordConfirm) {
		return (
			<FormGroup
				id = "confirm-password"
				label = "Password Confirmation"
				type = {showPassword}
				placeholder = "Confirm Password"
				onChange = {(event) => setPasswordConfirm(event.target.value)}
				required
			/>
		)
	}
	return null
}

export default ConfirmPassword
