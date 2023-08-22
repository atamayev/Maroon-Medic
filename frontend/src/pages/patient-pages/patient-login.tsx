import { useState } from "react"
import handleLoginSubmit from "src/custom-hooks/auth-submits/handle-login-submit"
import LoginAndRegistrationForm from "../../components/login-and-registration-form/login-and-registration-form"
import useConfirmNotLoggedIn from "../../custom-hooks/user-verification-snippets"
import Header from "../../components/header/header"

export default function PatientLogin() {
  const type = "Patient"
  const [loginInformationObject, setLoginInformationObject] =
  useState<AuthCredentials>({loginType: type, email: "", password: ""})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useConfirmNotLoggedIn(false)

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <LoginAndRegistrationForm
        handleSubmit = {(e) =>
          handleLoginSubmit(
            e,
            loginInformationObject,
            setError,
            setLoading,
            type
          )}
        credentials = {loginInformationObject}
        setCredentials = {setLoginInformationObject}
        error = {error}
        VetOrPatient = {type}
        loading = {loading}
        loginOrSignUp = "Login"
        showPassword = {showPassword}
        setShowPassword = {setShowPassword}
      />
    </>
  )
}
