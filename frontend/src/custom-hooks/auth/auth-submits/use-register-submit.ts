import _ from "lodash"
import { useNavigate } from "react-router-dom"
import AuthDataService from "../../../services/auth-data-service"
import handle401AxiosErrorAndSetCustomError from "src/utils/handle-errors/handle-401-axios-error-and-set-custom-error"
import { isLoginRegisterSuccess } from "src/utils/type-checks"
import useSetUserTypeAfterLogin from "src/custom-hooks/auth/set-user-type-after-login"

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
			if (response.status === 200  && isLoginRegisterSuccess(response.data)) {
				useSetUserTypeAfterLogin(VetOrPatient)

				navigate(`/new-${_.toLower(VetOrPatient)}`)
			}
		} catch (error: unknown) {
			handle401AxiosErrorAndSetCustomError(error, setError)
		}
		setLoading(false)
	}

	return { registerSubmit }
}

export default useRegisterSubmit
