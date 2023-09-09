import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthDataService from "../../services/auth-data-service"
import handle401AxiosErrorAndSetCustomError from "src/utils/handle-errors/handle-401-axios-error-and-set-custom-error"
import { AppContext } from "src/contexts/maroon-context"
import { isLoginRegisterSuccess } from "src/utils/type-checks"

const useLoginSubmit = (
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	VetOrPatient: VetOrPatient
): {loginSubmit: (e: React.FormEvent<HTMLFormElement>, loginInformationObject: AuthCredentials) => Promise<void>} => {

	const navigate = useNavigate()
	const appContext = useContext(AppContext)

	const loginSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		loginInformationObject: AuthCredentials
	): Promise<void> => {
		setError("")
		try {
			e.preventDefault()
			setLoading(true)
			const response = await AuthDataService.login(loginInformationObject)
			if (response.status === 200 && isLoginRegisterSuccess(response.data)) {
				appContext.isAuthenticated = true
				if (VetOrPatient === "Vet") {
					appContext.userType = "Doctor"
					sessionStorage.setItem("UserType", "Doctor")
				}
				else {
					appContext.userType = "Patient"
					sessionStorage.setItem("UserType", "Patient")
				}

				if ((sessionStorage.getItem("bookingDetails") !== null) && VetOrPatient === "Patient") {
					const bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails") ?? "{}")
					navigate("/finalize-booking", { state: bookingDetails })
				} else {
					navigate("/dashboard")
				}
			}
		} catch (error: unknown) {
			handle401AxiosErrorAndSetCustomError(error, setError)
		}
		setLoading(false)
	}

	return { loginSubmit }
}

export default useLoginSubmit
