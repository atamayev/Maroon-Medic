import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {handleLoginSubmit} from "../../custom-hooks/handle-submits"
import { useConfirmNotLoggedIn } from "../../custom-hooks/user-verification-snippets"
import LoginAndRegistrationForm from "../../components/login-and-registration-form"
import Header from "../header"

export default function DoctorLogin() {
  const [loginInformationObject, setLoginInformationObject] =
    useState<AuthCredentials>({loginType: "Doctor", email: "", password: ""})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

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
