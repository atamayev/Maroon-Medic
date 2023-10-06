import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"

export default function useSetUserTypeAfterLogin (): (VetOrPatient: VetOrPatient) => void {
	const authContext = useContext(AppContext).auth

	const setUserTypeAfterLogin = (VetOrPatient: VetOrPatient): void => {
		authContext.isAuthenticated = true
		if (VetOrPatient === "Vet") authContext.userType = "Doctor"

		else authContext.userType = "Patient"
	}

	return setUserTypeAfterLogin
}
