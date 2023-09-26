import _ from "lodash"
import { Link } from "react-router-dom"

interface Props {
  loginOrSignUp: "Login" | "Sign up",
  VetOrPatient: VetOrPatient,
}

function ForgotPassword (props: Props) {
	const { loginOrSignUp, VetOrPatient } = props

	if (loginOrSignUp !== "Login") return null
	return (
		<div className = "w-100 text-center mt-3">
			<Link to = {`/${_.toLower(VetOrPatient)}-forgot-password`}>Forgot Password?</Link>
		</div>
	)
}

export default ForgotPassword
