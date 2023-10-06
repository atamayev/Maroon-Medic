import { useState } from "react"
import useRegisterSubmit from "src/custom-hooks/auth/auth-submits/use-register-submit"
import LoginAndRegistrationForm from "../../components/login-and-registration-form/login-and-registration-form"
import useRedirectKnownUser from "../../custom-hooks/redirects/use-redirect-known-user"
import { observer } from "mobx-react"

function PatientRegister() {
	const VetOrPatient = "Patient"
	const [registerInformationObject, setRegisterInformationObject] = useState<AuthCredentials>(
		{loginType: VetOrPatient, email: "", password: ""}
	)
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const { registerSubmit } = useRegisterSubmit(setError, setLoading, VetOrPatient)

	useRedirectKnownUser()

	return (
		<LoginAndRegistrationForm
			handleSubmit = {(e) => registerSubmit(e, registerInformationObject, passwordConfirm)}
			credentials = {registerInformationObject}
			setCredentials = {setRegisterInformationObject}
			passwordConfirm = {passwordConfirm}
			setPasswordConfirm = {setPasswordConfirm}
			error = {error}
			VetOrPatient = {VetOrPatient}
			loading = {loading}
			loginOrSignUp = "Sign up"
			showPassword = {showPassword}
			setShowPassword = {setShowPassword}
		/>
	)
}

export default observer(PatientRegister)
