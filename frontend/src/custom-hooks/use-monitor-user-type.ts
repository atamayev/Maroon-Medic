import { useEffect, useContext } from "react"
import AppContext from "src/contexts/maroon-context"
import useHandleLogout from "./auth/use-handle-logout"

export default function useMonitorUserType (): void {
	const appContext = useContext(AppContext)
	const handleLogout = useHandleLogout()

	useEffect(() => {
		const handleLocalStorageChange = (): void => {
			const userType = localStorage.getItem("UserType")

			if (
				userType &&
				userType !== "Doctor" &&
				userType !== "Patient" &&
				appContext.auth.isAuthenticated
			) {
				handleLogout()
				appContext.logout()
			}
		}

		// Check immediately
		handleLocalStorageChange()

		// Listen for changes
		window.addEventListener("storage", handleLocalStorageChange)

		return () => {
			// Clean up the event listener when the component unmounts
			window.removeEventListener("storage", handleLocalStorageChange)
		}
	}, [])
}
