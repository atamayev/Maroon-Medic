import { useNavigate } from "react-router-dom"
import AuthDataService from "../../services/auth-data-service"
import handle401AxiosErrorAndSetCustomError from "src/utils/handle-errors/handle-401-axios-error-and-set-custom-error"

const useRegisterSubmit = (
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	VetOrPatient: VetOrPatient
): { registerSubmit: (e: React.FormEvent<HTMLFormElement>,
  registerInformationObject: AuthCredentials,
  passwordConfirm: string) => Promise<void>
} => {
	const navigate = useNavigate()

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
			if (response.status === 200) navigate(`/new-${VetOrPatient.toLowerCase()}`)
		} catch (error: unknown) {
			handle401AxiosErrorAndSetCustomError(error, setError)
		}
		setLoading(false)
	}

	return { registerSubmit }
}

export default useRegisterSubmit
