import { Link } from "react-router-dom"

interface Props {
  loginOrSignUp: "Login" | "Sign up",
  VetOrPatient: VetOrPatient,
}

const ForgotPassword = (props: Props) => {
	const { loginOrSignUp, VetOrPatient } = props

	if (loginOrSignUp !== "Login") return null
	return (
		<div className = "w-100 text-center mt-3">
			<Link to = {`/${VetOrPatient.toLowerCase()}-forgot-password`}>Forgot Password?</Link>
		</div>
	)
}

export default ForgotPassword
