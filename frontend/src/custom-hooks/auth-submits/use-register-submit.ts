import { useNavigate } from "react-router-dom"
import AuthDataService from "../../services/auth-data-service"
import handle401AxiosErrorAndSetCustomError from "src/utils/handle-errors/handle-401-axios-error-and-set-custom-error"
import { useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import { isLoginRegisterSuccess } from "src/utils/type-checks"

const useRegisterSubmit = (
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	VetOrPatient: VetOrPatient
): { registerSubmit: (e: React.FormEvent<HTMLFormElement>,
  registerInformationObject: AuthCredentials,
  passwordConfirm: string) => Promise<void>
} => {
	const navigate = useNavigate()
	const appContext = useContext(AppContext)

	const registerSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		registerInformationObject: AuthCredentials,
		passwordConfirm: string
	): Promise<void> => {
		e.preventDefault()
		setError("")
		if (registerInformationObject.password !== passwordConfirm) return setError("Passwords do not match")
		try {
			setLoading(true)
			const response = await AuthDataService.register(registerInformationObject)
			if (response.status === 200  && isLoginRegisterSuccess(response.data)) {
				appContext.isAuthenticated = true
				if (VetOrPatient === "Vet") {
					// appContext.userType = "Doctor"
					localStorage.setItem("UserType", "Doctor")
				}
				else {
					// appContext.userType = "Patient"
					localStorage.setItem("UserType", "Patient")
				}

				navigate(`/new-${VetOrPatient.toLowerCase()}`)
			}
		} catch (error: unknown) {
			handle401AxiosErrorAndSetCustomError(error, setError)
		}
		setLoading(false)
	}

	return { registerSubmit }
}

export default useRegisterSubmit
