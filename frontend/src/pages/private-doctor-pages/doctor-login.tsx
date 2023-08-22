import { useState } from "react"
import handleLoginSubmit from "src/custom-hooks/auth-submits/handle-login-submit"
import useConfirmNotLoggedIn from "../../custom-hooks/user-verification-snippets"
import LoginAndRegistrationForm from "../../components/login-and-registration-form/login-and-registration-form"
import Header from "../../components/header/header"

export default function DoctorLogin() {
  const [loginInformationObject, setLoginInformationObject] =
    useState<AuthCredentials>({loginType: "Doctor", email: "", password: ""})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const type = "Vet"

  useConfirmNotLoggedIn()

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
