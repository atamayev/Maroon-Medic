import { useContext } from "react"
import AppContext from "src/contexts/maroon-context"

export default function useSetUserTypeAfterLogin (VetOrPatient: VetOrPatient): void {
	const authContext = useContext(AppContext).auth

	authContext.isAuthenticated = true
	if (VetOrPatient === "Vet") {
		authContext.userType = "Doctor"
		localStorage.setItem("UserType", "Doctor")
	}

	else {
		authContext.userType = "Patient"
		localStorage.setItem("UserType", "Patient")
	}
}
