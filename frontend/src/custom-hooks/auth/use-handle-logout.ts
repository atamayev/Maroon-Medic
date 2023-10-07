import { useContext } from "react"
import useHandleRefresh from "../use-handle-refresh"
import AuthDataService from "src/services/auth-data-service"
import AppContext from "src/contexts/maroon-context"

export default function useHandleLogout(): () => Promise<void> {
	const appContext = useContext(AppContext)
	const handleRefresh = useHandleRefresh()

	const handleLogout = async (): Promise<void> => {
		try {
			const response = await AuthDataService.logout()
			if (response.status === 200) appContext.logout()
		} catch (error) {
		}
		handleRefresh()
	}

	return handleLogout
}
