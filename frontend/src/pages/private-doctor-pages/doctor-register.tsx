import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {handleRegisterSubmit} from "../../custom-hooks/handle-submits"
import { useConfirmNotLoggedIn } from "../../custom-hooks/user-verification-snippets"
import LoginAndRegistrationForm from "../../components/login-and-registration-form/login-and-registration-form"
import Header from "../../components/header/header"

export default function DoctorRegister() {
  const [registerInformationObject, setRegisterInformationObject] =
  useState<AuthCredentials>({loginType: "Doctor", email: "", password: ""})
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const type = "Vet"
  const [showPassword, setShowPassword] = useState(false)

  useConfirmNotLoggedIn()

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <LoginAndRegistrationForm
        handleSubmit = {(e) =>
          handleRegisterSubmit(
            e,
            registerInformationObject,
            passwordConfirm,
            navigate,
            setError,
            setLoading,
            type
          )}
        credentials = {registerInformationObject}
        setCredentials = {setRegisterInformationObject}
        setPasswordConfirm = {setPasswordConfirm}
        error = {error}
        VetOrPatient = {type}
        loading = {loading}
        loginOrSignUp = "Sign up"
        showPassword = {showPassword}
        setShowPassword = {setShowPassword}
      />
    </>
  )
}
