import { useState, useEffect, useContext } from "react"
import { AppContext } from "src/contexts/maroon-context"
import fetchLoginHistory from "src/helper-functions/shared/fetch-login-history"

export default function useSetLoginHistory(
	userType: DoctorOrPatientOrNull,
	expectedUserType: DoctorOrPatient
): LoginHistoryItem[] {
	const appContext = useContext(AppContext)
	const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([])

	const checkForLoginHistory: () => Promise<void> = async () => {
		if (userType !== expectedUserType) return
		try {
			if (appContext.loginHistory) setLoginHistory(appContext.loginHistory)
			else await fetchLoginHistory(setLoginHistory, appContext)
		} catch (error) {
		}
	}

	useEffect(() => {
		if (userType !== expectedUserType) return
		checkForLoginHistory()
	}, [userType])

	return loginHistory
}
