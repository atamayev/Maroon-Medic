import { useNavigate } from "react-router-dom"
import AuthDataService from "../../services/auth-data-service"
import { handle401AxiosErrorAndSetCustomError } from "src/utils/handle-errors"

const handleLoginSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  loginInformationObject: AuthCredentials,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  VetOrPatient: VetOrPatient
): Promise<void> => {
  setError("")
  try {
    e.preventDefault()
    setLoading(true)
    const navigate = useNavigate()
    const response = await AuthDataService.login(loginInformationObject)
    if (response.status === 200) {
      if ((sessionStorage.getItem("bookingDetails") !== null) && VetOrPatient === "Patient") {
        const bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails") ?? "{}")
        navigate("/finalize-booking", { state: bookingDetails })
      }
      else navigate("/dashboard")
    }
    else setError("Login didn't work")
  } catch (error: unknown) {
    handle401AxiosErrorAndSetCustomError(error, setError)
  }
  setLoading(false)
}

export default handleLoginSubmit
