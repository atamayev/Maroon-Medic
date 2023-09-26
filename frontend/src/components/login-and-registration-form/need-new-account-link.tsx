import _ from "lodash"
import { Link } from "react-router-dom"

interface Props {
	loginOrSignUp: "Login" | "Sign up"
	VetOrPatient: VetOrPatient
}

export default function NeedNewAccountLink (props: Props) {
	const { loginOrSignUp, VetOrPatient } = props

	if (loginOrSignUp !== "Login") return null
	return (
		<div className = "w-100 text-center mt-2">
			Need an account? <Link to = {`/${_.toLower(VetOrPatient)}-register`} className = "font-bold">Sign Up</Link>
		</div>
	)
}
