import { useNavigate } from "react-router-dom"
import AuthDataService from "../../services/auth-data-service"
import { handle401AxiosErrorAndSetCustomError } from "src/utils/handle-errors"

const handleRegisterSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  registerInformationObject: AuthCredentials,
  passwordConfirm: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  VetOrPatient: VetOrPatient
): Promise<void> => {
  e.preventDefault()
  setError("")
  const navigate = useNavigate()
  if (registerInformationObject.password !== passwordConfirm) return setError("Passwords do not match")
  try {
    setLoading(true)
    const response = await AuthDataService.register(registerInformationObject)
    if (response.status === 200) navigate(`/new-${VetOrPatient.toLowerCase()}`)
    else setError("Registration didn't work")
  } catch (error: unknown) {
    handle401AxiosErrorAndSetCustomError(error, setError)
  }
  setLoading(false)
}

export default handleRegisterSubmit
