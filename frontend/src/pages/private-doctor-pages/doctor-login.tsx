import { useState } from "react"
import useLoginSubmit from "src/custom-hooks/auth-submits/use-login-submit"
import useConfirmNotLoggedIn from "../../custom-hooks/use-confirm-not-logged-in"
import LoginAndRegistrationForm from "../../components/login-and-registration-form/login-and-registration-form"
import Header from "../../components/header/header"

export default function DoctorLogin() {
	const [loginInformationObject, setLoginInformationObject] =
    useState<AuthCredentials>({loginType: "Doctor", email: "", password: ""})
	const VetOrPatient = "Vet"
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const { loginSubmit } = useLoginSubmit(setError, setLoading, VetOrPatient)

	useConfirmNotLoggedIn(false)

	return (
		<>
			<Header dropdown = {true} search = {true}/>
			<LoginAndRegistrationForm
				handleSubmit = {(e) => loginSubmit(e, loginInformationObject)}
				credentials = {loginInformationObject}
				setCredentials = {setLoginInformationObject}
				error = {error}
				VetOrPatient = {VetOrPatient}
				loading = {loading}
				loginOrSignUp = "Login"
				showPassword = {showPassword}
				setShowPassword = {setShowPassword}
			/>
		</>
	)
}
