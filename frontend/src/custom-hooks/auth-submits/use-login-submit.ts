import { useNavigate } from "react-router-dom"
import AuthDataService from "../../services/auth-data-service"
import handle401AxiosErrorAndSetCustomError from "src/utils/handle-errors/handle-401-axios-error-and-set-custom-error"

const useLoginSubmit = (
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	VetOrPatient: VetOrPatient
): {loginSubmit: (e: React.FormEvent<HTMLFormElement>, loginInformationObject: AuthCredentials) => Promise<void>} => {

	const navigate = useNavigate()

	const loginSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		loginInformationObject: AuthCredentials
	): Promise<void> => {
		setError("")
		try {
			e.preventDefault()
			setLoading(true)
			const response = await AuthDataService.login(loginInformationObject)
			if (response.status === 200) {
				if (VetOrPatient === "Vet") sessionStorage.setItem("UserType", "Doctor")
				else sessionStorage.setItem("UserType", "Patient")

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