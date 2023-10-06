import { useContext } from "react"
import AuthClass from "src/classes/shared/auth-class"
import AppContext from "src/contexts/maroon-context"

export default function useSetUserTypeAfterLogin (): (VetOrPatient: VetOrPatient, accessToken: string) => void {
	const appContext = useContext(AppContext)

	const setUserTypeAfterLogin = (VetOrPatient: VetOrPatient, accessToken: string): void => {
		let userType: DoctorOrPatient
		if (VetOrPatient === "Vet") userType = "Doctor"

		else userType = "Patient"

		appContext.auth = new AuthClass(accessToken, userType)
		localStorage.setItem("UserType", userType)
		appContext.initializeModules()
	}

	return setUserTypeAfterLogin
}
