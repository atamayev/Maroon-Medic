import FormGroup from "../form-group"

interface Props {
  loginOrSignUp: "Login" | "Sign up",
  passwordConfirm: string,
  setPasswordConfirm?: (passwordConfirm: string) => void,
  showPassword: "text" | "password",
}

const ConfirmPassword = (props: Props) => {
	const { loginOrSignUp, passwordConfirm, setPasswordConfirm, showPassword } = props

	if (loginOrSignUp === "Sign up" && setPasswordConfirm) {
		return (
			<FormGroup
				id = "confirm-password"
				label = "Password Confirmation"
				type = {showPassword}
				placeholder = "Confirm Password"
				onChange = {(event) => setPasswordConfirm(event.target.value)}
				required
				value = {passwordConfirm || ""}
			/>
		)
	}
	return null
}

export default ConfirmPassword
