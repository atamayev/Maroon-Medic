import { useState } from "react"
import useRegisterSubmit from "src/custom-hooks/auth-submits/use-register-submit"
import LoginAndRegistrationForm from "../../components/login-and-registration-form/login-and-registration-form"
import useConfirmNotLoggedIn from "../../custom-hooks/use-confirm-not-logged-in"

export default function PatietRegister() {
	const VetOrPatiet = "Patient"
	const [registerInformationObject, setRegisterInformationObject] = useState<AuthCredentials>(
		{loginType: VetOrPatiet, email: "", password: ""}
	)
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const { registerSubmit } = useRegisterSubmit(setError, setLoading, VetOrPatiet)

	useConfirmNotLoggedIn(false)

	return (
		<LoginAndRegistrationForm
			handleSubmit = {(e) => registerSubmit(e, registerInformationObject, passwordConfirm)}
			credentials = {registerInformationObject}
			setCredentials = {setRegisterInformationObject}
			setPasswordConfirm = {setPasswordConfirm}
			error = {error}
			VetOrPatient = {VetOrPatiet}
			loading = {loading}
			loginOrSignUp = "Sign up"
			showPassword = {showPassword}
			setShowPassword = {setShowPassword}
		/>
	)
}
