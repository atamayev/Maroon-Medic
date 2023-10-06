import { useState } from "react"
import { observer } from "mobx-react"
import useLoginSubmit from "src/custom-hooks/auth/auth-submits/use-login-submit"
import useRedirectKnownUser from "../../custom-hooks/redirects/use-redirect-known-user"
import LoginAndRegistrationForm from "../../components/login-and-registration-form/login-and-registration-form"

function DoctorLogin() {
	const [loginInformationObject, setLoginInformationObject] =
		useState<AuthCredentials>({
			loginType: "Doctor",
			email: "",
			password: ""
		})
	const VetOrPatient = "Vet"
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const { loginSubmit } = useLoginSubmit(setError, setLoading, VetOrPatient)

	useRedirectKnownUser()

	return (
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
	)
}

export default observer(DoctorLogin)
