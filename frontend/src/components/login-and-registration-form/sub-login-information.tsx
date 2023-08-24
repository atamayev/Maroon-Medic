import { Link } from "react-router-dom"

interface Props {
  loginOrSignUp: "Login" | "Sign up",
  VetOrPatient: VetOrPatient,
}

const SubLoginInformation = (props: Props) => {
	const { loginOrSignUp, VetOrPatient } = props

	if (loginOrSignUp !== "Login") return null
	return (
		<>
			<div className = "w-100 text-center mt-3">
				<Link to = {`/${VetOrPatient.toLowerCase()}-forgot-password`}>Forgot Password?</Link>
			</div>
			<div className = "w-100 text-center mt-2">
        Need an account? <Link to = {`/${VetOrPatient.toLowerCase()}-register`}>Sign Up</Link>
			</div>
		</>
	)
}

export default SubLoginInformation
