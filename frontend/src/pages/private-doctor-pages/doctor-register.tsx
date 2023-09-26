import { useState } from "react"
import { observer } from "mobx-react"
import useRegisterSubmit from "src/custom-hooks/auth/auth-submits/use-register-submit"
import useConfirmNotLoggedIn from "../../custom-hooks/use-confirm-not-logged-in"
import LoginAndRegistrationForm from "../../components/login-and-registration-form/login-and-registration-form"

function DoctorRegister() {
	const [registerInformationObject, setRegisterInformationObject] = useState<AuthCredentials>(
		{loginType: "Doctor", email: "", password: ""}
	)
	const VetOrPatient = "Vet"
	const [passwordConfirm, setPasswordConfirm] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const { registerSubmit } = useRegisterSubmit(setError, setLoading, VetOrPatient)
	useConfirmNotLoggedIn()

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

export default observer(DoctorRegister)
