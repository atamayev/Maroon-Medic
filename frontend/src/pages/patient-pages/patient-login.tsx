import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {handleLoginSubmit} from "../../custom-hooks/handle-submits"
import LoginAndRegistrationForm from "../../components/login-and-registration-form"
import { useConfirmNotLoggedIn } from "../../custom-hooks/user-verification-snippets"
import Header from "../../components/header/header"

export default function PatientLogin() {
  const type = "Patient"
  const [loginInformationObject, setLoginInformationObject] =
  useState<AuthCredentials>({loginType: type, email: "", password: ""})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
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
            navigate,
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
